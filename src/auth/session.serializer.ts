
import { PassportSerializer } from '@nestjs/passport';
import {Injectable } from '@nestjs/common';


@Injectable ()
export class SessionSerializer extends PassportSerializer {

serializeUser(doctor: any, done: (err: Error, doctor: any) => void): any {
done(null, doctor);
}
deserializeUser(payload: any, done: (err: Error,payload: string) => void) {
    done(null,payload);
    
}

}

