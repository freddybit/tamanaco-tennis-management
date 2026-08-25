import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Participation } from "./participation.entity";
import { TennisCategory } from "../../tennis-categories/entities/tennis-category.entity";

@Entity('tournament')
export class Tournament {

    @PrimaryGeneratedColumn({ name: 'tourkey', type: 'int' })
    tourKey!: number;

    @Column({ name: 'tourName', type: 'varchar', length: 100 })
    tourName!: string;

    @Column({ name: 'tourDescription', type: 'text' })
    tourDescription!: string;

    @Column({ name: 'startDate', type: 'date' })
    startDate!: Date;

    @Column({ name: 'endDate', type: 'date' })
    endDate!: Date;

    @Column({ name: 'tenniscategory_catkey', type: 'int' })
    tennisCategory_catKey!: number;

    @OneToMany(() => Participation, (participation) => participation.tournament, { cascade: true })
    participations!: Participation[];

    @ManyToOne(() => TennisCategory, (tennisCategory) => tennisCategory.tournaments)
    @JoinColumn({ name: 'tenniscategory_catkey' })
    tennisCategory!: TennisCategory;

    constructor(partial?: Partial<Tournament>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }

}
    