import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsRepository } from './appointment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentsRepository])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule {}
