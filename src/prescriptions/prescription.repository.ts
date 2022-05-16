import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
// import { ConditionsEntity} from './conditions.entity';
import { PrescriptionsEntity } from './prescription.entity';

@EntityRepository(PrescriptionsEntity)
export class PrescriptionsRepository extends Repository<PrescriptionsEntity> {
  private logger = new Logger('prescriptionsRepository');
}
