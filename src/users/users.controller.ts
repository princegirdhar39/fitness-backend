import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { get } from 'http';

@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Post()
  createUser(
    @Body('P_fname') fname: string,
    @Body('P_lname') lname: string,
    @Body('P_email') email: string,
  ): Promise<UsersEntity> {
    this.logger.verbose({ fname, lname, email });
    return this.usersService.createUser(fname, lname, email);
  }

  @Get()
  getUsers(): Promise<UsersEntity[]> {
    this.logger.verbose('geting allusers') 
    return this.usersService.getUsers();
  }

  @Post('/assign-condition')
  assignConditionToUser(
    @Body('userId') userId: number,
    @Body('conditionId') conditionId: number,
  ) {
    console.log(`Assign condition to user. User ID: ${userId}  Condition ID: ${conditionId}`);
    return this.usersService.assignAConditionToAUser(userId, conditionId);
  }
  
}
