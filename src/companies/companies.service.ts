import { Injectable } from '@nestjs/common';
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
    return this.companyRepository.insert(createCompanyDto);
  }

  findAll(options?: any): Promise<Company[]> {
    return this.companyRepository.find(options);
  }

  findOne(id: number): Promise<Company> {
    return this.companyRepository.findOne(+id);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.update(+id, updateCompanyDto);
  }

  remove(id: number) {
    return this.companyRepository.softDelete(+id);
  }
}
