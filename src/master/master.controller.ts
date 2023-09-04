import {
  Controller,
  Post,
  Body,
  UseFilters,
  Inject,
  HttpStatus,
  LoggerService,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import {
  RoleCreationDto,TableDto
} from './dto/master.dto';
import { MASTER_SERVICE, IMasterService } from './interface/master.interface';

@ApiTags('Master')
@Controller('master')
export class MasterController {
  constructor(
    @Inject(MASTER_SERVICE)
    private readonly iMasterService: IMasterService,
  ) {}

  @ApiBody({ type: RoleCreationDto })
  @UsePipes(new ValidationPipe())
  @Post('create_role')
  public async create_role(@Body() roleCreationDto: RoleCreationDto): Promise<any> {
    let response=await this.iMasterService.create_role(roleCreationDto);
    return this.iMasterService.customResponse(
      response,
      'Roles added successfully',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: TableDto })
  @UsePipes(new ValidationPipe())
  @Post('role_table')
  public async role_table(@Body() tableDto: TableDto): Promise<any> {
    let response=await this.iMasterService.role_table(tableDto);
    return this.iMasterService.customResponse(
      response,
      'Role List!',
      HttpStatus.OK.toString(),
    );
  }
 
}


