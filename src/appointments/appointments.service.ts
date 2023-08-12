import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfDay, endOfWeek, getWeek, getYear, startOfDay, startOfWeek } from 'date-fns';
import { Between } from 'typeorm';
import { AppointmentsRepository } from './appointment.repository';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {

  constructor(
    @InjectRepository(AppointmentsRepository)
    private appointmentRepository: AppointmentsRepository)
     {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto)  {
    try {
      
      // let appointment = await this.appointmentRepository.findOne({user_id: createAppointmentDto.user_id});
    // console.log(appointment);
      console.log('create a new one')
      const newAppointment = await this.appointmentRepository.create({
        appointmentDateTime: createAppointmentDto.appointmentDateTime,
        user_id: createAppointmentDto.user_id
        });
        console.log(newAppointment);
        const newApp = await this.appointmentRepository.save(newAppointment);
        console.log(newApp)
        return newApp;
    }
    catch (err) {
      console.error('Error:', err.message);
      throw new NotFoundException('Error occurred while fetching the appointment');
    }
  }


    async getCurrentWeeksAppointments() {
    const currentDate = new Date();
    const getWeekNumber = getWeek(currentDate);
    const currentYear = getYear(currentDate);
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    console.log(start,end)
    let appointment = await this.appointmentRepository.find({
      
        appointmentDateTime: Between(start,end)
      
    });
    console.log(appointment)
    return appointment;

  }
  async getCurrentDayAppointments() {
    const now = new Date();
    const startOfDayDate = startOfDay(now);
    const endOfDayDate = endOfDay(now);
   
    let appointment = await this.appointmentRepository.find({
      where: {
        appointmentDateTime : Between (startOfDayDate ,  endOfDayDate),
      }
    });
    console.log(appointment)
    return appointment;

  }
  
  findOne(id: number) {
    let appointment = this.appointmentRepository.find({
      where:{ user_id: id },
      order: {appointmentDateTime: 'DESC'}
    });

    return appointment;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
