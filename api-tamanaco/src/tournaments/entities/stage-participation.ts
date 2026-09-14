import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TournamentStage } from "./tournament-stage.entity";
import { Participation } from "./participation.entity";

@Entity('stageparticipation')
export class StageParticipation {

    @PrimaryGeneratedColumn({ name: 'stageparticipationkey', type: 'int' })
    stageParticipationKey!: number;

    @Column({name: 'tournamentstage_tournamentstagekey', type: 'int', nullable: false })
    TournamentStage_tournamentStageKey!: number;

    @Column({name: 'participation_parkey', type: 'int', nullable: false })
    Participation_parKey!: number;

    @ManyToOne(() => TournamentStage, tournamentStage => tournamentStage.StageParticipations)
    @JoinColumn({ name: 'tournamentstage_tournamentstagekey'})
    TournamentStage!: TournamentStage;

    @ManyToOne(() => Participation, participation => participation.StageParticipations)
    @JoinColumn({ name: 'participation_parkey'})
    Participation!: Participation;

    constructor(partial?: Partial<StageParticipation>){
        if(partial){
            Object.assign(this, partial);
        }
    }
}