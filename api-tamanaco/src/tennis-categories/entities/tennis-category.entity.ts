import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ranking } from "./ranking.entity";
import { PlayerTennisCategory } from "./player-tennis-category.entity";
import { Tournament } from "../../tournaments/entities/tournament.entity";

@Entity('tenniscategory')
export class TennisCategory {

    @PrimaryGeneratedColumn({ name: 'catkey', type: 'int' })
    catKey!: number;

    @Column({ name: 'categoryname', type: 'varchar', length: 100, nullable: false })
    categoryName!: string;

    @Column({ name: 'description', type: 'text', nullable: true })
    description!: string;

    @Column({ name: 'type', type: 'varchar', length: 50, nullable: false })
    type!: string;
    
    @Column({ name: 'ranking_rankingkey', type: 'int', nullable: false })
    ranking_rankingKey!: number;

    @ManyToOne(() => Ranking, (ranking) => ranking.tennisCategories)
    @JoinColumn({ name: 'ranking_rankingkey' })
    ranking!: Ranking;

    @OneToMany(() => PlayerTennisCategory, (playerTennisCategory) => playerTennisCategory.tennisCategory)
    playerTennisCategories!: PlayerTennisCategory[];

    @OneToMany(() => Tournament, (tournament) => tournament.tennisCategory)
    tournaments!: Tournament[];

    constructor(partial?: Partial<TennisCategory>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}
