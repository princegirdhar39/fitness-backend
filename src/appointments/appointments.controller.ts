import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { endOfWeek, getWeek, getYear, startOfWeek } from 'date-fns';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('/update-user-appointment')
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get('/getCurrentWeeksAppointments')
  getCurrentWeeksAppointments() {
    console.log('********')
    
    return this.appointmentsService.getCurrentWeeksAppointments();
  }
  @Get('/getCurrentDayAppointments')
  getCurrentDayAppointments() {
    console.log('********')
    
    return this.appointmentsService.getCurrentDayAppointments();
  }

  @Get(':id')
  getUserAppointments(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
