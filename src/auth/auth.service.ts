import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DoctorsService } from 'src/doctors/doctors.service';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { comparePasswords } from 'src/utils/bcrypt';
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

    const doctor = await this.doctorService.getDocByUsername(username);
    const token = this.generateToken(doctor);

    if (!doctor) {
      throw new Error('Invalid Credentialshi');
    }
    const matched = comparePasswords(password,doctor.password);

    if (!matched) {
      throw new Error(
        'Invalid Credentials--',
      );
    }
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
