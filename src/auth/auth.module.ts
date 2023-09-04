import {  Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../shared/shared.module";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import { AUTH_SERVICE } from "./interface/auth.interface";
import { CustomConfigService } from "../shared/services/custom-config.service";
import { CommonService } from '../shared/services/common.service';
import { JwtCustomService } from '../shared/services/jwt-custom.service';

import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import {BRI_AuthUsers,BRI_AuthUsersHistory,BRI_AuthUserRoleMap,BRI_AuthUserRoleMapHistory,BRI_AuthSession} from'./entities/user.entity';



@Module({
  imports: [
    JwtModule.register({
      secret: new ConfigService().get('JWT_SECRET'),
      signOptions: {
        expiresIn: new ConfigService().get('JWT_EXPIRESIN')
      }
    }),
    TypeOrmModule.forFeature([BRI_AuthUsers,BRI_AuthUsersHistory,BRI_AuthUserRoleMap,BRI_AuthUserRoleMapHistory,BRI_AuthSession]),
    SharedModule,
  ],
  providers: [
    { useClass: AuthService, provide: AUTH_SERVICE },
    AuthService,
    ConfigService,
    CustomConfigService,
    CommonService,
    JwtCustomService,
    JwtService,
    Repository
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {

}