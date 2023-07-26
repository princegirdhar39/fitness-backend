import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { Doctor } from './entities/doctor.entity';

@EntityRepository(Doctor)
export class DoctorsRepository extends Repository<Doctor> {
  private logger = new Logger('UsersRepository');
}
