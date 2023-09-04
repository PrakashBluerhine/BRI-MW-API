import {
  Controller,
  Post,
  Body,
  UseFilters,
  Inject,
  HttpStatus,
  LoggerService,
  ValidationPipe,
  UsePipes,
  Get,
  Param,
  HttpException,
} from '@nestjs/common';

import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import {
  LoginUserDto,UserCreationDto, UserResetRequestDto

} from './dto/auth.dto';
import { AUTH_SERVICE, IAuthService } from './interface/auth.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly iAuthService: IAuthService,
  ) {}

  @ApiBody({ type: LoginUserDto })
  @UsePipes(new ValidationPipe())
  @Post('login')
  public async authenticate(@Body() loginUserDto: LoginUserDto): Promise<any> {
    let response=await this.iAuthService.authenticate(loginUserDto);
    return this.iAuthService.customResponse(
      response,
      'Authentication',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: UserCreationDto })
  @UsePipes(new ValidationPipe())
  @Post('user_creation')
  public async user_creation(@Body() UserDto: UserCreationDto): Promise<any> {
    let response=await this.iAuthService.user_creation(UserDto);
    return this.iAuthService.customResponse(
      response,
      'User Creation!',
      HttpStatus.OK.toString(),
    );
  }
 
  @Get('logout/:session_id')
  public async logout(
    @Param('session_id') session_id: number
  ): Promise<any> {
    try {
      let response=await this.iAuthService.logout(session_id);
      return this.iAuthService.customResponse(
        response,
        'Logout',
        HttpStatus.OK.toString(),
      );
    

    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('resetLink/:user_name')
  public async resetLink(
    @Param('user_name') user_name: string
  ): Promise<any> {
    try {
      let response=await this.iAuthService.resetLink(user_name);
      return this.iAuthService.customResponse(
        response,
        'Reset Link',
        HttpStatus.OK.toString(),
      );
    

    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('resetLinkValidation/:token')
  public async resetLinkValidation(
    @Param('token') token: string
  ): Promise<any> {
    try {
      let response=await this.iAuthService.resetLinkValidation(token);
      return this.iAuthService.customResponse(
        response,
        'Reset Link',
        HttpStatus.OK.toString(),
      );
    

    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({ type: UserResetRequestDto })
  @UsePipes(new ValidationPipe())
  @Post('reset_password')
  public async reset_password(@Body() reset: UserResetRequestDto): Promise<any> {
    let response=await this.iAuthService.resetPassword(reset);
      return this.iAuthService.customResponse(
        response,
        'Reset Link',
        HttpStatus.OK.toString(),
      );
  }
}


