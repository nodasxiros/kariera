import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult, FindOneOptions } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<InsertResult> {
    return this.usersRepository.insert(createUserDto)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOne(options: FindOneOptions<User>): Promise<User> {
    return this.usersRepository.findOne({ where: options.where });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id)
  }
}
