import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { InsertResult, Repository, FindManyOptions } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>
  ) {}
  create(createJobDto: CreateJobDto): Promise<InsertResult> {
    return this.jobRepository.insert(createJobDto);
  }

  findAll(options?: object): Promise<Job[]> {
    return this.jobRepository.find(options);
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
