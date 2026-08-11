import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./place.entity";
import { PlayerClub } from "./player-club.entity";

@Entity('club')
export class Club {
    @PrimaryGeneratedColumn({ name: 'clubkey' })
    clubKey!: number;

    @Column({ name: 'clubname' })
    clubName!: string;

    @Column({ name: 'place_placekey', type: 'int' })
    Place_placeKey!: number;

    @OneToMany(() => PlayerClub, (playerClub) => playerClub.club)
    playerClubs!: PlayerClub[];

    @ManyToOne(() => Place, (place) => place.clubs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'place_placekey' })
    place!: Place;

    constructor(partial?: Partial<Club>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }

}