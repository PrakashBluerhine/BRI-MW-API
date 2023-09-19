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
  Param,
  Get,
} from '@nestjs/common';

import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import { emailAlertTableDto, employeeTableDto, machineryTableDto, newEmployeeDto, newMachineryDto, newMailAlertDto, RoleCreationDto, TableDto } from './dto/master.dto';
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
  public async create_role(
    @Body() roleCreationDto: RoleCreationDto,
  ): Promise<any> {
    let response = await this.iMasterService.create_role(roleCreationDto);
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
    let response = await this.iMasterService.role_table(tableDto);
    return this.iMasterService.customResponse(
      response,
      'Role List!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: newEmployeeDto })
  @UsePipes(new ValidationPipe())
  @Post('employee_add_update')
  public async employee_add_update(
    @Body() tableDto: newEmployeeDto,
  ): Promise<any> {
    let response = await this.iMasterService.employee_add_update(tableDto);
    return this.iMasterService.customResponse(
      response,
      'Employee creation!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @Get('department_list/:subsidiary_id')
  public async department_list(
    @Param('subsidiary_id') subsidiary_id: number,
  ): Promise<any> {
    let response = await this.iMasterService.department_list(subsidiary_id);
    return this.iMasterService.customResponse(
      response,
      'Department List!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: employeeTableDto })
  @UsePipes(new ValidationPipe())
  @Post('employee_list_table')
  public async employee_list_table(dto:employeeTableDto): Promise<any> {
    try {
      let response = await this.iMasterService.employee_list_table(dto);
      return this.iMasterService.customResponse(
        response,
        'Department List!',
        HttpStatus.OK.toString(),
      );
    } catch (e) {
      console.log(e);
    }
  }

  @ApiBody({ type: newMachineryDto })
  @UsePipes(new ValidationPipe())
  @Post('machinery_add_update')
  public async machinery_add_update(
    @Body() Dto: newMachineryDto,
  ): Promise<any> {
    let response = await this.iMasterService.machinery_add_update(Dto);
    return this.iMasterService.customResponse(
      response,
      'New machinery creation!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: machineryTableDto})
  @UsePipes(new ValidationPipe())
  @Post('machinery_list_table')
 public async machinery_list_table(dto:machineryTableDto):Promise<any>
 {
  try {
    let response = await this.iMasterService.machinery_list_table(dto);
    return this.iMasterService.customResponse(
      response,
      'Department List!',
      HttpStatus.OK.toString(),
    );
  } catch (e) {
    console.log(e);
  }
 }

 @ApiBody({ type: newMailAlertDto })
 @UsePipes(new ValidationPipe())
 @Post('mail_alert')
 public async mail_alert(
   @Body() Dto: newMailAlertDto,
 ): Promise<any> {
   let response = await this.iMasterService.email_alert(Dto);
   return this.iMasterService.customResponse(
     response,
     'Email alert creation!',
     HttpStatus.OK.toString(),
   );
 }

 @ApiBody({ type: emailAlertTableDto})
 @UsePipes(new ValidationPipe())
 @Post('email_alert_list_table')
public async email_alert_list_table(dto:emailAlertTableDto):Promise<any>
{
 try {
   let response = await this.iMasterService.email_alert_list_table(dto);
   return this.iMasterService.customResponse(
     response,
     'Email Alert List!',
     HttpStatus.OK.toString(),
   );
 } catch (e) {
   console.log(e);
 }
}
@UsePipes(new ValidationPipe())
@Get('email_alert_receipient_list/:alert_id')
public async email_alert_receipient_list( @Param('alert_id') alert_id: number,): Promise<any>
{
  let response = await this.iMasterService.email_alert_receipient_list(alert_id);
  return this.iMasterService.customResponse(
    response,
    'Email List!',
    HttpStatus.OK.toString(),
  );
}

@UsePipes(new ValidationPipe())
@Get('employee_email_list/:subsidiary_id')
public async employee_email_list( @Param('subsidiary_id') subsidiary_id: number,): Promise<any>
{
  let response = await this.iMasterService.employee_email_list(subsidiary_id);
  return this.iMasterService.customResponse(
    response,
    'Email List!',
    HttpStatus.OK.toString(),
  );
}

}
