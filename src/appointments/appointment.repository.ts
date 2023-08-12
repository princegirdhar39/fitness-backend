import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';

@EntityRepository(Appointment)
export class AppointmentsRepository extends Repository<Appointment> {
  private logger = new Logger('UsersRepository');
}
