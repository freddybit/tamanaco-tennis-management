import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Player } from "../../players/entities/player.entity";

@Entity('verification')
export class Verification {
    @PrimaryGeneratedColumn({ name: 'verificationkey' })
    verificationKey!: number;

    @Column({ name: 'verificationdate' })
    verificationDate!: Date;

    @Column({ name: 'player_profilekey' })
    Player_profileKey!: number;

    @ManyToOne(() => Player, (player) => player.verifications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'player_profilekey' })
    player!: Player;

    constructor(partial?: Partial<Verification>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}