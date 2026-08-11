import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../../players/entities/player.entity";

@Entity('phone')
export class Phone {

    @PrimaryGeneratedColumn({ name: 'phonekey' })
    phoneKey!: number;

    @Column({ name: 'areacode' })
    areaCode!: string;

    @Column({ name: 'operatorcode' })
    operatorCode!: string;

    @Column({ name: 'phonenumber' })
    phoneNumber!: string;

    @Column({ name: 'player_profilekey' })
    Player_profileKey!: number;
    
    @ManyToOne(() => Player, (player) => player.phones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'player_profilekey' })
    player!: Player;

    constructor(partial?: Partial<Phone>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}
