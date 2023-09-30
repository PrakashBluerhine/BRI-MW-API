import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity({ name: 'BRI_MasterRole' })
export class BRI_MasterRole {
  @PrimaryGeneratedColumn({ name: 'RoleId' })
  RoleId: number;

  @Column({ name: 'RoleCode' })
  RoleCode: string;

  @Column({ name: 'RoleName' })
  RoleName: string;

  @Column({ name: 'IsActive' })
  IsActive: boolean;

  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  modified_on: Date;
  @Column({ name: 'ModifiedBy' })
  modified_by: number;
}

@Entity({ name: 'BRI_MasterRoleHistory' })
export class BRI_MasterRoleHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;
  @Column({ name: 'RoleId' })
  RoleId: number;
  @Column({ name: 'RoleCode' })
  RoleCode: string;

  @Column({ name: 'RoleName' })
  RoleName: string;

  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
}

@Entity({ name: 'BRI_MasterMenu' })
export class BRI_MasterMenu {
  @PrimaryGeneratedColumn({ name: 'MenuId' })
  MenuId: number;
  @Column({ name: 'MenuName' })
  MenuName: string;
  @Column({ name: 'Url' })
  Url: string;
  @Column({ name: 'ModuleId' })
  ModuleId: number;
  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;
  @Column({ name: 'Icon' })
  Icon: string;
  @Column({ name: 'IsMainMenu' })
  IsMainMenu: boolean;
  @Column({ name: 'NewRecord' })
  NewRecord: boolean;
  @Column({ name: 'EditRecord' })
  EditRecord: boolean;
  @Column({ name: 'ActiveRecord' })
  ActiveRecord: boolean;
  @Column({ name: 'ViewRecord' })
  ViewRecord: boolean;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  modified_on: Date;
  @Column({ name: 'ModifiedBy' })
  modified_by: number;
}

@Entity({ name: 'BRI_MasterMenuHistory' })
export class BRI_MasterMenuHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;
  @Column({ name: 'MenuId' })
  MenuId: number;
  @Column({ name: 'MenuName' })
  MenuName: string;
  @Column({ name: 'Url' })
  Url: string;
  @Column({ name: 'ModuleId' })
  ModuleId: number;
  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;
  @Column({ name: 'Icon' })
  Icon: string;
  @Column({ name: 'IsMainMenu' })
  IsMainMenu: boolean;
  @Column({ name: 'NewRecord' })
  NewRecord: boolean;
  @Column({ name: 'EditRecord' })
  EditRecord: boolean;
  @Column({ name: 'ActiveRecord' })
  ActiveRecord: boolean;
  @Column({ name: 'ViewRecord' })
  ViewRecord: boolean;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: boolean;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
}

@Entity({ name: 'BRI_MasterModule' })
export class BRI_MasterModule {
  @PrimaryGeneratedColumn({ name: 'ModuleId' })
  ModuleId: number;

  @Column({ name: 'ModuleCode' })
  ModuleCode: string;

  @Column({ name: 'ModuleName' })
  ModuleName: string;

  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;

  @Column({ name: 'IsActive' })
  IsActive: number;

  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  modified_on: Date;
  @Column({ name: 'ModifiedBy' })
  modified_by: number;
}

@Entity({ name: 'BRI_MasterModuleHistory' })
export class BRI_MasterModuleHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;
  @Column({ name: 'ModuleId' })
  ModuleId: number;

  @Column({ name: 'ModuleCode' })
  ModuleCode: string;

  @Column({ name: 'ModuleName' })
  ModuleName: string;

  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;

  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
}

@Entity({ name: 'BRI_MasterGroupMenu' })
export class BRI_MasterGroupMenu {
  @PrimaryGeneratedColumn({ name: 'GroupMenuId' })
  GroupMenuId: number;

  @Column({ name: 'GroupId' })
  GroupId: number;

  @Column({ name: 'MenuId' })
  MenuId: number;

  @Column({ name: 'IsActive' })
  IsActive: boolean;

  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  modified_on: Date;
  @Column({ name: 'ModifiedBy' })
  modified_by: number;
}

