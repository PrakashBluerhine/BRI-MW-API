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
  IsActive: number;
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
  IsMainMenu: number;
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
  IsMainMenu: number;
  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: number;
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

  @Column({ name: 'OrderId' })
  OrderId: number;

  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;

  @Column({ name: 'ParentId' })
  ParentId: number;

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

  @Column({ name: 'OrderId' })
  OrderId: number;

  @Column({ name: 'SubsidiaryId' })
  SubsidiaryId: number;

  @Column({ name: 'ParentId' })
  ParentId: number;

  @Column({ name: 'IsActive' })
  IsActive: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: number;
  @Column({ name: 'CreatedOn' })
  created_on: Date;
  @Column({ name: 'CreatedBy' })
  created_by: number;

}