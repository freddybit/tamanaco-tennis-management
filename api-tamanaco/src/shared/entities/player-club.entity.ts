import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Club } from "./club.entity";
import { Player } from "../../players/entities/player.entity";

export class PlayerClub {
    @PrimaryGeneratedColumn()
    playerClubKey: number;

    @Column()
    Player_profileKey: number;

    @Column()
    Club_clubKey: number;

    @ManyToOne(() => Player, (player) => player.profileKey)
    @JoinColumn({ name: 'Player_profileKey' })
    player: Player;

    @ManyToOne(() => Club, (club) => club.clubKey)
    @JoinColumn({ name: 'Club_clubKey' })
    club: Club;

    constructor(playerClubKey: number, Player_profileKey: number, Club_clubKey: number, player: Player, club: Club) {
        this.playerClubKey = playerClubKey;
        this.Player_profileKey = Player_profileKey;
        this.Club_clubKey = Club_clubKey;
        this.player = player;
        this.club = club;
    }
}