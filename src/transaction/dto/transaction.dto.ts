import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  start: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  page_size: number;
  @ApiProperty()
  order_by: string;
  @ApiProperty()
  sort: string;
  @ApiProperty()
  search: string;
}

export class allWorkorderTableDto {
  @ApiProperty()
  location: string;
  @ApiProperty()
  ReleaseDate: string;
  @ApiProperty()
  subsidiary_id: number;
  @ApiProperty()
  start: number;
  @ApiProperty()
  page_size: number;
  @ApiProperty()
  order_by: string;
  @ApiProperty()
  sort: string;
  @ApiProperty()
  search: string;
  @ApiProperty()
  filter: string;
}

export class departmentOperationTableDto {
  @ApiProperty()
  department_id: number;
  @ApiProperty()
  location: string;
  @ApiProperty()
  ReleaseDate: string;
  @ApiProperty()
  subsidiary_id: number;
  @ApiProperty()
  start: number;
  @ApiProperty()
  page_size: number;
  @ApiProperty()
  order_by: string;
  @ApiProperty()
  sort: string;
  @ApiProperty()
  search: string;
}

export class workorderPlanDto {
  @ApiProperty()
  workOrderId: number;
  @ApiProperty()
  UserId: number;
  @ApiProperty({
    isArray: true,
    type: () => planDetails,
  })
  @IsNotEmpty()
  planDetails: any;
}

class planDetails {
  @ApiProperty()
  workOrderStepID: number;
  @ApiProperty()
  estimatedStart: Date;
  @ApiProperty()
  estimatedEnd: Date;
  @ApiProperty()
  estimatedLabourHr: number;
  @ApiProperty()
  isActive: boolean;
}

export class workOrderHoldCance {
  @ApiProperty()
  workorderId: number;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  mode: string;
  @ApiProperty()
  holdReasonId: number;
  @ApiProperty()
  userId: number;
}

export class meterialRequistion {
  @ApiProperty()
  workorderId: number;
  @ApiProperty()
  workorderStepId: number;
  @ApiProperty()
  departmentId: number;
  @ApiProperty()
  locationId: number;
  @ApiProperty({
    isArray: true,
    type: () => itemDetails,
  })
  @IsNotEmpty()
  workOrderItemId: any;
  @ApiProperty()
  userId: number;
}
class itemDetails {
  @ApiProperty()
  id: number;
  @ApiProperty()
  quantity: number;
}
export class woOperationStart {
  @ApiProperty()
  workorderId: number;
  @ApiProperty()
  workorderStepId: number;
  @ApiProperty()
  departmentId: number;
  @ApiProperty()
  locationId: number;
  @ApiProperty({
    isArray: true,
  })
  @IsNotEmpty()
  employees: [];
  @ApiProperty()
  status: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  userId: number;
}

export class woOperationHoldAndCompleteDto {
  @ApiProperty()
  workorderId: number;
  @ApiProperty()
  workorderStepId: number;
  @ApiProperty()
  departmentId: number;
  @ApiProperty()
  locationId: number;
  @ApiProperty()
  holdRemark: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  holdReasonId: number;

  @ApiProperty({
    isArray: true,
    type: () => itemTimeSheetDto,
  })
  @IsNotEmpty()
  itemTimeSheet: any;
  @ApiProperty({
    isArray: true,
    type: () => machineryTimeSheetDto,
  })
  machineTimeSheet: any;
  @ApiProperty({
    isArray: true,
    type: () => scrapTimeSheetDto,
  })
  scrapTimeSheet: any;
}

class itemTimeSheetDto {
  @ApiProperty()
  mrId: number;
  @ApiProperty()
  itemId: number;
  @ApiProperty()
  usedQuantity: number;
  @ApiProperty()
  remarks: string;
  @ApiProperty()
  TimeSheetITemId: number;
}

class machineryTimeSheetDto {
  @ApiProperty()
  machineId: number;
  @ApiProperty()
  duration: number;
}
class scrapTimeSheetDto {
  @ApiProperty()
  scrapItem: string;
  @ApiProperty()
  quantity: number;
}

export class mrTableDto {
  @ApiProperty()
  location: string;
  @ApiProperty()
  releaseDate: string;
  @ApiProperty()
  departmentId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  start: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  page_size: number;
  @ApiProperty()
  order_by: string;
  @ApiProperty()
  sort: string;
  @ApiProperty()
  search: string;
}

export class tsTableDto {
  @ApiProperty()
  department_id: number;
  @ApiProperty()
  location: string;
  @ApiProperty()
  ReleaseDate: string;
  @ApiProperty()
  subsidiary_id: number;
  @ApiProperty()
  start: number;
  @ApiProperty()
  page_size: number;
  @ApiProperty()
  order_by: string;
  @ApiProperty()
  sort: string;
  @ApiProperty()
  search: string;
}

export class tsChangeRequest {
  @ApiProperty()
  timesheet_id: number;
  @ApiProperty()
  request_id: number;
  @ApiProperty()
  remarks: string;
  @ApiProperty()
  user_id: number;
  @ApiProperty({
    isArray: true,
    type: () => labourTimeSheetChangeRequest,
  })
  @IsNotEmpty()
  labourTimeSheet: any;
  @ApiProperty({
    isArray: true,
    type: () => machineTimeSheetChangeRequest,
  })
  @IsNotEmpty()
  machineTimeSheet: any;
  @ApiProperty({
    isArray: true,
    type: () => scrapTimeSheetChangeRequest,
  })
  @IsNotEmpty()
  scrapTimeSheet: any;
}

class labourTimeSheetChangeRequest {
  @ApiProperty()
  ChangeRequestId: number;
  @ApiProperty()
  labourTimesheet_id: number;
  @ApiProperty()
  labour_id: number;
  @ApiProperty()
  start_time: Date;
  @ApiProperty()
  end_time: Date;
  @ApiProperty()
  workHrsInMin: number;
}

class machineTimeSheetChangeRequest{
  @ApiProperty()
  MachineTsCRId: number;
  @ApiProperty()
  MachineTimesheetId: number;
  @ApiProperty()
  machine_id: number;
  @ApiProperty()
  duration: number;
  @ApiProperty()
  remarks: string;
}

class scrapTimeSheetChangeRequest{
  @ApiProperty()
  change_requestId: number;
  @ApiProperty()
  scrap_timesheet_id: number;
  @ApiProperty()
  scrap_item: string;
  @ApiProperty()
  remarks: string;
  @ApiProperty()
  quantity: number;
}