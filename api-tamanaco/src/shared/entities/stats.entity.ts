import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../../players/entities/player.entity";
import { Participation } from "../../tournaments/entities/participation.entity";

@Entity('stats')
export class Stats {

    @PrimaryGeneratedColumn({ name: 'statskey', type: 'int' })
    statsKey!: number;

    @Column({ name: 'matchesplayed', type: 'int' })
    matchesPlayed!: number;

    @Column({ name: 'matcheswon', type: 'int' })
    matchesWon!: number;

    @Column({ name: 'matcheslost', type: 'int' })
    matchesLost!: number;

    @Column({ name: 'averagematcheswon', type: 'numeric' })
    averageMatchesWon!: number;

    @Column({ name: 'setswon', type: 'int' })
    setsWon!: number;

    @Column({ name: 'setslost', type: 'int' })
    setsLost!: number;

    @Column({ name: 'averagesetswon', type: 'numeric' })
    averageSetsWon!: number;

    @Column({ name: 'gameswon', type: 'int' })
    gamesWon!: number;

    @Column({ name: 'gameslost', type: 'int' })
    gamesLost!: number;

    @Column({ name: 'averagegameswon', type: 'numeric' })
    averageGamesWon!: number;

    @Column({ name: 'player_profilekey', type: 'int' })
    player_profileKey!: number;

    @OneToOne(() => Player, (player) => player.stats)
    @JoinColumn({ name: 'player_profilekey' })
    player?: Player | null;

    @OneToOne(() => Participation, (participation) => participation.stats)
    @JoinColumn({ name: 'participation_parkey' })
    participation?: Participation | null;

    constructor(partial?: Partial<Stats>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }

}