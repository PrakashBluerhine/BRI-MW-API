/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { isHexColor, validate } from 'class-validator';
import { Any, QueryRunner, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { ITraansactionService } from '../transaction/interface/transaction.interface';
import { CommonService } from '../shared/services/common.service';
import { ResponseDto } from '../shared/dto/response.dto';
import { JwtCustomService } from '../shared/services/jwt-custom.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';
import path, { join } from 'path';
import fs, { readFileSync } from 'fs';
import {
  BRI_MasterDepartment,
  BRI_MasterEmployee,
  BRI_MasterMachine,
  BRI_MasterEmailAlert,
  BRI_EmailAlertRecipient,
  BRI_OperationTaxnomy,
  BRI_WorkOrderMaster,
  BRI_WorkOrderMasterHistory,
  BRI_WorkOrderSteps,
  BRI_WorkOrderStepsHistory,
  BRI_WorkOrderItems,
  BRI_ItemRequissition,
  BRI_ItemRequissitionHistory,
  BRI_ItemRequisitionDetails,
  BRI_ItemRequisitionDetailsHistory,
  BRI_TimeSheet,
  BRI_LabourTimeSheet,
  BRI_TimesheetIntravelTracking,
  BRI_ItemTimeSheet,
  BRI_MasterIntraval,
  BRI_MasterItem,
  BRI_ScrapItemTimesheet,
  BRI_MachineTimesheet,
  BRI_LabourMultiTaskTsDetails,
  BRI_TimesheetItemMaser,
  BRI_ChangeRequestFlow,
  BRI_MachineTimesheetChangeRequest,
  BRI_ScrapTSChangeRequest,
  BRI_LabourTimeSheetChangeRequest,
} from './entities/transaction.entity';
import { ILike } from 'typeorm';
import {
  TableDto,
  allWorkorderTableDto,
  departmentOperationTableDto,
  workorderPlanDto,
  workOrderHoldCance,
  meterialRequistion,
  woOperationStart,
  woOperationHoldAndCompleteDto,
  mrTableDto,
  tsTableDto,
  tsChangeRequest,
} from './dto/transaction.dto';

import { MailerService } from '@nestjs-modules/mailer';
import { from, identity, Subject, throwIfEmpty } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `./environment/.env.${process.env.NODE_ENV}`,
});
@Injectable()
export class TransactionService implements ITraansactionService {
  secret = 'JWT_SECRET';
  expiresIn = '30m';
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly commonService: CommonService,
    private readonly jwtCustomService: JwtCustomService,
    @InjectRepository(BRI_MasterDepartment)
    private readonly departmentRepository: Repository<BRI_MasterDepartment>,
    @InjectRepository(BRI_MasterEmployee)
    private readonly employeeRepository: Repository<BRI_MasterEmployee>,
    @InjectRepository(BRI_MasterMachine)
    private readonly machineRepository: Repository<BRI_MasterMachine>,
    @InjectRepository(BRI_MasterEmailAlert)
    private readonly alertMasterRepository: Repository<BRI_MasterEmailAlert>,
    @InjectRepository(BRI_EmailAlertRecipient)
    private readonly alertRecipientRepository: Repository<BRI_EmailAlertRecipient>,
    @InjectRepository(BRI_OperationTaxnomy)
    private readonly drpTaxnomyRepository: Repository<BRI_OperationTaxnomy>,

    @InjectRepository(BRI_WorkOrderMaster)
    private readonly workorderMasterRepository: Repository<BRI_WorkOrderMaster>,
    @InjectRepository(BRI_WorkOrderMasterHistory)
    private readonly workorderMasterHistoryRepository: Repository<BRI_WorkOrderMasterHistory>,
    @InjectRepository(BRI_WorkOrderSteps)
    private readonly workorderStepsRepository: Repository<BRI_WorkOrderSteps>,
    @InjectRepository(BRI_WorkOrderStepsHistory)
    private readonly workorderStepsHistoryRepository: Repository<BRI_WorkOrderStepsHistory>,
    @InjectRepository(BRI_WorkOrderItems)
    private readonly workorderItemsRepository: Repository<BRI_WorkOrderItems>,
    @InjectRepository(BRI_ItemRequissition)
    private readonly itemRequissitionRepository: Repository<BRI_ItemRequissition>,
    @InjectRepository(BRI_ItemRequissitionHistory)
    private readonly itemRequissitionHistoryRepository: Repository<BRI_ItemRequissitionHistory>,
    @InjectRepository(BRI_ItemRequisitionDetails)
    private readonly itemRequissitionDetailsRepository: Repository<BRI_ItemRequisitionDetails>,
    @InjectRepository(BRI_ItemRequisitionDetailsHistory)
    private readonly itemRequissitionDetailsRepositoryHistory: Repository<BRI_ItemRequisitionDetailsHistory>,
    @InjectRepository(BRI_TimeSheet)
    private readonly timeSheetRepository: Repository<BRI_TimeSheet>,
    @InjectRepository(BRI_LabourTimeSheet)
    private readonly labourTsRepository: Repository<BRI_LabourTimeSheet>,
    @InjectRepository(BRI_TimesheetIntravelTracking)
    private readonly tsIntravelRepository: Repository<BRI_TimesheetIntravelTracking>,
    @InjectRepository(BRI_ItemTimeSheet)
    private readonly tsItemRepository: Repository<BRI_ItemTimeSheet>,
    @InjectRepository(BRI_MasterIntraval)
    private readonly intravelRepository: Repository<BRI_MasterIntraval>,
    @InjectRepository(BRI_MasterItem)
    private readonly masterItemRepository: Repository<BRI_MasterItem>,
    @InjectRepository(BRI_ScrapItemTimesheet)
    private readonly scrapItemTimesheetRepository: Repository<BRI_ScrapItemTimesheet>,
    @InjectRepository(BRI_MachineTimesheet)
    private readonly machineTimesheetRepository: Repository<BRI_MachineTimesheet>,
    @InjectRepository(BRI_LabourMultiTaskTsDetails)
    private readonly labourmMultiTaskTsRepository: Repository<BRI_LabourMultiTaskTsDetails>,
    @InjectRepository(BRI_TimesheetItemMaser)
    private readonly timesheetItemMasterRepository: Repository<BRI_TimesheetItemMaser>,
    @InjectRepository(BRI_ChangeRequestFlow)
    private readonly timsheetChangeRequestRepository: Repository<BRI_ChangeRequestFlow>,
    @InjectRepository(BRI_MachineTimesheetChangeRequest)
    private readonly machineTsChangeRequestRepository: Repository<BRI_MachineTimesheetChangeRequest>,
    @InjectRepository(BRI_ScrapTSChangeRequest)
    private readonly scrapTsChangeRequestRepository: Repository<BRI_ScrapTSChangeRequest>,
    @InjectRepository(BRI_LabourTimeSheetChangeRequest)
    private readonly labourTsChangeRequestRepository: Repository<BRI_LabourTimeSheetChangeRequest>,

