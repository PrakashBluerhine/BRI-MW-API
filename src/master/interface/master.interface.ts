
import { emailAlertTableDto, employeeTableDto, machineryTableDto, newEmployeeDto, newMachineryDto, newMailAlertDto, RoleCreationDto,TableDto} from '../dto/master.dto';
import { ResponseDto } from '../../shared/dto/response.dto';

//import { ForgotPasswordDto, LoginMobileDto, LoginUserDto, UpdatePasswordDto, UserTokenDto, VerifyOtpDto } from "../dto/login-user.dto";
export const MASTER_SERVICE = 'MASTER_SERVICE';

export interface IMasterService {
  create_role(roleCreationDto: RoleCreationDto): Promise<any>;
  role_table(tblDto: TableDto): Promise<any>;
  department_list(subsidiary_id): Promise<any>;
  employee_add_update(dto: newEmployeeDto): Promise<any>;
  employee_list_table(dto:employeeTableDto):Promise<any>;
  machinery_add_update(dto: newMachineryDto): Promise<any>;
  machinery_list_table(dto:machineryTableDto):Promise<any>;
  email_alert(dto: newMailAlertDto): Promise<any>;
  email_alert_list_table(dto: emailAlertTableDto): Promise<any>;
  email_alert_receipient_list(alert_id: number): Promise<any>;
  employee_email_list(subsidiary_id): Promise<any>;
  customResponse(
    data: object,
    message: string,
    status: string,
  ): Promise<ResponseDto>;
  
}
