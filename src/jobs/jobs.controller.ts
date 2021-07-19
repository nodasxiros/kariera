import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiTags, ApiBearerAuth, ApiNoContentResponse, ApiQuery } from '@nestjs/swagger';
import { Job } from './job.entity';
import { InsertResult } from 'typeorm';

@ApiBearerAuth()
@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto): Promise<InsertResult> {
    return await this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiQuery({ name: 'where', required: false })
  findAll(@Query('where') where: object = {}): Promise<Job[]> {
    console.log({ where })
    return this.jobsService.findAll({
      where
    });
  }

  @Get(':id')
  @ApiNoContentResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
