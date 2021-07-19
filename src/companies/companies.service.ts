import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { InsertResult, Repository, FindManyOptions } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
  ) {}
  create(createCompanyDto: CreateCompanyDto): Promise<InsertResult> {
    return this.companyRepository
      .insert(createCompanyDto)
      .catch(err => {
        throw new BadRequestException({
          name: err.name,
          message: err.message,
          detail: err.detail,
        });
      });
  }

  findAll(options?: FindManyOptions): Promise<Company[]> {
    return this.companyRepository
      .find(options)
      .catch(err => {
        throw new BadRequestException({
          name: err.name,
          message: err.message,
          detail: err.detail,
        });
      });
  }

  findOne(id: number): Promise<Company> {
    return this.companyRepository
      .findOne(+id)
      .catch(err => {
        throw new BadRequestException({
          name: err.name,
          message: err.message,
          detail: err.detail,
        });
      });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository
      .update(+id, updateCompanyDto)
      .catch(err => {
        throw new BadRequestException({
          name: err.name,
          message: err.message,
          detail: err.detail,
        });
      });
  }

  remove(id: number) {
    return this.companyRepository
      .softDelete(+id)
      .catch(err => {
        throw new BadRequestException({
          name: err.name,
          message: err.message,
          detail: err.detail,
        });
      });
  }
}
