import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('playerstatus')
export class PlayerStatus {

    @PrimaryGeneratedColumn({ name: 'playerstatuskey', type: 'int'})
    playerStatusKey!: number;

    @Column({ name: 'playerStatusDate', type: 'timestamp' })
    playerStatusDate!: Date;

    constructor(partial?: Partial<PlayerStatus>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}