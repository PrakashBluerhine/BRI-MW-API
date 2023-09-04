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