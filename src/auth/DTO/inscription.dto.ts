import {IsEnum,IsNotEmpty,IsEmail,MinLength} from 'class-validator';
import { Role } from '../DTO/inscription.enum';

export class InscriptionDTO{
    @IsNotEmpty()
    prenom:string;

    @IsNotEmpty()
    nom:string; 

    @IsEmail()
    @IsNotEmpty()
    email:string;

@MinLength(8)
@IsNotEmpty()
password:string;

@IsEnum(Role)
role:Role;






}

