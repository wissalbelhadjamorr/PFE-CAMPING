import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilRepository: Repository<Utilisateur>,
  ) {}

async trouverParEmail(email:string) : Promise<Utilisateur | null> {
    return this.utilRepository.findOne({where:{email}, select: ['utilisateur_id', 'email', 'password', 'role']});
}

async trouverParId(id:number) : Promise<Utilisateur | null> {
    return this.utilRepository.findOne({where:{utilisateur_id:id}});}


async trouverParCompteId(compte_id:string) : Promise<Utilisateur | null>{
    return this.utilRepository.findOne({where:{compte_id}});
}

async trouverParNom(nom:string) : Promise<Utilisateur | null>{
    return this.utilRepository.findOne({where:{nom}});
}


async trouverParPrenom(prenom:string) : Promise<Utilisateur | null>{
    return this.utilRepository.findOne({where:{prenom}});
}

async creer(utilisateur: Partial<Utilisateur>): Promise <Utilisateur>{
    const nouv=this.utilRepository.create(utilisateur);
    return this.utilRepository.save(nouv);
}


async mettreAJour(id:number,updates:Partial<Utilisateur>):Promise<Utilisateur | null>{
    await this.utilRepository.update(id,updates);
    return this.trouverParId(id);

}

async Lister():Promise<Utilisateur[]>{
    return this.utilRepository.find();
}


async supprimer(id:number):Promise<void>{
    await this.utilRepository.delete(id);
}
  }
