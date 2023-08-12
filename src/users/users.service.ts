import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UsersEntity } from './users.entity';
import { ConditionsService } from 'src/conditions/conditions.service';
import { PrescriptionsService } from 'src/prescriptions/prescrition.service';
import { NotesRepository } from 'src/notes/notes.repository';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private notesRepository: NotesRepository,
    private prescriptionsService: PrescriptionsService,

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
    const users = await this.usersRepository.find({
      relations: ['conditions', 'prescription'],
    });
    for (let user of users) {
      const note = await this.notesRepository.findOne({ user_id: user.id });
      user.note = note?.note;
      // user.conditions
      // user.prescription
    }
    return users;
  }

  async getUserById(id): Promise<UsersEntity>{
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });

  }
  async unassignPrescriptionFromUser(user_id: number, prescription_id: number){
    const user = await this.usersRepository.findOne(user_id, {
      relations: ['prescription'],
    });
    console.log('Found user: ', user);
    if (!user) {
      throw new Error(`User with ID ${user_id} not found`);
    }
    let indexToRemove = user.prescription.findIndex((pres) => pres.id === prescription_id );
    if (indexToRemove === -1) {
      throw new Error(`Condition with ID ${prescription_id} not found for the user${user_id}`);
    }
    
      user.prescription.splice(indexToRemove,1);
      await this.usersRepository.save(user);
      return user;


  }
  async  unassignConditionFromUser(userId: number, conditionId: number) {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['conditions'],
    });
  
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    if(user) {
      console.log(userId)
    }
  
    const conditionIndex = user.conditions.findIndex(
      (condition) => condition.id === conditionId
    );
  
    if (conditionIndex === -1) {
      throw new Error(`Condition with ID ${conditionId} not found for the user${userId}`);
    }
  
    user.conditions.splice(conditionIndex, 1);
    await this.usersRepository.save(user);
  
    return user;
  }

  async assignAConditionToAUser(user_id: number, condition_id: number) {
    console.log('Service: ', user_id, condition_id);
    const user = await this.usersRepository.findOne(user_id, {
      relations: ['conditions'], //it retrives the conditions associated with user
    });
    console.log('Found user: ', user);
    const condition = await this.conditionsService.getConditonById(
      condition_id,
    );
    console.log('Condition: ', condition);
    user.conditions.push(condition);
    await user.save();
    return user;
    // user
    // user_id.conditions.push(conditionEntityObject)
  }
  async assignAPrescriptionToAUser(user_id: number, prescription_id: number) {
    console.log('Prescription: ', user_id, prescription_id);
    const user = await this.usersRepository.findOne(user_id, {
      relations: ['prescription'],
    });
    console.log('Found user: ', user);
    const prescription = await this.prescriptionsService.getPrescriptionById(
      prescription_id,
    );
    console.log('Prescription: ', prescription);
    user.prescription.push(prescription);
    await user.save();
    return user;
  }
  async updateUserNote(user_id: number, note: string) {
    console.log('note: ', user_id, note);

    let Usernote = await this.notesRepository.findOne({ user_id });
    if (Usernote) {
      await this.notesRepository.update({ user_id }, { note });
    } else {
      await this.notesRepository.save({
        note,
        user_id,
      });
    }
  }
}
