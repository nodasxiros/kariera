import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ where: { username } });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    const options = { expiresIn: '1d' };
    console.log({ payload, options})
    return {
      access_token: this.jwtService.sign(payload, options),
      user
    };
  }
}
