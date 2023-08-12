import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt,Strategy} from 'passport-jwt';
import { DoctorsService } from 'src/doctors/doctors.service';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@Injectable()
export class JwtStratergy extends PassportStrategy(Strategy){
    constructor(private readonly doctorService: DoctorsService){
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
         secretOrKey: 'secretKey',
        });
    }
    async validate(payload: any ): Promise<any> {
    const doctor = await this.doctorService.getDocByUsername(payload.username);

        return doctor; //decoded jwt
    }

}