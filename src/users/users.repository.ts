import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UsersEntity } from './users.entity';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  private logger = new Logger('UsersRepository');
}
