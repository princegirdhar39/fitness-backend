import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConditionsModule } from 'src/conditions/conditions.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), ConditionsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
