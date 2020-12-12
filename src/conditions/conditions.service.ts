import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConditionsRepository } from './conditions.repository';
import { ConditionsEntity } from './conditions.entity';

@Injectable()
export class ConditionsService {
  constructor(
    @InjectRepository(ConditionsRepository)
    private conditionsRepository: ConditionsRepository,
  ) {}

  async createConditions(condition: string): Promise<ConditionsEntity> {
    const newcondition = await this.conditionsRepository.create({
      condition: condition,
    });
    return newcondition.save();
  }

  async getConditonById(id: number) {
    return this.conditionsRepository.findOne(id);
  }
}
