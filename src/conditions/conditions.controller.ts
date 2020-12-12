import {
    Controller,
    Post,
    Body,
    Logger,
  } from '@nestjs/common';
  import { ConditionsService } from './conditions.service';
  import { ConditionsEntity } from './conditions.entity';
  
  @Controller('conditions')
  export class ConditionsController {
    private logger = new Logger('ConditionsController');
  
    constructor(private conditionsService: ConditionsService) {}
  
    @Post()
    createConditions(
      @Body('P_condition') condition: string,
    
   
    ): Promise<ConditionsEntity> {
      this.logger.verbose({ condition});
      return this.conditionsService.createConditions(condition);
    }
  }
  