import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { InsertResult, Repository, FindOneOptions } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>
  ) {}
  create(createJobDto: CreateJobDto): Promise<InsertResult> {
    return this.jobRepository
      .insert(createJobDto)
      .catch(err => {
        throw new BadRequestException({
          name: err.name,
          message: err.message,
          detail: err.detail,
        });
      });
  }

  findAll(options?: FindOneOptions<Job>): Promise<Job[]> {
    return this.jobRepository
      .find(options)
      .catch(err => {
        throw new BadRequestException({
          name: err.name,
          message: err.message,
          detail: err.detail,
        });
      });
  }

  findOne(id: number) {
    return this.jobRepository
      .findOne(id)
      .catch(err => {
        throw new BadRequestException({
          name: err.name,
          message: err.message,
          detail: err.detail,
        })
      });
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return this.jobRepository
      .update(+id, updateJobDto)
      .catch(err => {
        throw new BadRequestException({
          name: err.name,
          message: err.message,
          detail: err.detail,
        });
      });
  }

  remove(id: number) {
    return this.jobRepository
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