    private readonly mailerService: MailerService,
  ) {
    this.secret = 'JWT_SECRET';
    this.expiresIn = '30m';
  }
  private readonly logger = new Logger(TransactionService.name);

  async drp_taxnomy_list(subsidiary_id: any, type: any): Promise<any> {
    try {
      if (subsidiary_id < 0) {
        return await this.drpTaxnomyRepository.find({
          select: { TaxnomyId: true, TaxnomyName: true, TaxnomyCode: true },
          where: { IsActive: true, TaxnomyType: type },
        });
      } else if (subsidiary_id > 0) {
        return await this.drpTaxnomyRepository.find({
          select: { TaxnomyId: true, TaxnomyName: true, TaxnomyCode: true },
          where: {
            IsActive: true,
            TaxnomyType: type,
            SubsidiaryId: subsidiary_id,
          },
        });
      }
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async new_work_order_list(dto: allWorkorderTableDto): Promise<any> {
    try {
      const location = dto.location == null ? null : '"' + dto.location + '"';
      const ReleaseDate =
        dto.ReleaseDate == null ? null : '"' + dto.ReleaseDate + '"';
      const order_by = dto.order_by == null ? null : '"' + dto.order_by + '"';
      const sort = dto.sort == null ? null : '"' + dto.sort + '"';
      const search = dto.search == null ? null : '"' + dto.search + '"';
      const param =
        'exec BRI_USP_AllWorkOrder ' +
        location +
        ',' +
        ReleaseDate +
        ',' +
        dto.start +
        ',' +
        dto.page_size +
        ',' +
        order_by +
        ',' +
        sort +
        ',' +
        search +
        ',' +
        dto.filter;
      console.log(param, 'sp params');
      const data = this.workorderMasterRepository.query(param);
      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async project_list(subsidiary_id: any): Promise<any> {
    try {
      const qb = await this.workorderMasterRepository.createQueryBuilder('wh');
      qb.select('wh.ProjectID', 'project_id');
      qb.addSelect('wh.ProjectName', 'project_name');
      qb.where('wh.IsActive = 1 AND wh.Location = :subsidiary_id ', {
        subsidiary_id: subsidiary_id,
      });
      qb.groupBy('wh.ProjectID,wh.ProjectName');
      return await qb.getRawMany();
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async project_workOrder_list(obj): Promise<any> {
    try {
      // console.log(obj);
      const qb = await this.workorderMasterRepository.createQueryBuilder('wh');
      qb.select('wh.WorkOrderID', 'workorder_id');
      qb.addSelect('wh.WorkOrderNo', 'workorder_no');
      qb.where('wh.IsActive = 1 AND wh.ProjectID = :project_id ', {
        project_id: obj.project_id,
      });
      if (obj.subsidiary_id > 0) {
        qb.andWhere('wh.Location = :location_id', {
          location_id: obj.subsidiary_id,
        });
      }

      qb.groupBy('wh.WorkOrderID,wh.WorkOrderNo');
      console.log(qb.getQuery());
      return await qb.getRawMany();
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async plan_workOrder_details(obj): Promise<any> {
    try {
      const plan = 'exec BRI_USP_WorOrder_Planning_details ' + obj.workorder_id;
      const plan_details = await this.workorderMasterRepository.query(plan);

      const wo = 'exec BRI_USP_WorOrder_details ' + obj.workorder_id;
      const wo_details = await this.workorderMasterRepository.query(wo);
      const woDetails = wo_details.length > 0 ? wo_details[0] : {};
      //  await this.workorderCompletionMailTrigger(obj.workorder_id);
      return { woDetails, plan_details };
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async department_operation_list(
    dto: departmentOperationTableDto,
  ): Promise<any> {
    try {
      const department_id = dto.department_id;
      const location = dto.location == null ? null : '"' + dto.location + '"';
      const ReleaseDate =
        dto.ReleaseDate == null ? null : '"' + dto.ReleaseDate + '"';
      const order_by = dto.order_by == null ? null : '"' + dto.order_by + '"';
      const sort = dto.sort == null ? null : '"' + dto.sort + '"';
      const search = dto.search == null ? null : '"' + dto.search + '"';
      const param =
        'exec BRI_USP_Department_Operation_list ' +
        location +
        ',' +
        ReleaseDate +
        ',' +
        department_id +
        ',' +
        dto.start +
        ',' +
        dto.page_size +
        ',' +
        order_by +
        ',' +
        sort +
        ',' +
        search;
      console.log(param, 'sp params');
      const data = this.workorderMasterRepository.query(param);
      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async department_emp_list(
    subsidiary_id: any,
    department_id: any,
  ): Promise<any> {
    try {
      // only use for timesheet api
      if (department_id > 0) {
        const dep = await this.departmentRepository.findOne({
          where: { DepartmentId: department_id },
        });
        if (dep.DepartmentCode != 'CNC' && dep.DepartmentCode != 'Painting') {
          return await this.departmentRepository.query(
            'select EmployeeId,EmployeeName,EmployeeCode from BRI_View_Non_assigned_employeeForTs where DepartmentId=' +
              department_id,
          );
        } else if (
          dep.DepartmentCode == 'CNC' ||
          dep.DepartmentCode == 'Painting'
        ) {
          const sql = this.employeeRepository.createQueryBuilder('me');
          sql.innerJoin(
            'BRI_EmployeeDepartmentMap',
            'ed',
            'ed.EmployeeId=me.EmployeeId AND ed.IsActive=1',
          );

          sql.select('me.EmployeeId', 'EmployeeId');
          sql.addSelect('me.EmployeeName', 'EmployeeName');
          sql.addSelect('me.EmployeeCode', 'EmployeeCode');
          sql.where('ed.DepartmentId=:department_id', {
            department_id: department_id,
          });
          // sql.where('ed.DepartmentId IN (:...department_id)', {
          //   department_id
          // });
          const data = await sql.getRawMany();
          return data;
          // return await this.employeeRepository.find({
          //   select: {
          //     EmployeeId: true,
          //     EmployeeName: true,
          //     EmployeeCode: true,
          //   },
          //   where: { IsActive: true, DepartmentId: department_id },
          // });
        }
      } else {
        return await this.employeeRepository.find({
          select: { EmployeeId: true, EmployeeName: true, EmployeeCode: true },
          where: { IsActive: true },
        });
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async workorder_planing(dto: workorderPlanDto): Promise<any> {
    try {
      const statusDat = await this.drpTaxnomyRepository.find({
        where: {
          TaxnomyType: 'DepartmentStatus',
          IsActive: true,
        },
      });
      const woStatusDat = await this.drpTaxnomyRepository.find({
        where: { TaxnomyType: 'WorkOrderStatus', IsActive: true },
      });
      const woYetToStart = woStatusDat.find(
        (x) => x.TaxnomyCode == 'YetToStart',
      );
      const woIntiate = woStatusDat.find((x) => x.TaxnomyCode == 'Initiated');
      let wo = await this.workorderMasterRepository.find({
        where: {
          WorkOrderID: dto.workOrderId,
          StatusID: woYetToStart.TaxnomyId,
        },
      });
      if (statusDat.length > 0) {
        for await (const obj of dto.planDetails) {
          const yetToStart = statusDat.find(
            (x) => x.TaxnomyCode == 'YetToStart',
          );
          const intiated = statusDat.find((x) => x.TaxnomyCode == 'Initiated');
          const completed = statusDat.find((x) => x.TaxnomyCode == 'Completed');
          const inprogress = statusDat.find(
            (x) => x.TaxnomyCode == 'InProgress',
          );

          const dbCheck = await this.workorderStepsRepository.find({
            where: { WorkOrderStepID: obj.workOrderStepID },
          });
          const isAvail = dbCheck.find(
            (x) =>
              x.StatusId === yetToStart.TaxnomyId ||
              x.StatusId === intiated.TaxnomyId,
          );

          const isInprogress = dbCheck.find(
            (x) => x.StatusId === inprogress.TaxnomyId,
          );

          console.log(isInprogress, 'isInprogress');
          if (isAvail != null) {
            // IF is active false the status should be completed
            const up = await this.workorderStepsRepository.update(
              {
                WorkOrderStepID: obj.workOrderStepID,
                WorkOrderID: dto.workOrderId,
              },
              {
                PlanedStartDate: obj.isActive ? obj.estimatedStart : null,
                PlanedEndDate: obj.isActive ? obj.estimatedEnd : null,
                EstimatedLabourHr: obj.isActive ? obj.estimatedLabourHr : null,
                IsActive: obj.isActive,
                StatusId: obj.isActive
                  ? intiated.TaxnomyId
                  : completed.TaxnomyId,
                ModifiedOn: new Date(),
                ModifiedBy: dto.UserId,
              },
            );

            if (up.affected > 0) {
              if (wo.length > 0) {
                await this.workorderMasterRepository.update(
                  { WorkOrderID: dto.workOrderId },
                  {
                    StatusID: woIntiate.TaxnomyId,
                    ModifiedBy: dto.UserId,
                    ModifiedOn: new Date(),
                  },
                );

                const mailRecipient = await this.alertMasterRepository.findOne({
                  where: { AlertName: 'IntiatedEmailAlert', IsActive: 1 },
                });
                let toMail='prakash@brisigns.com';
                if(mailRecipient!=null)
                {
                  toMail= mailRecipient.toEmail
                }
                this.sendEmail(
                  toMail,
                  '',
                  wo[0].WorkOrderNo + ' is Intiated',
                  '<h1>' + wo[0].WorkOrderNo + 'is Intiated </h1>',
                  '',
                  '',
                );
                // wo[0].WorkOrderNo;

                wo = await this.workorderMasterRepository.find({
                  where: {
                    WorkOrderID: dto.workOrderId,
                    StatusID: woIntiate.TaxnomyId,
                  },
                });

                await this.workorderMasterHistoryRepository.update(
                  { WorkOrderID: dto.workOrderId, IsLastRecord: true },
                  { IsLastRecord: false },
                );
                console.log(wo, 'Workorder history');
                const woH = new BRI_WorkOrderMasterHistory();
                woH.IsActive = true;
                woH.IsLastRecord = true;
                woH.WorkOrderID = wo[0].WorkOrderID;
                woH.Location = wo[0].Location;
                woH.ManufacturingRouting = wo[0].ManufacturingRouting;
                woH.ProjectID = wo[0].ProjectID;
                woH.NetsuiteID = wo[0].NetsuiteID;
                woH.ProjectName = wo[0].ProjectName;
                woH.SubProjectID = wo[0].SubProjectID;
                woH.SubProjectInternalID = wo[0].SubProjectInternalID;
                woH.SubProjectName = wo[0].SubProjectName;
                woH.Subsidiary = wo[0].Subsidiary;
                woH.SubsidiaryID = wo[0].SubsidiaryID;
                woH.WorkOrderNo = wo[0].WorkOrderNo;
                woH.created_on = new Date();
                woH.created_by = dto.UserId;
                woH.StatusID = wo[0].StatusID;
                woH.BusinessUnit = wo[0].BusinessUnit;
                woH.BusinessUnitId = wo[0].BusinessUnitId;
                const wsH =
                  await this.workorderMasterHistoryRepository.save(woH);

                wo = await this.workorderMasterRepository.find({
                  where: {
                    WorkOrderID: dto.workOrderId,
                    StatusID: yetToStart.TaxnomyId,
                  },
                });
              }

              const hist = await this.workorderStepsHistoryRepository.findOne({
                where: {
                  WorkOrderStepID: obj.workOrderStepID,
                  IsLastRecord: true,
                },
              });
              await this.workorderStepsHistoryRepository.update(
                { WorkOrderStepID: obj.workOrderStepID, IsLastRecord: true },
                { IsLastRecord: false },
              );
              const wmsh = new BRI_WorkOrderStepsHistory();
              wmsh.WorkOrderStepID = obj.workOrderStepID;
              wmsh.WorkOrderID = dto.workOrderId;
              wmsh.IsActive = obj.isActive;
              wmsh.CreatedOn = new Date();
              wmsh.CreatedBy = dto.UserId;
              wmsh.DepartmentID = hist.DepartmentID;
              wmsh.DepartmentName = hist.DepartmentName;
              wmsh.ExecutionOrder = hist.ExecutionOrder;
              wmsh.PlanedStartDate = obj.isActive ? obj.estimatedStart : null;
              wmsh.PlanedEndDate = obj.isActive ? obj.estimatedStart : null;
              wmsh.EstimatedLabourHr = obj.isActive
                ? obj.estimatedLabourHr
                : null;
              wmsh.IsActive = obj.isActive;
              wmsh.StatusId = obj.isActive
                ? intiated.TaxnomyId
                : completed.TaxnomyId;
              wmsh.IsLastRecord = true;

              await this.workorderStepsHistoryRepository.save(wmsh);
            }
          } else if (isInprogress != null) {
            console.log(isInprogress, 'isInprogress inside loop');
            const up = await this.workorderStepsRepository.update(
              {
                WorkOrderStepID: obj.workOrderStepID,
                WorkOrderID: dto.workOrderId,
              },
              {
                PlanedEndDate: obj.estimatedEnd,
                EstimatedLabourHr: obj.estimatedLabourHr,
                IsActive: obj.isActive,
                ModifiedOn: new Date(),
                ModifiedBy: dto.UserId,
              },
            );
            if (up.affected > 0) {
              const hist = await this.workorderStepsHistoryRepository.findOne({
                where: {
                  WorkOrderStepID: obj.workOrderStepID,
                  IsLastRecord: true,
                },
              });
              await this.workorderStepsHistoryRepository.update(
                { WorkOrderStepID: obj.workOrderStepID, IsLastRecord: true },
                { IsLastRecord: false },
              );
              const wmsh = new BRI_WorkOrderStepsHistory();
              wmsh.WorkOrderStepID = obj.workOrderStepID;
              wmsh.WorkOrderID = dto.workOrderId;
              wmsh.IsActive = obj.isActive;
              wmsh.CreatedOn = new Date();
              wmsh.CreatedBy = dto.UserId;
              wmsh.DepartmentID = hist.DepartmentID;
              wmsh.DepartmentName = hist.DepartmentName;
              wmsh.ExecutionOrder = hist.ExecutionOrder;

              wmsh.PlanedEndDate = obj.isActive ? obj.estimatedStart : null;
              wmsh.EstimatedLabourHr = obj.isActive
                ? obj.estimatedLabourHr
                : null;
              wmsh.IsActive = obj.isActive;
              wmsh.StatusId = inprogress.TaxnomyId;
              wmsh.IsLastRecord = true;

              await this.workorderStepsHistoryRepository.save(wmsh);
            }
          } else if (obj.isActive === true) {
            // Already deactived now actived so completed status to yet to start status update

            const isCompleted = dbCheck.find(
              (x) => x.StatusId === completed.TaxnomyId && x.IsActive === false,
            );

            if (isCompleted !== null) {
              const up = await this.workorderStepsRepository.update(
                {
                  WorkOrderStepID: obj.workOrderStepID,
                  WorkOrderID: dto.workOrderId,
                },
                {
                  // PlanedStartDate: obj.estimatedStart,
                  // PlanedEndDate: obj.estimatedEnd,
                  // EstimatedLabourHr: obj.estimatedLabourHr,
                  IsActive: obj.isActive,
                  StatusId: yetToStart.TaxnomyId,
                  ModifiedOn: new Date(),
                  ModifiedBy: dto.UserId,
                },
              );
              if (up.affected > 0) {
                const hist = await this.workorderStepsHistoryRepository.findOne(
                  {
                    where: {
                      WorkOrderStepID: obj.workOrderStepID,
                      IsLastRecord: true,
                    },
                  },
                );
                await this.workorderStepsHistoryRepository.update(
                  { WorkOrderStepID: obj.workOrderStepID, IsLastRecord: true },
                  { IsLastRecord: false },
                );
                const wmsh = new BRI_WorkOrderStepsHistory();
                wmsh.WorkOrderStepID = obj.workOrderStepID;
                wmsh.WorkOrderID = dto.workOrderId;
                wmsh.IsActive = obj.isActive;
                wmsh.CreatedOn = new Date();
                wmsh.CreatedBy = dto.UserId;
                wmsh.DepartmentID = hist.DepartmentID;
                wmsh.DepartmentName = hist.DepartmentName;
                wmsh.ExecutionOrder = hist.ExecutionOrder;
                // wmsh.PlanedStartDate = obj.estimatedStart;
                // wmsh.PlanedEndDate = obj.estimatedEnd;
                // wmsh.EstimatedLabourHr = obj.estimatedLabourHr;
                wmsh.IsActive = obj.isActive;
                wmsh.StatusId = yetToStart.TaxnomyId;
                wmsh.IsLastRecord = true;

                await this.workorderStepsHistoryRepository.save(wmsh);
              }
            }
          }
        }

        const completed = statusDat.find((x) => x.TaxnomyCode == 'Completed');
        const woCompleted = woStatusDat.find(
          (x) => x.TaxnomyCode == 'Completed',
        );

        const [list, count] = await this.workorderStepsRepository.findAndCount({
          where: { WorkOrderID: dto.workOrderId },
        });

        const [list1, count1] =
          await this.workorderStepsRepository.findAndCount({
            where: {
              WorkOrderID: dto.workOrderId,
              StatusId: completed.TaxnomyId,
            },
          });

        if (count == count1) {
          const wu = await this.workorderMasterRepository.update(
            { WorkOrderID: dto.workOrderId },
            {
              StatusID: woCompleted.TaxnomyId,
              ModifiedOn: new Date(),
              ModifiedBy: dto.UserId,
            },
          );
          if (wu.affected > 0) {
            const wh = await this.workorderMasterHistoryRepository.findOne({
              where: { WorkOrderID: dto.workOrderId, IsLastRecord: true },
            });
            await this.workorderMasterHistoryRepository.update(
              { HistoryID: wh.HistoryID },
              { IsLastRecord: false },
            );

            wh.IsLastRecord = true;
            wh.created_on = new Date();
            wh.created_by = dto.UserId;
            wh.StatusID = woCompleted.TaxnomyId;
            wh.HistoryID = null;
            await this.workorderMasterHistoryRepository.save(wh);
          }
        }

        const [l, c] = await this.workorderMasterRepository.findAndCount({
          where: {
            WorkOrderID: dto.workOrderId,
            StatusID: woCompleted.TaxnomyId,
          },
        });

        if (c > 0) {
          const [list, count] =
            await this.workorderStepsRepository.findAndCount({
              where: { WorkOrderID: dto.workOrderId },
            });
          const [list1, count1] =
            await this.workorderStepsRepository.findAndCount({
              where: {
                WorkOrderID: dto.workOrderId,
                StatusId: completed.TaxnomyId,
              },
            });
          console.log(count, count1, 'count != count1');
          if (count != count1) {
            const depInprogressStatus = statusDat.find(
              (x) => x.TaxnomyCode == 'InProgress',
            );
            let woStatusCode = '';
            const [listInpro, countInpro] =
              await this.workorderStepsRepository.findAndCount({
                where: {
                  WorkOrderID: dto.workOrderId,
                  StatusId: depInprogressStatus.TaxnomyId,
                },
              });

            if (countInpro == 0) {
              const depInitiatedStatus = statusDat.find(
                (x) => x.TaxnomyCode == 'Initiated',
              );
              const [listIntiated, countIntiated] =
                await this.workorderStepsRepository.findAndCount({
                  where: {
                    WorkOrderID: dto.workOrderId,
                    StatusId: depInitiatedStatus.TaxnomyId,
                  },
                });

              if (countIntiated == 0) {
                const depYetToStartStatus = statusDat.find(
                  (x) => x.TaxnomyCode == 'YetToStart',
                );
                const [listdepYetToStartStatus, countdepYetToStartStatus] =
                  await this.workorderStepsRepository.findAndCount({
                    where: {
                      WorkOrderID: dto.workOrderId,
                      StatusId: depYetToStartStatus.TaxnomyId,
                    },
                  });
                if (countdepYetToStartStatus > 0) {
                  woStatusCode = 'YetToStart';
                }
              } else {
                woStatusCode = 'Initiated';
              }
            } else if (countInpro > 0) {
              woStatusCode = 'InProgress';
            }

            console.log(woStatusCode, ' woStatusCode');
            if (woStatusCode != '') {
              const statusID = woStatusDat.find(
                (x) => x.TaxnomyCode == woStatusCode,
              );
              if (statusID != null) {
                const wu = await this.workorderMasterRepository.update(
                  { WorkOrderID: dto.workOrderId },
                  {
                    StatusID: statusID.TaxnomyId,
                    ModifiedOn: new Date(),
                    ModifiedBy: dto.UserId,
                  },
                );
                if (wu.affected > 0) {
                  const wh =
                    await this.workorderMasterHistoryRepository.findOne({
                      where: {
                        WorkOrderID: dto.workOrderId,
                        IsLastRecord: true,
                      },
                    });
                  await this.workorderMasterHistoryRepository.update(
                    { HistoryID: wh.HistoryID },
                    { IsLastRecord: false },
                  );

                  wh.IsLastRecord = true;
                  wh.created_on = new Date();
                  wh.created_by = dto.UserId;
                  wh.StatusID = statusID.TaxnomyId;
                  wh.HistoryID = null;
                  await this.workorderMasterHistoryRepository.save(wh);
                }
              }
            }
          }
        }

        return 'Successfully Planned.';
      } else {
        return 'Server Error..';
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async workorder_hold_cancel(dto: workOrderHoldCance): Promise<any> {
    try {
      if (dto.mode == 'Hold') {
        if (dto.type === 'Workorder') {
          await this.workorderMasterRepository.update(
            { WorkOrderID: dto.workorderId },
            {
              IsHolded: true,
              HoldedOn: new Date(),
              HoldedBy: dto.userId,
              ModifiedBy: dto.userId,
              ModifiedOn: new Date(),
              HoldReasonId: dto.holdReasonId,
            },
          );
          const woHist = await this.workorderMasterHistoryRepository.findOne({
            where: { WorkOrderID: dto.workorderId, IsLastRecord: true },
          });

          await this.workorderMasterHistoryRepository.update(
            { HistoryID: woHist.HistoryID },
            { IsLastRecord: false },
          );

          const whTbl = new BRI_WorkOrderMasterHistory();

          woHist.HistoryID = null;
          woHist.created_by = dto.userId;
          woHist.created_on = new Date();
          woHist.IsHolded = true;
          woHist.HoldedOn = new Date();
          woHist.HoldedBy = dto.userId;
          woHist.IsLastRecord = true;
          woHist.HoldReasonId = dto.holdReasonId;

          await this.workorderMasterHistoryRepository.save(woHist);
        } else if (dto.type == 'AllProject') {
          await this.workorderMasterRepository.update(
            { ProjectID: dto.projectId },
            {
              IsHolded: true,
              HoldedOn: new Date(),
              HoldedBy: dto.userId,
              ModifiedBy: dto.userId,
              ModifiedOn: new Date(),
            },
          );
          const woList = await this.workorderMasterRepository.find({
            where: {
              ProjectID: dto.projectId,
              IsHolded: true,
              HoldedBy: dto.userId,
              HoldedOn: new Date(),
              HoldReasonId: dto.holdReasonId,
            },
          });
          for await (const wo of woList) {
            const woHist = await this.workorderMasterHistoryRepository.findOne({
              where: { WorkOrderID: wo.WorkOrderID, IsLastRecord: true },
            });

            await this.workorderMasterHistoryRepository.update(
              { HistoryID: woHist.HistoryID },
              { IsLastRecord: false },
            );

            const whTbl = new BRI_WorkOrderMasterHistory();

            woHist.HistoryID = null;
            woHist.created_by = dto.userId;
            woHist.created_on = new Date();
            woHist.IsHolded = true;
            woHist.HoldedOn = new Date();
            woHist.HoldedBy = dto.userId;
            woHist.IsLastRecord = true;
            woHist.HoldReasonId = dto.holdReasonId;

            await this.workorderMasterHistoryRepository.save(woHist);
          }
        }
      } else if (dto.mode == 'UnHold') {
        if (dto.type === 'Workorder') {
          //const ws=await this.drpTaxnomyRepository.find({where})
          await this.workorderMasterRepository.update(
            { WorkOrderID: dto.workorderId },
            {
              IsHolded: false,
              HoldedOn: null,
              HoldedBy: null,
              HoldReasonId: null,
              ModifiedBy: dto.userId,
              ModifiedOn: new Date(),
            },
          );
          const woHist = await this.workorderMasterHistoryRepository.findOne({
            where: { WorkOrderID: dto.workorderId, IsLastRecord: true },
          });

          await this.workorderMasterHistoryRepository.update(
            { HistoryID: woHist.HistoryID },
            { IsLastRecord: false },
          );

          const whTbl = new BRI_WorkOrderMasterHistory();

          woHist.HistoryID = null;
          woHist.created_by = dto.userId;
          woHist.created_on = new Date();
          woHist.IsHolded = false;
          woHist.HoldedOn = null;
          woHist.HoldedBy = null;
          woHist.IsLastRecord = true;
          woHist.HoldReasonId = null;

          await this.workorderMasterHistoryRepository.save(woHist);
        } else if (dto.type == 'AllProject') {
          await this.workorderMasterRepository.update(
            { ProjectID: dto.projectId },
            {
              IsHolded: false,
              HoldedOn: null,
              HoldedBy: null,
              ModifiedBy: dto.userId,
              ModifiedOn: new Date(),
              HoldReasonId: null,
            },
          );
          const woList = await this.workorderMasterRepository.find({
            where: { ProjectID: dto.projectId, IsHolded: false },
          });
          for await (const wo of woList) {
            const woHist = await this.workorderMasterHistoryRepository.findOne({
              where: { WorkOrderID: wo.WorkOrderID, IsLastRecord: true },
            });

            await this.workorderMasterHistoryRepository.update(
              { HistoryID: woHist.HistoryID },
              { IsLastRecord: false },
            );

            const whTbl = new BRI_WorkOrderMasterHistory();

            woHist.HistoryID = null;
            woHist.created_by = dto.userId;
            woHist.created_on = new Date();
            woHist.IsHolded = false;
            woHist.HoldedOn = null;
            woHist.HoldedBy = null;
            woHist.IsLastRecord = true;
            woHist.HoldReasonId = null;

            await this.workorderMasterHistoryRepository.save(woHist);
          }
        }
      } else if (dto.mode == 'Cancel') {
        const wos = await this.drpTaxnomyRepository.findOne({
          where: { TaxnomyType: 'WorkOrderStatus', TaxnomyCode: 'Cancelled' },
        });
        const wss = await this.drpTaxnomyRepository.findOne({
          where: { TaxnomyType: 'DepartmentStatus', TaxnomyCode: 'Cancelled' },
        });
        if (dto.type === 'Workorder') {
          await this.workorderMasterRepository.update(
            { WorkOrderID: dto.workorderId },
            {
              IsCancelled: true,
              CancelledOn: new Date(),
              CancelledBy: dto.userId,
              ModifiedBy: dto.userId,
              ModifiedOn: new Date(),
              StatusID: wos.TaxnomyId,
            },
          );
          const woHist = await this.workorderMasterHistoryRepository.findOne({
            where: { WorkOrderID: dto.workorderId, IsLastRecord: true },
          });

          await this.workorderMasterHistoryRepository.update(
            { HistoryID: woHist.HistoryID },
            { IsLastRecord: false },
          );

          const whTbl = new BRI_WorkOrderMasterHistory();

          woHist.HistoryID = null;
          woHist.created_by = dto.userId;
          woHist.created_on = new Date();
          woHist.IsCancelled = true;
          woHist.CancelledOn = new Date();
          woHist.CancelledBy = dto.userId;
          woHist.IsLastRecord = true;
          woHist.StatusID = wos.TaxnomyId;

          await this.workorderMasterHistoryRepository.save(woHist);

          await this.workorderStepsRepository.update(
            { WorkOrderID: dto.workorderId },
            { StatusId: wss.TaxnomyId },
          );

          const wshList = await this.workorderStepsHistoryRepository.find({
            where: { WorkOrderID: dto.workorderId, IsLastRecord: true },
          });
          for await (const wosh of wshList) {
            await this.workorderStepsHistoryRepository.update(
              { HistoryId: wosh.HistoryId },
              { IsLastRecord: false },
            );
            wosh.HistoryId = null;
            wosh.IsLastRecord = true;
            wosh.StatusId = wss.TaxnomyId;
            wosh.CreatedBy = dto.userId;
            wosh.CreatedOn = new Date();
            await this.workorderStepsHistoryRepository.save(wosh);
          }
        } else if (dto.type == 'AllProject') {
          await this.workorderMasterRepository.update(
            { ProjectID: dto.projectId },
            {
              IsCancelled: true,
              CancelledOn: new Date(),
              CancelledBy: dto.userId,
              ModifiedBy: dto.userId,
              ModifiedOn: new Date(),
              StatusID: wos.TaxnomyId,
            },
          );
          const woList = await this.workorderMasterRepository.find({
            where: { ProjectID: dto.projectId, IsCancelled: true },
          });
          for await (const wo of woList) {
            const woHist = await this.workorderMasterHistoryRepository.findOne({
              where: { WorkOrderID: wo.WorkOrderID, IsLastRecord: true },
            });

            await this.workorderMasterHistoryRepository.update(
              { HistoryID: woHist.HistoryID },
              { IsLastRecord: false },
            );

            const whTbl = new BRI_WorkOrderMasterHistory();

            woHist.HistoryID = null;
            woHist.created_by = dto.userId;
            woHist.created_on = new Date();
            woHist.IsCancelled = true;
            woHist.CancelledOn = new Date();
            woHist.CancelledBy = dto.userId;
            woHist.IsLastRecord = true;
            woHist.StatusID = wos.TaxnomyId;
            await this.workorderMasterHistoryRepository.save(woHist);

            await this.workorderStepsRepository.update(
              { WorkOrderID: wo.WorkOrderID },
              {
                StatusId: wss.TaxnomyId,
                PlanedStartDate: null,
                PlanedEndDate: null,
                EstimatedLabourHr: null,
              },
            );
            const wslist = await this.workorderStepsRepository.find({
              where: { WorkOrderID: wo.WorkOrderID },
            });
            for await (const ws of wslist) {
              const wssh = await this.workorderStepsHistoryRepository.findOne({
                where: {
                  WorkOrderStepID: ws.WorkOrderStepID,
                  IsLastRecord: true,
                },
              });
              await this.workorderStepsHistoryRepository.update(
                { WorkOrderStepID: ws.WorkOrderStepID, IsLastRecord: true },
                { IsLastRecord: false },
              );
              wssh.HistoryId = null;
              wssh.IsLastRecord = true;
              wssh.StatusId = wss.TaxnomyId;
              wssh.CreatedBy = dto.userId;
              wssh.CreatedOn = new Date();
              await this.workorderStepsHistoryRepository.save(wssh);
            }
            // await this.workorderStepsRepository.update({WorkOrderID:})
          }
        }
      } else if (dto.mode == 'Enable') {
        const wos = await this.drpTaxnomyRepository.findOne({
          where: { TaxnomyType: 'WorkOrderStatus', TaxnomyCode: 'YetToStart' },
        });
        const wss = await this.drpTaxnomyRepository.findOne({
          where: { TaxnomyType: 'DepartmentStatus', TaxnomyCode: 'YetToStart' },
        });
        if (dto.type === 'Workorder') {
          await this.workorderMasterRepository.update(
            { WorkOrderID: dto.workorderId },
            {
              IsCancelled: false,
              CancelledBy: null,
              CancelledOn: null,
              ModifiedBy: dto.userId,
              ModifiedOn: new Date(),
              StatusID: wos.TaxnomyId,
            },
          );

          const wsH = await this.workorderMasterHistoryRepository.findOne({
            where: { WorkOrderID: dto.workorderId, IsLastRecord: true },
          });
          await this.workorderMasterHistoryRepository.update(
            { HistoryID: wsH.HistoryID },
            { IsLastRecord: false },
          );

          wsH.HistoryID = null;
          wsH.IsCancelled = false;
          wsH.CancelledBy = null;
          wsH.CancelledOn = null;
          wsH.IsLastRecord = true;
          wsH.created_by = dto.userId;
          wsH.created_on = new Date();
          await this.workorderMasterHistoryRepository.save(wsH);

          const wssl = await this.workorderStepsRepository.find({
            where: { WorkOrderID: dto.workorderId },
          });
          await this.workorderStepsRepository.update(
            { WorkOrderID: dto.workorderId },
            {
              StatusId: wss.TaxnomyId,
              ModifiedOn: new Date(),
              ModifiedBy: dto.userId,
              PlanedEndDate: null,
              PlanedStartDate: null,
              EstimatedLabourHr: null,
            },
          );
          for await (const ws of wssl) {
            const wssh = await this.workorderStepsHistoryRepository.findOne({
              where: {
                WorkOrderStepID: ws.WorkOrderStepID,
                IsLastRecord: true,
              },
            });
            await this.workorderStepsHistoryRepository.update(
              { HistoryId: wssh.HistoryId },
              { StatusId: wss.TaxnomyId, IsLastRecord: false },
            );
            wssh.HistoryId = null;
            wssh.CreatedBy = dto.userId;
            wssh.CreatedOn = new Date();
            wssh.IsLastRecord = true;
            wssh.StatusId = wss.TaxnomyId;
            wssh.PlanedEndDate = null;
            wssh.PlanedStartDate = null;
            wssh.EstimatedLabourHr = null;
            await this.workorderStepsHistoryRepository.save(wssh);
          }
        } else if (dto.type == 'AllProject') {
          await this.workorderMasterRepository.update(
            { ProjectID: dto.projectId },
            {
              IsCancelled: false,
              CancelledOn: null,
              CancelledBy: null,
              StatusID: wss.TaxnomyId,
              ModifiedBy: dto.userId,
              ModifiedOn: new Date(),
            },
          );
          const woList = await this.workorderMasterRepository.find({
            where: { ProjectID: dto.projectId, IsCancelled: false },
          });
          for await (const wo of woList) {
            const woHist = await this.workorderMasterHistoryRepository.findOne({
              where: { WorkOrderID: wo.WorkOrderID, IsLastRecord: true },
            });

            await this.workorderMasterHistoryRepository.update(
              { HistoryID: woHist.HistoryID },
              { IsLastRecord: false },
            );

            const whTbl = new BRI_WorkOrderMasterHistory();

            woHist.HistoryID = null;
            woHist.created_by = dto.userId;
            woHist.created_on = new Date();
            woHist.IsCancelled = false;
            woHist.CancelledOn = null;
            woHist.CancelledBy = null;
            woHist.IsLastRecord = true;

            await this.workorderMasterHistoryRepository.save(woHist);

            const wssl = await this.workorderStepsRepository.find({
              where: { WorkOrderID: wo.WorkOrderID },
            });
            await this.workorderStepsRepository.update(
              { WorkOrderID: wo.WorkOrderID },
              {
                StatusId: wss.TaxnomyId,
                ModifiedOn: new Date(),
                ModifiedBy: dto.userId,
                PlanedEndDate: null,
                PlanedStartDate: null,
                EstimatedLabourHr: null,
              },
            );
            for await (const ws of wssl) {
              const wssh = await this.workorderStepsHistoryRepository.findOne({
                where: {
                  WorkOrderStepID: ws.WorkOrderStepID,
                  IsLastRecord: true,
                },
              });
              await this.workorderStepsHistoryRepository.update(
                { HistoryId: wssh.HistoryId },
                { StatusId: wss.TaxnomyId, IsLastRecord: false },
              );
              wssh.HistoryId = null;
              wssh.CreatedBy = dto.userId;
              wssh.CreatedOn = new Date();
              wssh.IsLastRecord = true;
              wssh.StatusId = wss.TaxnomyId;
              wssh.PlanedEndDate = null;
              wssh.PlanedStartDate = null;
              wssh.EstimatedLabourHr = null;
              await this.workorderStepsHistoryRepository.save(wssh);
            }
          }
        }
      }
      return 'Successfully saved.';
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async workorder_meterial_list(workorderStepId: any): Promise<any> {
    try {
      const param = 'exec BRI_USP_Workorder_items_list ' + workorderStepId;
      console.log(param, 'sp params');
      const data = this.workorderItemsRepository.query(param);
      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async workorder_meterial_requistion(dto: meterialRequistion): Promise<any> {
    try {
      const mrTbl = new BRI_ItemRequissition();
      const MRDocumentNo = await this.generateMRD_No(
        dto.departmentId,
        dto.locationId,
      );
      console.log(MRDocumentNo, 'document no');
      if (MRDocumentNo != 'error') {
        mrTbl.CreatedBy = dto.userId;
        mrTbl.CreatedOn = new Date();
        mrTbl.DepartmentID = dto.departmentId;
        mrTbl.IsActive = true;
        mrTbl.MRDocumentNo = MRDocumentNo;
        mrTbl.SubsidiaryID = dto.locationId;
        mrTbl.WorkOrderID = dto.workorderId;
        mrTbl.WorkOrderStepID = dto.workorderStepId;
        const mrSave = await this.itemRequissitionRepository.save(mrTbl);
        if (mrSave) {
          await this.itemRequissitionRepository.update(
            { RequisitionID: mrSave.RequisitionID },
            {
              IsMailTriggered: true,
              TrigeredOn: new Date(),
              TriggeredBy: dto.userId,
            },
          );
          const mrHistTbl = new BRI_ItemRequissitionHistory();
          mrHistTbl.CreatedBy = dto.userId;
          mrHistTbl.CreatedOn = new Date();
          mrHistTbl.DepartmentID = dto.departmentId;
          mrHistTbl.IsActive = true;
          mrHistTbl.IsLastRecord = true;
          mrHistTbl.MRDocumentNo = MRDocumentNo;
          mrHistTbl.SubsidiaryID = dto.locationId;
          mrHistTbl.WorkOrderID = dto.workorderId;
          mrHistTbl.WorkOrderStepID = dto.workorderStepId;
          mrHistTbl.RequisitionID = mrSave.RequisitionID;
          await this.itemRequissitionHistoryRepository.save(mrHistTbl);
          for await (const wi of dto.workOrderItemId) {
            const mrdTbl = new BRI_ItemRequisitionDetails();
            mrdTbl.CreatedBy = dto.userId;
            mrdTbl.CreatedOn = new Date();
            mrdTbl.IsActive = true;
            mrdTbl.RequisitionID = mrSave.RequisitionID;
            mrdTbl.WorkOrderID = dto.workorderId;
            mrdTbl.WorkOrderStepID = dto.workorderStepId;
            mrdTbl.WorkOrderItemId = wi.id;
            mrdTbl.Quantity = wi.quantity;
            const mrdSave =
              await this.itemRequissitionDetailsRepository.save(mrdTbl);
            if (mrdSave) {
              const mrdHisTbl = new BRI_ItemRequisitionDetailsHistory();
              mrdHisTbl.CreatedBy = dto.userId;
              mrdHisTbl.CreatedOn = new Date();
              mrdHisTbl.IsActive = true;
              mrdHisTbl.RequisitionID = mrSave.RequisitionID;
              mrdHisTbl.WorkOrderID = dto.workorderId;
              mrdHisTbl.WorkOrderStepID = dto.workorderStepId;
              mrdHisTbl.WorkOrderItemId = wi.id;
              mrdHisTbl.Quantity = wi.quantity;
              mrdHisTbl.IsLastRecord = true;
              mrdHisTbl.RequisitionDetailsID = mrdSave.RequisitionDetailsID;
              await this.itemRequissitionDetailsRepositoryHistory.save(
                mrdHisTbl,
              );

              const item = await this.workorderItemsRepository.findOne({
                where: { WorkOrderItemId: wi.id },
              });
              await this.workorderItemsRepository.update(item.WorkOrderItemId, {
                AvailableCount: item.AvailableCount - wi.quantity,
              });
            }
          }
          return 'Meterial requsted successfully!';
        }
      } else {
        throw new HttpException(
          { message: 'Internal Server Error.' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async meterial_requistion_table(dto: mrTableDto): Promise<any> {
    try {
      const department_id = dto.departmentId;
      const location = dto.location == null ? null : '"' + dto.location + '"';
      const ReleaseDate =
        dto.releaseDate == null ? null : '"' + dto.releaseDate + '"';
      const order_by = dto.order_by == null ? null : '"' + dto.order_by + '"';
      const sort = dto.sort == null ? null : '"' + dto.sort + '"';
      const search = dto.search == null ? null : '"' + dto.search + '"';
      const param =
        'exec BRI_USP_MR_TABLE ' +
        location +
        ',' +
        ReleaseDate +
        ',' +
        department_id +
        ',' +
        dto.start +
        ',' +
        dto.page_size +
        ',' +
        order_by +
        ',' +
        sort +
        ',' +
        search;
      console.log(param, 'sp params');
      const data = this.departmentRepository.query(param);
      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async workorder_operation_start(dto: woOperationStart): Promise<any> {
    try {
      const dt = await this.drpTaxnomyRepository.query(
        'select getdate() currentDt',
      );
      const department = await this.departmentRepository.findOne({
        where: { DepartmentId: dto.departmentId },
      });
      const wos = await this.drpTaxnomyRepository.find({
        where: { TaxnomyType: 'WorkOrderStatus', IsActive: true },
      });
      const woIntiated = wos.find((x) => x.TaxnomyCode == 'Initiated');
      const woInProgress = wos.find((x) => x.TaxnomyCode == 'InProgress');

      const woss = await this.drpTaxnomyRepository.find({
        where: { TaxnomyType: 'DepartmentStatus', IsActive: true },
      });
      const wossIntiated = woss.find((x) => x.TaxnomyCode == 'Initiated');
      const wossInProgress = woss.find((x) => x.TaxnomyCode == 'InProgress');
      const wossHold = woss.find((x) => x.TaxnomyCode == 'OnHold');
      const wo = await this.workorderMasterRepository.exist({
        where: {
          WorkOrderID: dto.workorderId,
          StatusID: woIntiated.TaxnomyId,
        },
      });
      if (wo) {
        const wu = await this.workorderMasterRepository.update(
          { WorkOrderID: dto.workorderId },
          {
            StatusID: woInProgress.TaxnomyId,
            ModifiedBy: dto.userId,
            ModifiedOn: new Date(dt[0].currentDt),
          },
        );
        if (wu.affected > 0) {
          const woh = await this.workorderMasterHistoryRepository.findOne({
            where: { IsLastRecord: true, WorkOrderID: dto.workorderId },
          });
          const wohu = await this.workorderMasterHistoryRepository.update(
            { WorkOrderID: woh.HistoryID },
            { IsLastRecord: false },
          );
          if (wohu.affected > 0) {
            woh.StatusID = woInProgress.TaxnomyId;
            woh.IsLastRecord = true;
            woh.created_by = dto.userId;
            woh.created_on = new Date(dt[0].currentDt);
            woh.HistoryID = null;
            await this.workorderMasterHistoryRepository.save(woh);
          }

          const wosu = await this.workorderStepsRepository.update(
            // eslint-disable-next-line prettier/prettier
            {
              WorkOrderStepID: dto.workorderStepId,
              StatusId: wossIntiated.TaxnomyId,
           
            },
            {
              StatusId: wossInProgress.TaxnomyId,
              ActualStartDate: new Date(dt[0].currentDt),
              HoldReasonId:null
            },
          );
          if (wosu.affected > 0) {
            const wosh = await this.workorderStepsHistoryRepository.findOne({
              where: {
                WorkOrderStepID: dto.workorderStepId,
                IsLastRecord: true,
              },
            });
            const wossHu = await this.workorderStepsHistoryRepository.update(
              { HistoryId: wosh.HistoryId, IsLastRecord: true },
              { IsLastRecord: false },
            );
            if (wossHu.affected > 0) {
              wosh.ActualStartDate = new Date(dt[0].currentDt);
              wosh.CreatedBy = dto.userId;
              wosh.CreatedOn = new Date(dt[0].currentDt);
              wosh.HistoryId = null;
              wosh.IsLastRecord = true;
              wosh.StatusId = wossInProgress.TaxnomyId;
              wosh.HoldReasonId=null;
              await this.workorderStepsHistoryRepository.save(wosh);
            }
          } else {
            const wosu = await this.workorderStepsRepository.update(
              // eslint-disable-next-line prettier/prettier
              {
                WorkOrderStepID: dto.workorderStepId,
                StatusId: wossHold.TaxnomyId,
              },
              {
                StatusId: wossInProgress.TaxnomyId,
                ActualStartDate: new Date(dt[0].currentDt),
                IsHold: false,
                HoldOn: null,
                HoldRemarks: null,
                HoldReasonId:null
              },
            );
            if (wosu.affected > 0) {
              const wosh = await this.workorderStepsHistoryRepository.findOne({
                where: {
                  WorkOrderStepID: dto.workorderStepId,
                  IsLastRecord: true,
                },
              });
              const wossHu = await this.workorderStepsHistoryRepository.update(
                { HistoryId: wosh.HistoryId, IsLastRecord: true },
                { IsLastRecord: false },
              );
              if (wossHu.affected > 0) {
                wosh.ActualStartDate = new Date(dt[0].currentDt);
                wosh.CreatedBy = dto.userId;
                wosh.CreatedOn = new Date(dt[0].currentDt);
                wosh.HistoryId = null;
                wosh.IsLastRecord = true;
                wosh.StatusId = wossInProgress.TaxnomyId;
                wosh.HoldReasonId=null;
                await this.workorderStepsHistoryRepository.save(wosh);
              }
            }
          }
        }
      }
      const woips = await this.workorderStepsRepository.findOne({
        where: [
          {
            WorkOrderStepID: dto.workorderStepId,
            StatusId: wossInProgress.TaxnomyId,
          },
          {
            WorkOrderStepID: dto.workorderStepId,
            StatusId: wossHold.TaxnomyId,
          },
          {
            WorkOrderStepID: dto.workorderStepId,
            StatusId: wossIntiated.TaxnomyId,
          },
        ],
      });
      console.log(woips, 'woips');
      const woDet = await this.workorderMasterRepository.findOne({
        where: {
          WorkOrderID: dto.workorderId,
        },
      });
      if (woips) {
        const wosu = await this.workorderStepsRepository.update(
          { WorkOrderStepID: dto.workorderStepId },
          {
            StatusId: wossInProgress.TaxnomyId,
            ActualStartDate: new Date(dt[0].currentDt),
            IsHold: false,
            HoldOn: null,
            HoldRemarks: null,
            HoldReasonId:null
          },
        );
        if (wosu.affected > 0) {
          const wosh = await this.workorderStepsHistoryRepository.findOne({
            where: {
              WorkOrderStepID: dto.workorderStepId,
              IsLastRecord: true,
            },
          });
          const wossHu = await this.workorderStepsHistoryRepository.update(
            { HistoryId: wosh.HistoryId, IsLastRecord: true },
            { IsLastRecord: false },
          );
          if (wossHu.affected > 0) {
            wosh.ActualStartDate = new Date(dt[0].currentDt);
            wosh.CreatedBy = dto.userId;
            wosh.CreatedOn = new Date(dt[0].currentDt);
            wosh.HistoryId = null;
            wosh.IsLastRecord = true;
            wosh.StatusId = wossInProgress.TaxnomyId;
            wosh.HoldReasonId=null;
            await this.workorderStepsHistoryRepository.save(wosh);
          }
        }

        const ts = new BRI_TimeSheet();
        ts.CreatedAt = new Date(dt[0].currentDt);
        ts.CreatedBy = dto.userId;
        ts.DepartmentID = dto.departmentId;
        ts.IsActive = true;
        ts.ProjectID = dto.projectId;
        ts.SubsidiaryID = dto.locationId;
        ts.TSDocumentNo = await this.generateTSD_No(
          dto.departmentId,
          dto.locationId,
        );
        ts.TimeSheetFor = new Date(dt[0].currentDt);
        ts.WorkOrderID = dto.workorderId;
        ts.WorkOrderNo = woDet.WorkOrderNo;
        ts.IsClosed = false;
        ts.WorkOrderStepID = dto.workorderStepId;
        const tss = await this.timeSheetRepository.save(ts);
        for await (const emp of dto.employees) {
          const ltsTbl = new BRI_LabourTimeSheet();
          ltsTbl.CreatedBy = dto.userId;
          ltsTbl.CreatedOn = new Date(dt[0].currentDt);
          ltsTbl.IsActive = true;
          ltsTbl.LabourID = emp;
          ltsTbl.StartTime = new Date(dt[0].currentDt);
          ltsTbl.TimeSheetID = tss.TimeSheetID;
          ltsTbl.TimeSheetOn = new Date(dt[0].currentDt);
          const lts = await this.labourTsRepository.save(ltsTbl);
          // CNC and Painting department are allowed multi workorder at cuncurrently
          if (
            department.DepartmentCode == 'CNC' ||
            department.DepartmentCode == 'Painting'
          ) {
            const lmt = new BRI_LabourMultiTaskTsDetails();
            lmt.CreatedBy = dto.userId;
            lmt.CreatedOn = new Date(dt[0].currentDt);
            lmt.IsActive = true;
            lmt.LabourTsId = lts.TimeSheetLabourDetailsID;
            lmt.ParrentLabourTsId = lts.TimeSheetLabourDetailsID;
            lmt.NoOfTask = 1;
            lmt.StartTime = new Date(dt[0].currentDt);
            const fistEntry = await this.labourmMultiTaskTsRepository.save(lmt);

            const multiTaskDetails = await this.labourTsRepository.query(
              'select * from BRI_VIEW_LabourMultitaskTsDetails where TimeSheetLabourDetailsID not in(' +
                lts.TimeSheetLabourDetailsID +
                ') and LabourID=' +
                emp,
            );
            // let i=1;
            for await (const mtd of multiTaskDetails) {
              // Previous non closed labous ts add to current ts
              const lmts = new BRI_LabourMultiTaskTsDetails();
              lmts.CreatedBy = dto.userId;
              lmts.CreatedOn = new Date(dt[0].currentDt);
              lmts.IsActive = true;
              lmts.LabourTsId = mtd.TimeSheetLabourDetailsID;
              lmts.ParrentLabourTsId = lts.TimeSheetLabourDetailsID;
              // lmt.NoOfTask=1;
              lmts.StartTime = new Date(mtd.StartTime);
              await this.labourmMultiTaskTsRepository.save(lmts);

              // Current labour ts data added to non closed previous ts.
              const pvlmts = new BRI_LabourMultiTaskTsDetails();
              pvlmts.CreatedBy = dto.userId;
              pvlmts.CreatedOn = new Date(dt[0].currentDt);
              pvlmts.IsActive = true;
              pvlmts.LabourTsId = lts.TimeSheetLabourDetailsID;
              pvlmts.ParrentLabourTsId = mtd.TimeSheetLabourDetailsID;
              // lmt.NoOfTask=1;
              pvlmts.StartTime = new Date(dt[0].currentDt);
              await this.labourmMultiTaskTsRepository.save(pvlmts);
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async workorder_operation_hold_complete(
    dto: woOperationHoldAndCompleteDto,
  ): Promise<any> {
    try {
      const dt = await this.drpTaxnomyRepository.query(
        'select getdate() currentDt',
      );

      const wos = await this.drpTaxnomyRepository.find({
        where: { TaxnomyType: 'WorkOrderStatus', IsActive: true },
      });
      const woCompleted = wos.find((x) => x.TaxnomyCode == 'Completed');

      const woss = await this.drpTaxnomyRepository.find({
        where: { TaxnomyType: 'DepartmentStatus', IsActive: true },
      });
      const wossCompleted = woss.find((x) => x.TaxnomyCode == 'Completed');
      const wossInProgress = woss.find((x) => x.TaxnomyCode == 'InProgress');
      const wossHold = woss.find((x) => x.TaxnomyCode == 'OnHold');
      const wo = await this.workorderStepsRepository.exist({
        where: {
          WorkOrderID: dto.workorderId,
          StatusId: wossInProgress.TaxnomyId,
        },
      });
      if (wo) {
        const tsData = await this.timeSheetRepository.findOne({
          where: {
            WorkOrderID: dto.workorderId,
            WorkOrderStepID: dto.workorderStepId,
            IsClosed: false,
          },
        });

        if (dto.status == 'Hold') {
          const wsu = await this.workorderStepsRepository.update(
            { WorkOrderStepID: dto.workorderStepId },
            {
              IsHold: true,
              HoldOn: new Date(dt[0].currentDt),
              HoldRemarks: dto.holdRemark,
              ModifiedBy: dto.userId,
              ModifiedOn: new Date(dt[0].currentDt),
              StatusId: wossHold.TaxnomyId,
              HoldReasonId:dto.holdReasonId,
            
            },
          );
          if (wsu.affected > 0) {
            const wssh = await this.workorderStepsHistoryRepository.findOne({
              where: {
                WorkOrderStepID: dto.workorderStepId,
                IsLastRecord: true,
              },
            });
            const wsshu = await this.workorderStepsHistoryRepository.update(
              { WorkOrderStepID: dto.workorderStepId, IsLastRecord: true },
              { IsLastRecord: false },
            );
            if (wsshu.affected > 0) {
              wssh.HistoryId = null;
              wssh.CreatedBy = dto.userId;
              wssh.CreatedOn = new Date(dt[0].currentDt);
              wssh.StatusId = wossHold.TaxnomyId;
              wssh.IsHold = true;
              wssh.HoldReasonId=dto.holdReasonId;
              (wssh.HoldOn = new Date(dt[0].currentDt)),
                (wssh.HoldRemarks = dto.holdRemark);
              wssh.IsLastRecord = true;
              await this.workorderStepsHistoryRepository.save(wssh);
            }

            for await (const i of dto.itemTimeSheet) {
              const its = new BRI_ItemTimeSheet();
              its.CreatedAt = new Date(dt[0].currentDt);
              its.IsActive = true;
              //  its.ItemID = i.itemId;
              // its.RequisitionID = i.mrId;
              its.Quentity = i.usedQuantity;
              its.ItemID = i.TimeSheetITemId;
              its.Remarks = i.remarks;
              its.TimeSheetID = tsData.TimeSheetID;
              its.TimeSheetOn = new Date(dt[0].currentDt);
              const itSave = await this.tsItemRepository.save(its);
              console.log(i.TimeSheetITemId, 'TimeSheetITemId');
              // if (itSave) {
              //   const woi = await this.workorderItemsRepository.findOne({
              //     where: { WorkOrderItemId: i.workOrderItemId },
              //   });
              //   woi.UsedCount = woi.UsedCount + parseInt(i.usedQuantity, 10);
              //   woi.AvailableCount = woi.AloatedCount - woi.UsedCount;
              //   woi.ModifiedBy = dto.userId;
              //   woi.ModifiedOn = new Date(dt[0].currentDt);
              //   await this.workorderItemsRepository.save(woi);
              // }
              if (itSave) {
                const itemData =
                  await this.timesheetItemMasterRepository.findOne({
                    where: { TimeSheetITemId: i.TimeSheetITemId },
                  });
                console.log(
                  itemData.AvailableQuantity - i.usedQuantity,
                  '(itemData.AvailableQuantity - i.usedQuantity)',
                );
                const up = await this.timesheetItemMasterRepository.update(
                  { TimeSheetITemId: i.TimeSheetITemId },
                  {
                    AvailableQuantity:
                      itemData.AvailableQuantity - i.usedQuantity,
                    ModifiedOn: new Date(dt[0].currentDt),
                    ModifiedBy: dto.userId,
                  },
                );
                console.log(up, ' update');
              }
            }

            const labourTs = await this.labourTsRepository.find({
              where: { TimeSheetID: tsData.TimeSheetID },
            });

            const department = await this.departmentRepository.findOne({
              where: { DepartmentId: tsData.DepartmentID },
            });
            if (
              department.DepartmentCode != 'CNC' &&
              department.DepartmentCode != 'Painting'
            ) {
              for await (const ls of labourTs) {
                const hr = ls.StartTime.getHours();
                const mm = ls.StartTime.getMinutes();
                const day = ls.StartTime.getDate();
                const month = ls.StartTime.getMonth() + 1;
                const year = ls.StartTime.getFullYear();
                const st = year + '-' + month + '-' + day + ' ' + hr + ':' + mm;
                const param =
                  'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                  tsData.DepartmentID +
                  ',"' +
                  st +
                  '"';
                console.log(param, 'sp params');
                const data = await this.intravelRepository.query(param);
                // Interval Tracking
                for await (const ti of data) {
                  const tsIntTbl = new BRI_TimesheetIntravelTracking();
                  tsIntTbl.CreatedOn = new Date(dt[0].currentDt);
                  tsIntTbl.Duration = ti.Duration;
                  tsIntTbl.EndTime = ti.EndTime;
                  tsIntTbl.IntravelId = ti.IntravalId;
                  tsIntTbl.IsActive = true;
                  tsIntTbl.StartTime = ti.startTime;
                  tsIntTbl.TimeSheetID = tsData.TimeSheetID;
                  await this.tsIntravelRepository.save(tsIntTbl);
                }

                await this.labourTsRepository.update(
                  { TimeSheetLabourDetailsID: ls.TimeSheetLabourDetailsID },
                  {
                    EndTime: data[0].workEnd,
                    WorkHrsInMin: data[0].workMin,
                    ModifiedOn: new Date(dt[0].currentDt),
                    ModifiedBy: dto.userId,
                  },
                );
              }
            } else if (
              department.DepartmentCode == 'CNC' ||
              department.DepartmentCode == 'Painting'
            ) {
              console.log(labourTs, ' labour ts');

              for await (const ls of labourTs) {
                console.log(
                  ls.TimeSheetLabourDetailsID,
                  'TimeSheetLabourDetailsID',
                );
                const labourTsId = ls.TimeSheetLabourDetailsID;
                const labourTsData = await this.intravelRepository.query(
                  'exec BRI_USP_Multi_EmployeeTS_Calc ' + labourTsId,
                );
                // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                //   console.log(labourTsData,'labourTsData');
                const requiredTsData = labourTsData.filter(
                  (x) =>
                    x.LabourTsId == labourTsId &&
                    x.ParrentLabourTsId == labourTsId,
                );
                const previousTsData = labourTsData.filter(
                  (x) =>
                    x.ParrentLabourTsId == labourTsId && x.isPreviousStart == 1,
                );
                const afterTsData = labourTsData.filter(
                  (x) =>
                    (x.LabourTsId != labourTsId ||
                      x.ParrentLabourTsId != labourTsId) &&
                    x.isPreviousStart == 0,
                );
                const finalData = [];
                let previousAvg = 0;
                let index = 0;
                console.log(requiredTsData, ' requiredTsData');
                console.log(previousTsData, ' previousTsData');
                console.log(afterTsData, ' afterTsData');
                if (requiredTsData.length > 0) {
                  if (afterTsData.length > 0) {
                    for await (const data of afterTsData) {
                      const avg =
                        (data.endTimeDifference - previousAvg) /
                        labourTsData.length;

                      const param =
                        'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                        tsData.DepartmentID +
                        ',"' +
                        data.StartTime +
                        '"';

                      const dataIn = await this.intravelRepository.query(param);

                      // const removeInterval=(avg-dataIn[0].intravelSum);

                      console.log(
                        '(data.endTimeDifference-previousAvg)/(labourTsData.length) (',
                        data.endTimeDifference,
                        '-',
                        previousAvg,
                        ')/(',
                        labourTsData.length,
                        ')=',
                        avg,
                      );
                      data.averageMins = avg - dataIn[0].intravelSum;
                      previousAvg = previousAvg + avg;
                      finalData.push(data);
                      index = index + 1;
                      if (afterTsData.length === index) {
                        console.log(requiredTsData[0], 'requiredTsData[0]');
                        if (previousTsData.length > 0) {
                          requiredTsData[0].averageMins =
                            (requiredTsData[0].endTimeDifference -
                              previousAvg) /
                            (previousTsData.length + 1);
                          console.log(
                            '(requiredTsData[0].endTimeDifference-previousAvg)/(previousTsData.length) (',
                            requiredTsData[0].endTimeDifference,
                            '-',
                            previousAvg,
                            ')/(',
                            previousTsData.length + 1,
                            ')=',
                            requiredTsData[0].averageMins,
                          );
                        } else {
                          requiredTsData[0].averageMins =
                            requiredTsData[0].endTimeDifference - previousAvg;
                          console.log(
                            '(requiredTsData[0].endTimeDifference-previousAvg) (',
                            requiredTsData[0].endTimeDifference,
                            '-',
                            previousAvg,
                            ')= requiredTsData[0].averageMins',
                          );
                        }

                        // Interval Calculation

                        const param =
                          'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                          tsData.DepartmentID +
                          ',"' +
                          requiredTsData[0].StartTime +
                          '"';

                        const dataIn1 =
                          await this.intravelRepository.query(param);

                        requiredTsData[0].averageMins =
                          requiredTsData[0].averageMins -
                          dataIn1[0].intravelSum;

                        for await (const ti of dataIn1) {
                          const tsIntTbl = new BRI_TimesheetIntravelTracking();
                          tsIntTbl.CreatedOn = new Date(dt[0].currentDt);
                          tsIntTbl.Duration = ti.Duration;
                          tsIntTbl.EndTime = ti.EndTime;
                          tsIntTbl.IntravelId = ti.IntravalId;
                          tsIntTbl.IsActive = true;
                          tsIntTbl.StartTime = ti.startTime;
                          tsIntTbl.TimeSheetID = tsData.TimeSheetID;
                          await this.tsIntravelRepository.save(tsIntTbl);
                        }

                        await this.labourTsRepository.update(
                          {
                            TimeSheetLabourDetailsID:
                              requiredTsData[0].LabourTsId,
                          },
                          {
                            EndTime: dataIn1[0].workEnd,
                            WorkHrsInMin: requiredTsData[0].averageMins,
                            ModifiedOn: new Date(dt[0].currentDt),
                            ModifiedBy: dto.userId,
                          },
                        );

                        // -------------------------

                        finalData.push(requiredTsData[0]);
                        for await (const prevData of previousTsData) {
                          const param =
                            'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                            tsData.DepartmentID +
                            ',"' +
                            prevData.StartTime +
                            '"';

                          const dataIn2 =
                            await this.intravelRepository.query(param);

                          prevData.averageMins =
                            requiredTsData[0].averageMins +
                            prevData.startTimeDifference -
                            dataIn2[0].intravelSum;
                          console.log(
                            ' requiredTsData[0].averageMins+prevData.startTimeDifference: ',
                            requiredTsData[0].averageMins,
                            '+',
                            prevData.startTimeDifference,
                            '=',
                            prevData.averageMins,
                          );
                          finalData.push(prevData);
                        }
                      }
                    }
                  } else if (previousTsData.length > 0) {
                    console.log(requiredTsData[0], 'requiredTsData[0]');
                    if (previousTsData.length > 0) {
                      requiredTsData[0].averageMins =
                        (requiredTsData[0].endTimeDifference - previousAvg) /
                        (previousTsData.length + 1);
                      console.log(
                        '(requiredTsData[0].endTimeDifference-previousAvg)/(previousTsData.length) (',
                        requiredTsData[0].endTimeDifference,
                        '-',
                        previousAvg,
                        ')/(',
                        previousTsData.length + 1,
                        ')=',
                        requiredTsData[0].averageMins,
                      );
                    } else {
                      requiredTsData[0].averageMins =
                        requiredTsData[0].endTimeDifference - previousAvg;
                      console.log(
                        '(requiredTsData[0].endTimeDifference-previousAvg) (',
                        requiredTsData[0].endTimeDifference,
                        '-',
                        previousAvg,
                        ')= requiredTsData[0].averageMins',
                      );
                    }

                    // Interval Calculation

                    const param =
                      'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                      tsData.DepartmentID +
                      ',"' +
                      requiredTsData[0].StartTime +
                      '"';

                    const dataIn1 = await this.intravelRepository.query(param);

                    requiredTsData[0].averageMins =
                      requiredTsData[0].averageMins - dataIn1[0].intravelSum;

                    for await (const ti of dataIn1) {
                      const tsIntTbl = new BRI_TimesheetIntravelTracking();
                      tsIntTbl.CreatedOn = new Date(dt[0].currentDt);
                      tsIntTbl.Duration = ti.Duration;
                      tsIntTbl.EndTime = ti.EndTime;
                      tsIntTbl.IntravelId = ti.IntravalId;
                      tsIntTbl.IsActive = true;
                      tsIntTbl.StartTime = ti.startTime;
                      tsIntTbl.TimeSheetID = tsData.TimeSheetID;
                      await this.tsIntravelRepository.save(tsIntTbl);
                    }

                    await this.labourTsRepository.update(
                      {
                        TimeSheetLabourDetailsID: requiredTsData[0].LabourTsId,
                      },
                      {
                        EndTime: dataIn1[0].workEnd,
                        WorkHrsInMin: requiredTsData[0].averageMins,
                        ModifiedOn: new Date(dt[0].currentDt),
                        ModifiedBy: dto.userId,
                      },
                    );

                    // -------------------------

                    finalData.push(requiredTsData[0]);
                    for await (const prevData of previousTsData) {
                      const param =
                        'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                        tsData.DepartmentID +
                        ',"' +
                        prevData.StartTime +
                        '"';

                      const dataIn2 =
                        await this.intravelRepository.query(param);

                      prevData.averageMins =
                        requiredTsData[0].averageMins +
                        prevData.startTimeDifference -
                        dataIn2[0].intravelSum;
                      console.log(
                        ' requiredTsData[0].averageMins+prevData.startTimeDifference: ',
                        requiredTsData[0].averageMins,
                        '+',
                        prevData.startTimeDifference,
                        '=',
                        prevData.averageMins,
                      );
                      finalData.push(prevData);
                    }
                  } else {
                    requiredTsData[0].averageMins =
                      requiredTsData[0].endTimeDifference - previousAvg;
                    console.log(
                      '(requiredTsData[0].endTimeDifference-previousAvg) (',
                      requiredTsData[0].endTimeDifference,
                      '-',
                      previousAvg,
                      ')= requiredTsData[0].averageMins',
                    );

                    const param =
                      'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                      tsData.DepartmentID +
                      ',"' +
                      requiredTsData[0].StartTime +
                      '"';

                    const dataIn1 = await this.intravelRepository.query(param);

                    requiredTsData[0].averageMins =
                      requiredTsData[0].averageMins - dataIn1[0].intravelSum;

                    for await (const ti of dataIn1) {
                      const tsIntTbl = new BRI_TimesheetIntravelTracking();
                      tsIntTbl.CreatedOn = new Date(dt[0].currentDt);
                      tsIntTbl.Duration = ti.Duration;
                      tsIntTbl.EndTime = ti.EndTime;
                      tsIntTbl.IntravelId = ti.IntravalId;
                      tsIntTbl.IsActive = true;
                      tsIntTbl.StartTime = ti.startTime;
                      tsIntTbl.TimeSheetID = tsData.TimeSheetID;
                      await this.tsIntravelRepository.save(tsIntTbl);
                    }

                    await this.labourTsRepository.update(
                      {
                        TimeSheetLabourDetailsID: requiredTsData[0].LabourTsId,
                      },
                      {
                        EndTime: dataIn1[0].workEnd,
                        WorkHrsInMin: requiredTsData[0].averageMins,
                        ModifiedOn: new Date(dt[0].currentDt),
                        ModifiedBy: dto.userId,
                      },
                    );

                    // -------------------------

                    finalData.push(requiredTsData[0]);
                  }

                  for await (const fd of finalData) {
                    await this.labourmMultiTaskTsRepository.update(
                      {
                        ParrentLabourTsId: fd.ParrentLabourTsId,
                        LabourTsId: fd.LabourTsId,
                      },
                      {
                        EndTime: new Date(dt[0].currentDt),
                        ConsolidatedDuration: fd.averageMins,
                        IsCompleted: true,
                      },
                    );
                    await this.labourmMultiTaskTsRepository.update(
                      {
                        ParrentLabourTsId: fd.LabourTsId,
                        LabourTsId: fd.ParrentLabourTsId,
                      },
                      {
                        EndTime: new Date(dt[0].currentDt),
                        ConsolidatedDuration: fd.averageMins,
                        IsCompleted: true,
                      },
                    );
                  }
                }
                // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              }
            }

            await this.timeSheetRepository.update(
              { TimeSheetID: tsData.TimeSheetID },
              { IsClosed: true },
            );
          }
        } else if (dto.status == 'Completed') {
          const wsu = await this.workorderStepsRepository.update(
            { WorkOrderStepID: dto.workorderStepId },
            {
              ModifiedBy: dto.userId,
              ModifiedOn: new Date(dt[0].currentDt),
              StatusId: wossCompleted.TaxnomyId,
              ActualEndDate: new Date(dt[0].currentDt),
            },
          );
          if (wsu.affected > 0) {
            const wssh = await this.workorderStepsHistoryRepository.findOne({
              where: {
                WorkOrderStepID: dto.workorderStepId,
                IsLastRecord: true,
              },
            });
            const wsshu = await this.workorderStepsHistoryRepository.update(
              { WorkOrderStepID: dto.workorderStepId, IsLastRecord: true },
              { IsLastRecord: false },
            );

            if (wsshu.affected > 0) {
              wssh.HistoryId = null;
              wssh.CreatedBy = dto.userId;
              wssh.CreatedOn = new Date(dt[0].currentDt);
              wssh.StatusId = wossCompleted.TaxnomyId;
              wssh.IsLastRecord = true;
              await this.workorderStepsHistoryRepository.save(wssh);
            }
            //  const tsData= await this.timeSheetRepository.findOne({where:{WorkOrderID:dto.workorderId,WorkOrderStepID:dto.workorderStepId,IsClosed:false}})
            for await (const i of dto.itemTimeSheet) {
              const its = new BRI_ItemTimeSheet();
              its.CreatedAt = new Date(dt[0].currentDt);
              its.IsActive = true;
              //  its.ItemID = i.itemId;
              // its.RequisitionID = i.mrId;
              its.Quentity = i.usedQuantity;
              its.ItemID = i.TimeSheetITemId;
              its.Remarks = i.remarks;
              its.TimeSheetID = tsData.TimeSheetID;
              its.TimeSheetOn = new Date(dt[0].currentDt);
              const itSave = await this.tsItemRepository.save(its);
              console.log(i.TimeSheetITemId, 'TimeSheetITemId');
              // if (itSave) {
              //   const woi = await this.workorderItemsRepository.findOne({
              //     where: { WorkOrderItemId: i.workOrderItemId },
              //   });
              //   woi.UsedCount = woi.UsedCount + parseInt(i.usedQuantity, 10);
              //   woi.AvailableCount = woi.AloatedCount - woi.UsedCount;
              //   woi.ModifiedBy = dto.userId;
              //   woi.ModifiedOn = new Date(dt[0].currentDt);
              //   await this.workorderItemsRepository.save(woi);
              // }
              if (itSave) {
                const itemData =
                  await this.timesheetItemMasterRepository.findOne({
                    where: { TimeSheetITemId: i.TimeSheetITemId },
                  });
                console.log(
                  itemData.AvailableQuantity - i.usedQuantity,
                  '(itemData.AvailableQuantity - i.usedQuantity)',
                );
                const up = await this.timesheetItemMasterRepository.update(
                  { TimeSheetITemId: i.TimeSheetITemId },
                  {
                    AvailableQuantity:
                      itemData.AvailableQuantity - i.usedQuantity,
                    ModifiedOn: new Date(dt[0].currentDt),
                    ModifiedBy: dto.userId,
                  },
                );
                console.log(up, ' update');
              }
            }

            const labourTs = await this.labourTsRepository.find({
              where: { TimeSheetID: tsData.TimeSheetID },
            });
            const department = await this.departmentRepository.findOne({
              where: { DepartmentId: tsData.DepartmentID },
            });
            if (
              department.DepartmentCode != 'CNC' &&
              department.DepartmentCode != 'Painting'
            ) {
              for await (const ls of labourTs) {
                const hr = ls.StartTime.getHours();
                const mm = ls.StartTime.getMinutes();
                const day = ls.StartTime.getDate();
                const month = ls.StartTime.getMonth() + 1;
                const year = ls.StartTime.getFullYear();
                const st = year + '-' + month + '-' + day + ' ' + hr + ':' + mm;
                const param =
                  'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                  tsData.DepartmentID +
                  ',"' +
                  st +
                  '"';
                console.log(param, 'sp params');
                const data = await this.intravelRepository.query(param);
                // Interval Tracking
                for await (const ti of data) {
                  const tsIntTbl = new BRI_TimesheetIntravelTracking();
                  tsIntTbl.CreatedOn = new Date();
                  tsIntTbl.Duration = ti.Duration;
                  tsIntTbl.EndTime = ti.EndTime;
                  tsIntTbl.IntravelId = ti.IntravalId;
                  tsIntTbl.IsActive = true;
                  tsIntTbl.StartTime = ti.startTime;
                  tsIntTbl.TimeSheetID = tsData.TimeSheetID;
                  await this.tsIntravelRepository.save(tsIntTbl);
                }

                await this.labourTsRepository.update(
                  { TimeSheetLabourDetailsID: ls.TimeSheetLabourDetailsID },
                  {
                    EndTime: data[0].workEnd,
                    WorkHrsInMin: data[0].workMin,
                    ModifiedOn: new Date(dt[0].currentDt),
                    ModifiedBy: dto.userId,
                  },
                );
              }
            } else if (
              department.DepartmentCode == 'CNC' ||
              department.DepartmentCode == 'Painting'
            ) {
              console.log(labourTs, ' labour ts');

              for await (const ls of labourTs) {
                console.log(
                  ls.TimeSheetLabourDetailsID,
                  'TimeSheetLabourDetailsID',
                );
                const labourTsId = ls.TimeSheetLabourDetailsID;
                const labourTsData = await this.intravelRepository.query(
                  'exec BRI_USP_Multi_EmployeeTS_Calc ' + labourTsId,
                );
                // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                //   console.log(labourTsData,'labourTsData');
                const requiredTsData = labourTsData.filter(
                  (x) =>
                    x.LabourTsId == labourTsId &&
                    x.ParrentLabourTsId == labourTsId,
                );
                const previousTsData = labourTsData.filter(
                  (x) =>
                    x.ParrentLabourTsId == labourTsId && x.isPreviousStart == 1,
                );
                const afterTsData = labourTsData.filter(
                  (x) =>
                    (x.LabourTsId != labourTsId ||
                      x.ParrentLabourTsId != labourTsId) &&
                    x.isPreviousStart == 0,
                );
                const finalData = [];
                let previousAvg = 0;
                let index = 0;
                console.log(requiredTsData, ' requiredTsData');
                console.log(previousTsData, ' previousTsData');
                console.log(afterTsData, ' afterTsData');
                if (requiredTsData.length > 0) {
                  if (afterTsData.length > 0) {
                    for await (const data of afterTsData) {
                      const avg =
                        (data.endTimeDifference - previousAvg) /
                        labourTsData.length;

                      const param =
                        'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                        tsData.DepartmentID +
                        ',"' +
                        data.StartTime +
                        '"';

                      const dataIn = await this.intravelRepository.query(param);

                      // const removeInterval=(avg-dataIn[0].intravelSum);

                      console.log(
                        '(data.endTimeDifference-previousAvg)/(labourTsData.length) (',
                        data.endTimeDifference,
                        '-',
                        previousAvg,
                        ')/(',
                        labourTsData.length,
                        ')=',
                        avg,
                      );
                      data.averageMins = avg - dataIn[0].intravelSum;
                      previousAvg = previousAvg + avg;
                      finalData.push(data);
                      index = index + 1;
                      if (afterTsData.length === index) {
                        console.log(requiredTsData[0], 'requiredTsData[0]');
                        if (previousTsData.length > 0) {
                          requiredTsData[0].averageMins =
                            (requiredTsData[0].endTimeDifference -
                              previousAvg) /
                            (previousTsData.length + 1);
                          console.log(
                            '(requiredTsData[0].endTimeDifference-previousAvg)/(previousTsData.length) (',
                            requiredTsData[0].endTimeDifference,
                            '-',
                            previousAvg,
                            ')/(',
                            previousTsData.length + 1,
                            ')=',
                            requiredTsData[0].averageMins,
                          );
                        } else {
                          requiredTsData[0].averageMins =
                            requiredTsData[0].endTimeDifference - previousAvg;
                          console.log(
                            '(requiredTsData[0].endTimeDifference-previousAvg) (',
                            requiredTsData[0].endTimeDifference,
                            '-',
                            previousAvg,
                            ')= requiredTsData[0].averageMins',
                          );
                        }

                        // Interval Calculation

                        const param =
                          'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                          tsData.DepartmentID +
                          ',"' +
                          requiredTsData[0].StartTime +
                          '"';

                        const dataIn1 =
                          await this.intravelRepository.query(param);

                        requiredTsData[0].averageMins =
                          requiredTsData[0].averageMins -
                          dataIn1[0].intravelSum;

                        for await (const ti of dataIn1) {
                          const tsIntTbl = new BRI_TimesheetIntravelTracking();
                          tsIntTbl.CreatedOn = new Date(dt[0].currentDt);
                          tsIntTbl.Duration = ti.Duration;
                          tsIntTbl.EndTime = ti.EndTime;
                          tsIntTbl.IntravelId = ti.IntravalId;
                          tsIntTbl.IsActive = true;
                          tsIntTbl.StartTime = ti.startTime;
                          tsIntTbl.TimeSheetID = tsData.TimeSheetID;
                          await this.tsIntravelRepository.save(tsIntTbl);
                        }

                        await this.labourTsRepository.update(
                          {
                            TimeSheetLabourDetailsID:
                              requiredTsData[0].LabourTsId,
                          },
                          {
                            EndTime: dataIn1[0].workEnd,
                            WorkHrsInMin: requiredTsData[0].averageMins,
                            ModifiedOn: new Date(dt[0].currentDt),
                            ModifiedBy: dto.userId,
                          },
                        );

                        // -------------------------

                        finalData.push(requiredTsData[0]);
                        for await (const prevData of previousTsData) {
                          const param =
                            'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                            tsData.DepartmentID +
                            ',"' +
                            prevData.StartTime +
                            '"';

                          const dataIn2 =
                            await this.intravelRepository.query(param);

                          prevData.averageMins =
                            requiredTsData[0].averageMins +
                            prevData.startTimeDifference -
                            dataIn2[0].intravelSum;
                          console.log(
                            ' requiredTsData[0].averageMins+prevData.startTimeDifference: ',
                            requiredTsData[0].averageMins,
                            '+',
                            prevData.startTimeDifference,
                            '=',
                            prevData.averageMins,
                          );
                          finalData.push(prevData);
                        }
                      }
                    }
                  } else if (previousTsData.length > 0) {
                    console.log(requiredTsData[0], 'requiredTsData[0]');
                    if (previousTsData.length > 0) {
                      requiredTsData[0].averageMins =
                        (requiredTsData[0].endTimeDifference - previousAvg) /
                        (previousTsData.length + 1);
                      console.log(
                        '(requiredTsData[0].endTimeDifference-previousAvg)/(previousTsData.length) (',
                        requiredTsData[0].endTimeDifference,
                        '-',
                        previousAvg,
                        ')/(',
                        previousTsData.length + 1,
                        ')=',
                        requiredTsData[0].averageMins,
                      );
                    } else {
                      requiredTsData[0].averageMins =
                        requiredTsData[0].endTimeDifference - previousAvg;
                      console.log(
                        '(requiredTsData[0].endTimeDifference-previousAvg) (',
                        requiredTsData[0].endTimeDifference,
                        '-',
                        previousAvg,
                        ')= requiredTsData[0].averageMins',
                      );
                    }

                    // Interval Calculation

                    const param =
                      'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                      tsData.DepartmentID +
                      ',"' +
                      requiredTsData[0].StartTime +
                      '"';

                    const dataIn1 = await this.intravelRepository.query(param);

                    requiredTsData[0].averageMins =
                      requiredTsData[0].averageMins - dataIn1[0].intravelSum;

                    for await (const ti of dataIn1) {
                      const tsIntTbl = new BRI_TimesheetIntravelTracking();
                      tsIntTbl.CreatedOn = new Date(dt[0].currentDt);
                      tsIntTbl.Duration = ti.Duration;
                      tsIntTbl.EndTime = ti.EndTime;
                      tsIntTbl.IntravelId = ti.IntravalId;
                      tsIntTbl.IsActive = true;
                      tsIntTbl.StartTime = ti.startTime;
                      tsIntTbl.TimeSheetID = tsData.TimeSheetID;
                      await this.tsIntravelRepository.save(tsIntTbl);
                    }

                    await this.labourTsRepository.update(
                      {
                        TimeSheetLabourDetailsID: requiredTsData[0].LabourTsId,
                      },
                      {
                        EndTime: dataIn1[0].workEnd,
                        WorkHrsInMin: requiredTsData[0].averageMins,
                        ModifiedOn: new Date(dt[0].currentDt),
                        ModifiedBy: dto.userId,
                      },
                    );

                    // -------------------------

                    finalData.push(requiredTsData[0]);
                    for await (const prevData of previousTsData) {
                      const param =
                        'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                        tsData.DepartmentID +
                        ',"' +
                        prevData.StartTime +
                        '"';

                      const dataIn2 =
                        await this.intravelRepository.query(param);

                      prevData.averageMins =
                        requiredTsData[0].averageMins +
                        prevData.startTimeDifference -
                        dataIn2[0].intravelSum;
                      console.log(
                        ' requiredTsData[0].averageMins+prevData.startTimeDifference: ',
                        requiredTsData[0].averageMins,
                        '+',
                        prevData.startTimeDifference,
                        '=',
                        prevData.averageMins,
                      );
                      finalData.push(prevData);
                    }
                  } else {
                    requiredTsData[0].averageMins =
                      requiredTsData[0].endTimeDifference - previousAvg;
                    console.log(
                      '(requiredTsData[0].endTimeDifference-previousAvg) (',
                      requiredTsData[0].endTimeDifference,
                      '-',
                      previousAvg,
                      ')= requiredTsData[0].averageMins',
                    );

                    const param =
                      'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                      tsData.DepartmentID +
                      ',"' +
                      requiredTsData[0].StartTime +
                      '"';

                    const dataIn1 = await this.intravelRepository.query(param);

                    requiredTsData[0].averageMins =
                      requiredTsData[0].averageMins - dataIn1[0].intravelSum;

                    for await (const ti of dataIn1) {
                      const tsIntTbl = new BRI_TimesheetIntravelTracking();
                      tsIntTbl.CreatedOn = new Date(dt[0].currentDt);
                      tsIntTbl.Duration = ti.Duration;
                      tsIntTbl.EndTime = ti.EndTime;
                      tsIntTbl.IntravelId = ti.IntravalId;
                      tsIntTbl.IsActive = true;
                      tsIntTbl.StartTime = ti.startTime;
                      tsIntTbl.TimeSheetID = tsData.TimeSheetID;
                      await this.tsIntravelRepository.save(tsIntTbl);
                    }

                    await this.labourTsRepository.update(
                      {
                        TimeSheetLabourDetailsID: requiredTsData[0].LabourTsId,
                      },
                      {
                        EndTime: dataIn1[0].workEnd,
                        WorkHrsInMin: requiredTsData[0].averageMins,
                        ModifiedOn: new Date(dt[0].currentDt),
                        ModifiedBy: dto.userId,
                      },
                    );

                    // -------------------------

                    finalData.push(requiredTsData[0]);
                  }

                  for await (const fd of finalData) {
                    await this.labourmMultiTaskTsRepository.update(
                      {
                        ParrentLabourTsId: fd.ParrentLabourTsId,
                        LabourTsId: fd.LabourTsId,
                      },
                      {
                        EndTime: new Date(dt[0].currentDt),
                        ConsolidatedDuration: fd.averageMins,
                        IsCompleted: true,
                      },
                    );
                    await this.labourmMultiTaskTsRepository.update(
                      {
                        ParrentLabourTsId: fd.LabourTsId,
                        LabourTsId: fd.ParrentLabourTsId,
                      },
                      {
                        EndTime: new Date(dt[0].currentDt),
                        ConsolidatedDuration: fd.averageMins,
                        IsCompleted: true,
                      },
                    );
                  }
                }
                // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              }
            }
            await this.timeSheetRepository.update(
              { TimeSheetID: tsData.TimeSheetID },
              { IsClosed: true },
            );
          }
        }

        for await (const scrap of dto.scrapTimeSheet) {
          const scrapTbl = new BRI_ScrapItemTimesheet();
          scrapTbl.CreatedBy = dto.userId;
          scrapTbl.CreatedOn = new Date(dt[0].currentDt);
          scrapTbl.DepartmentId = dto.departmentId;
          scrapTbl.IsActive = true;
          scrapTbl.TimesheetId = tsData.TimeSheetID;
          scrapTbl.WorkorderStepId = tsData.WorkOrderStepID;
          scrapTbl.ScrapItem = scrap.scrapItem;
          scrapTbl.Quantity = scrap.quantity;
          await this.scrapItemTimesheetRepository.save(scrapTbl);
        }

        for await (const machine of dto.machineTimeSheet) {
          const machineTbl = new BRI_MachineTimesheet();
          machineTbl.CreatedBy = dto.userId;
          machineTbl.CreatedOn = new Date(dt[0].currentDt);
          machineTbl.DepartmentId = dto.departmentId;
          machineTbl.Duration = machine.duration;
          machineTbl.IsActive = true;
          machineTbl.TimesheetId = tsData.TimeSheetID;
          machineTbl.WorkorderStepId = dto.workorderStepId;
          machineTbl.MachineId = machine.machineId;
          await this.machineTimesheetRepository.save(machineTbl);
        }

        const [list1, count1] =
          await this.workorderStepsRepository.findAndCount({
            where: { WorkOrderID: dto.workorderId, IsActive: true },
          });
        const [list, count] = await this.workorderStepsRepository.findAndCount({
          where: {
            WorkOrderID: dto.workorderId,
            IsActive: true,
            StatusId: wossCompleted.TaxnomyId,
          },
        });
        if (count == count1) {
          const wou = await this.workorderMasterRepository.update(
            { WorkOrderID: dto.workorderId },
            { StatusID: woCompleted.TaxnomyId },
          );
          if (wou.affected > 0) {
            const wh = await this.workorderMasterHistoryRepository.findOne({
              where: { WorkOrderID: dto.workorderId, IsLastRecord: true },
            });
            await this.workorderMasterHistoryRepository.update(
              { WorkOrderID: dto.workorderId, IsLastRecord: true },
              { IsLastRecord: false },
            );
            wh.created_by = dto.userId;
            wh.created_on = new Date(dt[0].currentDt);
            wh.StatusID = woCompleted.TaxnomyId;
            wh.IsLastRecord = true;
            wh.HistoryID = null;
            await this.workorderMasterHistoryRepository.save(wh);
          }

          await this.workorderCompletionMailTrigger(dto.workorderId);
        }
      }
      return 'Successfully saved.';
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async workorder_timesheet_meterial_table(workorderStepId: any): Promise<any> {
    try {
      const param =
        'exec BRI_USP_TimeSheetMeterialTable_Load ' + workorderStepId;
      console.log(param, 'sp params');
      const data = this.workorderItemsRepository.query(param);
      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async workorder_timesheet_labourTime_table(
    workorderStepId: any,
  ): Promise<any> {
    try {
      const param = 'EXEC BRI_USP_LabourTimesheetTable ' + workorderStepId;
      console.log(param, 'sp params');
      const data = await this.timeSheetRepository.query(param);
      console.log(data, 'data');
      if (data.length > 0) {
        const department = await this.departmentRepository.findOne({
          where: { DepartmentId: data[0].DepartmentID },
        });
        if (
          department.DepartmentCode != 'CNC' &&
          department.DepartmentCode != 'Painting'
        ) {
          const result = [];
          for (const d of data) {
            const param =
              'EXEC BRI_USP_Get_Timesheet_Intravel ' +
              d.DepartmentID +
              ',"' +
              d.StartTime +
              '"';
            console.log(param, 'param 1405');
            const dataIn = await this.intravelRepository.query(param);
            console.log(dataIn, 'dataIn');
            const obj = {
              employeeId: d.EmployeeId,
              employeeCode: d.EmployeeCode,
              employeeName: d.EmployeeName,
              workHrs: dataIn[0].workHr,
              workMin: dataIn[0].workMin,
            };
            result.push(obj);
          }
          return result;
        } else if (
          department.DepartmentCode == 'CNC' ||
          department.DepartmentCode == 'Painting'
        ) {
          const result = [];
          for (const d of data) {
            const labourTsId = d.TimeSheetLabourDetailsID;
            const labourTsData = await this.intravelRepository.query(
              'exec BRI_USP_Multi_EmployeeTS_Calc ' + labourTsId,
            );

            const requiredTsData = labourTsData.filter(
              (x) =>
                x.LabourTsId === labourTsId &&
                x.ParrentLabourTsId === labourTsId,
            );
            const previousTsData = labourTsData.filter(
              (x) =>
                x.ParrentLabourTsId === labourTsId && x.isPreviousStart === 1,
            );
            const afterTsData = labourTsData.filter(
              (x) =>
                (x.LabourTsId != labourTsId ||
                  x.ParrentLabourTsId != labourTsId) &&
                x.isPreviousStart === 0,
            );
            const finalData = [];
            let previousAvg = 0;
            let index = 0;
            if (requiredTsData.length > 0) {
              if (afterTsData.length > 0) {
                for await (const data of afterTsData) {
                  const avg =
                    (data.endTimeDifference - previousAvg) /
                    labourTsData.length;
                  console.log(
                    '(data.endTimeDifference-previousAvg)/(labourTsData.length) (',
                    data.endTimeDifference,
                    '-',
                    previousAvg,
                    ')/(',
                    labourTsData.length,
                    ')=',
                    avg,
                  );
                  data.averageMins = avg;
                  previousAvg = previousAvg + avg;
                  finalData.push(data);
                  index = index + 1;
                  if (afterTsData.length === index) {
                    if (previousTsData.length > 0) {
                      requiredTsData[0].averageMins =
                        (requiredTsData[0].endTimeDifference - previousAvg) /
                        (previousTsData.length + 1);
                      console.log(
                        '(requiredTsData[0].endTimeDifference-previousAvg)/(previousTsData.length) (',
                        requiredTsData[0].endTimeDifference,
                        '-',
                        previousAvg,
                        ')/(',
                        previousTsData.length + 1,
                        ')=',
                        requiredTsData[0].averageMins,
                      );
                    } else {
                      requiredTsData[0].averageMins =
                        requiredTsData[0].endTimeDifference - previousAvg;
                      console.log(
                        '(requiredTsData[0].endTimeDifference-previousAvg) (',
                        requiredTsData[0].endTimeDifference,
                        '-',
                        previousAvg,
                        ')= requiredTsData[0].averageMins',
                      );
                    }

                    // Interval Calculation

                    const param =
                      'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                      d.DepartmentID +
                      ',"' +
                      requiredTsData[0].StartTime +
                      '"';
                    console.log(param, 'param 1405');
                    const dataIn = await this.intravelRepository.query(param);
                    console.log(dataIn, 'dataIn');
                    const removeInterval =
                      requiredTsData[0].averageMins - dataIn[0].intravelSum;
                    const hours = Math.floor(removeInterval / 60);
                    const minutes = Math.floor(removeInterval % 60);
                    const obj = {
                      employeeId: d.EmployeeId,
                      employeeCode: d.EmployeeCode,
                      employeeName: d.EmployeeName,
                      workHrs: hours + ':' + minutes,
                      workMin: removeInterval,
                    };
                    result.push(obj);

                    // -------------------------

                    finalData.push(requiredTsData[0]);
                    for await (const prevData of previousTsData) {
                      prevData.averageMins =
                        requiredTsData[0].averageMins +
                        prevData.startTimeDifference;
                      console.log(
                        ' requiredTsData[0].averageMins+prevData.startTimeDifference: ',
                        requiredTsData[0].averageMins,
                        '+',
                        prevData.startTimeDifference,
                        '=',
                        prevData.averageMins,
                      );
                      finalData.push(prevData);
                    }
                  }
                }
              } else if (previousTsData.length > 0) {
                requiredTsData[0].averageMins =
                  (requiredTsData[0].endTimeDifference - previousAvg) /
                  (previousTsData.length + 1);
                console.log(
                  '(requiredTsData[0].endTimeDifference-previousAvg)/(previousTsData.length) (',
                  requiredTsData[0].endTimeDifference,
                  '-',
                  previousAvg,
                  ')/(',
                  previousTsData.length + 1,
                  ')=',
                  requiredTsData[0].averageMins,
                );
                const param =
                  'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                  d.DepartmentID +
                  ',"' +
                  requiredTsData[0].StartTime +
                  '"';
                console.log(param, 'param 1405');
                const dataIn = await this.intravelRepository.query(param);
                console.log(dataIn, 'dataIn');
                const removeInterval =
                  requiredTsData[0].averageMins - dataIn[0].intravelSum;
                const hours = Math.floor(removeInterval / 60);
                const minutes = Math.floor(removeInterval % 60);
                const obj = {
                  employeeId: d.EmployeeId,
                  employeeCode: d.EmployeeCode,
                  employeeName: d.EmployeeName,
                  workHrs: hours + ':' + minutes,
                  workMin: removeInterval,
                };
                result.push(obj);

                // -------------------------

                finalData.push(requiredTsData[0]);
                for await (const prevData of previousTsData) {
                  prevData.averageMins =
                    requiredTsData[0].averageMins +
                    prevData.startTimeDifference;
                  console.log(
                    ' requiredTsData[0].averageMins+prevData.startTimeDifference: ',
                    requiredTsData[0].averageMins,
                    '+',
                    prevData.startTimeDifference,
                    '=',
                    prevData.averageMins,
                  );
                  finalData.push(prevData);
                }
              } else {
                requiredTsData[0].averageMins =
                  requiredTsData[0].endTimeDifference - previousAvg;
                console.log(
                  '(requiredTsData[0].endTimeDifference-previousAvg) (',
                  requiredTsData[0].endTimeDifference,
                  '-',
                  previousAvg,
                  ')= requiredTsData[0].averageMins',
                );
                const param =
                  'EXEC BRI_USP_Get_Timesheet_Intravel ' +
                  d.DepartmentID +
                  ',"' +
                  requiredTsData[0].StartTime +
                  '"';
                console.log(param, 'param 1405');
                const dataIn = await this.intravelRepository.query(param);
                console.log(dataIn, 'dataIn');
                const removeInterval =
                  requiredTsData[0].averageMins - dataIn[0].intravelSum;
                const hours = Math.floor(removeInterval / 60);
                const minutes = Math.floor(removeInterval % 60);
                const obj = {
                  employeeId: d.EmployeeId,
                  employeeCode: d.EmployeeCode,
                  employeeName: d.EmployeeName,
                  workHrs: hours + ':' + minutes,
                  workMin: removeInterval,
                };
                result.push(obj);
              }
            }
          }
          return result;
        }
      } else {
        return [];
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get_dashboard(locationId: any): Promise<any> {
    try {
      if (locationId == -1) {
        locationId = null;
      }
      //const param = 'EXEC BRI_USP_dashboard ' + locationId;
      const consolidated = await this.alertMasterRepository.query(
        'select woStatus,total,hold,todayReleased from BRI_View_Dashboard_initite_inprogress ',
      );
      //    where Location=isnull(' +
      //     locationId +
      //     ',Location)',
      // );
      const department_status = await this.alertMasterRepository.query(
        ' select DepartmentCode,Initiated,Inprogress from BRI_View_Dashboard_initite_inprogress_by_department',
      );
      //    where LocationId=isnull(' +
      //     locationId +
      //     ',LocationId) order by  DepartmentCode ASC',
      // );
      const plan_complete_ratio = await this.alertMasterRepository.query(
        ' select DepartmentName,total from BRI_View_Dashboard_Ondate_Complete order by DepartmentName asc',
      );
      //    where Location=isnull(' +
      //     locationId +
      //     ',Location) order by  DepartmentName ASC',
      // );
      const hold = await this.alertMasterRepository.query(
        '(select COUNT(WorkOrderID) as hold from BRI_WorkOrderMaster where IsHolded=1)',
      );
      const todayReleased = await this.alertMasterRepository.query(
        '(select COUNT(WorkOrderID) as todayReleased from BRI_WorkOrderMaster where cast(CreatedOn as date)=cast(GETDATE() as DATE))',
      );
      const dt = new Date();
      // dt = DateTime.now().setZone('Asia/Dubai').;
      return {
        consolidated,
        department_status,
        plan_complete_ratio,
        hold: hold[0].hold,
        todayReleased: todayReleased[0].todayReleased,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async ItemRequistionItemTime_table(workorderStepId: any): Promise<any> {
    try {
      // const param =
      //   'EXEC BRI_USP_operation_ItemRequistion_Timesheet ' + workorderStepId;
      // //  console.log(param, 'sp params');
      // const data = await this.timeSheetRepository.query(param);

      // return data;

      const data = await this.timesheetItemMasterRepository.find({
        where: { WorkorderStepId: workorderStepId, IsActive: true },
        select: {
          TimeSheetITemId: true,
          Item: true,
          AlloatedQuantity: true,
          AvailableQuantity: true,
        },
      });
      console.log(data, 'item data');
      return data;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async MachineryListForTimeTable(obj: any): Promise<any> {
    try {
      const data = await this.machineRepository.find({
        where: {
          DepartmentId: obj.departmentId,
          SubsidiaryId: obj.subsidiaryId,
          IsActive: 1,
        },
        select: { MachineId: true, MachineCode: true, MachineName: true },
      });

      return data;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async ScrapItemTime_table(workorderStepId: any): Promise<any> {
    try {
      const sql = this.workorderItemsRepository.createQueryBuilder('wi');
      sql.innerJoin(BRI_MasterItem, 'mi', 'mi.ItemId=wi.ItemId');
      sql.select('mi.ItemId');
      sql.addSelect('mi.ItemName');
      sql.addSelect('mi.Uom');
      sql.where('wi.WorkorderStepId=:StepId', {
        StepId: workorderStepId,
      });

      const data = await sql.getRawMany();
      return data;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async meterial_requistion_table_list( dto: mrTableDto): Promise<any> {
  //   try {
  //     const department_id = dto.departmentId;
  //     const location = dto.location == null ? null : '"' + dto.location + '"';
  //     const ReleaseDate =
  //       dto.releaseDate == null ? null : '"' + dto.releaseDate + '"';
  //     const order_by = dto.order_by == null ? null : '"' + dto.order_by + '"';
  //     const sort = dto.sort == null ? null : '"' + dto.sort + '"';
  //     const search = dto.search == null ? null : '"' + dto.search + '"';
  //     const param =
  //       'exec BRI_USP_MeterialRequistion_Table ' +
  //       location +
  //       ',' +
  //       ReleaseDate +
  //       ',' +
  //       department_id +
  //       ',' +
  //       dto.start +
  //       ',' +
  //       dto.page_size +
  //       ',' +
  //       order_by +
  //       ',' +
  //       sort +
  //       ',' +
  //       search;
  //     console.log(param, 'sp params');
  //     const data = this.workorderMasterRepository.query(param);
  //     return data;
  //   } catch (e) {
  //     throw new HttpException(
  //       { message: 'Internal Server Error.' + e },
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async meterial_requistion_item_details(requistion_id): Promise<any> {
    try {
      const param =
        'select * from  BRI_VIEW_ItemrequistionDetails where RequisitionID=' +
        requistion_id;
      console.log(param, 'sp params');
      const data = this.workorderMasterRepository.query(param);
      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async timesheet_table_list(dto: tsTableDto): Promise<any> {
    try {
      const department_id = dto.department_id;
      const location = dto.location == null ? null : '"' + dto.location + '"';
      const ReleaseDate =
        dto.ReleaseDate == null ? null : '"' + dto.ReleaseDate + '"';
      const order_by = dto.order_by == null ? null : '"' + dto.order_by + '"';
      const sort = dto.sort == null ? null : '"' + dto.sort + '"';
      const search = dto.search == null ? null : '"' + dto.search + '"';
      const param =
        'exec BRI_USP_Timesheet_Table ' +
        location +
        ',' +
        ReleaseDate +
        ',' +
        department_id +
        ',' +
        dto.start +
        ',' +
        dto.page_size +
        ',' +
        order_by +
        ',' +
        sort +
        ',' +
        search;
      console.log(param, 'sp params');
      const data = this.workorderMasterRepository.query(param);
      return data;
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async timesheet_detail_view(timesheetId: any): Promise<any> {
    try {
      //  console.log(timesheetId,'timesheetId');
      const labourData = await this.workorderMasterRepository.query(
        'select * from  BRI_VIEW_LabourTimesheet where TimeSheetID=' +
          timesheetId,
      );
      const itemData = await this.workorderMasterRepository.query(
        'select * from  BRI_VIEW_ItemTimesheet where TimeSheetID=' +
          timesheetId,
      );
      const machineData = await this.workorderMasterRepository.query(
        'select * from  BRI_VIEW_MachineTimesheet where TimeSheetID=' +
          timesheetId,
      );
      const scrapData = await this.workorderMasterRepository.query(
        'select * from  BRI_VIEW_ScrapTimesheet where TimeSheetID=' +
          timesheetId,
      );
      // console.log(labourData,itemData,machineData,scrapData);
      return { labourData, itemData, machineData, scrapData };
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLiveIntervals(departmentId: any): Promise<any> {
    try {
      const intervalData = await this.intravelRepository.query(
        'select * from BRI_UV_current_interval where DepartmentId=' +
          departmentId,
      );
      return intervalData;
      // return [
      //   {
      //     "DepartmentId": "1",
      //     "Start": "1970-01-01T04:55:00.000Z",
      //     "EndTime": "1970-01-01T05:10:00.000Z",
      //     "remainingMins": 2,
      //     "intervalType": "Intrerval"
      //   }
      // ];
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMultiEmployeeTsCalc(labourTsId: any): Promise<any> {
    try {
      const labourTsData = await this.intravelRepository.query(
        'exec BRI_USP_Multi_EmployeeTS_Calc ' + labourTsId,
      );

      const requiredTsData = labourTsData.filter(
        (x) =>
          x.LabourTsId === labourTsId && x.ParrentLabourTsId === labourTsId,
      );
      const previousTsData = labourTsData.filter(
        (x) => x.ParrentLabourTsId === labourTsId && x.isPreviousStart === 1,
      );
      const afterTsData = labourTsData.filter(
        (x) =>
          (x.LabourTsId != labourTsId || x.ParrentLabourTsId != labourTsId) &&
          x.isPreviousStart === 0,
      );
      const finalData = [];
      let previousAvg = 0;
      let index = 0;
      for await (const data of afterTsData) {
        const avg =
          (data.endTimeDifference - previousAvg) / labourTsData.length;
        console.log(
          '(data.endTimeDifference-previousAvg)/(labourTsData.length) (',
          data.endTimeDifference,
          '-',
          previousAvg,
          ')/(',
          labourTsData.length,
          ')=',
          avg,
        );
        data.averageMins = avg;
        previousAvg = previousAvg + avg;
        finalData.push(data);
        index = index + 1;
        if (afterTsData.length === index) {
          if (previousTsData.length > 0) {
            requiredTsData[0].averageMins =
              (requiredTsData[0].endTimeDifference - previousAvg) /
              (previousTsData.length + 1);
            console.log(
              '(requiredTsData[0].endTimeDifference-previousAvg)/(previousTsData.length) (',
              requiredTsData[0].endTimeDifference,
              '-',
              previousAvg,
              ')/(',
              previousTsData.length + 1,
              ')=',
              requiredTsData[0].averageMins,
            );
          } else {
            requiredTsData[0].averageMins =
              requiredTsData[0].endTimeDifference - previousAvg;
            console.log(
              '(requiredTsData[0].endTimeDifference-previousAvg) (',
              requiredTsData[0].endTimeDifference,
              '-',
              previousAvg,
              ')= requiredTsData[0].averageMins',
            );
          }
          finalData.push(requiredTsData[0]);
          for await (const prevData of previousTsData) {
            prevData.averageMins =
              requiredTsData[0].averageMins + prevData.startTimeDifference;
            console.log(
              ' requiredTsData[0].averageMins+prevData.startTimeDifference: ',
              requiredTsData[0].averageMins,
              '+',
              prevData.startTimeDifference,
              '=',
              prevData.averageMins,
            );
            finalData.push(prevData);
          }
        }
      }

      // console.log(requiredTsData,'requiredTsData');
      // console.log(previousTsData,'previousTsData');
      // console.log(afterTsData,'afterTsData');
      return { finalData, labourTsData };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async project_type_list(subsidiary_id: any,project_id:any): Promise<any> {
    try {
      const qb = await this.workorderMasterRepository.createQueryBuilder('wh');
      qb.select('wh.BusinessUnit', 'BusinessUnit');
      qb.addSelect('wh.BusinessUnitId', 'BusinessUnitId');
    
      qb.groupBy('wh.BusinessUnit,wh.BusinessUnitId');
      return await qb.getRawMany();
    } catch (e) {
      throw new HttpException(
        { message: 'Internal Server Error.' + e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async timesheet_changeRequest(dto:tsChangeRequest):Promise<any>{
    try{
          const dt = await this.drpTaxnomyRepository.query('select getdate() currentDt');
          const dtNow=new Date(dt[0].currentDt);
          const status = await this.drpTaxnomyRepository.find({
            where: { TaxnomyType: 'ChangeRequestStatus', IsActive: true },
          });
          
          if(dto.request_id==0)
          {
            const statusObj=status.find(x=>x.TaxnomyCode==='REQUESTED');
            const crTbl=new BRI_ChangeRequestFlow();
            crTbl.StatusId=statusObj.TaxnomyId;
            crTbl.Remarks=dto.remarks;
            crTbl.IsActive=true;
            crTbl.CreatedOn=dtNow;
            crTbl.CreatedBy=dto.user_id;
            crTbl.TimesheetID=dto.timesheet_id;
            const CRSave=await this.timsheetChangeRequestRepository.save(crTbl);
            if(CRSave && CRSave.RequestID>0)
            {
              for await(const labDto of dto.labourTimeSheet)
              {
                const labTbl=new BRI_LabourTimeSheetChangeRequest();
                labTbl.CreatedOn=dtNow;
                labTbl.CreatedBy=dto.user_id;
                labTbl.RequestId=CRSave.RequestID;
                labTbl.IsActive=true;
                labTbl.LabourID=labDto.labour_id;
                labTbl.TimeSheetLabourID=labDto.labourTimesheet_id;
                labTbl.WorkHrsInMin=labDto.workHrsInMin;
                labTbl.StartTime=labDto.start_time;
                labTbl.EndTime=labDto.end_time;
                labTbl.StatusId=statusObj.TaxnomyId;
                await this.labourTsChangeRequestRepository.save(labTbl);
              }
              for await(const macDto of dto.machineTimeSheet)
              {
                const macTbl= new BRI_MachineTimesheetChangeRequest();
                macTbl.MachineTimesheetId=macDto.MachineTimesheetId;
                macTbl.MachineId=macDto.machine_id;
                macTbl.Remarks=macDto.remarks;
                macTbl.RequestId=CRSave.RequestID;
                macTbl.Duration=macDto.duration;
                macTbl.CreatedOn=dtNow;
                macTbl.CreatedBy=dto.user_id;
                macTbl.IsActive=true;
                macTbl.StatusId=statusObj.TaxnomyId;
                await this.machineTsChangeRequestRepository.save(macTbl);
              }

              for await(const sDto of dto.scrapTimeSheet)
              {
                const scrapTbl=new BRI_ScrapTSChangeRequest();
                scrapTbl.RequestId=CRSave.RequestID;
                scrapTbl.Remarks=sDto.remarks;
                scrapTbl.ScrapTimesheetId=sDto.scrap_timesheet_id;
                scrapTbl.ScrapItem=sDto.scrap_item;
                scrapTbl.Quantity=sDto.quantity;
                scrapTbl.IsActive=true;
                scrapTbl.CreatedBy=dto.user_id;
                scrapTbl.CreatedOn=dtNow;
                scrapTbl.StatusId=statusObj.TaxnomyId;
                await this.scrapTsChangeRequestRepository.save(scrapTbl);

              }
            }
          }
    }catch(e)
    {
      console.log(e);
    }
  }

  async generateTSD_No(department_id, location_id) {
    try {
      const depTbl = await this.departmentRepository.findOne({
        where: { DepartmentId: department_id },
      });
      const [list, count] = await this.timeSheetRepository.findAndCount({
        where: { DepartmentID: department_id, SubsidiaryID: location_id },
      });

      const loc = await this.drpTaxnomyRepository.findOne({
        where: { TaxnomyId: location_id },
      });
      let locLetter = 'DIP';
      if (loc.TaxnomyCode == 'BRI UAQ WH') {
        locLetter = 'UAQ';
      }

      const departmentName = depTbl.DepartmentCode;
      const firstLtr = departmentName.slice(0, 1);
      let lastLtr = departmentName.slice(-1);
      const depsplit = departmentName.split(' ');
      console.log(depsplit, ' split');
      if (depsplit != null && depsplit.length > 1) {
        console.log(depsplit[1], 'depsplit[1]');
        lastLtr = depsplit[1].slice(0, 1);
      }
      const dt = new Date();
      return (
        'TS' +
        locLetter +
        firstLtr.toLocaleUpperCase() +
        lastLtr.toLocaleUpperCase() +
        (dt.getMonth() + 1) +
        (dt.getFullYear() - 2000) +
        (count + 1)
      );
    } catch (e) {
      console.log(e);
      return 'error';
    }
  }

  async generateMRD_No(department_id, location_id) {
    try {
      const depTbl = await this.departmentRepository.findOne({
        where: { DepartmentId: department_id },
      });
      const [list, count] = await this.itemRequissitionRepository.findAndCount({
        where: { DepartmentID: department_id, SubsidiaryID: location_id },
      });
      const loc = await this.drpTaxnomyRepository.findOne({
        where: { TaxnomyId: location_id },
      });
      let locLetter = 'DIP';
      if (loc.TaxnomyCode == 'BRI UAQ WH') {
        locLetter = 'UAQ';
      }
      const departmentName = depTbl.DepartmentCode;
      const firstLtr = departmentName.slice(0, 1);
      let lastLtr = departmentName.slice(-1);
      const depsplit = departmentName.split(' ');
      console.log(depsplit, ' split');
      if (depsplit != null && depsplit.length > 1) {
        console.log(depsplit[1], 'depsplit[1]');
        lastLtr = depsplit[1].slice(0, 1);
      }
      const dt = new Date();
      return (
        'MR' +
        locLetter +
        firstLtr.toLocaleUpperCase() +
        lastLtr.toLocaleUpperCase() +
        (dt.getMonth() + 1) +
        (dt.getFullYear() - 2000) +
        (count + 1)
      );
    } catch (e) {
      console.log(e);
      return 'error';
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


  async workorderCompletionMailTrigger(workorder_id:any)
  {
    console.log(workorder_id,'mail functions');
    try{
      if(workorder_id>0)
      {
        const toMails=await this.alertMasterRepository.findOne({where:{AlertName:'Workorder-Completion',IsActive:1}});
        if(toMails!=null)
        {
        const status = await this.drpTaxnomyRepository.findOne({
          where: { TaxnomyType: 'WorkOrderStatus', TaxnomyCode:'Completed',IsActive:true },
        });

        const woDetails= await this.workorderMasterRepository.findOne({where:{WorkOrderID:workorder_id}});// ,StatusID:status.TaxnomyId}});
        if(woDetails!=null)
        {
        const plan = 'exec BRI_USP_WorOrder_Planning_details ' + workorder_id;
        const planDetils=await this.drpTaxnomyRepository.query(plan);
        let tbody="";
        let si=1;
        for await(const pd of planDetils) 
        {
          const active=pd.IsActive==true?'Active':'In Active';
          tbody=tbody+'<tr><td>'+si+'</td><td>'+pd.DepartmentName+'</td><td>'+pd.actualEnd+'</td><td>'+pd.progress+'</td><td>'+active+'</td></tr>';
          si=si+1;

        }
        
          const location = join(
          __dirname,
          '../shared/template/mail/workorder_complete_mail.html',
        );
        const options = {
          encoding: 'utf-8',
        };
          const html = readFileSync(location);
        const mail_content = html;
        const Work_Status='Completed';
        const Project=woDetails.ProjectID+'  -  '+woDetails.ProjectName; 
        const Sub_Project=woDetails.SubProjectID+'  - '+woDetails.SubProjectName;
        const workorder_no=woDetails.WorkOrderNo;
        const mail_html = mail_content
          .toString()
          .replace('@@Work_Status@@', Work_Status)
          .replace('@@Project@@', Project)
          .replace('@@Sub_Project@@', Sub_Project)
          .replace('@@WorkOrderNo@@', workorder_no)
          .replace('@@tbody@@', tbody);
          
        const subject = woDetails.WorkOrderNo+' is Completed.';
        const toMaile = toMails.toEmail;

        this.sendEmail(
          toMaile,
          '',
          subject,
          mail_html,
          '',
          '',
        );

        }
      }
    }
    }catch(e)
    {
      console.log(e);
    }

  }


  async sendEmail(
    to: any,
    from: any,
    subject: any,
    html: any,
    cc: any,
    text: any,
  ) {
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
function html(
  toEmail: string,
  arg1: string,
  arg2: string,
  html: any,
  arg4: string,
) {
  throw new Error('Function not implemented.');
}
