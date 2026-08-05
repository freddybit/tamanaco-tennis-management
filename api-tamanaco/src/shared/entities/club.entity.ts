import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./place.entity";
import { PlayerClub } from "./player-club.entity";

@Entity()
export class Club {
    @PrimaryGeneratedColumn()
    clubKey: number;

    @Column()
    clubName: string;

    @Column()
    Place_placeKey: number;

    @OneToMany(() => PlayerClub, (playerClub) => playerClub.playerClubKey)
    playerClubs: PlayerClub[];

    @ManyToOne(() => Place, (place) => place.clubs)
    @JoinColumn({ name: 'Place_placeKey' })
    place: Place;

    constructor(clubKey: number, clubName: string,  Place_placeKey: number, playerClubs: PlayerClub[], place: Place) {
        this.clubKey = clubKey;
        this.clubName = clubName;
        this.Place_placeKey = Place_placeKey;
        this.playerClubs = playerClubs;
        this.place = place;
    }
}