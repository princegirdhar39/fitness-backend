import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { NotesEntity} from './notes.entity';

@EntityRepository(NotesEntity)
export class NotesRepository extends Repository<NotesEntity> {
  private logger = new Logger('NotesRepository');
}
