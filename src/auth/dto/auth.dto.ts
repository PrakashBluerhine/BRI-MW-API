import { ApiProperty } from '@nestjs/swagger';
import { isEmail, IsEmail, isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsNumberString, isNumberString, IsOptional } from 'class-validator';
import { Timestamp } from 'rxjs';

export class LoginUserDto {
  @ApiProperty()
  userName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  device: string;
  @ApiProperty()
  plat_form: string;
  @ApiProperty()
  user_agent: string;
  @ApiProperty()
  imei: string;
  @ApiProperty()
  ipv4: string;
}

export class UserCreationDto {
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNumberString()
  @IsNumberString()
  mobile_no: string;
  @ApiProperty()

  department_id: number;
  @ApiProperty()
  subsidiary_id: number;
  @ApiProperty()
  @IsNumber()
  role_id: number;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  employee_code: string;
  @ApiProperty()
  employee_id: number;
  @ApiProperty()
  dob: Date;
  @ApiProperty()
  profile_image: string;
  @ApiProperty()
  is_active: number;
  @ApiProperty()
  is_locked: number;
  @ApiProperty()
  created_by: number;
}

export class UserListRequestDto {
  @ApiProperty()
  subsidiary_id: number;
  @ApiProperty()
  start:number;
  @ApiProperty()
  page_size:number;
  @ApiProperty()
  order_by: string;
  @ApiProperty()
  sort: string;
  @ApiProperty()
  search: string;
  
}
export class EmployeeCreationDto {
  @ApiProperty()
  employee_id: number;
  @ApiProperty()
  full_name:string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNumberString()
  mobile_no: string;
  @ApiProperty()
  employee_type_id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  is_active: number;
  @ApiProperty()
  job_title: string;
}


export class TaxnomyDrpDto{
  
  @ApiProperty()
  type:string;
}

export class forgotPasswordDto{
  
  @ApiProperty()
  user_name:string;
  @ApiProperty()
  password:string;
}

export class UserRoleDto {
  @ApiProperty()
  role_id: number;
  @ApiProperty()
  role_name:string;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  is_active: number;
}

export class UserResetRequestDto {
  @ApiProperty()
  token:string;
  @ApiProperty()
  password:string;
}  

export class UserProfileUpdateDto {
  @ApiProperty()
  employee_id: number;
  @ApiProperty()
  first_name:string;
  @ApiProperty()
  last_name:string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNumberString()
  mobile_no: string;
  @ApiProperty()
  address:string;
  @ApiProperty()
  city:string;
  @ApiProperty()
  country_id:number;
  @ApiProperty()
  zip:number;
  @ApiProperty()
  isDefaultAddress:number;
}

export class UserChangePwdDto {
  @ApiProperty()
  user_id:number;
  @ApiProperty()
  old_password:string;
  @ApiProperty()
  new_password:string;
}