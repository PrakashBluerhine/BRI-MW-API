import { allWorkorderTableDto, departmentOperationTableDto, meterialRequistion, mrTableDto, TableDto, woOperationHoldAndCompleteDto, woOperationStart, workOrderHoldCance, workorderPlanDto } from '../dto/transaction.dto';
import { ResponseDto } from '../../shared/dto/response.dto';

//import { ForgotPasswordDto, LoginMobileDto, LoginUserDto, UpdatePasswordDto, UserTokenDto, VerifyOtpDto } from "../dto/login-user.dto";
export const TRANSACTION_SERVICE = 'TRANSACTION_SERVICE';

export interface ITraansactionService {
  drp_taxnomy_list(subsidiary_id: any, type: any): Promise<any>;
  new_work_order_list(dto: allWorkorderTableDto): Promise<any>;
  project_list(subsidiary_id: any): Promise<any>;
  project_workOrder_list(obj): Promise<any>;
  plan_workOrder_details(obj): Promise<any>;
  department_operation_list(dto: departmentOperationTableDto): Promise<any>;
  department_emp_list(subsidiary_id: any, department_id: any): Promise<any>;
  workorder_planing(dto: workorderPlanDto): Promise<any>;
  workorder_hold_cancel(dto: workOrderHoldCance): Promise<any>;
  workorder_meterial_list(workorderStepId: any): Promise<any>;
  workorder_meterial_requistion(dto: meterialRequistion): Promise<any>;
  workorder_operation_start(dto: woOperationStart): Promise<any>;
  workorder_operation_hold_complete(
    dto: woOperationHoldAndCompleteDto,
  ): Promise<any>;
  workorder_timesheet_meterial_table(workorderStepId: any): Promise<any>;
  workorder_timesheet_labourTime_table(workorderStepId: any): Promise<any>;
  get_dashboard(locationId: any): Promise<any>;
  ItemRequistionItemTime_table(workorderStepId: any): Promise<any>;
  MachineryListForTimeTable(obj: any): Promise<any>;
  ScrapItemTime_table(workorderStepId: any): Promise<any>;
  meterial_requistion_table(dto: mrTableDto): Promise<any>;
  getLiveIntervals(departmentId: any): Promise<any>;
  customResponse(
    data: object,
    message: string,
    status: string,
  ): Promise<ResponseDto>;
}
