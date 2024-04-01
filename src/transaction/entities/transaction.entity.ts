import { DateTime } from 'luxon';
import { time } from 'node:console';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({ name: 'toEmail' })
  toEmail: string;
  @Column({ name: 'ccEmail' })
  ccEmail: string;
  @Column({ name: 'bccEmail' })
  bccEmail: string;
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
  @Column({ name: 'CancelledBy' })
  CancelledBy: number;

  @Column({ name: 'IsHolded' })
  IsHolded: boolean;
  @Column({ name: 'HoldedOn' })
  HoldedOn: Date;
  @Column({ name: 'HoldedBy' })
  HoldedBy: number;
  @Column({ name: 'HoldReasonId' })
  HoldReasonId: number;
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
  BusinessUnitId: number;
  @Column({ name: 'SignType' })
  SignType: string;
  @Column({ name: 'SalesMan' })
  SalesMan: string;
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
  @Column({ name: 'CancelledBy' })
  CancelledBy: number;
  @Column({ name: 'IsHolded' })
  IsHolded: boolean;
  @Column({ name: 'HoldedOn' })
  HoldedOn: Date;
  @Column({ name: 'HoldedBy' })
  HoldedBy: number;
  @Column({ name: 'HoldReasonId' })
  HoldReasonId: number;
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
  BusinessUnitId: number;
  @Column({ name: 'SignType' })
  SignType: string;
  @Column({ name: 'SalesMan' })
  SalesMan: string;
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
  @Column({ name: 'EstimatedLabourHr' })
  EstimatedLabourHr: number;
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
  @Column({ name: 'HoldOn' })
  HoldOn: Date;
  @Column({ name: 'HoldReasonId' })
  HoldReasonId: number;
  @Column({ name: 'HoldRemarks' })
  HoldRemarks: string;
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
  @Column({ name: 'EstimatedLabourHr' })
  EstimatedLabourHr: number;
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
  @Column({ name: 'HoldOn' })
  HoldOn: Date;
  @Column({ name: 'HoldReasonId' })
  HoldReasonId: number;
  @Column({ name: 'HoldRemarks' })
  HoldRemarks: string;
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

@Entity({ name: 'BRI_WorkOrderItems' })
export class BRI_WorkOrderItems {
  @PrimaryGeneratedColumn({ name: 'WorkOrderItemId' })
  WorkOrderItemId: number;
  @Column({ name: 'WorkOrderId' })
  WorkOrderId: number;
  @Column({ name: 'WorkorderStepId' })
  WorkorderStepId: number;
  @Column({ name: 'ItemId' })
  ItemId: number;
  @Column({ name: 'AloatedCount' })
  AloatedCount: number;
  @Column({ name: 'UsedCount' })
  UsedCount: number;
  @Column({ name: 'AvailableCount' })
  AvailableCount: number;
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

@Entity({ name: 'BRI_MasterItem' })
export class BRI_MasterItem {
  @PrimaryGeneratedColumn({ name: 'ItemId' })
  ItemId: number;
  @Column({ name: 'ItemCode' })
  ItemCode: string;
  @Column({ name: 'ItemName' })
  ItemName: string;
  @Column({ name: 'Uom' })
  Uom: string;
  @Column({ name: 'DepartmentId' })
  DepartmentId: number;
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

@Entity({ name: 'BRI_MasterItemHistory' })
export class BRI_MasterItemHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryId' })
  HistoryId: number;
  @Column({ name: 'WorkOrderItemId' })
  WorkOrderItemId: number;
  @Column({ name: 'WorkOrderId' })
  WorkOrderId: number;
  @Column({ name: 'WorkorderStepId' })
  WorkorderStepId: number;
  @Column({ name: 'ItemId' })
  ItemId: number;
  @Column({ name: 'AloatedCount' })
  AloatedCount: number;
  @Column({ name: 'UsedCount' })
  UsedCount: number;
  @Column({ name: 'AvailableCount' })
  AvailableCount: number;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: boolean;
}

@Entity({ name: 'BRI_ItemRequissition' })
export class BRI_ItemRequissition {
  @PrimaryGeneratedColumn({ name: 'RequisitionID' })
  RequisitionID: number;
  @Column({ name: 'DepartmentID' })
  DepartmentID: number;
  @Column({ name: 'SubsidiaryID' })
  SubsidiaryID: number;
  @Column({ name: 'WorkOrderID' })
  WorkOrderID: number;
  @Column({ name: 'WorkOrderStepID' })
  WorkOrderStepID: number;
  @Column({ name: 'TaskId' })
  TaskId: number;
  @Column({ name: 'MRDocumentNo' })
  MRDocumentNo: string;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsMailTriggered' })
  IsMailTriggered: boolean;
  @Column({ name: 'TrigeredOn' })
  TrigeredOn: Date;
  @Column({ name: 'TriggeredBy' })
  TriggeredBy: number;
  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
  @Column({ name: 'ModifiedOn' })
  ModifiedOn: Date;
  @Column({ name: 'ModifiedBy' })
  ModifiedBy: number;
}

@Entity({ name: 'BRI_ItemRequissitionHistory' })
export class BRI_ItemRequissitionHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryID' })
  HistoryID: number;
  @Column({ name: 'RequisitionID' })
  RequisitionID: number;
  @Column({ name: 'DepartmentID' })
  DepartmentID: number;
  @Column({ name: 'SubsidiaryID' })
  SubsidiaryID: number;
  @Column({ name: 'WorkOrderID' })
  WorkOrderID: number;
  @Column({ name: 'WorkOrderStepID' })
  WorkOrderStepID: number;
  @Column({ name: 'TaskId' })
  TaskId: number;
  @Column({ name: 'MRDocumentNo' })
  MRDocumentNo: string;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsMailTriggered' })
  IsMailTriggered: boolean;
  @Column({ name: 'TrigeredOn' })
  TrigeredOn: Date;
  @Column({ name: 'TriggeredBy' })
  TriggeredBy: number;
  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: boolean;
}

