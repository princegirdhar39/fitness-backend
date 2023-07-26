import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DoctorsService } from 'src/doctors/doctors.service';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly doctorService: DoctorsService,
    
    ){}

  generateToken(payload: Doctor): string{
    return this.jwtService.sign({...payload});

  }
  async login(username: string, password: string): Promise<string>{
    console.log(username)

    const doctor = await this.doctorService.getDocByUsername(username);
    console.log('**************',doctor);

    if (!doctor) {
      throw new Error('Invalid Credentials');
    }

    if (!doctor.password) {
      throw new Error(
        'Account not activated. Please check your email or contact your admin.',
      );
    }
   

    
   const token = this.generateToken(doctor);
    return token;
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
