import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Club } from "./club.entity";
import { Player } from "../../players/entities/player.entity";

@Entity('playerclub')
export class PlayerClub {
    
    @PrimaryGeneratedColumn({ name: 'playerclubkey' })
    playerClubKey!: number;

    @Column({ name: 'player_profilekey' })
    Player_profileKey!: number;

    @Column({ name: 'club_clubkey' })
    Club_clubKey!: number;

    @ManyToOne(() => Player, (player) => player.playerClubs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'player_profilekey' })
    player!: Player;

    @ManyToOne(() => Club, (club) => club.playerClubs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'club_clubkey' })
    club!: Club;

    constructor(partial?: Partial<PlayerClub>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }

}