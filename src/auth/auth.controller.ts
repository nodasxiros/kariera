import { Request, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiUnauthorizedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

export interface Me {
  userId: number;
  username: string;
}
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  public async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Get('verify/:access_token')
  public async verify(
    @Param('access_token') access_token: string
  ) {
    const verify = await this.jwtService.verifyAsync(access_token, { ignoreExpiration: true });
    return verify;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@Request() req): Me {
    return req.user;
  }
}
