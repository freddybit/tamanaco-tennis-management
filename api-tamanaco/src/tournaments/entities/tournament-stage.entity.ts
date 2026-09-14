import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { StageParticipation } from "./stage-participation";
import { Tournament } from "./tournament.entity";

@Entity('tournamentstage')
export class TournamentStage {

    @Column({ type: 'int', primary: true, generated: true })
    tournamentStageKey!: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    tournamentStageType!: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    name!: string;

    @Column({name: 'tournamentstage_tournamentstagekey', type: 'int', nullable: false })
    tournamentStage_tournamentStageKey!: number;

    @Column({ name: 'participation_parkey', type: 'int', nullable: false })
    participation_parKey!: number;

    @Column({ name: 'tournament_tourkey', type: 'int', nullable: false })
    tournament_tourKey!: number;

    @OneToMany(() => StageParticipation, (stageParticipation) => stageParticipation.TournamentStage, { cascade: true })
    StageParticipations!: StageParticipation[];

    @OneToMany(() => TournamentStage, (tournamentStage) => tournamentStage.tournamentStage_tournamentStageKey, { cascade: true })
    SubStages!: TournamentStage[];

    @ManyToOne(() => Tournament, (Tournament) => Tournament.TournamentStages, { nullable: false })
    @JoinColumn({ name: 'tournament_tourkey' })
    Tournament!: Tournament;

    constructor(partial?: Partial<TournamentStage>){
        if(partial){
            Object.assign(this, partial);
        }
    }

}