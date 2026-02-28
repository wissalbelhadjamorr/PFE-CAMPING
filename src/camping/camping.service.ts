import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camping } from './camping.entity';

@Injectable()
export class CampingService {
  constructor(
    @InjectRepository(Camping)
    private campingRepository: Repository<Camping>,
  ) {}

async trouverParId(id: number): Promise<Camping | null> {
    return this.campingRepository.findOne({ where: { camping_id: id } });
}

async ajouter(camping:Partial<Camping>):Promise<Camping>{
    const nouvc=this.campingRepository.create(camping);
    return this.campingRepository.save(nouvc);
  }


  async mettreAJour(id: number, updates: Partial<Camping>): Promise<Camping | null> {
    await this.campingRepository.update(id, updates);
    return this.trouverParId(id);
  }

  async supprimer(id:number):Promise<void>{
    await this.campingRepository.delete(id);
  }

async lister(): Promise<Camping[]> {
    return this.campingRepository.find();


}
}