import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateAppointmentDto {

    appointmentDateTime: Date;
  
    user_id: number;
}
