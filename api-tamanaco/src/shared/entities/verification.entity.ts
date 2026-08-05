import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Player } from "../../players/entities/player.entity";

@Entity()
export class Verification {
    @PrimaryGeneratedColumn()
    verificationKey: number;

    @Column()
    verificationDate: Date;

    @Column()
    Player_profileKey: number;

    @ManyToOne(() => Player, (player) => player.verifications)
    @JoinColumn({ name: "Player_profileKey"})
    player: Player;

    constructor(verificationKey: number, verificationDate: Date, Player_profileKey: number, player: Player) {
        this.verificationKey = verificationKey;
        this.verificationDate = verificationDate;
        this.Player_profileKey = Player_profileKey;
        this.player = player;
    }
}