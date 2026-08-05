import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../../players/entities/player.entity";

@Entity()
export class Phone {

    @PrimaryGeneratedColumn()
    phoneKey: number;

    @Column()
    areaCode: string;

    @Column()
    operatorCode: string;

    @Column()
    phoneNumber: string;

    @Column()
    Player_profileKey: number;

    @ManyToOne(() => Player, (player) => player.phones)
    @JoinColumn({ name: "Player_profileKey" })
    player: Player;

    constructor(phoneKey: number, areaCode: string, operatorCode: string, phoneNumber: string, Player_profileKey: number, player: Player) {
        this.phoneKey = phoneKey;
        this.areaCode = areaCode;
        this.operatorCode = operatorCode;
        this.phoneNumber = phoneNumber;
        this.Player_profileKey = Player_profileKey;
        this.player = player;
    }
}
