import { Module } from '@nestjs/common';
import { ConditionsRepository } from './conditions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConditionsController } from './conditions.controller';
import { ConditionsService } from './conditions.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConditionsRepository])],
  controllers: [ConditionsController],
  providers: [ConditionsService],
  exports: [ConditionsService]
})
export class ConditionsModule {}
