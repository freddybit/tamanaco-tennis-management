import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlayerStatus } from "./player-status.entity";

@Entity('status')
export class Status {

    @PrimaryGeneratedColumn({ name: 'statuskey', type: 'int'})
    statusKey!: number;

    @Column({ name: 'statusname', type: 'varchar'})
    statusName!: string;

    @Column({ name: 'statusdescription', type: 'text'})
    statusDescription!: string;

    @OneToMany(() => PlayerStatus, (playerStatus) => playerStatus.status)
    playerStatus!: PlayerStatus[];

    constructor(partial?: Partial<Status>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}