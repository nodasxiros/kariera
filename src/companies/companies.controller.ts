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
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { InsertResult } from 'typeorm';

@ApiBearerAuth()
@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiCreatedResponse({ status: 201, description: 'Created'})
  @ApiBadRequestResponse({ status: 400, description: 'Bad request'})
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<InsertResult> {
    return await this.companiesService.create(createCompanyDto);
  }

  @Get()
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
  async findAll(
    @Query('where') where: string = '{}',
  ) {
    const res = await this.companiesService.findAll({
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
  findOne(@Param('id') id: string) {
    const res = this.companiesService.findOne(+id);
    if (!res) throw new NotFoundException({
      status: 404,
      message: 'No results with these criteria'
    });
    return res;
  }

  @Patch(':id')
  @ApiOkResponse({ status: 200, description: 'Company has been updated' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request'})
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOkResponse({ status: 200, description: 'Company has been updated' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request'})
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
