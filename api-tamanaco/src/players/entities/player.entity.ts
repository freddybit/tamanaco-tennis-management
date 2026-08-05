import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Email } from "../../shared/entities/email.entity";
import { IdentityDocument } from "../../shared/entities/identity-document.entity";
import { Phone } from "../../shared/entities/phone.entity";
import { Verification } from "../../shared/entities/verification.entity";
import { Place } from "../../shared/entities/place.entity";
import { PlayerClub } from "../../shared/entities/player-club.entity";
import { PlayerDouble } from "./player-double.entity";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    profileKey: number;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    secondName: string | null;

    @Column()
    firstLastname: string;

    @Column({ nullable: true })
    secondLastname: string | null;

    @Column({ nullable: true })
    birthDate: Date | null;

    @Column()
    sex: string;

    @Column()
    place_placeKey: number | null;

    @Column({ nullable: true })
    photoOne: string | null;

    @Column({ nullable: true })
    photoTwo: string | null;

    @OneToOne(() => IdentityDocument, (identityDocument) => identityDocument.Player_profileKey)
    identityDocument: IdentityDocument;

    @OneToMany(() => Email,  (email) => email.Player_profileKey)
    emails: Email[];

    @OneToMany(() => Phone, (phone) => phone.Player_profileKey)
    phones: Phone[];

    @OneToMany(() => PlayerClub, (playerClub) => playerClub.Player_profileKey)
    playerClubs: PlayerClub[];

    @OneToMany(() => Verification, (verification) => verification.Player_profileKey)
    verifications: Verification[];

    @OneToMany(() => PlayerDouble, (playerDouble) => playerDouble.player_profileKey)
    playerDoubles: PlayerDouble[];

    @ManyToOne(() => Place, (place) => place.placeKey)
    @JoinColumn({ name: 'place_placeKey' })
    place: Place | null;

    constructor(profileKey: number,firstName: string,secondName: string,firstLastname: string,secondLastname: string,birthDate: Date,sex: string, place_placeKey: number | null, photoOne: string,photoTwo: string, identityDocument: IdentityDocument, emails: Email[], phones: Phone[], playerClubs: PlayerClub[], verifications: Verification[], playerDoubles: PlayerDouble[], place: Place | null) {
        this.profileKey = profileKey;
        this.firstName = firstName;
        this.secondName = secondName;
        this.firstLastname = firstLastname;
        this.secondLastname = secondLastname;
        this.birthDate = birthDate;
        this.sex = sex;
        this.place_placeKey = place_placeKey;
        this.photoOne = photoOne;
        this.photoTwo = photoTwo;
        this.identityDocument = identityDocument;
        this.emails = emails;
        this.phones = phones;
        this.playerClubs = playerClubs;
        this.verifications = verifications;
        this.playerDoubles = playerDoubles;
        this.place = place;
    }
}
