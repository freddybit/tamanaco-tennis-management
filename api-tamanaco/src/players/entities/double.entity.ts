import { OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlayerDouble } from "./player-double.entity";

export class Double {

    @PrimaryGeneratedColumn()
    doubleKey: number;

    @OneToMany(() => PlayerDouble, (playerDouble) => playerDouble.double_doubleKey)
    playerDoubles: PlayerDouble[];

    constructor(doubleKey: number, playerDoubles: PlayerDouble[]) {
        this.doubleKey = doubleKey;
        this.playerDoubles = playerDoubles;
    }
}