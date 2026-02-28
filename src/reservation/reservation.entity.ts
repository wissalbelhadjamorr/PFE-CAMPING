import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Statut } from './reservation.enum';
import { Camping } from 'src/camping/camping.entity';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
@Entity()
export class Reservation{

    @PrimaryGeneratedColumn()
    reservation_id:number;

    @Column({nullable:false})
    dateDebut:Date;

    @Column({nullable:false})
    dateFin:Date;

    @Column({type:'int', nullable:false})
    nombrePersonnes:number;

    @Column({type:'enum', enum:Statut, default:Statut.EN_ATTENTE})
    statut:Statut;

    @Column({type:'float', nullable:false})
    montant:number;

    @JoinColumn({ name: 'camping_id' })
    @ManyToOne(() => Camping, camping => camping.reservations, { nullable: false })
    camping: Camping;

   @OneToOne(() => Utilisateur, utilisateur => utilisateur.reservations, { nullable: false })
    @JoinColumn({ name: 'utilisateur_id' })
    utilisateur: Utilisateur;



}