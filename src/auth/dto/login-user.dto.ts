import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
