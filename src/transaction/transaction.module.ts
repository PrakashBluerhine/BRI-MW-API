import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { TransactionController } from '../transaction/transaction.controller';
import { TransactionService } from '../transaction/transaction.service';
import { TRANSACTION_SERVICE } from './interface/transaction.interface';
import { CustomConfigService } from '../shared/services/custom-config.service';
import {
  BRI_OperationTaxnomy,
  BRI_MasterDepartment,
  BRI_MasterEmployee,
  BRI_MasterMachine,
  BRI_MasterEmailAlert,
  BRI_EmailAlertRecipient,
  BRI_WorkOrderMaster,
  BRI_WorkOrderMasterHistory,
  BRI_WorkOrderSteps,
  BRI_WorkOrderStepsHistory,
  BRI_WorkOrderItems,
  BRI_MasterItemHistory,
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
  BRI_LabourTimeSheetChangeRequest
} from './entities/transaction.entity';

import { CommonService } from '../shared/services/common.service';
import { JwtCustomService } from '../shared/services/jwt-custom.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: new ConfigService().get('JWT_SECRET'),
      signOptions: {
        expiresIn: new ConfigService().get('JWT_EXPIRESIN'),
      },
    }),
    TypeOrmModule.forFeature([
      BRI_OperationTaxnomy,
      BRI_MasterDepartment,
      BRI_MasterEmployee,
      BRI_MasterMachine,
      BRI_MasterEmailAlert,
      BRI_EmailAlertRecipient,
      BRI_WorkOrderMaster,
      BRI_WorkOrderMasterHistory,
      BRI_WorkOrderSteps,
      BRI_WorkOrderStepsHistory,
      BRI_WorkOrderItems,
      BRI_MasterItemHistory,
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
      BRI_LabourTimeSheetChangeRequest
    ]),
    SharedModule,
  ],
  providers: [
    { useClass: TransactionService, provide: TRANSACTION_SERVICE },
    TransactionService,
    ConfigService,
    CustomConfigService,
    CommonService,
    JwtCustomService,
    JwtService,
    Repository,
  ],
  controllers: [TransactionController],
  exports: [],
})
export class TransactionModule {}
