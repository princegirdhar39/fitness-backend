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
  
  @Entity('prescription')
  export class PrescriptionsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    prescription: string;
  
    @ManyToMany((type) => UsersEntity, { cascade: true })
    @JoinTable({
      name: 'users_prescriptions',
      joinColumn: {
        name: 'prescription',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'user',
        referencedColumnName: 'id',
      },
    })
    users: UsersEntity[];
  }
  