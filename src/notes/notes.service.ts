import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotesRepository } from './notes.repository';
import { NotesEntity } from './notes.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesRepository)
    private notesRepository: NotesRepository,
  ) {}

  async createNote(
    note: string,
    user: number
   
  ): Promise<NotesEntity> {
    const newnote = await this.notesRepository.create({
      note: note,
      user_id: user
    });
    return newnote.save();
  }
}
