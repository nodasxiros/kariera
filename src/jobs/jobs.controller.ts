import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  UseGuards
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Job } from './job.entity';
import { ILike, InsertResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('jobs')
@Controller()
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('jobs')
  @ApiCreatedResponse({ status: 201, description: 'Created'})
  @ApiBadRequestResponse({ status: 400, description: 'Bad request'})
  @UseGuards(JwtAuthGuard)
  async create(@Body() createJobDto: CreateJobDto): Promise<InsertResult> {
    return await this.jobsService.create(createJobDto)
      
  }

  @Get('jobs')
  @ApiOkResponse({ status: 200, description: 'Result' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request'})
  @ApiQuery({
    name: 'where',
    required: false,
    schema: {
      type: 'string',
      example: '{ "id": 1 }'
    }
  })
  async findAll(@Query('where') where: string = `{}`): Promise<Job[]> {
    const res = await this.jobsService.findAll({
      where: JSON.parse(where)
    });
    if (!res.length) throw new NotFoundException({
      status: 404,
      message: 'No results with these criteria'
    });
    return res;
  }

  @Get(':id')
  @ApiOkResponse({ status: 200, description: 'Result' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request'})
  async findOne(@Param('id') id: string) {
    const res: any = await this.jobsService.findOne(+id);
    if (!res) throw new NotFoundException({
      status: 404,
      message: 'No results with these criteria'
    });
    return res;
  }

  @Get('jobs/search')
  @ApiOkResponse({ status: 200, description: 'Result' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request'})
  @ApiQuery({
    name: 'query',
    required: false,
    schema: {
      type: 'string',
      example: ''
    }
  })
  async search(
    @Query('query') query: string = ``,
  ): Promise<Job[]> {
    const res: any = await this.jobsService.findAll({
      where: [
        { title: ILike(`%${query}%`) },
        { description: ILike(`%${query}%`) }
      ]
    })
    if (!res.length) throw new NotFoundException({
      status: 404,
      message: 'No results with these criteria'
    });
    return res;
  }

  @Patch('jobs/:id')
  @ApiOkResponse({ status: 200, description: 'Job has been updated' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request'})
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return await this.jobsService.update(+id, updateJobDto);
  }

  @Delete('jobs/:id')
  @ApiOkResponse({ status: 200, description: 'Job has been deleted' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request'})
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.jobsService.remove(+id);
  }
}
