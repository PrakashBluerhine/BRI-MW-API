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
  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;
  @Column({ name: 'LocationId' })
  LocationId: number;  
  @Column({ name: 'IsActive' })
  IsActive: boolean;

  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
  @Column({ name: 'ModifiedOn' })
  ModifiedOn: Date;
  @Column({ name: 'ModifiedBy' })
  ModifiedBy: number;
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

@Entity({ name: 'BRI_WorkOrderMaster' })
export class BRI_WorkOrderMaster {
  @PrimaryGeneratedColumn({ name: 'WorkOrderID' })
  WorkOrderID: number;
  @Column({ name: 'NetsuiteID' })
  NetsuiteID: number;
  @Column({ name: 'WorkOrderNo' })
  WorkOrderNo: string;
  @Column({ name: 'StatusID' })
  StatusID: number;
  @Column({ name: 'ProjectName' })
  ProjectName: string;
  @Column({ name: 'ProjectID' })
  ProjectID: string;
  @Column({ name: 'Subsidiary' })
  Subsidiary: string;
  @Column({ name: 'SubsidiaryID' })
  SubsidiaryID: number;
  @Column({ name: 'SubProjectName' })
  SubProjectName: string;
  @Column({ name: 'SubProjectID' })
  SubProjectID: string;
  @Column({ name: 'SubProjectInternalID' })
  SubProjectInternalID: number;
  @Column({ name: 'ManufacturingRouting' })
  ManufacturingRouting: string;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsCancelled' })
  IsCancelled: boolean;
  @Column({ name: 'CancelledOn' })
  CancelledOn: Date;
  @Column({ name: 'IsDeleted' })
  IsDeleted: boolean;
  @Column({ name: 'DeletedOn' })
  DeletedOn: Date;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  ModifiedOn: Date;
  @Column({ name: 'ModifiedBy' })
  ModifiedBy: number;
  @Column({ name: 'Location' })
  Location: number;
  @Column({ name: 'BusinessUnit' })
  BusinessUnit: string;
  @Column({ name: 'BusinessUnitId' })
  BusinessUnitId: string;
}

@Entity({ name: 'BRI_WorkOrderMasterHistory' })
export class BRI_WorkOrderMasterHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryID' })
  HistoryID: number;
  @Column({ name: 'WorkOrderID' })
  WorkOrderID: number;
  @Column({ name: 'NetsuiteID' })
  NetsuiteID: number;
  @Column({ name: 'WorkOrderNo' })
  WorkOrderNo: string;
  @Column({ name: 'StatusID' })
  StatusID: number;
  @Column({ name: 'ProjectName' })
  ProjectName: string;
  @Column({ name: 'ProjectID' })
  ProjectID: string;
  @Column({ name: 'NsSubsidiary' })
  NsSubsidiary: string;
  @Column({ name: 'NsSubsidiaryId' })
  NsSubsidiaryId: number;
  @Column({ name: 'Subsidiary' })
  Subsidiary: string;
  @Column({ name: 'SubsidiaryID' })
  SubsidiaryID: number;
  @Column({ name: 'SubProjectName' })
  SubProjectName: string;
  @Column({ name: 'SubProjectID' })
  SubProjectID: string;
  @Column({ name: 'SubProjectInternalID' })
  SubProjectInternalID: number;
  @Column({ name: 'ManufacturingRouting' })
  ManufacturingRouting: string;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsCancelled' })
  IsCancelled: boolean;
  @Column({ name: 'CancelledOn' })
  CancelledOn: Date;
  @Column({ name: 'IsDeleted' })
  IsDeleted: boolean;
  @Column({ name: 'DeletedOn' })
  DeletedOn: Date;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: boolean;
  @Column({ name: 'Location' })
  Location: number;
  @Column({ name: 'BusinessUnit' })
  BusinessUnit: string;
  @Column({ name: 'BusinessUnitId' })
  BusinessUnitId: string;
}

@Entity({ name: 'BRI_WorkOrderSteps' })
export class BRI_WorkOrderSteps {
  @PrimaryGeneratedColumn({ name: 'WorkOrderStepID' })
  WorkOrderStepID: number;
  @Column({ name: 'WorkOrderID' })
  WorkOrderID: number;
  @Column({ name: 'StatusId' })
  StatusId: number;
  @Column({ name: 'PlanedStartDate' })
  PlanedStartDate: Date;
  @Column({ name: 'PlanedEndDate' })
  PlanedEndDate: Date;
  @Column({ name: 'ActualStartDate' })
  ActualStartDate: Date;
  @Column({ name: 'ActualEndDate' })
  ActualEndDate: Date;
  @Column({ name: 'DepartmentName' })
  DepartmentName: string;
  @Column({ name: 'DepartmentID' })
  DepartmentID: number;
  @Column({ name: 'IsHold' })
  IsHold: boolean;
  @Column({ name: 'ExecutionOrder' })
  ExecutionOrder: number;
  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
  @Column({ name: 'ModifiedOn' })
  ModifiedOn: Date;
  @Column({ name: 'ModifiedBy' })
  ModifiedBy: number;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsQcDone' })
  IsQcDone: boolean;
 
}

