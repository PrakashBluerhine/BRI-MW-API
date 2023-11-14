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
  })
  @IsNotEmpty()
  workOrderItemId: [];
  @ApiProperty()
  userId: number;
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
  workOrderItemId: number;
}

class machineryTimeSheetDto {
  @ApiProperty()
  machineId: number;
  @ApiProperty()
  duration: number;
}
class scrapTimeSheetDto {
  @ApiProperty()
  scrapItemId: number;
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
