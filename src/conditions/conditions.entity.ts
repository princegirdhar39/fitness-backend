import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UsersEntity } from 'src/users/users.entity';

@Entity('conditions')
export class ConditionsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  condition: string;

  @ManyToMany((type) => UsersEntity, { cascade: true })
  @JoinTable({
    name: 'users-conditions',
    joinColumn: {
      name: 'condition',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
  })
  users: UsersEntity[];
}
