import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async createUser(
    fname: string,
    lname: string,
    emailid: string,
  ): Promise<UsersEntity> {
    const newUser = await this.usersRepository.create({
      first_name: fname,
      last_name: lname,
      email: emailid,
    });
    return newUser.save();
  }
  async getUsers(): Promise<UsersEntity[]> {
    return this.usersRepository.find({
      relations: ['notes'],
    });
  }
}
