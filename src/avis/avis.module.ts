import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avis } from './avis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Avis])],
 
})
export class AvisModule {}