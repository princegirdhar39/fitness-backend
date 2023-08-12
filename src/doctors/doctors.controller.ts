import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import path from 'path';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post('create')
  createNewUser(@Body() createDoctorDto: CreateDoctorDto): Promise<CreateDoctorDto> {
    return this.doctorsService.createNewUser(createDoctorDto);
  }
  
}
