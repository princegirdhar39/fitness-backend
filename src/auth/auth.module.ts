import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { LocalStratergy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratergy } from './jwt.stratergy';
import { DoctorsService } from 'src/doctors/doctors.service';

@Module({
  imports: [PassportModule,forwardRef(() => DoctorsModule),JwtModule.register ({
    secret:'secretKey',
    signOptions: {
      expiresIn: "60s"
    }
  }),
  
],
  controllers: [AuthController],
  providers: [AuthService,LocalStratergy,JwtStratergy],
  exports: [AuthService]
})
export class AuthModule {}
