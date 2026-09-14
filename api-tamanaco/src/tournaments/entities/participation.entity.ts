import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tournament } from "./tournament.entity";
import { Player } from "../../players/entities/player.entity";
import { Stats } from "../../shared/entities/stats.entity";
import { Payment } from "../../payments/entities/payment.entity";
import { StageParticipation } from "./stage-participation";

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

    @Column({ name: 'tournament_tourkey', type: 'int'})
    tournament_tourKey!: number;

    @Column({ name: 'player_profilekey', type: 'int'})
    player_profileKey!: number;

    @Column({ name: 'double_doublekey', type: 'int' })
    double_doubleKey!: number;

    @OneToOne(() => Stats, (stats) => stats.participation, { cascade: true })
    stats!: Stats;

    @OneToMany(() => Payment, (payment) => payment.participation, { cascade: true })
    payments!: Payment[];

    @OneToMany(() => StageParticipation, (stageParticipation) => stageParticipation.Participation, { cascade: true })
    StageParticipations!: StageParticipation[];

    @ManyToOne(() => Tournament, (tour) => tour.participations, { nullable: false })
    @JoinColumn({ name: 'tournament_tourkey' })
    tournament!: Tournament;

    @ManyToOne(() => Player, (player) => player.participations, { nullable: false })
    @JoinColumn({ name: 'player_profilekey' })
    player!: Player;

    constructor(partial?: Partial<Participation>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}