import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../../players/entities/player.entity";

@Entity()
export class IdentityDocument {
    @PrimaryGeneratedColumn()
    docKey: number;

    @Column()
    type: string;

    @Column()
    docNumber: string;

    @Column()
    Player_profileKey: number;

    @OneToOne(() => Player, (player) => player.identityDocument)
    @JoinColumn({ name: "Player_profileKey" })
    player: Player;

    constructor(docKey: number, type: string, docNumber: string, Player_profileKey: number, player: Player) {
        this.docKey = docKey;
        this.type = type;
        this.docNumber = docNumber;
        this.Player_profileKey = Player_profileKey;
        this.player = player;
    }
}