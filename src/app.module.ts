import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/DTO/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { AvisModule } from './avis/avis.module';
import { CampingModule } from './camping/camping.module';
import { Reservation } from './reservation/reservation.entity';
import { ReservationModule } from './reservation/reservation.module';


@Module({
imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UtilisateurModule,
    AvisModule,
    CampingModule,
    ReservationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'campings',
      autoLoadEntities: true,
      synchronize: true,
    }),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
