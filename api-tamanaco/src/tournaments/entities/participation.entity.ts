import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tournament } from "./tournament.entity";
import { Player } from "../../players/entities/player.entity";

@Entity('participation')
export class Participation {
    
    @PrimaryGeneratedColumn({ name: 'parkey', type: 'int' })
    partKey!: number;

    @Column({ name: 'startdate', type: 'date' })
    startDate!: Date;

    @Column({ name: 'enddate', type: 'date' })
    endDate!: Date;

    @Column({ name: 'tournamentamount', type: 'numeric', precision: 10, scale: 2 })
    tournamentAmount!: number;

    @ManyToOne(() => Tournament, (tour) => tour.participations, { nullable: false })
    @JoinColumn({ name: 'tournament_tourkey' })
    tournament!: Tournament;

    @ManyToOne(() => Player, (player) => player.participations, { nullable: false })
    @JoinColumn({ name: 'player_profilekey' })
    player!: Player;

}