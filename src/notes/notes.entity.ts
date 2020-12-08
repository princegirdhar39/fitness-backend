import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from 'src/users/users.entity';

@Entity('notes')
export class NotesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: string;

  @Column()
  @ManyToOne((type) => UsersEntity, (user) => user.notes)
  @JoinColumn({ name: 'user_id' })
  user_id: number;
}
