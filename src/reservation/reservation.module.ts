import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { CampingModule } from 'src/camping/camping.module';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), CampingModule, UtilisateurModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
