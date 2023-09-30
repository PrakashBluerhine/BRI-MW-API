/* eslint-disable @typescript-eslint/no-unused-vars */
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
  BRI_OperationTaxnomy,
  BRI_MasterMenu,
  BRI_MasterMenuHistory,
  BRI_MasterGroupMenu,
  BRI_MasterGroupMenuHistory,
  BRI_AuthRolePermission,
  BRI_AuthRolePermissionHistory
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
  newMenuDto,
  newRolePermissionDto,
} from './dto/master.dto';

import { MailerService } from '@nestjs-modules/mailer';
import { from, zip } from 'rxjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path, { join } from 'path';
import fs, { readFileSync } from 'fs';
import { ApiGatewayTimeoutResponse } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
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
    @InjectRepository(BRI_OperationTaxnomy)
    private readonly drpTaxnomyRepository: Repository<BRI_OperationTaxnomy>,
    @InjectRepository(BRI_MasterMenu)
    private readonly menuMasterRepository: Repository<BRI_MasterMenu>,
    @InjectRepository(BRI_MasterMenuHistory)
    private readonly menuMasterHistoryRepository: Repository<BRI_MasterMenuHistory>,
    @InjectRepository(BRI_MasterGroupMenu)
    private readonly menuGroupRepository: Repository<BRI_MasterGroupMenu>,
    @InjectRepository(BRI_MasterGroupMenuHistory)
    private readonly menuGroupHistoryRepository: Repository<BRI_MasterGroupMenuHistory>,
    @InjectRepository(BRI_AuthRolePermission)
    private readonly authRoleRepository: Repository<BRI_AuthRolePermission>,
    @InjectRepository(BRI_AuthRolePermissionHistory)
    private readonly authRoleHistoryRepository: Repository<BRI_AuthRolePermissionHistory>,
    private readonly mailerService: MailerService,
  ) {
    this.secret = 'JWT_SECRET';
    this.expiresIn = '30m';
  }
  async create_role(roleCreationDto: RoleCreationDto): Promise<any> {
    try {
      const count = await this.roleRepository.findAndCount({
        where: { RoleName: roleCreationDto.roleName },
      });
      if (count[1] == 0 && roleCreationDto.roleId == 0) {
        const dt = new Date();
        const roleTbl = new BRI_MasterRole();
        roleTbl.RoleCode = roleCreationDto.roleCode;
        roleTbl.RoleName = roleCreationDto.roleName;
        roleTbl.IsActive = roleCreationDto.isActive == 0 ? false : true;
        roleTbl.created_by = roleCreationDto.userId;
        roleTbl.created_on = dt; // new Date();
        const storedTbl = await this.roleRepository.save(roleTbl);
        //  console.log(storedTbl,'stored table');
        const roleHistory = new BRI_MasterRoleHistory();
        roleHistory.RoleId = storedTbl.RoleId;
        roleHistory.RoleCode = storedTbl.RoleCode;
        roleHistory.RoleName = storedTbl.RoleName;
        roleHistory.IsActive = roleCreationDto.isActive == 0 ? false : true;
        roleHistory.IsLastRecord = 1;
        roleHistory.created_on = dt; //new Date(); //storedTbl.created_on;
        roleHistory.created_by = storedTbl.created_by;
        const savedHistoryTbl =
          await this.roleHistoryRepository.save(roleHistory);
        return 'Saved successfully.';
      } else if (roleCreationDto.roleId > 0) {
        const dt = new Date();
        await this.roleHistoryRepository.update(roleCreationDto.roleId, {
          IsLastRecord: 0,
        });
        const storedTbl = await this.roleRepository.update(
          roleCreationDto.roleId,
          {
            RoleCode: roleCreationDto.roleCode,
            RoleName: roleCreationDto.roleName,
            IsActive: roleCreationDto.isActive == 0 ? false : true,
            modified_by: roleCreationDto.userId,
            modified_on: dt, //new Date(),
          },
        );

        const roleHistory = new BRI_MasterRoleHistory();
        roleHistory.RoleId = roleCreationDto.roleId;
        roleHistory.RoleCode = roleCreationDto.roleCode;
        roleHistory.RoleName = roleCreationDto.roleName;
        roleHistory.IsActive = roleCreationDto.isActive == 0 ? false : true;
        (roleHistory.created_on = dt), //new Date();
          (roleHistory.created_by = roleCreationDto.userId);
        roleHistory.IsLastRecord = 1;
        const savedHistoryTbl =
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
      const order_by = {
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
        empTbl.EmailId = dto.email_id;
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
          empTbl.EmailId = dto.email_id;
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
            EmailId: dto.email_id,
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
        empHistTbl.EmailId = dto.email_id;
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
      const param = 'exec BRI_USP_EmplyeeTable 0,0';

      const data = this.employeeRepository.query(param);

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

        await this.machineRepository.update(dto.machine_id, {
          MachineCode: dto.machine_code,
          MachineName: dto.machine_name,
          DepartmentId: dto.department_id,
          NsMachineId: dto.nsmachine_id,
          IsActive: dto.isActive,
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
      const param = 'exec BRI_USP_MachineryTable 0,0';

      const data = this.machineRepository.query(param);

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
              const recipient = new BRI_EmailAlertRecipient();
              recipient.AlertId = alertDb.AlertId;
              recipient.EmployeeId = re.employee_Id;
              recipient.IsActive = 1;
              recipient.created_by = dto.userId;
              recipient.created_on = new Date();
              const db = await this.alertRecipientRepository.save(recipient);
              if (db) {
                const hist = new BRI_EmailAlertRecipientHistory();
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
            const [items, totalCount] =
              await this.alertRecipientRepository.findAndCount({
                where: { AlertId: dto.alert_id, EmployeeId: re.employee_Id },
              });
            if (totalCount == 0) {
              const recipient = new BRI_EmailAlertRecipient();
              recipient.AlertId = dto.alert_id;
              recipient.EmployeeId = re.employee_Id;
              recipient.IsActive = 1;
              recipient.created_by = dto.userId;
              recipient.created_on = new Date();
              const db = await this.alertRecipientRepository.save(recipient);
              if (db) {
                const hist = new BRI_EmailAlertRecipientHistory();
                hist.RecipientId = db.RecipientId;
                hist.AlertId = dto.alert_id;
                hist.EmployeeId = re.employee_Id;
                hist.IsLastRecord = 1;
                hist.IsActive = 1;
                hist.created_by = dto.userId;
                hist.created_on = new Date();
                await this.alertRecipientHistoryRepository.save(hist);
              }
            } else if (totalCount > 0 && items[0].IsActive == 0) {
              await this.alertRecipientRepository.update(
                { RecipientId: items[0].RecipientId },
                { IsActive: 1 },
              );

              const hist = new BRI_EmailAlertRecipientHistory();
              hist.RecipientId = items[0].RecipientId;
              hist.AlertId = items[0].AlertId;
              hist.EmployeeId = items[0].EmployeeId;
              hist.IsLastRecord = 1;
              hist.IsActive = 1;
              hist.created_by = dto.userId;
              hist.created_on = new Date();
              await this.alertRecipientHistoryRepository.save(hist);
            }
          }

          const [items, totalCount] =
            await this.alertRecipientRepository.findAndCount({
              where: { AlertId: dto.alert_id, IsActive: 1 },
            });
          if (totalCount > 0) {
            for await (const obj of items) {
              const index = dto.recipient.findIndex(
                (x: { employee_Id: number }) => x.employee_Id == obj.EmployeeId,
              );
              if (index < 0) {
                await this.alertRecipientRepository.update(
                  { RecipientId: obj.RecipientId },
                  { IsActive: 0 },
                );

                const hist = new BRI_EmailAlertRecipientHistory();
                hist.RecipientId = obj.RecipientId;
                hist.AlertId = obj.AlertId;
                hist.EmployeeId = obj.EmployeeId;
                hist.IsLastRecord = 1;
                hist.IsActive = 0;
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
      const param = 'exec BRI_USP_EmailAlertTable 0';

      const data = this.employeeRepository.query(param);

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
      const param = 'exec BRI_USP_EmailAlertRecipientList ' + alert_id;

      const data = this.employeeRepository.query(param);

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

  async drp_taxnomy_list(subsidiary_id: any, type: any): Promise<any> {
    try {
      return await this.drpTaxnomyRepository.find({
        select: { TaxnomyId: true, TaxnomyName: true, TaxnomyCode: true },
        where: { IsActive: 1, TaxnomyType: type },
      });
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async menu_add_update(dto: newMenuDto): Promise<any> {
    try {
      if (dto.menu_id == 0) {
        const menuTbl = new BRI_MasterMenu();
        menuTbl.Icon = dto.icon;
        menuTbl.MenuName = dto.menu_name;
        menuTbl.Url = dto.url;
        menuTbl.SubsidiaryId = dto.subsidiary_id;
        menuTbl.created_by = dto.userId;
        menuTbl.created_on = new Date();
        menuTbl.IsMainMenu = dto.isMain_menu == 0 ? false : true;
        menuTbl.IsActive = dto.isActive == 0 ? false : true;
        menuTbl.ActiveRecord = dto.active_record == 0 ? false : true;
        menuTbl.EditRecord = dto.edit_record == 0 ? false : true;
        menuTbl.ViewRecord = dto.view_record == 0 ? false : true;
        menuTbl.NewRecord = dto.new_record == 0 ? false : true;
        const menDb = await this.menuMasterRepository.save(menuTbl);
        if (menDb) {
          const menuGrpTbl = new BRI_MasterGroupMenu();
          for await (const gr of dto.menu_group) {
            menuGrpTbl.GroupId = gr;
            menuGrpTbl.MenuId = menDb.MenuId;
            menuGrpTbl.IsActive = true;
            menuGrpTbl.created_by = dto.userId;
            menuGrpTbl.created_on = new Date();
            const menuGrpDb = await this.menuGroupRepository.save(menuGrpTbl);
            if (menuGrpDb) {
              const menuGrpTblHist = new BRI_MasterGroupMenuHistory();
              menuGrpTblHist.GroupId = gr;
              menuGrpTblHist.MenuId = menDb.MenuId;
              menuGrpTblHist.GroupMenuId = menuGrpDb.GroupMenuId;
              menuGrpTblHist.IsActive = true;
              menuGrpTblHist.IsLastRecord = true;
              menuGrpTblHist.created_by = dto.userId;
              menuGrpTblHist.created_on = new Date();
              await this.menuGroupHistoryRepository.save(menuGrpTblHist);
            }
          }

          const menuHistTbl = new BRI_MasterMenuHistory();
          menuHistTbl.Icon = dto.icon;
          menuHistTbl.MenuId = menDb.MenuId;
          menuHistTbl.MenuName = dto.menu_name;
          menuHistTbl.Url = dto.url;
          menuHistTbl.SubsidiaryId = dto.subsidiary_id;
          menuHistTbl.created_by = dto.userId;
          menuHistTbl.created_on = new Date();
          menuHistTbl.IsMainMenu = dto.isMain_menu == 0 ? false : true;
          menuHistTbl.IsActive = dto.isActive == 0 ? false : true;
          menuHistTbl.ActiveRecord = dto.active_record == 0 ? false : true;
          menuHistTbl.EditRecord = dto.edit_record == 0 ? false : true;
          menuHistTbl.ViewRecord = dto.view_record == 0 ? false : true;
          menuHistTbl.NewRecord = dto.new_record == 0 ? false : true;
          await this.menuMasterHistoryRepository.save(menuHistTbl);
        }
        return 'Saved successfully.';
      } else if (dto.menu_id > 0) {
        await this.menuMasterHistoryRepository.update(
          { MenuId: dto.menu_id, IsLastRecord: true },
          { IsLastRecord: false },
        );

        await this.menuMasterRepository.update({MenuId:dto.menu_id}, {
          MenuName: dto.menu_name,
          Url: dto.url,
          Icon: dto.icon,
          IsActive: dto.isActive == 0 ? false : true,
          ActiveRecord: dto.active_record == 0 ? false : true,
          NewRecord: dto.new_record == 0 ? false : true,
          EditRecord: dto.edit_record == 0 ? false : true,
          ViewRecord: dto.view_record == 0 ? false : true,
          modified_by: dto.userId,
          modified_on: new Date(),
        });

        const menuHistTbl = new BRI_MasterMenuHistory();
        menuHistTbl.Icon = dto.icon;
        menuHistTbl.MenuId = dto.menu_id;
        menuHistTbl.MenuName = dto.menu_name;
        menuHistTbl.Url = dto.url;
        if (dto.subsidiary_id > 0) menuHistTbl.SubsidiaryId = dto.subsidiary_id;
        menuHistTbl.created_by = dto.userId;
        menuHistTbl.created_on = new Date();
        menuHistTbl.IsMainMenu = dto.isMain_menu == 0 ? false : true;
        menuHistTbl.IsActive = dto.isActive == 0 ? false : true;
        menuHistTbl.ActiveRecord = dto.active_record == 0 ? false : true;
        menuHistTbl.EditRecord = dto.edit_record == 0 ? false : true;
        menuHistTbl.ViewRecord = dto.view_record == 0 ? false : true;
        menuHistTbl.NewRecord = dto.new_record == 0 ? false : true;
        await this.menuMasterHistoryRepository.save(menuHistTbl);
        const menuGroupList = await this.menuGroupRepository.find({
          where: { MenuId: dto.menu_id },
        });
        for await (const gr of dto.menu_group) {
          const obj = menuGroupList.find(
            (x) => x.GroupId == gr && x.MenuId == dto.menu_id,
          );
          if (obj != null && obj.IsActive == false) {
            await this.menuGroupRepository.update(
              { GroupMenuId: obj.GroupMenuId,MenuId:obj.MenuId },
              { IsActive: true },
            );

            await this.menuGroupHistoryRepository.update(
              { GroupMenuId: obj.GroupMenuId, IsLastRecord: true },
              { IsLastRecord: false },
            );

            const menuGrpTblHist = new BRI_MasterGroupMenuHistory();
            menuGrpTblHist.GroupId = gr;
            menuGrpTblHist.MenuId = obj.MenuId;
            menuGrpTblHist.GroupMenuId = obj.GroupMenuId;
            menuGrpTblHist.IsActive = true;
            menuGrpTblHist.IsLastRecord = true;
            menuGrpTblHist.created_by = dto.userId;
            menuGrpTblHist.created_on = new Date();
            await this.menuGroupHistoryRepository.save(menuGrpTblHist);
          }
        }
        for await (const mg of menuGroupList) {
          const index = dto.menu_group.findIndex((x) => x == mg.GroupId);
          if (index < 0) {
            await this.menuGroupRepository.update(
              { GroupMenuId: mg.GroupMenuId },
              { IsActive: true },
            );
            await this.menuGroupHistoryRepository.update(
              { GroupMenuId: mg.GroupMenuId, IsLastRecord: true },
              { IsLastRecord: false },
            );
            const menuGrpTblHist = new BRI_MasterGroupMenuHistory();
            menuGrpTblHist.GroupId = mg.GroupId;
            menuGrpTblHist.MenuId = mg.MenuId;
            menuGrpTblHist.GroupMenuId = mg.GroupMenuId;
            menuGrpTblHist.IsActive = false;
            menuGrpTblHist.IsLastRecord = true;
            menuGrpTblHist.created_by = dto.userId;
            menuGrpTblHist.created_on = new Date();
            await this.menuGroupHistoryRepository.save(menuGrpTblHist);
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

  async menu_table(tblDto: TableDto): Promise<any> {
    try {
      const take = tblDto.page_size || 10;
      const skip = tblDto.start || 0;
      const field = tblDto.order_by || 'MenuName';
      const sort = tblDto.sort || 'ASC';
      const order_by = {
        [field]: sort,
      };
      const [result, total] = await this.menuMasterRepository.findAndCount({
        where: {
          MenuName: ILike(`%${tblDto.search}%`),
          Url: ILike(`%${tblDto.search}%`),
        },
        order: order_by,
        take: take,
        skip: skip,
      });
      console.log(result, ' result');
      return { result, total };
    } catch (e) {
      console.log(e, 'error');
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async menu_mapped_group_list(menu_id): Promise<any> {
    try {
      const qb = this.menuGroupRepository.createQueryBuilder('mg');
      qb.innerJoin(
        BRI_OperationTaxnomy,
        'g',
        'g.TaxnomyId=mg.GroupId and g.IsActive=1',
      );
      qb.select('g.TaxnomyID', 'GroupId');
      qb.addSelect('g.TaxnomyCode', 'GroupCode');
      qb.addSelect('g.TaxnomyName', 'GroupName');

      qb.where('mg.IsActive = 1 AND g.TaxnomyType = :type AND mg.MenuId=:menu_id', {
        type: 'MenuGroup',
        menu_id:menu_id
      });
      const dropdown = await qb.getRawMany();
      return dropdown;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async role_menu_permission(dtos: newRolePermissionDto): Promise<any> {

    try{
      console.log(dtos,' permission dto');
      for await(const dto of dtos.permission)
      {
      if(dto.rolePermissionId==0)
      {
        const perTbl=new BRI_AuthRolePermission();
        perTbl.MenuId=dto.menuId;
        perTbl.GroupMenuId=dto.groupMenuId;
        perTbl.RoleId=dtos.RoleId;
        if(dtos.subsidiary_id>0)
        perTbl.SubsidiaryId=dtos.subsidiary_id;
        perTbl.IsActive=dto.isActive==1?true:false;
        perTbl.IsAllowEditRecord=dto.edit_record==1?true:false;
        perTbl.IsAllowNewRecord=dto.new_record==1?true:false;
        perTbl.IsAllowViewRecord=dto.view_record==1?true:false;
        perTbl.created_by=dtos.userId;
        perTbl.created_on=new Date();
        const db = await this.authRoleRepository.save(perTbl);
        if(db)
        {
          const perHisTbl=new BRI_AuthRolePermissionHistory();
          perHisTbl.MenuId=dto.MenuId;
          perTbl.GroupMenuId=dto.groupMenuId;
          perHisTbl.RoleId=dtos.RoleId;
          if(dtos.subsidiary_id>0)
          perHisTbl.SubsidiaryId=dtos.subsidiary_id;
          perHisTbl.IsActive=dto.isActive==1?true:false;
          perHisTbl.IsAllowEditRecord=dto.edit_record==1?true:false;
          perHisTbl.IsAllowNewRecord=dto.new_record==1?true:false;
          perHisTbl.IsAllowViewRecord=dto.view_record==1?true:false;
          perHisTbl.RolePermissionId=db.RolePermissionId;
          perHisTbl.created_by=dtos.userId;
          perHisTbl.created_on=new Date();
          perHisTbl.IsLastRecord=true;
          const dbHist=await this.authRoleHistoryRepository.insert(perHisTbl);
        }
      }else if(dto.rolePermissionId>0){
        await this.authRoleHistoryRepository.update({RolePermissionId:dto.rolePermissionId,IsLastRecord:true},{
          IsLastRecord:false});

          await this.authRoleRepository.update({RolePermissionId:dto.rolePermissionId},{
          IsActive:dto.isActive==1?true:false,
          IsAllowEditRecord:dto.edit_record==1?true:false,
          IsAllowNewRecord:dto.new_record==1?true:false,
          IsAllowViewRecord:dto.view_record==1?true:false,
          });

          const perHisTbl=new BRI_AuthRolePermissionHistory();
          perHisTbl.MenuId=dto.MenuId;
          perHisTbl.GroupMenuId=dto.groupMenuId;
          perHisTbl.RoleId=dtos.RoleId;
          if(dtos.subsidiary_id>0)
          perHisTbl.SubsidiaryId=dtos.subsidiary_id;
          perHisTbl.IsActive=dto.isActive==1?true:false;
          perHisTbl.IsAllowEditRecord=dto.edit_record==1?true:false;
          perHisTbl.IsAllowNewRecord=dto.new_record==1?true:false;
          perHisTbl.IsAllowViewRecord=dto.view_record==1?true:false;
          perHisTbl.RolePermissionId=dto.rolePermissionId;
          perHisTbl.created_by=dtos.userId;
          perHisTbl.created_on=new Date();
          perHisTbl.IsLastRecord=true;
          const dbHist=await this.authRoleHistoryRepository.insert(perHisTbl);
      }
      }
      return "Permission saved successfully";
      
    }catch(e)
    {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async menu_role_permission(dto):Promise<any>{
    try{
      const param = 'exec BRI_USP_RoleMenuPermission_Table ' + dto.role_id+','+dto.group_id+','+dto.subsidiary_id;
      const data = this.employeeRepository.query(param);
      return data;
    }catch(e)
    {
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
