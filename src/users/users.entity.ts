import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { NotesEntity } from 'src/notes/notes.entity';
import { ConditionsEntity } from 'src/conditions/conditions.entity';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @OneToMany(type => NotesEntity, note => note.user_id)
  notes: NotesEntity[];
  
  @ManyToMany(type => ConditionsEntity, {cascade: true})
  @JoinTable({
    name: 'users_conditions',
    joinColumn: {
      name: 'user', referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'condition',
      referencedColumnName: 'id'
    }
  })
  conditions: ConditionsEntity[]
  
}
