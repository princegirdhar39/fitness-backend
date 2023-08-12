import { Controller, Get } from '@nestjs/common';
import { Post, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local.auth.guard';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post('/login')
  // @UseGuards(AuthGuard("local"))
  // login(): string {
  //   return 'login route'
  // }
  // @UseGuards(JwtAuthGuard)
  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(): string {
    return this.appService.getHello();
  }
}
