import { Controller, Post, Body, Logger, Get } from '@nestjs/common';
import { PrescriptionsService } from './prescrition.service';
import { PrescriptionsEntity } from './prescription.entity';

@Controller('prescription')
export class PrescriptionsController {
  private logger = new Logger('PrescriptionsController');

  constructor(private prescriptionService: PrescriptionsService) {}


  @Get()
  getPrescriptions(): Promise<PrescriptionsEntity[]> {
    this.logger.verbose('getting prescriptions');
    return this.prescriptionService.getPrescriptions();
  }

  @Post()
  createPrescriptions(
    @Body('P_prescription') prescription: string,
  ): Promise<PrescriptionsEntity> {
    this.logger.verbose({ prescription });
    return this.prescriptionService.createPrescriptions(prescription);
  }

  
}
