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
    return this.usersRepository.find({
      relations: ['notes', 'conditions', 'prescription'],
    });
  }

  async assignAConditionToAUser(user_id: number, condition_id: number) {
    console.log('Service: ', user_id, condition_id);
    const user = await this.usersRepository.findOne(user_id, {
      relations: ['conditions'],
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
      // Usernote.note = note;
      await this.notesRepository.update({ user_id },{note});
    } else {
      await this.notesRepository.save({
        note,
        user_id,
      });
    }
  }
}
