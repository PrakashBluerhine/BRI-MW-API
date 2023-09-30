import { ApiProperty } from '@nestjs/swagger';
import {
  isEmail,
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  isNumber,
  IsNumberString,
  isNumberString,
  IsOptional,
} from 'class-validator';
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
  isActive: number;
  @ApiProperty()
  @IsNotEmpty()
  userId: number;
}

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

export class newEmployeeDto {
  @ApiProperty()
  employee_id: number;
  @ApiProperty()
  employee_name: string;
  @ApiProperty()
  employee_code: string;
  @ApiProperty()
  email_id: string;
  @ApiProperty()
  desigination: string;
  @ApiProperty()
  department_id: number;
  @ApiProperty()
  subsidiary_id: number;
  @ApiProperty()
  isActive: number;
  @ApiProperty()
  userId: number;
}

export class employeeTableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  department_id: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subsidiary_id: number;
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

export class newMachineryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  machine_id: number;
  @ApiProperty()
  machine_name: string;
  @ApiProperty()
  machine_code: string;
  @ApiProperty()
  department_id: number;
  @ApiProperty()
  nsmachine_id: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subsidiary_id: number;
  @ApiProperty()
  isActive: number;
  @ApiProperty()
  userId: number;
}

export class machineryTableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  department_id: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subsidiary_id: number;
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

export class newMailAlertDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  alert_id: number;
  @ApiProperty()
  alert_name: string;
  @ApiProperty()
  alert_code: string;
  @ApiProperty()
  subsidiary_id: number;
  @ApiProperty()
  isActive: number;
  @ApiProperty()
  userId: number;
  @ApiProperty({
    isArray: true,
    type: () => alertRecipient,
  })
  @IsNotEmpty()
  recipient: any;
}

class alertRecipient {
  @ApiProperty()
  employee_Id: number;
  @ApiProperty()
  email: string;
}

export class emailAlertTableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subsidiary_id: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
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

export class newMenuDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  menu_id: number;
  @ApiProperty()
  menu_name: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  subsidiary_id: number;
  @ApiProperty()
  icon: string;
  @ApiProperty({
    isArray: true,
  })
  @IsNotEmpty()
  menu_group: [];
  @ApiProperty()
  isMain_menu: number;
  @ApiProperty()
  new_record: number;
  @ApiProperty()
  edit_record: number;
  @ApiProperty()
  active_record: number;
  @ApiProperty()
  view_record: number;
  @ApiProperty()
  isActive: number;
  @ApiProperty()
  userId: number;
}

export class newRolePermissionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  RoleId: number;
  @ApiProperty()
  @IsNumber()
  subsidiary_id: number;
  @ApiProperty()
  group_id: number;
  @ApiProperty()
  userId: number;
  @ApiProperty({
    isArray: true,
    type: () => permission,
  })
  @IsNotEmpty()
  permission: any;
}

class permission {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rolePermissionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  menuId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  groupMenuId: number;
  @ApiProperty()
  new_record: number;
  @ApiProperty()
  edit_record: number;
  @ApiProperty()
  active_record: number;
  @ApiProperty()
  view_record: number;
  @ApiProperty()
  isActive: number;

}
