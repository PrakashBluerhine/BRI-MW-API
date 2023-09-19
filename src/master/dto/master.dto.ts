import { ApiProperty } from '@nestjs/swagger';
import { isEmail, IsEmail, isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsNumberString, isNumberString, IsOptional } from 'class-validator';
import { Timestamp } from 'rxjs';

export class RoleCreationDto {
  @ApiProperty()
  @IsNotEmpty()
  roleId: number;
  @ApiProperty()
  roleCode: string;
  @ApiProperty()
  @IsNotEmpty()
  roleName: string;
  @ApiProperty()
  @IsNotEmpty()
  isActive:number;
  @ApiProperty()
  @IsNotEmpty()
  userId: number;
}


export class TableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  start:number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  page_size:number;
  @ApiProperty()
  order_by: string;
  @ApiProperty()
  sort: string;
  @ApiProperty()
  search: string; 
}

export class newEmployeeDto
{
  @ApiProperty()
  employee_id:number;
  @ApiProperty()
  employee_name:string;
  @ApiProperty()
  employee_code:string;
  @ApiProperty()
  email_id:string;
  @ApiProperty()
  desigination:string;
  @ApiProperty()
  department_id:number;
  @ApiProperty()
  subsidiary_id:number;
  @ApiProperty()
  isActive:number;
  @ApiProperty()
  userId:number;
}

export class employeeTableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  department_id:number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subsidiary_id:number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  start:number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  page_size:number;
  @ApiProperty()
  order_by: string;
  @ApiProperty()
  sort: string;
  @ApiProperty()
  search: string; 
}

export class newMachineryDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  machine_id:number;
  @ApiProperty()
  machine_name:string;
  @ApiProperty()
  machine_code:string;
  @ApiProperty()
  department_id:number;
  @ApiProperty()
  nsmachine_id:number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subsidiary_id:number;
  @ApiProperty()
  isActive:number;
  @ApiProperty()
  userId:number;
}

export class machineryTableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  department_id:number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subsidiary_id:number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  start:number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  page_size:number;
  @ApiProperty()
  order_by: string;
  @ApiProperty()
  sort: string;
  @ApiProperty()
  search: string; 
}

export class newMailAlertDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  alert_id:number;
  @ApiProperty()
  alert_name:string;
  @ApiProperty()
  alert_code:string;
  @ApiProperty()
  subsidiary_id:number;
  @ApiProperty()
  isActive:number;
  @ApiProperty()
  userId:number;
  @ApiProperty( {
    isArray:true,
    type:()=>alertRecipient})
  @IsNotEmpty()
  recipient:any;
}

class alertRecipient{
  @ApiProperty()
  employee_Id:number;
  @ApiProperty()
  email:string;
}

export class emailAlertTableDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subsidiary_id:number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  start:number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  page_size:number;
  @ApiProperty()
  order_by: string;
  @ApiProperty()
  sort: string;
  @ApiProperty()
  search: string; 
}