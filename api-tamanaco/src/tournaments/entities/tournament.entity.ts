import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Participation } from "./participation.entity";
import { TennisCategory } from "../../tennis-categories/entities/tennis-category.entity";
import { TournamentStage } from "./tournament-stage.entity";

@Entity('tournament')
export class Tournament {

    @PrimaryGeneratedColumn({ name: 'tourkey', type: 'int' })
    tourKey!: number;

    @Column({ name: 'tourname', type: 'varchar', length: 100 })
    tourName!: string;

    @Column({ name: 'tourdescription', type: 'text' })
    tourDescription!: string;

    @Column({ name: 'startdate', type: 'date' })
    startDate!: Date;

    @Column({ name: 'enddate', type: 'date' })
    endDate!: Date;

    @Column({ name: 'tenniscategory_catkey', type: 'int' })
    tennisCategory_catKey!: number;

    @OneToMany(() => Participation, (participation) => participation.tournament, { cascade: true })
    participations!: Participation[];

    @OneToMany(() => TournamentStage, (tournamentStage) => tournamentStage.Tournament, { cascade: true })
    TournamentStages!: TournamentStage[];

    @ManyToOne(() => TennisCategory, (tennisCategory) => tennisCategory.tournaments)
    @JoinColumn({ name: 'tenniscategory_catkey' })
    tennisCategory!: TennisCategory;

    constructor(partial?: Partial<Tournament>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
 
}
    