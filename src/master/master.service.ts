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
  BRI_MasterDepartment,
  BRI_MasterEmployee,
  BRI_MasterEmployeeHistory,
  BRI_MasterMachine,
  BRI_MasterMachineHistory,
  BRI_MasterEmailAlert,
  BRI_MasterEmailAlertHistory,
  BRI_EmailAlertRecipient,
  BRI_EmailAlertRecipientHistory,
} from './entities/master.entity';
import { ILike } from 'typeorm';
import {
  RoleCreationDto,
  TableDto,
  newEmployeeDto,
  employeeTableDto,
  newMachineryDto,
  machineryTableDto,
  newMailAlertDto,
  emailAlertTableDto,
} from './dto/master.dto';

import { MailerService } from '@nestjs-modules/mailer';
import { from, zip } from 'rxjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path, { join } from 'path';
import fs, { readFileSync } from 'fs';
import { ApiGatewayTimeoutResponse } from '@nestjs/swagger';
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
    @InjectRepository(BRI_MasterDepartment)
    private readonly departmentRepository: Repository<BRI_MasterDepartment>,
    @InjectRepository(BRI_MasterEmployee)
    private readonly employeeRepository: Repository<BRI_MasterEmployee>,
    @InjectRepository(BRI_MasterEmployeeHistory)
    private readonly employeeHistoryRepository: Repository<BRI_MasterEmployeeHistory>,
    @InjectRepository(BRI_MasterMachine)
    private readonly machineRepository: Repository<BRI_MasterMachine>,
    @InjectRepository(BRI_MasterMachineHistory)
    private readonly macHistoryRepository: Repository<BRI_MasterMachineHistory>,
    @InjectRepository(BRI_MasterEmailAlert)
    private readonly alertMasterRepository: Repository<BRI_MasterEmailAlert>,
    @InjectRepository(BRI_MasterEmailAlertHistory)
    private readonly alertMasterHistoryRepository: Repository<BRI_MasterEmailAlertHistory>,
    @InjectRepository(BRI_EmailAlertRecipient)
    private readonly alertRecipientRepository: Repository<BRI_EmailAlertRecipient>,
    @InjectRepository(BRI_EmailAlertRecipientHistory)
    private readonly alertRecipientHistoryRepository: Repository<BRI_EmailAlertRecipientHistory>,
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
        let dt = new Date();
        let roleTbl = new BRI_MasterRole();
        roleTbl.RoleCode = roleCreationDto.roleCode;
        roleTbl.RoleName = roleCreationDto.roleName;
        roleTbl.IsActive = roleCreationDto.isActive == 0 ? false : true;
        roleTbl.created_by = roleCreationDto.userId;
        roleTbl.created_on = dt; // new Date();
        let storedTbl = await this.roleRepository.save(roleTbl);
        //  console.log(storedTbl,'stored table');
        let roleHistory = new BRI_MasterRoleHistory();
        roleHistory.RoleId = storedTbl.RoleId;
        roleHistory.RoleCode = storedTbl.RoleCode;
        roleHistory.RoleName = storedTbl.RoleName;
        roleHistory.IsActive = roleCreationDto.isActive == 0 ? false : true;
        roleHistory.IsLastRecord = 1;
        roleHistory.created_on = dt; //new Date(); //storedTbl.created_on;
        roleHistory.created_by = storedTbl.created_by;
        let savedHistoryTbl =
          await this.roleHistoryRepository.save(roleHistory);
        return 'Saved successfully.';
      } else if (roleCreationDto.roleId > 0) {
        let dt = new Date();
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
            modified_on: dt, //new Date(),
          },
        );

        let roleHistory = new BRI_MasterRoleHistory();
        roleHistory.RoleId = roleCreationDto.roleId;
        roleHistory.RoleCode = roleCreationDto.roleCode;
        roleHistory.RoleName = roleCreationDto.roleName;
        roleHistory.IsActive = roleCreationDto.isActive == 0 ? false : true;
        (roleHistory.created_on = dt), //new Date();
          (roleHistory.created_by = roleCreationDto.userId);
        roleHistory.IsLastRecord = 1;
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
    try {
      const take = tblDto.page_size || 10;
      const skip = tblDto.start || 0;
      const field = tblDto.order_by || 'RoleName';
      const sort = tblDto.sort || 'ASC';
      let order_by = {
        [field]: sort,
      };
      const [result, total] = await this.roleRepository.findAndCount({
        where: { RoleName: ILike(`%${tblDto.search}%`) },
        order: order_by,
        take: take,
        skip: skip,
      });
      console.log(result, ' result');
      return { result, total };
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async employee_add_update(dto: newEmployeeDto): Promise<any> {
    try {
      if (dto.employee_id == 0) {
        const empTbl = new BRI_MasterEmployee();
        empTbl.DepartmentId = dto.department_id;
        empTbl.Desigination = dto.desigination;
        empTbl.EmailId=dto.email_id;
        empTbl.EmployeeCode = dto.employee_code;
        empTbl.EmployeeName = dto.employee_name;
        empTbl.IsActive = dto.isActive;
        empTbl.created_by = dto.userId;
        empTbl.created_on = new Date();
        empTbl.SubsidiaryId = dto.subsidiary_id;
        const empDb = await this.employeeRepository.save(empTbl);
        if (empDb) {
          const empHistTbl = new BRI_MasterEmployeeHistory();
          empHistTbl.DepartmentId = dto.department_id;
          empHistTbl.Desigination = dto.desigination;
          empTbl.EmailId=dto.email_id;
          empHistTbl.EmployeeCode = dto.employee_code;
          empHistTbl.EmployeeName = dto.employee_name;
          empHistTbl.IsActive = dto.isActive;
          empHistTbl.isLastRecord = 1;
          empHistTbl.SubsidiaryId = dto.subsidiary_id;
          empHistTbl.created_by = dto.userId;
          empHistTbl.created_on = new Date();
          await this.employeeHistoryRepository.save(empHistTbl);
        }
        return 'Saved successfully.';
      } else if (dto.employee_id > 0) {
        await this.employeeHistoryRepository.update(
          { EmployeeId: dto.employee_id },
          { isLastRecord: 0 },
        );
        await this.employeeRepository.update(
          { EmployeeId: dto.employee_id },
          {
            EmployeeCode: dto.employee_code,
            EmployeeName: dto.employee_name,
            Desigination: dto.desigination,
            EmailId:dto.email_id,
            DepartmentId: dto.department_id,
            modified_by: dto.userId,
            modified_on: new Date(),
            IsActive: dto.isActive,
          },
        );

        const empHistTbl = new BRI_MasterEmployeeHistory();
        empHistTbl.DepartmentId = dto.department_id;
        empHistTbl.Desigination = dto.desigination;
        empHistTbl.EmployeeCode = dto.employee_code;
        empHistTbl.EmployeeName = dto.employee_name;
        empHistTbl.EmailId=dto.email_id;
        empHistTbl.IsActive = dto.isActive;
        empHistTbl.SubsidiaryId = dto.subsidiary_id;
        empHistTbl.created_by = dto.userId;
        empHistTbl.created_on = new Date();
        empHistTbl.EmployeeId = dto.employee_id;
        await this.employeeHistoryRepository.save(empHistTbl);

        return 'Update successfully.';
      }
    } catch (e) {
      console.log(e, ' error');
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async department_list(subsidiary_id): Promise<any> {
    try {
      return await this.departmentRepository.find({
        select: { DepartmentId: true, DepartmentName: true },
        where: { IsActive: 1 },
      });
    } catch (e) {
      console.log(e, ' error');
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async employee_list_table(dto: employeeTableDto): Promise<any> {
    try {
      let param = 'exec BRI_USP_EmplyeeTable 0,0';

      let data = this.employeeRepository.query(param);

      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async machinery_add_update(dto: newMachineryDto): Promise<any> {
    try {
      if (dto.machine_id == 0) {
        const machTbl = new BRI_MasterMachine();
        machTbl.DepartmentId = dto.department_id;
        machTbl.MachineCode = dto.machine_code;
        machTbl.MachineName = dto.machine_name;
        machTbl.IsActive = dto.isActive;
        machTbl.created_by = dto.userId;
        machTbl.created_on = new Date();
        machTbl.SubsidiaryId = dto.subsidiary_id;
        const macDb = await this.machineRepository.save(machTbl);
        if (macDb) {
          const macHistTbl = new BRI_MasterMachineHistory();
          macHistTbl.DepartmentId = dto.department_id;
          macHistTbl.MachineCode = dto.machine_code;
          macHistTbl.MachineName = dto.machine_name;
          macHistTbl.MachineId = macDb.MachineId;
          macHistTbl.IsActive = dto.isActive;
          macHistTbl.IsLastRecord = 1;
          macHistTbl.SubsidiaryId = dto.subsidiary_id;
          macHistTbl.created_by = dto.userId;
          macHistTbl.created_on = new Date();
          await this.macHistoryRepository.save(macHistTbl);
        }
        return 'Saved successfully.';
      } else if (dto.machine_id > 0) {
        await this.macHistoryRepository.update(
          { MachineId: dto.machine_id },
          { IsLastRecord: 0 },
        );

        await  this.machineRepository.update(dto.machine_id,{
          MachineCode:dto.machine_code,
          MachineName:dto.machine_name,
          DepartmentId:dto.department_id,
          NsMachineId:dto.nsmachine_id,
          IsActive:dto.isActive
        });

        const macHistTbl = new BRI_MasterMachineHistory();
        macHistTbl.DepartmentId = dto.department_id;
        macHistTbl.MachineCode = dto.machine_code;
        macHistTbl.MachineName = dto.machine_name;
        macHistTbl.MachineId = dto.machine_id;
        macHistTbl.IsActive = dto.isActive;
        macHistTbl.IsLastRecord = 1;
        macHistTbl.SubsidiaryId = dto.subsidiary_id;
        macHistTbl.created_by = dto.userId;
        macHistTbl.created_on = new Date();
        await this.macHistoryRepository.save(macHistTbl);

        return 'Update successfully.';
      }
    } catch (e) {
      console.log(e, ' error');
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async machinery_list_table(dto: machineryTableDto): Promise<any> {
    try {
      let param = 'exec BRI_USP_MachineryTable 0,0';

      let data = this.machineRepository.query(param);

      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async email_alert(dto: newMailAlertDto): Promise<any> {
    try {
      if (dto.alert_id == 0) {
        const alertTbl = new BRI_MasterEmailAlert();
        alertTbl.AlertCode = dto.alert_code;
        alertTbl.AlertName = dto.alert_name;
        alertTbl.IsActive = dto.isActive;
        alertTbl.SubsidiaryId = dto.subsidiary_id;
        alertTbl.created_by = dto.userId;
        alertTbl.created_on = new Date();
        const alertDb = await this.alertMasterRepository.save(alertTbl);

        if (alertDb) {
          const alertHisTbl = new BRI_MasterEmailAlertHistory();
          alertHisTbl.AlertId = alertDb.AlertId;
          alertHisTbl.AlertCode = dto.alert_code;
          alertHisTbl.AlertName = dto.alert_name;
          alertHisTbl.IsActive = dto.isActive;
          alertHisTbl.SubsidiaryId = dto.subsidiary_id;
          alertHisTbl.created_by = dto.userId;
          alertHisTbl.created_on = new Date();
          alertHisTbl.IsActive = dto.isActive;
          alertHisTbl.IsLastRecord = 1;
          alertHisTbl.SubsidiaryId = dto.subsidiary_id;
          alertHisTbl.created_by = dto.userId;
          alertHisTbl.created_on = new Date();
          await this.alertMasterHistoryRepository.save(alertHisTbl);

          if (dto.recipient.length > 0) {
            for await (const re of dto.recipient) {
              let recipient = new BRI_EmailAlertRecipient();
              recipient.AlertId = alertDb.AlertId;
              recipient.EmployeeId = re.employee_Id;
              recipient.IsActive = 1;
              recipient.created_by = dto.userId;
              recipient.created_on = new Date();
              const db = await this.alertRecipientRepository.save(recipient);
              if (db) {
                let hist = new BRI_EmailAlertRecipientHistory();
                hist.RecipientId = db.RecipientId;
                hist.AlertId = dto.alert_id;
                hist.EmployeeId = re.employee_Id;
                hist.IsLastRecord = 1;
                hist.created_by = dto.userId;
                hist.created_on = new Date();
                await this.alertRecipientHistoryRepository.save(hist);
              }
            }
          }
        }
        return 'Saved successfully.';
      } else if (dto.alert_id > 0) {
        await this.alertRecipientHistoryRepository.update(
          { AlertId: dto.alert_id, IsLastRecord: 1 },
          { IsLastRecord: 0 },
        );
        await this.alertMasterRepository.update(
          { AlertId: dto.alert_id },
          {
            AlertCode: dto.alert_code,
            AlertName: dto.alert_name,
            IsActive: dto.isActive,
            modified_by: dto.userId,
            modified_on: new Date(),
          },
        );

        const alertHisTbl = new BRI_MasterEmailAlertHistory();
        alertHisTbl.AlertId = dto.alert_id;
        alertHisTbl.AlertCode = dto.alert_code;
        alertHisTbl.AlertName = dto.alert_name;
        alertHisTbl.IsActive = dto.isActive;
        alertHisTbl.SubsidiaryId = dto.subsidiary_id;
        alertHisTbl.created_by = dto.userId;
        alertHisTbl.created_on = new Date();
        alertHisTbl.IsActive = dto.isActive;
        alertHisTbl.IsLastRecord = 1;
        alertHisTbl.SubsidiaryId = dto.subsidiary_id;
        alertHisTbl.created_by = dto.userId;
        alertHisTbl.created_on = new Date();
        await this.alertMasterHistoryRepository.save(alertHisTbl);

        if (dto.recipient.length > 0) {
          for await (const re of dto.recipient) {
            const [items, totalCount]=await this.alertRecipientRepository.findAndCount({where:{AlertId:dto.alert_id,EmployeeId:re.employee_Id}});
            if(totalCount==0)
            {
            let recipient = new BRI_EmailAlertRecipient();
            recipient.AlertId = dto.alert_id;
            recipient.EmployeeId = re.employee_Id;
            recipient.IsActive = 1;
            recipient.created_by = dto.userId;
            recipient.created_on = new Date();
            const db = await this.alertRecipientRepository.save(recipient);
            if (db) {
              let hist = new BRI_EmailAlertRecipientHistory();
              hist.RecipientId = db.RecipientId;
              hist.AlertId = dto.alert_id;
              hist.EmployeeId = re.employee_Id;
              hist.IsLastRecord = 1;
              hist.IsActive=1;
              hist.created_by = dto.userId;
              hist.created_on = new Date();
              await this.alertRecipientHistoryRepository.save(hist);
            }
          }
          else if(totalCount>0 && items[0].IsActive==0)
          {
            await this.alertRecipientRepository.update({RecipientId:items[0].RecipientId},{IsActive:1});

            let hist = new BRI_EmailAlertRecipientHistory();
              hist.RecipientId = items[0].RecipientId;
              hist.AlertId = items[0].AlertId;
              hist.EmployeeId = items[0].EmployeeId;
              hist.IsLastRecord = 1;
              hist.IsActive=1;
              hist.created_by = dto.userId;
              hist.created_on = new Date();
              await this.alertRecipientHistoryRepository.save(hist);
          }
          }

          const [items, totalCount]=await this.alertRecipientRepository.findAndCount({where:{AlertId:dto.alert_id,IsActive:1}});
          if(totalCount>0)
          {
            for await(const obj of items)
            {
              const index=dto.recipient.findIndex((x: { employee_Id: number; })=>x.employee_Id==obj.EmployeeId);
              if(index<0)
              {
                await this.alertRecipientRepository.update({RecipientId:obj.RecipientId},{IsActive:0});

              let hist = new BRI_EmailAlertRecipientHistory();
              hist.RecipientId = obj.RecipientId;
              hist.AlertId = obj.AlertId;
              hist.EmployeeId = obj.EmployeeId;
              hist.IsLastRecord = 1;
              hist.IsActive=0;
              hist.created_by = dto.userId;
              hist.created_on = new Date();
              await this.alertRecipientHistoryRepository.save(hist);
              }

              
            }
          }
        }

        return 'Update successfully.';
      }
    } catch (e) {
      console.log(e, ' error');
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  async email_alert_list_table(dto: emailAlertTableDto): Promise<any> {
    try {
      let param = 'exec BRI_USP_EmailAlertTable 0';

      let data = this.employeeRepository.query(param);

      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async email_alert_receipient_list(alert_id: number): Promise<any> {
    try {
      let param = 'exec BRI_USP_EmailAlertRecipientList '+alert_id;

      let data = this.employeeRepository.query(param);

      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async employee_email_list(subsidiary_id): Promise<any> {
    try {
      return await this.employeeRepository.find({
        select: { EmployeeId: true, EmailId: true },
        where: { IsActive: 1 },
      });
    } catch (e) {
      console.log(e, ' error');
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
