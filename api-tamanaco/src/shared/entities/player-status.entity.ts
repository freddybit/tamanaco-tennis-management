import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./status.entity";
import { Player } from "../../players/entities/player.entity";

@Entity('playerstatus')
export class PlayerStatus {

    @PrimaryGeneratedColumn({ name: 'playerstatuskey', type: 'int'})
    playerStatusKey!: number;

    @Column({ name: 'playerStatusDate', type: 'timestamp' })
    playerStatusDate!: Date;

    @Column({ name: 'status_statuskey', type: 'int' })
    Status_statusKey!: number;

    @Column({ name: 'player_profilekey', type: 'int' })
    Player_profileKey!: number;

    @ManyToOne(() => Status, (status) => status.playerStatus, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'status_statuskey' })
    status!: Status;

    @ManyToOne(() => Player, (player) => player.playerStatus, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'player_profilekey' })
    player!: Player;

    constructor(partial?: Partial<PlayerStatus>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}