@Entity({ name: 'BRI_MasterGroupMenuHistory' })
export class BRI_MasterGroupMenuHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;

  @Column({ name: 'GroupMenuId' })
  GroupMenuId: number;

  @Column({ name: 'GroupId' })
  GroupId: number;

  @Column({ name: 'MenuId' })
  MenuId: number;

  @Column({ name: 'IsActive' })
  IsActive: boolean;

  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: boolean;
}

@Entity({ name: 'BRI_MasterDepartment' })
export class BRI_MasterDepartment {
  @PrimaryGeneratedColumn({ name: 'DepartmentId' })
  DepartmentId: number;

  @Column({ name: 'DepartmentCode' })
  DepartmentCode: string;

  @Column({ name: 'DepartmentName' })
  DepartmentName: string;

  @Column({ name: 'IsActive' })
  IsActive: number;

  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  modified_on: Date;
  @Column({ name: 'ModifiedBy' })
  modified_by: number;
}

@Entity({ name: 'BRI_OperationTaxnomy' })
export class BRI_OperationTaxnomy {
  @PrimaryGeneratedColumn({ name: 'TaxnomyId' })
  TaxnomyId: number;

  @Column({ name: 'TaxnomyCode' })
  TaxnomyCode: string;

  @Column({ name: 'TaxnomyName' })
  TaxnomyName: string;

  @Column({ name: 'TaxnomyValue' })
  TaxnomyValue: number;

  @Column({ name: 'TaxnomyType' })
  TaxnomyType: string;

  @Column({ name: 'OrderId' })
  OrderId: number;

  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;

  @Column({ name: 'ParentId' })
  ParentId: number;
  @Column({ name: 'NetsuiteId' })
  NetsuiteId: number;
  @Column({ name: 'IsActive' })
  IsActive: number;

  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  modified_on: Date;
  @Column({ name: 'ModifiedBy' })
  modified_by: number;
}

@Entity({ name: 'BRI_OperationTaxnomyHistory' })
export class BRI_OperationTaxnomyHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;

  @Column({ name: 'TaxnomyId' })
  TaxnomyId: number;

  @Column({ name: 'TaxnomyCode' })
  TaxnomyCode: string;

  @Column({ name: 'TaxnomyName' })
  TaxnomyName: string;

  @Column({ name: 'TaxnomyValue' })
  TaxnomyValue: number;

  @Column({ name: 'TaxnomyType' })
  TaxnomyType: string;

  @Column({ name: 'OrderId' })
  OrderId: number;

  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;

  @Column({ name: 'ParentId' })
  ParentId: number;
  @Column({ name: 'NetsuiteId' })
  NetsuiteId: number;
  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
}

@Entity({ name: 'BRI_MasterEmployee' })
export class BRI_MasterEmployee {
  @PrimaryGeneratedColumn({ name: 'EmployeeId' })
  EmployeeId: number;

  @Column({ name: 'EmployeeCode' })
  EmployeeCode: string;

  @Column({ name: 'EmployeeName' })
  EmployeeName: string;
  @Column({ name: 'Desigination' })
  Desigination: string;
  @Column({ name: 'EmailId' })
  EmailId: string;
  @Column({ name: 'DepartmentId' })
  DepartmentId: number;
  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;
  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  modified_on: Date;
  @Column({ name: 'ModifiedBy' })
  modified_by: number;
}

@Entity({ name: 'BRI_MasterEmployeeHistory' })
export class BRI_MasterEmployeeHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;

  @Column({ name: 'EmployeeId' })
  EmployeeId: number;
  @Column({ name: 'EmployeeCode' })
  EmployeeCode: string;

  @Column({ name: 'EmployeeName' })
  EmployeeName: string;
  @Column({ name: 'Desigination' })
  Desigination: string;
  @Column({ name: 'EmailId' })
  EmailId: string;
  @Column({ name: 'DepartmentId' })
  DepartmentId: number;
  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;

  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'IsLastRecord' })
  isLastRecord: number;
}

@Entity({ name: 'BRI_MasterMachine' })
export class BRI_MasterMachine {
  @PrimaryGeneratedColumn({ name: 'MachineId' })
  MachineId: number;
  @Column({ name: 'MachineCode' })
  MachineCode: string;
  @Column({ name: 'MachineName' })
  MachineName: string;
  @Column({ name: 'NsMachineId' })
  NsMachineId: number;
  @Column({ name: 'DepartmentId' })
  DepartmentId: number;
  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;
  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  modified_on: Date;
  @Column({ name: 'ModifiedBy' })
  modified_by: number;
}

