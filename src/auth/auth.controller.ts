import { Body, Request, Controller, Get, Patch, Post, Put, Query, Req, SetMetadata, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiUnauthorizedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  public async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
