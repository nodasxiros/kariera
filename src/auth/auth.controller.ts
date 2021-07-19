import { Request, Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiUnauthorizedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InsertResult } from 'typeorm';

export interface Me {
  userId: number;
  username: string;
}
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  public async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post()
  async signup(@Body() createUserDto: CreateUserDto): Promise<InsertResult> {
    return await this.usersService.create(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@Request() req): Me {
    return req.user;
  }
}
