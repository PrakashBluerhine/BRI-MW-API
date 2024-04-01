import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Any, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { IAuthService } from '../auth/interface/auth.interface';
import { CommonService } from '../shared/services/common.service';
import { ResponseDto } from '../shared/dto/response.dto';
import { JwtCustomService } from '../shared/services/jwt-custom.service';
import { ILike } from 'typeorm';
import {
  BRI_AuthUsers,
  BRI_AuthUsersHistory,
  BRI_AuthUserRoleMap,
  BRI_AuthUserRoleMapHistory,
  BRI_AuthSession,
  BRI_OperationTaxnomy,
} from './entities/user.entity';
import {
  UserCreationDto,
  LoginUserDto,
  UserResetRequestDto,
  UserListRequestDto,
} from './dto/auth.dto';
import { decryptAESString } from '../shared/services/encrypt.decrypt.service';
import { MailerService } from '@nestjs-modules/mailer';
import { from, zip } from 'rxjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path, { join } from 'path';
import fs, { readFileSync } from 'fs';
import { BRI_MasterRole } from 'src/master/entities/master.entity';
import { timeStamp } from 'console';
require('dotenv').config();
require('dotenv').config({
  path: `./environment/.env.${process.env.NODE_ENV}`,
});
@Injectable()
export class AuthService implements IAuthService {
  private logger = new Logger(AuthService.name); 
  secret = 'JWT_SECRET';
  expiresIn = '24h';
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly commonService: CommonService,
    private readonly jwtCustomService: JwtCustomService,
    @InjectRepository(BRI_AuthUsers)
    private readonly userRepository: Repository<BRI_AuthUsers>,
    @InjectRepository(BRI_AuthUsersHistory)
    private readonly userHistRepository: Repository<BRI_AuthUsersHistory>,
    @InjectRepository(BRI_AuthUserRoleMap)
    private readonly userRoleMapRepository: Repository<BRI_AuthUserRoleMap>,
    @InjectRepository(BRI_AuthUserRoleMapHistory)
    private readonly userRoleMapHisRepository: Repository<BRI_AuthUserRoleMapHistory>,
    @InjectRepository(BRI_AuthSession)
    private readonly authSessionRepository: Repository<BRI_AuthSession>,
    @InjectRepository(BRI_OperationTaxnomy)
    private readonly operationTaxnomyRepository: Repository<BRI_OperationTaxnomy>,

