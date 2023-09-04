import {
  Injectable,
  HttpStatus,
  HttpException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Any, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { IMasterService } from '../master/interface/master.interface';
import { CommonService } from '../shared/services/common.service';
import { ResponseDto } from '../shared/dto/response.dto';
import { JwtCustomService } from '../shared/services/jwt-custom.service';
import {
  BRI_MasterRole,
  BRI_MasterRoleHistory,
} from './entities/master.entity';
import { ILike } from 'typeorm';
import { RoleCreationDto,TableDto } from './dto/master.dto';

import { MailerService } from '@nestjs-modules/mailer';
import { from, zip } from 'rxjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path, { join } from 'path';
import fs, { readFileSync } from 'fs';
require('dotenv').config();
require('dotenv').config({
  path: `./environment/.env.${process.env.NODE_ENV}`,
});
@Injectable()
export class MasterService implements IMasterService {
  secret = 'JWT_SECRET';
  expiresIn = '30m';
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly commonService: CommonService,
    private readonly jwtCustomService: JwtCustomService,
    @InjectRepository(BRI_MasterRole)
    private readonly roleRepository: Repository<BRI_MasterRole>,
    @InjectRepository(BRI_MasterRoleHistory)
    private readonly roleHistoryRepository: Repository<BRI_MasterRoleHistory>,
    private readonly mailerService: MailerService,
  ) {
    this.secret = 'JWT_SECRET';
    this.expiresIn = '30m';
  }
  async create_role(roleCreationDto: RoleCreationDto): Promise<any> {
    try {
      let count = await this.roleRepository.findAndCount({
        where: { RoleName: roleCreationDto.roleName },
      });
      if (count[1] == 0 && roleCreationDto.roleId == 0) {
        let dt=new Date();
        let roleTbl = new BRI_MasterRole();
        roleTbl.RoleCode = roleCreationDto.roleCode;
        roleTbl.RoleName = roleCreationDto.roleName;
        roleTbl.IsActive = roleCreationDto.isActive;
        roleTbl.created_by = roleCreationDto.userId;
        roleTbl.created_on =dt;// new Date();
        let storedTbl = await this.roleRepository.save(roleTbl);
      //  console.log(storedTbl,'stored table');
        let roleHistory = new BRI_MasterRoleHistory();
        roleHistory.RoleId = storedTbl.RoleId;
        roleHistory.RoleCode = storedTbl.RoleCode;
        roleHistory.RoleName = storedTbl.RoleName;
        roleHistory.IsActive = storedTbl.IsActive;
        roleHistory.IsLastRecord=1;
        roleHistory.created_on =dt;//new Date(); //storedTbl.created_on;
        roleHistory.created_by = storedTbl.created_by;
        let savedHistoryTbl =
          await this.roleHistoryRepository.save(roleHistory);
        return 'Saved successfully.';
      } else if (roleCreationDto.roleId > 0) {
        let dt=new Date();
        await this.roleHistoryRepository.update(roleCreationDto.roleId, {
          IsLastRecord: 0,
        });
        let storedTbl = await this.roleRepository.update(
          roleCreationDto.roleId,
          {
            RoleCode: roleCreationDto.roleCode,
            RoleName: roleCreationDto.roleName,
            IsActive: roleCreationDto.isActive,
            modified_by: roleCreationDto.userId,
            modified_on: dt//new Date(),
          },
        );

        let roleHistory = new BRI_MasterRoleHistory();
        roleHistory.RoleId = roleCreationDto.roleId;
        roleHistory.RoleCode = roleCreationDto.roleCode;
        roleHistory.RoleName = roleCreationDto.roleName;
        roleHistory.IsActive = roleCreationDto.isActive;
        roleHistory.created_on = dt,//new Date();
        roleHistory.created_by = roleCreationDto.userId;
        roleHistory.IsLastRecord=1;
        let savedHistoryTbl =
          await this.roleHistoryRepository.save(roleHistory);
        return 'Updated successfully.';
      }
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async role_table(tblDto: TableDto): Promise<any> {
    try{
      const take = tblDto.page_size || 10
      const skip = tblDto.start || 0
      const field=tblDto.order_by || "RoleName";
      const sort=tblDto.sort||"ASC";
      let order_by = {
        [field]:sort
      };
      const [result, total] = await this.roleRepository.findAndCount(
        {
            where: { RoleName: ILike(`%${tblDto.search}%`),}
            , order:order_by,
            take: take,
            skip: skip
        }
    );
    return  {result,total};

    }catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
function Like(arg0: string) {
  throw new Error('Function not implemented.');
}

