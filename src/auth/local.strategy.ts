import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import { DoctorsService } from 'src/doctors/doctors.service';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStratergy extends PassportStrategy(Strategy){
    constructor(
        private readonly doctorService: DoctorsService,
        private readonly authService: AuthService
        ){
        super();
    }
    async validate(username: string , password: string): Promise<Doctor> {
    //     const user = await this.authService.login(username, password);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
        const doctor = await this.doctorService.getDocByUsername(username);
        console.log(doctor);
        if (!doctor) {
            console.log('1') 
            throw new UnauthorizedException('Invalid credentials');
        }
        if (doctor ||doctor.password === password) {
            return doctor;
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
  }

