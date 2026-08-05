import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../../players/entities/player.entity";

@Entity()
export class Email {

    @PrimaryGeneratedColumn()
    emailKey: number;

    @Column()
    username: string;

    @Column()
    atSymbol: string = '@';

    @Column()
    domainName: string;

    @Column()
    Player_profileKey: number;

    @ManyToOne(() => Player, (player) => player.emails)
    @JoinColumn({ name: "Player_profileKey" })
    player: Player;

    constructor(emailKey: number, username: string, domainName: string, Player_profileKey: number, player: Player) {
        this.emailKey = emailKey;
        this.username = username;
        this.domainName = domainName;
        this.Player_profileKey = Player_profileKey;
        this.player = player;
    }
}