@Entity({ name: 'BRI_ItemRequisitionDetails' })
export class BRI_ItemRequisitionDetails {
  @PrimaryGeneratedColumn({ name: 'RequisitionDetailsID' })
  RequisitionDetailsID: number;
  @Column({ name: 'RequisitionID' })
  RequisitionID: number;
  @Column({ name: 'WorkOrderID' })
  WorkOrderID: number;
  @Column({ name: 'WorkOrderStepID' })
  WorkOrderStepID: number;
  @Column({ name: 'TaskId' })
  TaskId: number;
  @Column({ name: 'WorkOrderItemId' })
  WorkOrderItemId: number;
  @Column({ name: 'Quantity' })
  Quantity: number;
  @Column({ name: 'Remarks' })
  Remarks: number;
  @Column({ name: 'WorkOrderNo' })
  WorkOrderNo: number;
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

@Entity({ name: 'BRI_ItemRequisitionDetailsHistory' })
export class BRI_ItemRequisitionDetailsHistory {
  @PrimaryGeneratedColumn({ name: 'HistoryID' })
  HistoryID: number;
  @Column({ name: 'RequisitionDetailsID' })
  RequisitionDetailsID: number;
  @Column({ name: 'RequisitionID' })
  RequisitionID: number;
  @Column({ name: 'WorkOrderID' })
  WorkOrderID: number;
  @Column({ name: 'WorkOrderStepID' })
  WorkOrderStepID: number;
  @Column({ name: 'TaskId' })
  TaskId: number;
  @Column({ name: 'WorkOrderItemId' })
  WorkOrderItemId: number;
  @Column({ name: 'Quantity' })
  Quantity: number;
  @Column({ name: 'Remarks' })
  Remarks: number;
  @Column({ name: 'WorkOrderNo' })
  WorkOrderNo: number;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
  @Column({ name: 'IsLastRecord' })
  IsLastRecord: boolean;
}

@Entity({name:"BRI_TimeSheet"})
export class BRI_TimeSheet
{
  @PrimaryGeneratedColumn({ name: 'TimeSheetID' })
  TimeSheetID: number;
  @Column({ name: 'DepartmentID' })
  DepartmentID: number;
  @Column({ name: 'SubsidiaryID' })
  SubsidiaryID: number;
  @Column({ name: 'TimeSheetFor' })
  TimeSheetFor: Date;
  @Column({ name: 'TSDocumentNo' })
  TSDocumentNo: string;
  @Column({ name: 'WorkOrderID' })
  WorkOrderID: number;
  @Column({ name: 'WorkOrderStepID' })
  WorkOrderStepID:number;
  @Column({ name: 'TaskID' })
  TaskID: number;
  @Column({ name: 'WorkOrderNo' })
  WorkOrderNo: string;
  @Column({ name: 'ProjectID' })
  ProjectID: string;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsClosed' })
  IsClosed:boolean;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
  @Column({ name: 'CreatedAt' })
  CreatedAt: Date;
  @Column({ name: 'ModifiedBy' })
  ModifiedBy: number;
  @Column({ name: 'ModifiedOn' })
  ModifiedOn: Date;
}

@Entity({name:"BRI_LabourTimeSheet"})
export class BRI_LabourTimeSheet
{
  @PrimaryGeneratedColumn({ name: 'TimeSheetLabourDetailsID' })
  TimeSheetLabourDetailsID: number;
  @Column({ name: 'TimeSheetID' })
  TimeSheetID: number;
  @Column({ name: 'TimeSheetOn' })
  TimeSheetOn: Date;
  @Column({ name: 'LabourID' })
  LabourID: number;
  @Column({ name: 'StartTime' })
  StartTime: Date;
  @Column({ name: 'EndTime' })
  EndTime: Date;
  @Column({ type: 'time' })
  TotalHours:string;
  @Column({ type: 'time' })
  WorkHours: string;
  @Column({ name: 'WorkHrsInMin' })
  WorkHrsInMin:number;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
  @Column({ name: 'ModifiedOn' })
  ModifiedOn: Date;
  @Column({ name: 'ModifiedBy' })
  ModifiedBy: number;
}

@Entity({name:"BRI_TimesheetIntravelTracking"})
export class BRI_TimesheetIntravelTracking
{
  @PrimaryGeneratedColumn({ name: 'IntervalTimesheetId' })
  IntervalTimesheetId: number;
  @Column({ name: 'IntravelId' })
  IntravelId: number;
  @Column({ name: 'LabourTimesheetId' })
  LabourTimesheetId: number;
  @Column({ name: 'TimeSheetID' })
  TimeSheetID: number;
  @Column({ name: 'StartTime' })
  StartTime: Date;
  @Column({ name: 'EndTime' })
  EndTime: Date;
  @Column({ name: 'Duration' })
  Duration:number;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
}

@Entity({name:"BRI_ItemTimeSheet"})
export class BRI_ItemTimeSheet
{
  @PrimaryGeneratedColumn({ name: 'ItemTimeSheetID' })
  ItemTimeSheetID: number;
  @Column({ name: 'TimeSheetID' })
  TimeSheetID: number;
  @Column({ name: 'ItemID' })
  ItemID: number;
  @Column({ name: 'Quentity' })
  Quentity: number;
  @Column({ name: 'RequisitionID' })
  RequisitionID: number;
  @Column({ name: 'TimeSheetOn' })
  TimeSheetOn: Date;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'IsAdditionalItem' })
  IsAdditionalItem: boolean;
  @Column({ name: 'CreatedAt' })
  CreatedAt: Date;
  @Column({ name: 'Remarks' })
  Remarks: string;
}

