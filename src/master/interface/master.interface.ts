
import { RoleCreationDto,TableDto} from '../dto/master.dto';
import { ResponseDto } from '../../shared/dto/response.dto';

//import { ForgotPasswordDto, LoginMobileDto, LoginUserDto, UpdatePasswordDto, UserTokenDto, VerifyOtpDto } from "../dto/login-user.dto";
export const MASTER_SERVICE = 'MASTER_SERVICE';

export interface IMasterService {
  create_role(roleCreationDto: RoleCreationDto): Promise<any>;
  role_table(tblDto: TableDto): Promise<any>;


  customResponse(
    data: object,
    message: string,
    status: string,
  ): Promise<ResponseDto>;
  
}
