import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
