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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import {
  LoginUserDto,
  UserCreationDto,
  UserListRequestDto,
  UserResetRequestDto,
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
    const response = await this.iAuthService.authenticate(loginUserDto);
    return this.iAuthService.customResponse(
      response,
      'Authentication',
      HttpStatus.OK.toString(),
    );
  }

  @ApiBody({ type: UserCreationDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('user_creation')
  public async user_creation(@Body() UserDto: UserCreationDto): Promise<any> {
    const response = await this.iAuthService.user_creation(UserDto);
    return this.iAuthService.customResponse(
      response,
      'User Creation!',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('logout/:session_id')
  public async logout(@Param('session_id') session_id: number): Promise<any> {
    try {
      const response = await this.iAuthService.logout(session_id);
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
  public async resetLink(@Param('user_name') user_name: string): Promise<any> {
    try {
      const response = await this.iAuthService.resetLink(user_name);
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
    @Param('token') token: string,
  ): Promise<any> {
    try {
      const response = await this.iAuthService.resetLinkValidation(token);
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
  public async reset_password(
    @Body() reset: UserResetRequestDto,
  ): Promise<any> {
    const response = await this.iAuthService.resetPassword(reset);
    return this.iAuthService.customResponse(
      response,
      'Reset Link',
      HttpStatus.OK.toString(),
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('user_list')
  public async user_list_table(): Promise<any> {
    try {
      const response = await this.iAuthService.user_list_table();
      return this.iAuthService.customResponse(
        response,
        'User list',
        HttpStatus.OK.toString(),
      );
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
