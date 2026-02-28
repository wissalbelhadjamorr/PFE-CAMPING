import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camping } from './camping.entity';
import { CampingController } from './camping.controller';
import { CampingService } from './camping.service';

@Module({
  imports: [TypeOrmModule.forFeature([Camping])],
  controllers: [CampingController],
  providers: [CampingService],
  exports: [CampingService], 
})
export class CampingModule {}