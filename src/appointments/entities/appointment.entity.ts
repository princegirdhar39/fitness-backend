import { UsersEntity } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'timestamp'})
    appointmentDateTime: Date;

    @Column()
  @ManyToOne((type) => UsersEntity, (user) => user.appointments)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

}