@Entity({name:"BRI_MasterIntraval"})
export class BRI_MasterIntraval
{
  @PrimaryGeneratedColumn({ name: 'IntravalId' })
  IntravalId: number;
  @Column({ name: 'DepartmentId' })
  DepartmentId: number;
  @Column({ name: 'IntervalTypeId' })
  IntervalTypeId: number;
  @Column({ name: 'ShiftId' })
  ShiftId: number;
  @Column({ name: 'LocationId' })
  LocationId: number;
  @Column({ type: 'time' })
  Start:string;
  @Column({ type: 'time' })
  EndTime:string;
  @Column({ name: 'Duration' })
  Duration: number;
  @Column({name:'IsActive'})
  IsActive:boolean;
  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
  @Column({ name: 'ModifiedOn' })
  ModifiedOn: Date;
  @Column({ name: 'ModifiedBy' })
  ModifiedBy: Date;
}

@Entity ({name:"BRI_ScrapItemTimesheet"})
export class BRI_ScrapItemTimesheet{
  @PrimaryGeneratedColumn({ name: 'ScrapTimesheetId' })
  ScrapTimesheetId: number;
  @Column({ name: 'TimesheetId' })
  TimesheetId: number;
  @Column({ name: 'ScrapItem' })
  ScrapItem: string;
  @Column({ name: 'Remarks' })
  Remarks: string;
  @Column({ name: 'Quantity' })
  Quantity: number;
  @Column({ name: 'WorkorderStepId' })
  WorkorderStepId: number;
  @Column({ name: 'DepartmentId' })
  DepartmentId: number;
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

@Entity ({name:"BRI_MachineTimesheet"})
export class BRI_MachineTimesheet{
  @PrimaryGeneratedColumn({ name: 'MachineTimesheetId' })
  MachineTimesheetId: number;
  @Column({ name: 'TimesheetId' })
  TimesheetId: number;
  @Column({ name: 'MachineId' })
  MachineId: number;
  @Column({ name: 'Duration' })
  Duration: number;
  @Column({ name: 'WorkorderStepId' })
  WorkorderStepId: number;
  @Column({ name: 'DepartmentId' })
  DepartmentId: number;
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

@Entity ({name:"BRI_LabourMultiTaskTsDetails"})
export class BRI_LabourMultiTaskTsDetails{
  @PrimaryGeneratedColumn({ name: 'MultiTaskTsId' })
  MultiTaskTsId: number;
  @Column({ name: 'ParrentLabourTsId' })
  ParrentLabourTsId: number;
  @Column({ name: 'LabourTsId' })
  LabourTsId: number;
  @Column({ name: 'StartTime' })
  StartTime: Date;
  @Column({ name: 'EndTime' })
  EndTime: Date;
  @Column({ name: 'ConsolidatedDuration' })
  ConsolidatedDuration: number;
  @Column({ name: 'NoOfTask' })
  NoOfTask: number;
  @Column({ name: 'IsCompleted' })
  IsCompleted: boolean;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
}

@Entity ({name:"BRI_TimesheetItemMaser"})
export class BRI_TimesheetItemMaser{
  @PrimaryGeneratedColumn({ name: 'TimeSheetITemId' })
  TimeSheetITemId: number;
  @Column({ name: 'WorkOrderId' })
  WorkOrderId: number;
  @Column({ name: 'WorkOrderNo' })
  WorkOrderNo: string;
  @Column({ name: 'WorkorderStepId' })
  WorkorderStepId: number;
  @Column({ name: 'DepartmentId' })
  DepartmentId: number;
  @Column({ name: 'SignType' })
  SignType: string;

