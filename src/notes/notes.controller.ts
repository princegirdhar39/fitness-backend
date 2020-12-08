import {
    Controller,
    Post,
    Body,
    Logger,
  } from '@nestjs/common';
  import { NotesService } from './notes.service';
  import { NotesEntity } from './notes.entity';
  
  @Controller('notes')
  export class NotesController {
    private logger = new Logger('NotesController');
  
    constructor(private notesService: NotesService) {}
  
    @Post()
    createNote(
      @Body('P_note') note: string,
      @Body('P_user') user: number
   
    ): Promise<NotesEntity> {
      this.logger.verbose({ note});
      return this.notesService.createNote(note,user);
    }
  }
  