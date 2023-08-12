import { Column } from "typeorm";

export class CreateDoctorDto {
    
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