@Entity({ name: 'BRI_WorkOrderStepsHistory' })
export class BRI_WorkOrderStepsHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;
  @Column({ name: 'WorkOrderStepID' })
  WorkOrderStepID: number;
  @Column({ name: 'WorkOrderID' })
  WorkOrderID: number;
  @Column({ name: 'StatusId' })
  StatusId: number;
  @Column({ name: 'PlanedStartDate' })
  PlanedStartDate: Date;
  @Column({ name: 'PlanedEndDate' })
  PlanedEndDate: Date;
  @Column({ name: 'ActualStartDate' })
  ActualStartDate: Date;
  @Column({ name: 'ActualEndDate' })
  ActualEndDate: Date;
  @Column({ name: 'DepartmentName' })
  DepartmentName: string;
  @Column({ name: 'DepartmentID' })
  DepartmentID: number;
  @Column({ name: 'IsHold' })
  IsHold: boolean;
  @Column({ name: 'ExecutionOrder' })
  ExecutionOrder: number;
  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
  ModifiedBy: number;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsQcDone' })
  IsQcDone: boolean;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: boolean;
}

@Entity({ name: 'BRI_AuthUsers' })
export class BRI_AuthUsers {
  @PrimaryGeneratedColumn({ name: 'UserId' })
  UserId: number;

  @Column({ name: 'UserName' })
  UserName: string;

  @Column({ name: 'Password' })
  Password: string;

  @Column({ name: 'PasswordHash' })
  PasswordHash: string;

  @Column({ name: 'Email' })
  Email: string;

  @Column({ name: 'MobileNo' })
  MobileNo: string;

  @Column({ name: 'DepartmentId' })
  DepartmentId: number;

  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;

  @Column({ name: 'LocationId' })
  LocationId: number;
  
  @Column({ name: 'FirstName' })
  FirstName: string;

  @Column({ name: 'LastName' })
  LastName: string;

  @Column({ name: 'EmployeeCode' })
  EmployeeCode: string;

  @Column({ name: 'EmployeeId' })
  EmployeeId: number;

  @Column({ name: 'DOB' })
  DOB: Date;

  @Column({ name: 'ProfileImageID' })
  ProfileImageID: number;

  @Column({ name: 'IsActive' })
  IsActive: number;

  @Column({ name: 'IsLocked' })
  IsLocked: number;

  @Column({ name: 'IsDeleted' })
  IsDeleted: number;

  @Column({ name: 'DeletedOn' })
  DeletedOn: Date;
  @Column({ name: 'ResetToken' })
  ResetToken: string;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'TokenExpairyOn' })
  TokenExpairyOn: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'ModifiedOn' })
  modified_on: Date;
  @Column({ name: 'ModifiedBy' })
  modified_by: number;
}

@Entity({ name: 'BRI_AuthUsersHistory' })
export class BRI_AuthUsersHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;
  @Column({ name: 'UserId' })
  UserId: number;
  @Column({ name: 'UserName' })
  UserName: string;

  @Column({ name: 'Password' })
  Password: string;

  @Column({ name: 'PasswordHash' })
  PasswordHash: string;

  @Column({ name: 'Email' })
  Email: string;

  @Column({ name: 'MobileNo' })
  MobileNo: string;

  @Column({ name: 'DepartmentId' })
  DepartmentId: number;

  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;

  @Column({ name: 'FirstName' })
  FirstName: string;

  @Column({ name: 'LastName' })
  LastName: string;

  @Column({ name: 'EmployeeCode' })
  EmployeeCode: string;

  @Column({ name: 'EmployeeId' })
  EmployeeId: number;

  @Column({ name: 'DOB' })
  DOB: Date;

  @Column({ name: 'ProfileImageID' })
  ProfileImageID: number;

  @Column({ name: 'IsActive' })
  IsActive: number;

  @Column({ name: 'IsLocked' })
  IsLocked: number;

  @Column({ name: 'IsLastRecord' })
  IsLastRecord: number;
  
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;
  @Column({ name: 'LocationId' })
  LocationId: number;
}