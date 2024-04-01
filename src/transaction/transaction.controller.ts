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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { dot } from 'node:test/reporters';
import {
  allWorkorderTableDto,
  departmentOperationTableDto,
  meterialRequistion,
  mrTableDto,
  TableDto,
  tsChangeRequest,
  tsTableDto,
  woOperationHoldAndCompleteDto,
  woOperationStart,
  workOrderHoldCance,
  workorderPlanDto,
} from './dto/transaction.dto';
import {
  TRANSACTION_SERVICE,
  ITraansactionService,
} from './interface/transaction.interface';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly iTransactionService: ITraansactionService,
  ) {}
  
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('drp_taxnomy_list/:subsidiary_id/:type')
  public async drp_taxnomy_list(
    @Param('subsidiary_id') subsidiary_id: number,
    @Param('type') type: string,
  ): Promise<any> {
    const response = await this.iTransactionService.drp_taxnomy_list(
      subsidiary_id,
      type,
    );
    return this.iTransactionService.customResponse(
      response,
      'dropdown List!',
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
    const response =
      await this.iTransactionService.new_work_order_list(tableDto);
    return this.iTransactionService.customResponse(
      response,
      'Workorder List!',
      HttpStatus.OK.toString(),
    );
  }
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('project_list/:subsidiary_id')
  public async project_list(
    @Param('subsidiary_id') subsidiary_id: number,
  ): Promise<any> {
    const response = await this.iTransactionService.project_list(subsidiary_id);
    return this.iTransactionService.customResponse(
      response,
      'project List!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('project_workorder_list/:subsidiary_id/:project_id')
  public async project_workorder_list(
    @Param('subsidiary_id') subsidiary_id: number,
    @Param('project_id') project_id: string,
  ): Promise<any> {
    const response = await this.iTransactionService.project_workOrder_list({
      subsidiary_id,
      project_id,
    });
    return this.iTransactionService.customResponse(
      response,
      'project List!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('plan_workOrder_details/:subsidiary_id/:project_id/:workorder_id')
  public async plan_workOrder_details(
    @Param('subsidiary_id') subsidiary_id: number,
    @Param('project_id') project_id: string,
    @Param('workorder_id') workorder_id: number,
  ): Promise<any> {
    const response = await this.iTransactionService.plan_workOrder_details({
      subsidiary_id,
      project_id,
      workorder_id,
    });
    return this.iTransactionService.customResponse(
      response,
      'Workorder plan details!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: departmentOperationTableDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('department_operation_list')
  public async department_operation_list(
    @Body() tableDto: departmentOperationTableDto,
  ): Promise<any> {
    const response =
      await this.iTransactionService.department_operation_list(tableDto);
    return this.iTransactionService.customResponse(
      response,
      'Workorder List!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('department_emp_list/:subsidiary_id/:department_id')
  public async employee_list(
    @Param('subsidiary_id') subsidiary_id: number,
    @Param('department_id') department_id: number,
  ): Promise<any> {
    const response = await this.iTransactionService.department_emp_list(
      subsidiary_id,
      department_id,
    );
    return this.iTransactionService.customResponse(
      response,
      'project List!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: workorderPlanDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('workorder_planing')
  public async workorder_planing(@Body() dto: workorderPlanDto): Promise<any> {
    const response = await this.iTransactionService.workorder_planing(dto);
    return this.iTransactionService.customResponse(
      response,
      'Workorder Plan!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: workOrderHoldCance })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('workorder_hold_cancel')
  public async workorder_hold_cancel(
    @Body() dto: workOrderHoldCance,
  ): Promise<any> {
    const response = await this.iTransactionService.workorder_hold_cancel(dto);
    return this.iTransactionService.customResponse(
      response,
      'Workorder Hold and Cancel.',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('workorder_meterial_list/:workorderStepId')
  public async workorder_meterial_list(
    @Param('workorderStepId') workorderStepId: number,
  ): Promise<any> {
    const response =
      await this.iTransactionService.workorder_meterial_list(workorderStepId);
    return this.iTransactionService.customResponse(
      response,
      'Meterial  List!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: meterialRequistion })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('workorder_meterial_requistion')
  public async workorder_meterial_requistion(
    @Body() dto: meterialRequistion,
  ): Promise<any> {
    const response =
      await this.iTransactionService.workorder_meterial_requistion(dto);
    return this.iTransactionService.customResponse(
      response,
      'Meterial Requistion',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: woOperationStart })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('workorder_operation_start')
  public async workorder_operation_start(
    @Body() dto: woOperationStart,
  ): Promise<any> {
    const response =
      await this.iTransactionService.workorder_operation_start(dto);
    return this.iTransactionService.customResponse(
      response,
      'Operation Start',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: woOperationHoldAndCompleteDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('workorder_operation_hold_complete')
  public async workorder_operation_hold_complete(
    @Body() dto: woOperationHoldAndCompleteDto,
  ): Promise<any> {
    const response =
      await this.iTransactionService.workorder_operation_hold_complete(dto);
    return this.iTransactionService.customResponse(
      response,
      'Operation Hold or Completed.',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('workorder_timesheet_meterial_table/:workorderStepId')
  public async workorder_timesheet_meterial_table(
    @Param('workorderStepId') workorderStepId: number,
  ): Promise<any> {
    const response =
      await this.iTransactionService.workorder_timesheet_meterial_table(
        workorderStepId,
      );
    return this.iTransactionService.customResponse(
      response,
      'Timesheet Meterial  Table!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('workorder_timesheet_labourTime_table/:workorderStepId')
  public async workorder_timesheet_labourTime_table(
    @Param('workorderStepId') workorderStepId: number,
  ): Promise<any> {
    const response =
      await this.iTransactionService.workorder_timesheet_labourTime_table(
        workorderStepId,
      );
    return this.iTransactionService.customResponse(
      response,
      'Timesheet labour  Table!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('timesheet_item_requistion/:workorderStepId')
  public async ItemRequistionItemTime_table(
    @Param('workorderStepId') workorderStepId: number,
  ): Promise<any> {
    const response =
      await this.iTransactionService.ItemRequistionItemTime_table(
        workorderStepId,
      );
    return this.iTransactionService.customResponse(
      response,
      'Timesheet labour  Table!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('machinery_list_timesheet/:departmentId/:subsidiaryId')
  public async MachineryListForTimeTable(
    @Param('departmentId') departmentId: number,
    @Param('subsidiaryId') subsidiaryId: number,
  ): Promise<any> {
    const response = await this.iTransactionService.MachineryListForTimeTable({
      departmentId,
      subsidiaryId,
    });
    return this.iTransactionService.customResponse(
      response,
      'Machinery List',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('scrap_item_timesheet/:workorderStepId')
  public async ScrapItemTime_table(
    @Param('workorderStepId') workorderStepId: number,
  ): Promise<any> {
    const response =
      await this.iTransactionService.ScrapItemTime_table(workorderStepId);
    return this.iTransactionService.customResponse(
      response,
      'Scrap List',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('get_dashboard/:locationId')
  public async get_dashboard(
    @Param('locationId') locationId: number,
  ): Promise<any> {
    const response = await this.iTransactionService.get_dashboard(locationId);
    return this.iTransactionService.customResponse(
      response,
      'Dashboard!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: mrTableDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('meterial_requistion_table')
  public async meterial_requistion_table(
    @Body() tableDto: mrTableDto,
  ): Promise<any> {
    const response =
      await this.iTransactionService.meterial_requistion_table(tableDto);
    return this.iTransactionService.customResponse(
      response,
      'Requistion List!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('getLiveIntervals/:departmentId')
  public async getLiveIntervals(
    @Param('departmentId') departmentId: number,
  ): Promise<any> {
    const response =
      await this.iTransactionService.getLiveIntervals(departmentId);
    return this.iTransactionService.customResponse(
      response,
      'Live Interval',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('meterial_requistion_item_details/:requistionId')
  public async meterial_requistion_item_details(
    @Param('requistionId') requistionId: number,
  ): Promise<any> {
    const response =
      await this.iTransactionService.meterial_requistion_item_details(
        requistionId,
      );
    return this.iTransactionService.customResponse(
      response,
      'Item Requistion!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: tsTableDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('timesheet_table_list')
  public async timesheet_table_list(
    @Body() tableDto: tsTableDto,
  ): Promise<any> {
    const response =
      await this.iTransactionService.timesheet_table_list(tableDto);
    return this.iTransactionService.customResponse(
      response,
      'Timesheet List!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('timesheet_detail_view/:timesheetId')
  public async timesheet_detail_view(
    @Param('timesheetId') timesheetId: number,
  ): Promise<any> {
    const response =
      await this.iTransactionService.timesheet_detail_view(timesheetId);
    return this.iTransactionService.customResponse(
      response,
      'Timesheet View!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('multi_work_ts_data/:labourTsId')
  public async getMultiEmployeeTsCalc(
    @Param('labourTsId') labourTsId: number,
  ): Promise<any> {
    const response =
      await this.iTransactionService.getMultiEmployeeTsCalc(labourTsId);
    return this.iTransactionService.customResponse(
      response,
      'Labour Timesheet Data!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('project_type_list/:subsidiary_id/:project_id')
  public async project_type_list(
    @Param('subsidiary_id') subsidiary_id: number,
    @Param('project_id') project_id: string,
  ): Promise<any> {
    const response = await this.iTransactionService.project_type_list(
      subsidiary_id,
      project_id,
    );
    return this.iTransactionService.customResponse(
      response,
      'project List!',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: tsChangeRequest })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('timesheet_change_request')
  public async tsChangeRequest(
    @Body() tableDto: tsChangeRequest,
  ): Promise<any> {
    const response =
      await this.iTransactionService.timesheet_changeRequest(tableDto);
    return this.iTransactionService.customResponse(
      response,
      'Timesheet List!',
      HttpStatus.OK.toString(),
    );
  }
}
