import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../../players/entities/player.entity";

@Entity('email')
export class Email {

    @PrimaryGeneratedColumn({ name: 'emailkey' })
    emailKey!: number;

    @Column({ name: 'username' })
    username!: string;

    @Column({ name: 'atsymbol', type: 'varchar', default: '@', length: 5 })
    atSymbol: string = '@';

    @Column({ name: 'domainname' })
    domainName!: string;

    @Column({ name: 'player_profilekey' })
    Player_profileKey!: number;

    @ManyToOne(() => Player, (player) => player.emails, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "player_profilekey" })
    player?: Player | null;

    constructor(partial?: Partial<Email>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}