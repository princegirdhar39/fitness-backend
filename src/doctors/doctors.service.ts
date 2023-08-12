import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { DoctorsRepository } from './doctors.repository';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorsRepository)
    private readonly doctorsrepository : DoctorsRepository
  )
  {}
  createNewUser(createDoctorDto: CreateDoctorDto) {
    const password = encodePassword(createDoctorDto.password);
    console.log(password);
    const newUSer = this.doctorsrepository.create({...createDoctorDto,password});

    return this.doctorsrepository.save(newUSer);
  }
  async getDocByUsername(username: string): Promise<Doctor>{
    return this.doctorsrepository.findOne({where:{ username }})

  }

  // findAll() {
  //   return `This action returns all doctors`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} doctor`;
  // }

  // update(id: number, updateDoctorDto: UpdateDoctorDto) {
  //   return `This action updates a #${id} doctor`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} doctor`;
  // }
}
