import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Email } from "../../shared/entities/email.entity";
import { IdentityDocument } from "../../shared/entities/identity-document.entity";
import { Phone } from "../../shared/entities/phone.entity";
import { Verification } from "../../shared/entities/verification.entity";
import { Place } from "../../shared/entities/place.entity";
import { PlayerClub } from "../../shared/entities/player-club.entity";
import { PlayerDouble } from "./player-double.entity";
import { Stats } from "../../shared/entities/stats.entity";
import { Participation } from "../../tournaments/entities/participation.entity";

@Entity('player')
export class Player {
    @PrimaryGeneratedColumn({ name: 'profilekey' })
    profileKey!: number;

    @Column({ name: 'firstname' })
    firstName!: string;

    @Column({ name: 'secondname', type: 'varchar', nullable: true })
    secondName!: string | null;

    @Column({ name: 'firstlastname' })
    firstLastname!: string;

    @Column({ name: 'secondlastname', type: 'varchar', nullable: true })
    secondLastname!: string | null;

    @Column({ name: 'birthday', type: 'date', nullable: true })
    birthday!: Date | null;

    @Column({ name: 'sex' })
    sex!: string;

    @Column({ name: 'place_placekey', type: 'int', nullable: true })
    place_placeKey!: number | null;

    @Column({ name: 'photoone', type: 'varchar', nullable: true })
    photoOne!: string | null;

    @Column({ name: 'phototwo', type: 'varchar', nullable: true })
    photoTwo!: string | null;

    @OneToOne(() => IdentityDocument, (identityDocument) => identityDocument.player)
    identityDocument?: IdentityDocument | null;

    @OneToOne( () => Stats, (stats) => stats.player)
    stats?: Stats | null;

    @OneToMany(() => Email,  (email) => email.player)
    emails?: Email[];

    @OneToMany(() => Phone, (phone) => phone.player)
    phones?: Phone[];

    @OneToMany(() => PlayerClub, (playerClub) => playerClub.player)
    playerClubs?: PlayerClub[];

    @OneToMany(() => Verification, (verification) => verification.player)
    verifications?: Verification[];

    @OneToMany(() => PlayerDouble, (playerDouble) => playerDouble.player)
    playerDoubles?: PlayerDouble[];

    @OneToMany(() => Participation, (participation) => participation.player)
    participations?: Participation[];

    @ManyToOne(() => Place, (place) => place.placeKey)
    @JoinColumn({ name: 'place_placekey' })
    place?: Place | null;

    constructor(partial?: Partial<Player>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }

}
