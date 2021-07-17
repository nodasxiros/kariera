import { ApiProperty } from '@nestjs/swagger';
export class CreateJobDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}

