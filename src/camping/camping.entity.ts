import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Confort } from './confort.enum';
import { Gouvernorat } from './gouvernorat.enum';
import { Region } from './region.enum';
import { TypeZone } from './typeZone.enum';
import { ServiceEnum } from './service.enum';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
import { Avis } from 'src/avis/avis.entity';
import { Reservation } from 'src/reservation/reservation.entity';

@Entity()
export class Camping {

    @PrimaryGeneratedColumn()
    camping_id: number;

    @Column({ nullable: false, length: 50 })
    nom: string;

    @Column({ type: 'enum', enum: Region, nullable: false })
    region: Region;

    @Column({ type: 'enum', enum: Gouvernorat, nullable: false })
    gouvernorat: Gouvernorat;

    @Column({ nullable: false, length: 100 })
    adresse: string;

    @Column({ type: 'enum', enum: TypeZone, nullable: false })
    typeZone: TypeZone;

    @Column({ type: 'enum', enum: Confort, nullable: false })
    confort: Confort;

    @Column({ type: 'float', nullable: false })
    prix: number;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ nullable: true, length: 255 })
    photo: string;

    @Column("simple-array", { nullable: true })
    services: ServiceEnum[];

    @Column({ type: 'float', nullable: true })
    latitude: number;

    @Column({ type: 'float', nullable: true })
    longitude: number;

    
 @JoinColumn({ name: 'gestionnaire_id' })
 @ManyToOne(() => Utilisateur, utilisateur => utilisateur.campings, { nullable: false })
  utilisateur: Utilisateur;

 @OneToMany(() => Avis, avis => avis.camping, { cascade: true })
    avis: Avis[];


@ManyToMany(() => Utilisateur, utilisateur => utilisateur.favoris)
utilisateursFavoris: Utilisateur[];

@OneToMany(() => Reservation, reservation => reservation.camping)
reservations: Reservation[];




}
