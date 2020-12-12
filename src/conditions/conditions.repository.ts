import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ConditionsEntity} from './conditions.entity';

@EntityRepository(ConditionsEntity)
export class ConditionsRepository extends Repository<ConditionsEntity> {
  private logger = new Logger('NotesRepository');
}
