import { forwardRef, Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConditionsModule } from 'src/conditions/conditions.module';
import { PrescriptionsModule } from 'src/prescriptions/prescription.module';
import { NotesModule } from 'src/notes/notes.module';
import { NotesRepository } from 'src/notes/notes.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository,NotesRepository]), ConditionsModule,PrescriptionsModule,PassportModule],
  controllers: [UsersController],
  providers: [UsersService,AuthenticatedGuard],
})
export class UsersModule {} 
