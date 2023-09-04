import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

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

}

@Entity({ name: 'BRI_AuthSession' })
export class BRI_AuthSession {
  @PrimaryGeneratedColumn({ name: 'SessionId' })
  SessionId: number;

  @Column({ name: 'UserId' })
  UserId: number;

  @Column({ name: 'DeviceType' })
  DeviceType: string;

  @Column({ name: 'Ploatform' })
  Ploatform: string;

  @Column({ name: 'IPAddress' })
  IPAddress: string;

  @Column({ name: 'IME' })
  IME: string;

  @Column({ name: 'LoginedOn' })
  LoginedOn: Date;

  @Column({ name: 'LoggedOut' })
  LoggedOut: Date;

  @Column({ name: 'IsLogedOut' })
  IsLogedOut: number;

}

@Entity({ name: 'BRI_AuthUserRoleMap' })
export class BRI_AuthUserRoleMap {
  @PrimaryGeneratedColumn({ name: 'MapId' })
  MapId: number;

  @Column({ name: 'UserId' })
  UserId: number;

  @Column({ name: 'RoleId' })
  RoleId: number;

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

@Entity({ name: 'BRI_AuthUserRoleMapHistory' })
export class BRI_AuthUserRoleMapHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;

  @Column({ name: 'MapId' })
  MapId: number;

  @Column({ name: 'UserId' })
  UserId: number;

  @Column({ name: 'RoleId' })
  RoleId: number;

  @Column({ name: 'IsActive' })
  IsActive: number;

  @Column({ name: 'IsLastRecord' })
  IsLastRecord: number;

  @Column({ name: 'CreatedOn' })
  created_on: Date;

  @Column({ name: 'CreatedBy' })
  created_by: number;

 
}

@Entity({ name: 'BRI_AuthMenuUserPermission' })
export class BRI_AuthMenuUserPermission {
  @PrimaryGeneratedColumn({ name: 'UserPermissionId' })
  UserPermissionId: number;

  @Column({ name: 'UserId' })
  UserId: number;

  @Column({ name: 'RoleId' })
  RoleId: number;

  @Column({ name: 'MenuId' })
  MenuId: number;

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

@Entity({ name: 'BRI_AuthMenuUserPermissionHistory' })
export class BRI_AuthMenuUserPermissionHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  UserPermissionId: number;
  @Column({ name: 'UserPermissionId' })
  UserId: number;

  @Column({ name: 'RoleId' })
  RoleId: number;

  @Column({ name: 'MenuId' })
  MenuId: number;

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

@Entity({ name: 'BRI_AuthRolePermission' })
export class BRI_AuthRolePermission {
  @PrimaryGeneratedColumn({ name: 'RolePermissionId' })
  RolePermissionId: number;

  @Column({ name: 'RoleId' })
  RoleId: number;

  @Column({ name: 'MenuId' })
  MenuId: number;

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

@Entity({ name: 'BRI_AuthModuleRoleMap' })
export class BRI_AuthModuleRoleMap {
  @PrimaryGeneratedColumn({ name: 'MapId' })
  MapId: number;

  @Column({ name: 'ModuleId' })
  ModuleId: number;

  @Column({ name: 'RoleId' })
  RoleId: number;

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

@Entity({ name: 'BRI_AuthModuleRoleMapHistory' })
export class BRI_AuthModuleRoleMapHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;

  @Column({ name: 'MapId' })
  MapId: number;

  @Column({ name: 'ModuleId' })
  ModuleId: number;

  @Column({ name: 'RoleId' })
  RoleId: number;

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




