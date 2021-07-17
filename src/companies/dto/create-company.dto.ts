import { ApiProperty } from '@nestjs/swagger';
export class CreateCompanyDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
