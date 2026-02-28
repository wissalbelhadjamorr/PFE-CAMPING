import {Entity, PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn, OneToMany, JoinTable, ManyToMany} from 'typeorm';
import { Role } from './utilisateur.enum';
import { Avis } from 'src/avis/avis.entity';
import { Camping } from 'src/camping/camping.entity';
import { Reservation } from 'src/reservation/reservation.entity';
@Entity()
export class Utilisateur{
    @PrimaryGeneratedColumn()
    utilisateur_id:number;

    @Column({nullable : true, length:20})
    prenom:string;

    @Column({nullable : true, length:20})
    nom:string;

    @Column({unique:true, nullable:true, length:70})
    email: string;

    @Column({nullable:true,length:20})
    photo:string;

    @Column({nullable:true,select:false})
    password:string;


    @Column({nullable:false,default:'local',length:10})
    compte:string;

    @Column({nullable:true,length:255})
    compte_id:string;

    @Column({nullable:true,type:'text'})
    compte_token:string;

    @Column({nullable:true,type:'timestamp'})
    email_verif: Date;

    @Column({nullable:true,length:100})
    token_rem:string;
    
    @Column ({type:'enum', enum:Role, default:Role.CLIENT})
    role: Role;


@OneToMany(() => Camping, camping => camping.utilisateur)
  campings: Camping[];
  
 @OneToMany(() => Avis, avis => avis.utilisateur, { cascade: true })
    avis: Avis[];

@ManyToMany(() => Camping, camping => camping.utilisateursFavoris)
@JoinTable({
  name: 'favoris', 
  joinColumn: { name: 'user_id', referencedColumnName: 'utilisateur_id' },
  inverseJoinColumn: { name: 'camping_id', referencedColumnName: 'camping_id' },
})
favoris: Camping[];


@OneToMany(() => Reservation, reservation => reservation.utilisateur)
reservations: Reservation[];
}