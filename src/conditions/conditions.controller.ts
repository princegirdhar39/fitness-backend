import {
    Controller,
    Post,
    Body,
    Logger,
    Get,
  } from '@nestjs/common';
  import { ConditionsService } from './conditions.service';
  import { ConditionsEntity } from './conditions.entity';
  
  @Controller('conditions')
  export class ConditionsController {
    private logger = new Logger('ConditionsController');
  
    constructor(private conditionsService: ConditionsService) {}

    @Get()
  getConditions(): Promise<ConditionsEntity[]> {
    this.logger.verbose('getting conditions');
    return this.conditionsService.getConditions();
  }
  
    @Post()
    createConditions(
      @Body('P_condition') condition: string,
    
   
    ): Promise<ConditionsEntity> {
      this.logger.verbose({ condition});
      return this.conditionsService.createConditions(condition);
    }
  }
  