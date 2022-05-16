import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionsController } from './prescription.controller';
import { PrescriptionsService }from './prescrition.service';
import { PrescriptionsRepository } from './prescription.repository';
@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionsRepository])],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
  exports: [PrescriptionsService]
})
export class PrescriptionsModule {}
