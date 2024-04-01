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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import {
  allWorkorderTableDto,
  emailAlertTableDto,
  employeeTableDto,
  machineryTableDto,
  newEmployeeDto,
  newMachineryDto,
  newMailAlertDto,
  newMenuDto,
  newRolePermissionDto,
  RoleCreationDto,
  TableDto,
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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('create_role')
  public async create_role(
    @Body() roleCreationDto: RoleCreationDto,
  ): Promise<any> {
    const response = await this.iMasterService.create_role(roleCreationDto);
    return this.iMasterService.customResponse(
      response,
      'Roles added successfully',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: TableDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('role_table')
  public async role_table(@Body() tableDto: TableDto): Promise<any> {
    const response = await this.iMasterService.role_table(tableDto);
    return this.iMasterService.customResponse(
      response,
      'Role List!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: newEmployeeDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('employee_add_update')
  public async employee_add_update(
    @Body() tableDto: newEmployeeDto,
  ): Promise<any> {
    const response = await this.iMasterService.employee_add_update(tableDto);
    return this.iMasterService.customResponse(
      response,
      'Employee creation!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('department_list/:subsidiary_id')
  public async department_list(
    @Param('subsidiary_id') subsidiary_id: number,
  ): Promise<any> {
    const response = await this.iMasterService.department_list(subsidiary_id);
    return this.iMasterService.customResponse(
      response,
      'Department List!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: employeeTableDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('employee_list_table')
  public async employee_list_table(dto: employeeTableDto): Promise<any> {
    try {
      const response = await this.iMasterService.employee_list_table(dto);
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
    const response = await this.iMasterService.machinery_add_update(Dto);
    return this.iMasterService.customResponse(
      response,
      'New machinery creation!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('employee_department_list/:employee_id')
  public async employee_department_list(
    @Param('employee_id') employee_id: number,
  ): Promise<any> {
    const response =
      await this.iMasterService.employee_department_list(employee_id);
    return this.iMasterService.customResponse(
      response,
      'Department List!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: machineryTableDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('machinery_list_table')
  public async machinery_list_table(dto: machineryTableDto): Promise<any> {
    try {
      const response = await this.iMasterService.machinery_list_table(dto);
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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('mail_alert')
  public async mail_alert(@Body() Dto: newMailAlertDto): Promise<any> {
    const response = await this.iMasterService.email_alert(Dto);
    return this.iMasterService.customResponse(
      response,
      'Email alert creation!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: emailAlertTableDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('email_alert_list_table')
  public async email_alert_list_table(dto: emailAlertTableDto): Promise<any> {
    try {
      const response = await this.iMasterService.email_alert_list_table(dto);
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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('email_alert_receipient_list/:alert_id')
  public async email_alert_receipient_list(
    @Param('alert_id') alert_id: number,
  ): Promise<any> {
    const response =
      await this.iMasterService.email_alert_receipient_list(alert_id);
    return this.iMasterService.customResponse(
      response,
      'Email List!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('employee_email_list/:subsidiary_id')
  public async employee_email_list(
    @Param('subsidiary_id') subsidiary_id: number,
  ): Promise<any> {
    const response =
      await this.iMasterService.employee_email_list(subsidiary_id);
    return this.iMasterService.customResponse(
      response,
      'Email List!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('drp_taxnomy_list/:subsidiary_id/:type')
  public async drp_taxnomy_list(
    @Param('subsidiary_id') subsidiary_id: number,
    @Param('type') type: string,
  ): Promise<any> {
    const response = await this.iMasterService.drp_taxnomy_list(
      subsidiary_id,
      type,
    );
    return this.iMasterService.customResponse(
      response,
      'dropdown List!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: newMenuDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('menu_add_update')
  public async menu_add_update(@Body() Dto: newMenuDto): Promise<any> {
    const response = await this.iMasterService.menu_add_update(Dto);
    return this.iMasterService.customResponse(
      response,
      'Menu creation!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: TableDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('menu_fetch_all')
  public async menu_table(@Body() tableDto: TableDto): Promise<any> {
    const response = await this.iMasterService.menu_table(tableDto);
    return this.iMasterService.customResponse(
      response,
      'Menu List!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('menu_mapped_group_list/:menu_id')
  public async menu_mapped_group_list(
    @Param('menu_id') menu_id: number,
  ): Promise<any> {
    const response = await this.iMasterService.menu_mapped_group_list(menu_id);
    return this.iMasterService.customResponse(
      response,
      'menu group List!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: newRolePermissionDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('role_menu_permission')
  public async role_menu_permission(
    @Body() Dto: newRolePermissionDto,
  ): Promise<any> {
    const response = await this.iMasterService.role_menu_permission(Dto);
    return this.iMasterService.customResponse(
      response,
      'Permission creation!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('menu_role_permission/:role_id/:group_id/:subsidiary_id')
  public async menu_role_permission(
    @Param('role_id') role_id: number,
    @Param('group_id') group_id: number,
    @Param('subsidiary_id') subsidiary_id: number,
  ): Promise<any> {
    const response = await this.iMasterService.menu_role_permission({
      role_id,
      group_id,
      subsidiary_id,
    });
    return this.iMasterService.customResponse(
      response,
      'Role Permission List!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('masterData')
  public async masterData(): Promise<any> {
    const response = await this.iMasterService.masterData();
    return this.iMasterService.customResponse(
      response,
      'Role Permission List!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: allWorkorderTableDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('work_order_list_all')
  public async work_order_list_all(
    @Body() tableDto: allWorkorderTableDto,
  ): Promise<any> {
    const response = await this.iMasterService.new_work_order_list(tableDto);
    return this.iMasterService.customResponse(
      response,
      'Workorder List!',
      HttpStatus.OK.toString(),
    );
  }
}
