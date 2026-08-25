import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TennisCategory } from "./tennis-category.entity";
import { Player } from "../../players/entities/player.entity";

@Entity({ name: 'playertenniscategory' })
export class PlayerTennisCategory {

    @PrimaryGeneratedColumn({ name: 'platencatkey', type: 'int' })
    plaTenCatKey!: number;

    @Column({ name: 'player_profilekey', type: 'int', nullable: false })
    player_profileKey!: number;

    @Column({ name: 'tenniscategory_catkey', type: 'int', nullable: false })
    tennisCategory_catKey!: number;

    @ManyToOne(() => TennisCategory, (tennisCategory) => tennisCategory.playerTennisCategories)
    @JoinColumn({ name: 'tenniscategory_catkey' })
    tennisCategory!: TennisCategory;

    @ManyToOne(() => Player, (player) => player.playerTennisCategories)
    @JoinColumn({ name: 'player_profilekey' })
    player!: Player;

    constructor(partial?: Partial<PlayerTennisCategory>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }

}