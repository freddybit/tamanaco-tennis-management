import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Club } from './club.entity';

@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    placeKey: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    place_placeKey: number | null;

    @OneToMany(() =>  Place, (place) => place.placeKey)
    places: Place[];

    @ManyToOne(() => Place, (place) => place.places)
    @JoinColumn({ name: "place_placeKey" })
    place: Place | null;

    @OneToMany(() => Player, (player) => player.place)
    players: Player[];

    @OneToMany(() => Club, (club) => club.place)
    clubs: Club[];

    constructor(placeKey: number, type: string, name: string, place_placeKey: number | null, places: Place[], place: Place | null, players: Player[], clubs: Club[]) {
        this.placeKey = placeKey;
        this.type = type;
        this.name = name;
        this.place_placeKey = place_placeKey;
        this.places = places;
        this.place = place;
        this.players = players;
        this.clubs = clubs;
    }
}