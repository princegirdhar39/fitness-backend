import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UsersEntity } from './users.entity';
import { ConditionsService } from 'src/conditions/conditions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private conditionsService: ConditionsService,
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
      relations: ['notes', 'conditions'],
    });
  }

  async assignAConditionToAUser(user_id: number, condition_id: number) {
    console.log('Service: ', user_id, condition_id);
    const user = await this.usersRepository.findOne(user_id, {
      relations: ['conditions']
    });
    console.log('Found user: ', user);
    const condition = await this.conditionsService.getConditonById(condition_id);
    console.log("Condition: ", condition);
    user.conditions.push(condition);
    await user.save();
    return user;
    // user
    // user_id.conditions.push(conditionEntityObject)
  }
}