  @Column({ name: 'Item' })
  Item: string;
  @Column({ name: 'IsActive' })
  IsActive: boolean;
  @Column({ name: 'AlloatedQuantity' })
  AlloatedQuantity: number;
  @Column({ name: 'AvailableQuantity' })
  AvailableQuantity: number;
  @Column({ name: 'UsedQuantity' })
  UsedQuantity: number;
  @Column({ name: 'CreatedOn' })
  CreatedOn: Date;
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;
  @Column({ name: 'ModifiedOn' })
  ModifiedOn: Date;
  @Column({ name: 'ModifiedBy' })
  ModifiedBy: number;
}

@Entity ({name:"BRI_ChangeRequestFlow"})
export class BRI_ChangeRequestFlow{
  @PrimaryGeneratedColumn({ name: 'RequestID' })
  RequestID: number;
  @Column({ name: 'TimesheetID' })
  TimesheetID: number;
  @Column({ name: 'StatusId' })
  StatusId: number;
  @Column({ name: 'Remarks' })
  Remarks: string;
  @Column({ name: 'IsClosed' })
  IsClosed: boolean;
  @Column({ name: 'ClosedOn' })
  ClosedOn: Date;
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

@Entity ({name:"BRI_MachineTimesheetChangeRequest"})
export class BRI_MachineTimesheetChangeRequest{
  @PrimaryGeneratedColumn({ name: 'MachineTsCRId' })
  MachineTsCRId: number;
  @Column({ name: 'MachineTimesheetId' })
  MachineTimesheetId: number;
  @Column({ name: 'RequestId' })
  RequestId: number;
  @Column({ name: 'MachineId' })
  MachineId: number;
  @Column({ name: 'Duration' })
  Duration: number;
  @Column({ name: 'StatusId' })
  StatusId: number;
  @Column({ name: 'Remarks' })
  Remarks: string;
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


@Entity ({name:"BRI_ScrapTSChangeRequest"})
export class BRI_ScrapTSChangeRequest{
  @PrimaryGeneratedColumn({ name: 'ChangeRequestId' })
  ChangeRequestId: number;
  @Column({ name: 'ScrapTimesheetId' })
  ScrapTimesheetId: number;
  @Column({ name: 'RequestId' })
  RequestId: number;
  @Column({ name: 'ScrapItem' })
  ScrapItem: string;
  @Column({ name: 'Remarks' })
  Remarks: string;
  @Column({ name: 'StatusId' })
  StatusId: number;
  @Column({ name: 'Quantity' })
  Quantity: number;
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

@Entity ({name:"BRI_LabourTimeSheetChangeRequest"})
export class BRI_LabourTimeSheetChangeRequest{
  @PrimaryGeneratedColumn({ name: 'ChangeRequestId' })
  ChangeRequestId: number;
  @Column({ name: 'TimeSheetLabourID' })
  TimeSheetLabourID: number;
  @Column({ name: 'RequestId' })
  RequestId: number;
  @Column({ name: 'LabourID' })
  LabourID: number;
  @Column({ name: 'StartTime' })
  StartTime: Date;
  @Column({ name: 'EndTime' })
  EndTime: Date;
  @Column({ name: 'WorkHrsInMin' })
  WorkHrsInMin: number;
  @Column({ name: 'StatusId' })
  StatusId: number;
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

