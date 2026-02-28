import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Utilisateur} from './utilisateur.entity';
import { UtilisateurService } from './utilisateur.service';

@Module({
    imports: [TypeOrmModule.forFeature([Utilisateur])
],
controllers:[],
providers:[UtilisateurService],
exports:[UtilisateurService],
})
export class UtilisateurModule{}