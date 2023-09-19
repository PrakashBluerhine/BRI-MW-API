import {  Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../shared/shared.module";
import { MasterController } from "../master/master.controller";
import { MasterService } from "../master/master.service";
import { MASTER_SERVICE } from "./interface/master.interface";
import { CustomConfigService } from "../shared/services/custom-config.service";
import { BRI_MasterRole,BRI_OperationTaxnomy,BRI_MasterRoleHistory,BRI_MasterDepartment,BRI_MasterEmployee,BRI_MasterEmployeeHistory,  BRI_MasterMachine,
  BRI_MasterMachineHistory,BRI_MasterEmailAlert, BRI_MasterEmailAlertHistory, BRI_EmailAlertRecipient, BRI_EmailAlertRecipientHistory } from "./entities/master.entity";

import { CommonService } from '../shared/services/common.service';
import { JwtCustomService } from '../shared/services/jwt-custom.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';




@Module({
  imports: [
    JwtModule.register({
      secret: new ConfigService().get('JWT_SECRET'),
      signOptions: {
        expiresIn: new ConfigService().get('JWT_EXPIRESIN')
      }
    }),
    TypeOrmModule.forFeature([BRI_MasterRole,BRI_OperationTaxnomy,BRI_MasterRoleHistory,BRI_MasterDepartment,BRI_MasterEmployee,BRI_MasterEmployeeHistory,BRI_MasterMachine,BRI_MasterMachineHistory,BRI_MasterEmailAlert,BRI_MasterEmailAlertHistory,BRI_EmailAlertRecipient,BRI_EmailAlertRecipientHistory]),
    SharedModule,
  ],
  providers: [
    { useClass: MasterService, provide: MASTER_SERVICE },
    MasterService,
    ConfigService,
    CustomConfigService,
    CommonService,
    JwtCustomService,
    JwtService,
    Repository
  ],
  controllers: [MasterController],
  exports: [],
})
export class MasterModule {

}