
import { UserCreationDto,UserListRequestDto,EmployeeCreationDto, UserRoleDto, LoginUserDto, UserResetRequestDto, UserProfileUpdateDto, UserChangePwdDto } from 'src/auth/dto/auth.dto';
import { ResponseDto } from '../../shared/dto/response.dto';

//import { ForgotPasswordDto, LoginMobileDto, LoginUserDto, UpdatePasswordDto, UserTokenDto, VerifyOtpDto } from "../dto/login-user.dto";
export const AUTH_SERVICE = 'AUTH_SERVICE';

export interface IAuthService {
  user_creation(userCreationDto: UserCreationDto): Promise<any>;

  authenticate(loginUserDto: LoginUserDto): Promise<any>;
  logout(session_id:any):Promise<any>;
  resetLink(email:any):Promise<any>;
  resetLinkValidation(token:any):Promise<any>;
  resetPassword(reset:UserResetRequestDto):Promise<any>;
  // user_list_table(dto:UserListRequestDto):Promise<any>;
  user_list_table():Promise<any>;
  customResponse(
    data: object,
    message: string,
    status: string,
  ): Promise<ResponseDto>;
  
}
