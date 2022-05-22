import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
// import { ConditionsRepository } from './conditions.repository';
// import { ConditionsEntity } from './conditions.entity';
import { PrescriptionsEntity } from './prescription.entity';
import { PrescriptionsRepository } from './prescription.repository';


@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(PrescriptionsRepository)
    private prescriptionsRepository: PrescriptionsRepository,
  ) {}

  async createPrescriptions(prescription: string): Promise<PrescriptionsEntity> {
    const newprescription = await this.prescriptionsRepository.create({
      prescription: prescription,
    });
    return newprescription.save();
  }
  
  async getPrescriptions(): Promise<PrescriptionsEntity[]>{
    return this.prescriptionsRepository.find()

  }

  async getPrescriptionById(id: number) {
    return this.prescriptionsRepository.findOne(id);
  }
 async createPrescription() {
   
 }
}
