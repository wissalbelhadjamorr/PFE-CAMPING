import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Camping } from '../camping/camping.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class Avis {
    @PrimaryGeneratedColumn()
    avis_id: number;

    @Column({ type: 'int', nullable: false })
    note: number; 

    @Column({ type: 'text', nullable: true })
    commentaire: string;

    @CreateDateColumn()
    date: Date;

@ManyToOne(() => Camping, camping => camping.avis)
@JoinColumn({ name: 'camping_id' })
camping: Camping;

@ManyToOne(() => Utilisateur, utilisateur => utilisateur.avis)
@JoinColumn({ name: 'utilisateur_id' })
utilisateur: Utilisateur;
}