import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { ConditionsModule } from './conditions/conditions.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'M!ndstrength123',
      database: 'fitness',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    UsersModule,
    NotesModule,
    ConditionsModule,
    DoctorsModule,
    AuthModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
