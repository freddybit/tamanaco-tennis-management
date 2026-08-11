import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../../players/entities/player.entity";

@Entity('identitydocument')
export class IdentityDocument {
    @PrimaryGeneratedColumn({ name: 'dockey' })
    docKey!: number;

    @Column({ name: 'type' })
    type!: string;

    @Column({ name: 'docnumber' })
    docNumber!: string;

    @Column({ name: 'player_profilekey' })
    Player_profileKey!: number;

    @OneToOne(() => Player, (player) => player.identityDocument, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "player_profilekey" })
    player?: Player | null;

    constructor(partial?: Partial<IdentityDocument>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}