@Entity({ name: 'BRI_MasterMachineHistory' })
export class BRI_MasterMachineHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;
  @Column({ name: 'MachineId' })
  MachineId: number;
  @Column({ name: 'MachineCode' })
  MachineCode: string;
  @Column({ name: 'MachineName' })
  MachineName: string;
  @Column({ name: 'NsMachineId' })
  NsMachineId: number;
  @Column({ name: 'DepartmentId' })
  DepartmentId: number;
  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;
  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
}

@Entity({ name: 'BRI_MasterEmailAlert' })
export class BRI_MasterEmailAlert {
  @PrimaryGeneratedColumn({ name: 'AlertId' })
  AlertId: number;
  @Column({ name: 'AlertName' })
  AlertName: string;
  @Column({ name: 'AlertCode' })
  AlertCode: string;
  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;
  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  modified_on: Date;
  @Column({ name: 'ModifiedBy' })
  modified_by: number;
}

@Entity({ name: 'BRI_MasterEmailAlertHistory' })
export class BRI_MasterEmailAlertHistory {
  @PrimaryGeneratedColumn({ name: 'HistId' })
  HistId: number;
  @Column({ name: 'AlertId' })
  AlertId: number;
  @Column({ name: 'AlertName' })
  AlertName: string;
  @Column({ name: 'AlertCode' })
  AlertCode: string;
  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;
  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: number;
}

@Entity({ name: 'BRI_EmailAlertRecipient' })
export class BRI_EmailAlertRecipient {
  @PrimaryGeneratedColumn({ name: 'RecipientId' })
  RecipientId: number;
  @Column({ name: 'AlertId' })
  AlertId: number;
  @Column({ name: 'EmployeeId' })
  EmployeeId: number;
  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  modified_on: Date;
  @Column({ name: 'ModifiedBy' })
  modified_by: number;
}

@Entity({ name: 'BRI_EmailAlertRecipientHistory' })
export class BRI_EmailAlertRecipientHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;
  @Column({ name: 'RecipientId' })
  RecipientId: number;
  @Column({ name: 'AlertId' })
  AlertId: number;
  @Column({ name: 'EmployeeId' })
  EmployeeId: number;
  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
}

@Entity({ name: 'BRI_AuthRolePermission' })
export class BRI_AuthRolePermission {
  @PrimaryGeneratedColumn({ name: 'RolePermissionId' })
  RolePermissionId: number;
  @Column({ name: 'RoleId' })
  RoleId: number;
  @Column({ name: 'MenuId' })
  MenuId: number;
  @Column({ name: 'GroupMenuId' })
  GroupMenuId: number;
  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsAllowNewRecord' })
  IsAllowNewRecord: boolean;
  @Column({ name: 'IsAllowEditRecord' })
  IsAllowEditRecord: boolean;
  @Column({ name: 'IsAllowViewRecord' })
  IsAllowViewRecord: boolean;

  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;

  @Column({ name: 'ModifiedOn' })
  ModifiedOn: Date;
  @Column({ name: 'ModifiedBy' })
  ModifiedBy: number;
}

@Entity({ name: 'BRI_AuthRolePermissionHistory' })
export class BRI_AuthRolePermissionHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;
  @Column({ name: 'RolePermissionId' })
  RolePermissionId: number;
  @Column({ name: 'RoleId' })
  RoleId: number;
  @Column({ name: 'MenuId' })
  MenuId: number;
  @Column({ name: 'GroupMenuId' })
  GroupMenuId: number;
  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsAllowNewRecord' })
  IsAllowNewRecord: boolean;
  @Column({ name: 'IsAllowEditRecord' })
  IsAllowEditRecord: boolean;
  @Column({ name: 'IsAllowViewRecord' })
  IsAllowViewRecord: boolean;
  @Column({ name: 'IsAllowDeleteRecord' })
  IsAllowDeleteRecord: boolean;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: boolean;

  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
}
