import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlayerDouble } from "./player-double.entity";

@Entity()
export class Double {

    @PrimaryGeneratedColumn({ name: 'doublekey' })
    doubleKey!: number;

    @OneToMany(() => PlayerDouble, (playerDouble) => playerDouble.double)
    playerDoubles!: PlayerDouble[];

    constructor(partial?: Partial<Double>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}