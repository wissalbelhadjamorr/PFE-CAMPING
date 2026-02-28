import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Utilisateur } from '../../utilisateur/utilisateur.entity';
import { InscriptionDTO } from './inscription.dto';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Injectable()
export class AuthService {
  constructor(
    private utilisateurService: UtilisateurService,
    private jwt: JwtService,
  ) {}

  creerToken(utilisateur: Utilisateur): string {
    const payload = {
      id: utilisateur.utilisateur_id,
      email: utilisateur.email,
      role: utilisateur.role,
    };
    return this.jwt.sign(payload);
  }

  async inscrire(dto: InscriptionDTO): Promise<{ utilisateur: Utilisateur; token: string }> {
    const ex = await this.utilisateurService.trouverParEmail(dto.email);
    if (ex) {
      throw new ConflictException('Email déjà utilisé');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const utilisateur = await this.utilisateurService.creer({
      prenom: dto.prenom,
      nom: dto.nom,
      email: dto.email,
      password: hash,
      role: dto.role,
      compte: 'local',
    });

    const token = this.creerToken(utilisateur);
      const { password: pwd, ...userSafe } = utilisateur;

  return { utilisateur: userSafe as Utilisateur, token };
  }

async login(email: string, password: string): Promise<{ utilisateur: Utilisateur, token: string }> {
  const utilisateur = await this.utilisateurService.trouverParEmail(email);

  if (!utilisateur) {
    throw new UnauthorizedException('Email ou mot de passe incorrect');
  }

  const valide = await bcrypt.compare(password, utilisateur.password);
  if (!valide) {
    throw new UnauthorizedException('Email ou mot de passe incorrect');
  }

  const { password: pwd, ...userSafe } = utilisateur;

  const token = this.creerToken(utilisateur);

  return { utilisateur: userSafe as Utilisateur, token };
}
}
