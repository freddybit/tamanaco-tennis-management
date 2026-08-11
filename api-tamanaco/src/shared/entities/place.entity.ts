import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Club } from './club.entity';

@Entity('place')
export class Place {
    @PrimaryGeneratedColumn({ name: 'placekey' })
    placeKey!: number;

    @Column({ name: 'type' })
    type!: string;

    @Column({ name: 'name' })
    name!: string;

    @Column({ name: 'place_placekey', nullable: true })
    place_placeKey!: number | null;

    @OneToMany(() =>  Place, (place) => place.place)
    places!: Place[];

    @ManyToOne(() => Place, (place) => place.places, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'place_placekey' })
    place!: Place | null;

    @OneToMany(() => Player, (player) => player.place)
    players!: Player[];

    @OneToMany(() => Club, (club) => club.place)
    clubs!: Club[];

    constructor(partial?: Partial<Place>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}