    private readonly mailerService: MailerService,
  ) {
    this.secret = 'JWT_SECRET';
    this.expiresIn = '24h';
  }
  async authenticate(dto: LoginUserDto): Promise<any> {
    try {
      console.log(dto, ' request');
      // console.log(decryptAESString(dto.userName),'userName');
      // console.log(decryptAESString(dto.password),'password');
      const userData = await this.userRepository.find({
        where: { UserName: dto.userName },
      });
      if (userData.length > 0) {
        try {
          var pwd = bcrypt.compareSync(dto.password, userData[0].Password);
        } catch (e) {
          throw new HttpException(
            { message: 'Password not  matched.' },
            HttpStatus.UNAUTHORIZED,
          );
        }
        if (pwd) {
          const userRoleMap = await this.userRoleMapRepository.find({
            select: { RoleId: true },
            where: { UserId: userData[0].UserId, IsActive: 1 },
          });
          if (userRoleMap.length > 0) {
            const param =
              'exec BRI_USP_Auth_Permission_List ' +
              userRoleMap[0].RoleId +
              ',' +
              userData[0].SubsidiaryId;
            const rolePermissionList = await this.userRepository.query(param);

            userData[0].Password = '';
            const token = await this.generateJWT(userData);
            const sessionTbl = new BRI_AuthSession();
            sessionTbl.DeviceType = dto.device;
            sessionTbl.IME = dto.imei;
            sessionTbl.IPAddress = dto.ipv4;
            sessionTbl.IsLogedOut = 0;
            sessionTbl.LoginedOn = new Date();
            sessionTbl.Ploatform = dto.plat_form;
            sessionTbl.UserId = userData[0].UserId;
            const session = await this.authSessionRepository.save(sessionTbl);
            this.logger.log({
              level: 'warn',
              message: 'Login successfully.',
              refCode: dto,
            });
            return {
              message: 'Login successfully',
              user: userData[0],
              permission: rolePermissionList,
              token: token,
              session_id: session.SessionId,
            };
          } else {
            this.logger.log({
              level: 'warn',
              message: 'Role Not Assigned.',
              refCode: dto,
            });
            throw new HttpException(
              { message: 'Role Not Assigned.' },
              HttpStatus.UNAUTHORIZED,
            );
          }
        } else {
          this.logger.log({
            level: 'warn',
            message: 'Login successfully.',
            refCode: dto,
          });
          throw new HttpException(
            { message: 'Password not  matched.' },
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        throw new HttpException(
          { message: 'User not found.' },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (e) {
      console.log(e, ' error:');
      throw new HttpException(
        { message: 'Internal server error.' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  async logout(session_id: any): Promise<any> {
    try {
      const dbSession = await this.authSessionRepository.find({
        where: { SessionId: session_id, IsLogedOut: 0 },
      });
      if (dbSession.length > 0) {
        await this.authSessionRepository.update(session_id, {
          IsLogedOut: 1,
          LoggedOut: new Date(),
        });
        return 'Successfully loged out.';
      } else {
        return 'Its already loged out.';
      }
    } catch (e) {
      throw new HttpException(
        { message: 'Internal server error.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async user_creation(dto: UserCreationDto): Promise<any> {
    try {
      const [list1, count] = await this.userRepository.findAndCount({
        where: { UserName: dto.username },
      });
      const sub = await this.operationTaxnomyRepository.findOne({
        where: { TaxnomyId: dto.subsidiary_id },
      });
      if (count == 0 && dto.user_id == 0) {
        const dt = new Date();
        const dbTbl = new BRI_AuthUsers();
        // dbTbl.UserId=0;
        // dbTbl.DOB = dto.dob===""?null:dto.dob;

        if (dto.department_id > 0) dbTbl.DepartmentId = dto.department_id;
        dbTbl.Email = dto.email;
        dbTbl.EmployeeCode = dto.employee_code;
        if (dto.employee_id > 0) dbTbl.EmployeeId == dto.employee_id;
        dbTbl.FirstName = dto.first_name;
        dbTbl.LastName = dto.last_name;
        dbTbl.IsActive = dto.is_active;
        dbTbl.IsLocked = dto.is_locked;
        dbTbl.MobileNo = dto.mobile_no;
        dbTbl.Password = bcrypt.hashSync(dto.password, 10);
        dbTbl.PasswordHash = '';
        dbTbl.ProfileImageID = 0;
        try {
          if (dto.subsidiary_id > 0) {
            dbTbl.SubsidiaryId = sub.SubsidiaryId;
            dbTbl.LocationId = dto.subsidiary_id;
          }
        } catch (e) {
          console.log(e);
        }
        dbTbl.UserName = dto.username;
        dbTbl.created_by = dto.created_by;
        dbTbl.created_on = dt;

        const savedUser = await this.userRepository.save(dbTbl);

        const dbHis = new BRI_AuthUsersHistory();
        dbHis.UserId = savedUser.UserId;
        // if(dto.dob!=null)
        //  dbHis.DOB = dto.dob;
        dbHis.DepartmentId = dto.department_id;
        dbHis.Email = dto.email;
        dbHis.EmployeeCode = dto.employee_code;
        dbHis.EmployeeId == dto.employee_id;
        dbHis.FirstName = dto.first_name;
        dbHis.LastName = dto.last_name;
        dbHis.IsActive = dto.is_active;
        dbHis.IsLocked = dto.is_locked;
        dbHis.MobileNo = dto.mobile_no;
        dbHis.Password = savedUser.Password;
        dbHis.PasswordHash = savedUser.PasswordHash;
        dbHis.ProfileImageID = 0;
        dbHis.SubsidiaryId = dto.subsidiary_id;
        dbHis.UserName = dto.username;
        dbHis.created_by = dto.created_by;
        dbHis.created_on = dt;
        await this.userHistRepository.save(dbHis);

        const rolTbl = new BRI_AuthUserRoleMap();
        rolTbl.IsActive = 1;
        // rolTbl.MapId = 0;
        rolTbl.RoleId = dto.role_id;
        rolTbl.UserId = savedUser.UserId;
        rolTbl.created_by = dto.created_by;
        rolTbl.created_on = dt;
        const saveRole = await this.userRoleMapRepository.save(rolTbl);

        const rolHistTbl = new BRI_AuthUserRoleMapHistory();
        rolHistTbl.IsActive = 1;
        rolHistTbl.IsLastRecord = 1;
        rolHistTbl.MapId = saveRole.MapId;
        rolHistTbl.RoleId = dto.role_id;
        rolHistTbl.UserId = savedUser.UserId;
        rolHistTbl.created_by = dto.created_by;
        rolHistTbl.created_on = dt;
        const saveRoleHis =
          await this.userRoleMapHisRepository.save(rolHistTbl);
        return 'User created successfully.';
      } else if (dto.user_id > 0) {
        const dt = new Date();
        this.userRepository.update(dto.user_id, {
          FirstName: dto.first_name,
          LastName: dto.last_name,
          Email: dto.email,
          //  DOB: dto.dob,

          Password:
            dto.password != null && dto.password != ''
              ? bcrypt.hashSync(dto.password, 10)
              : list1[0].Password,
          MobileNo: dto.mobile_no,
          DepartmentId: dto.department_id,
          SubsidiaryId: sub.SubsidiaryId,
          LocationId: dto.subsidiary_id,
          // EmployeeCode: dto.employee_code,
          // EmployeeId: dto.employee_id,
          IsActive: dto.is_active,
          modified_on: dt,
          modified_by: dto.created_by,
        });
        this.userHistRepository.update(dto.user_id, { IsLastRecord: 0 });

        const dbHis = new BRI_AuthUsersHistory();
        dbHis.UserId = dto.user_id;
        // dbHis.DOB = dto.dob;
        dbHis.Password = bcrypt.hashSync(dto.password, 10);
        dbHis.DepartmentId = dto.department_id;
        dbHis.Email = dto.email;
        dbHis.EmployeeCode = dto.employee_code;
        dbHis.EmployeeId == dto.employee_id;
        dbHis.FirstName = dto.first_name;
        dbHis.LastName = dto.last_name;
        dbHis.IsActive = dto.is_active;
        dbHis.IsLocked = dto.is_locked;
        dbHis.MobileNo = dto.mobile_no;
        dbHis.IsLastRecord = 1;
        dbHis.ProfileImageID = 0;
        dbHis.SubsidiaryId = sub.SubsidiaryId;
        dbHis.LocationId = dto.subsidiary_id;
        dbHis.UserName = dto.username;
        dbHis.created_by = dto.created_by;
        dbHis.created_on = dt;
        await this.userHistRepository.save(dbHis);

        const userRoleExist = await this.userRoleMapRepository.findAndCount({
          where: { UserId: dto.user_id },
        });
        console.log(userRoleExist[0][0].MapId, 'userRoleExist');
        // if (userRoleExist[1] == 0) {
        await this.userRoleMapRepository.update(
          { UserId: dto.user_id },
          { RoleId: dto.role_id },
        );
        await this.userRoleMapHisRepository.update(
          { UserId: dto.user_id, IsLastRecord: 1 },
          { IsLastRecord: 1 },
        );
        const rolHistTbl = new BRI_AuthUserRoleMapHistory();
        rolHistTbl.IsActive = 1;
        rolHistTbl.IsLastRecord = 1;
        rolHistTbl.MapId = userRoleExist[0][0].MapId;
        rolHistTbl.RoleId = dto.role_id;
        rolHistTbl.UserId = dto.user_id;
        rolHistTbl.IsLastRecord = 1;
        rolHistTbl.created_by = dto.created_by;
        rolHistTbl.created_on = dt;
        const saveRoleHis =
          await this.userRoleMapHisRepository.save(rolHistTbl);
        //  }
        return 'User updated successfully.';
      } else if (dto.user_id == 0 && count[1] > 0) {
        return 'User already exist.';
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetLink(email: any): Promise<any> {
    console.log(email, 'email');
    try {
      const user = await this.userRepository.find({
        where: { UserName: email },
      });
      if (user.length > 0) {
        // console.log(user,'user');
        const emailBase64 = Buffer.from(user[0].UserName).toString('base64');

        const key = await this.makeid(75);

        const token = emailBase64 + '@' + key;

        console.log(token, ' token');
        const location = join(
          __dirname,
          '../shared/template/mail/forgot_password.html',
        );
        const options = {
          encoding: 'utf-8',
        };
        const html = readFileSync(location);
        const mail_content = html;
        const reset_link =
          this.configService.get('HOSTED_URL') + '/resetpassword?code=' + token;
        //   console.log(this.configService.get('HOSTED_URL'),'this.configService.get(;')
        const mapObj = {
          '@@Link@@': reset_link,
        };
        console.log(mapObj, 'mapobj');
        // mail_content = mail_content.replace(
        //   /@@ID@@/gi,
        //   function (matched) {
        //     return mapObj[matched];
        //   }
        // );
        const mail_html = mail_content
          .toString()
          .replace('@@Link@@', reset_link);
        const subject = 'BRI Installation - Password Reset Link';
        const toMaile = user[0].Email;

        this.sendEmail(
          toMaile,
          'rprakashkgm@gmail.com',
          subject,
          mail_html,
          '',
          '',
        );
        const tdt = new Date();
        tdt.setDate(tdt.getHours() + 24);
        await this.userRepository.update(user[0].UserId, {
          ResetToken: token,
          TokenExpairyOn: tdt,
          modified_on: new Date(),
        });
        return 'Link sent successfully.';
      } else {
        return 'Email id not exists';
      }
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetLinkValidation(token: any): Promise<any> {
    try {
      const emailbase64 = token.split('@')[0];
      const keybase64 = token.split('@')[1];
      const buff = Buffer.from(emailbase64, 'base64');
      const email = buff.toString('ascii');

      const user = await this.userRepository.find({
        where: { UserName: email },
      });
      if (user.length > 0) {
        if (user[0].ResetToken == token) {
          if (user[0].TokenExpairyOn > new Date()) {
            return 'Link valid.';
          } else {
            return 'Link expaired.';
          }
        } else {
          return 'Invalid link.';
        }
      } else {
        return 'Invalid link.';
      }
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(reset: UserResetRequestDto): Promise<any> {
    try {
      const emailbase64 = reset.token.split('@')[0];
      const keybase64 = reset.token.split('@')[1];
      const buff = Buffer.from(emailbase64, 'base64');
      const email = buff.toString('ascii');
      const user = await this.userRepository.find({
        where: { UserName: email },
      });
      if (user.length > 0) {
        console.log(keybase64, 'keybase64');
        console.log(user[0].ResetToken, 'user[0].reset_token');
        if (user[0].ResetToken == reset.token) {
          if (user[0].TokenExpairyOn > new Date()) {
            const pwd = bcrypt.hashSync(reset.password, 10);
            await this.userRepository.update(user[0].UserId, {
              Password: pwd,
              ResetToken: null,
              TokenExpairyOn: null,
            });
            return 'Successfully reseted.';
          } else {
            return 'Link expaired.';
          }
        } else {
          return 'Invalid link.';
        }
      } else {
        return 'Invalid link.';
      }
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // user_list_table(dto:UserListRequestDto):Promise<any>;
  async user_list_table(): Promise<any> {
    try {
      // const users = await this.userRepository.createQueryBuilder("user");
      // users.innerJoin(BRI_AuthUserRoleMap,"ur","ur.userid==u.userid AND ur.isActive=1");
      // users.innerJoin(BRI_MasterRole,"mr","mr.roleid==ur.roleid AND mr.isActive=1");
      // users.where('u.isactive=1')
      // if(dto.subsidiary_id>0)
      // users.andWhere('u.SubsidiaryId=subsidiary_id',{subsidiary_id:dto.subsidiary_id});

      // if(dto.order_by)
      // {
      //   if(dto.sort=="DESC")
      //   {
      //   users.orderBy(dto.order_by,"DESC");
      //   }else
      //   {
      //   users.orderBy(dto.order_by,"ASC");
      //   }
      //   let data=await users.getMany();
      // }

      // let q=this.userRepository.createQueryBuilder("u");
      // q.innerJoin(BRI_AuthUserRoleMap,"ur","ur.userid==u.userid AND ur.isActive=1");
      // q.innerJoin(BRI_MasterRole,"mr","mr.roleid==ur.roleid AND mr.isActive=1");
      // q.where('u.isactive=1');
      // q.select("u.UserId","user_id");
      // q.addSelect("u.UserName","user_name");
      // q.addSelect("u.Email","email");
      // q.addSelect("u.MobileNo","mobile_no");
      // q.addSelect("u.DepartmentId","department_id");
      // q.addSelect("u.SubsidiaryId","subsidiary_id");
      // q.addSelect("u.FirstName","first_name");
      // q.addSelect("u.LastName","last_name");
      // q.addSelect("u.EmployeeCode","employee_code");
      // q.addSelect("u.EmployeeId","employee_id");
      // q.addSelect("u.DOB","doob");
      // q.addSelect("u.IsActive","isactive");
      // q.addSelect("FORMAT(u.CreatedOn,'dd-MM-yyyy')","created_on");
      // q.addSelect("u.CreatedBy","created_by");
      // q.addSelect("mr.RoleName","role_name");
      // q.addSelect("mr.RoleCode","role_code");
      // q.addSelect("mr.RoleId","role_id");
      // if(dto.subsidiary_id>0)
      // q.andWhere('u.SubsidiaryId=subsidiary_id',{subsidiary_id:dto.subsidiary_id});

    const param = 'exec BRI_USP_UserTable ';
   // const param='select * from [BRI.UserRole]';

      const data = this.userRepository.query(param);

      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async customResponse(
    data: object,
    message: string,
    status: string,
    userToken?: object,
  ): Promise<ResponseDto> {
    const dto = new ResponseDto();
    dto.status = status;
    dto.message = message;
    dto.data = data;
    if (userToken) {
      dto.token = this.generateJWT(userToken);
    }
    return dto;
  }
  public generateJWT(data: any) {
    return this.jwtService.sign(
      { data },
      {
        expiresIn: this.expiresIn,
        secret: this.secret,
      },
    );
  }

  async sendEmail(to, from, subject, html, cc, text) {
    console.log('sendEmail');
    try {
      return await this.mailerService.sendMail({
        to: to,
        from: from,
        subject: subject,
        text: text,
        html: html,
      });
    } catch (e) {
      console.log(e, 'mail error');
    }
    // .then((success) => {
    //   return success;
    //   console.log(success);
    // })
    // .catch((err) => {
    //   return err;   bggggggg
    //   console.log(err);
    // });
  }
}
