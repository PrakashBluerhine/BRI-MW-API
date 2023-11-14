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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { dot } from 'node:test/reporters';
import {
  allWorkorderTableDto,
  departmentOperationTableDto,
  meterialRequistion,
  mrTableDto,
  TableDto,
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

  @Get('workorder_meterial_list/:workorderStepId')
  public async workorder_meterial_list(
    @Param('workorderStepId') workorderStepId: number
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

  @Get('workorder_timesheet_meterial_table/:workorderStepId')
  public async workorder_timesheet_meterial_table(
    @Param('workorderStepId') workorderStepId: number
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
  @Get('workorder_timesheet_labourTime_table/:workorderStepId')
  public async workorder_timesheet_labourTime_table(
    @Param('workorderStepId') workorderStepId: number
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

  @Get('timesheet_item_requistion/:workorderStepId')
  public async ItemRequistionItemTime_table(
    @Param('workorderStepId') workorderStepId: number
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

  @Get('scrap_item_timesheet/:workorderStepId')
  public async ScrapItemTime_table(
    @Param('workorderStepId') workorderStepId: number
  ): Promise<any> {
    const response =
      await this.iTransactionService.ScrapItemTime_table(workorderStepId);
    return this.iTransactionService.customResponse(
      response,
      'Scrap List',
      HttpStatus.OK.toString(),
    );
  }



  @Get('get_dashboard/:locationId')
  public async get_dashboard(
    @Param('locationId') locationId: number
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

  @Get('getLiveIntervals/:departmentId')
  public async getLiveIntervals(
    @Param('departmentId') departmentId: number
  ): Promise<any> {
    const response =
      await this.iTransactionService.getLiveIntervals(departmentId);
    return this.iTransactionService.customResponse(
      response,
      'Live Interval',
      HttpStatus.OK.toString(),
    );
  }
}
