import { Column, Entity } from "typeorm";

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
    
    @Column({ name: 'participation_tournament_tourkey', type: 'int', nullable: false })
    participation_tournament_tourKey!: number;

    constructor(partial?: Partial<TournamentStage>){
        if(partial){
            Object.assign(this, partial);
        }
    }

}