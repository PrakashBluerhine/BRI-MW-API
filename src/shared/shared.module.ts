import { Module } from '@nestjs/common';
import { CommonService } from './services/common.service';
import { CustomConfigService } from './services/custom-config.service';
import { JwtCustomService } from './services/jwt-custom.service';

@Module({
  providers: [CommonService, JwtCustomService, CustomConfigService,
    ],
  exports:[
    CommonService,
    JwtCustomService,
    CustomConfigService
  ],
})
export class SharedModule {}
