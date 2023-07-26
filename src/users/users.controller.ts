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
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { get } from 'http';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

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
  @UseGuards(AuthenticatedGuard)
  @Get()
  getUsers(): Promise<UsersEntity[]> {
    this.logger.verbose('geting allusers') 
    return this.usersService.getUsers();
  }
  @Get()
  getUserById(
    @Body('user_id') userId: number
  ) {
    return this.usersService.getUserById(userId);
  }

  @Post('/assign-condition')
  assignConditionToUser(
    @Body('userId') userId: number,
    @Body('conditionId') conditionId: number,
  ) {
    console.log(`Assign condition to user. User ID: ${userId}  Condition ID: ${conditionId}`);
    return this.usersService.assignAConditionToAUser(userId, conditionId);
  }
  @Delete('/remove-condition')
  unassignConditionFromUser(
    @Body('userId') userId: number,
    @Body('conditionId') conditionId: number,
) {
  console.log(userId,conditionId);
  return this.usersService.unassignConditionFromUser(userId, conditionId);
  }
  @Delete('/remove-prescription')
  unassignPrescriptionFromUser(
    @Body('userId') userId: number,
    @Body('prescriptionId') prescriptionId: number,
) {
  console.log(`Unassign condition to user. User ID: ${userId}  Condition ID: ${prescriptionId}`);
  return this.usersService.unassignPrescriptionFromUser(userId, prescriptionId);
  



  }
  @Post('/assign-prescription')
  assignPrescriptionToUser(
    @Body('userId') userId: number,
    @Body('prescriptionId') prescriptionId: number,
  ) {
    console.log(`Assign prescription to user. User ID: ${userId}  Condition ID: ${prescriptionId }`);
    return this.usersService.assignAPrescriptionToAUser(userId, prescriptionId);
  }
  @Put('/update-user-note')
  updateUserNote(
    @Body('userId') userId: number,
    @Body('note') note: string
  ) {
    console.log(`Assign note to user: ${userId} note: ${note}`);
    return this.usersService.updateUserNote(userId,note)

  }
  
}
