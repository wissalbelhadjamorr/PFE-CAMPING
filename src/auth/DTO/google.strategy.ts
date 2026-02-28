import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private utilisateurService: UtilisateurService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const email = profile.emails[0].value;
    const prenom = profile.name.givenName;
    const nom = profile.name.familyName;
    const photo = profile.photos[0].value;
    const compte_id = profile.id;

    let utilisateur = await this.utilisateurService.trouverParEmail(email);

    if (!utilisateur) {
      utilisateur = await this.utilisateurService.creer({
        email,
        prenom,
        nom,
        photo,
        compte_id,
        compte: 'google',
      });
    }

    return utilisateur;
  }
}
