import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, ManyToOne } from "typeorm";
import { Player } from "./player.entity";
import { Double } from "./double.entity";

@Entity()
export class PlayerDouble {
    @PrimaryGeneratedColumn()
    player_profileKey: number;

    @Column()
    double_doubleKey: number;

    @ManyToOne(() => Player, (player) => player.playerDoubles)
    @JoinColumn({ name: 'player_profileKey' })
    player: Player;

    @ManyToOne(() => Double, (double) => double.playerDoubles)
    @JoinColumn({ name: 'double_doubleKey' })
    double: Double;

    constructor(player_profileKey: number,double_doubleKey: number, player: Player, double: Double) {
        this.player_profileKey = player_profileKey;
        this.double_doubleKey = double_doubleKey;
        this.player = player;
        this.double = double;
    }
}