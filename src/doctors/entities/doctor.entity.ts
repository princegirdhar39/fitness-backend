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
  import { PrescriptionsEntity } from 'src/prescriptions/prescription.entity';
  
  @Entity('doctor')
  export class Doctor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    first_name: string;
  
    @Column()
    last_name: string;

    @Column()
    username: string;
  
    @Column()
    email: string;
    
    @Column()
    password: string

}
  