import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TennisCategory } from "./tennis-category.entity";

@Entity('ranking')
export class Ranking {

    @PrimaryGeneratedColumn({ name: 'rankingkey', type: 'int' })
    rankingKey!: number;

    @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
    name!: string;

    @OneToMany(() => TennisCategory, (tennisCategory) => tennisCategory.ranking)
    tennisCategories!: TennisCategory[];

    constructor(partial?: Partial<Ranking>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }

}