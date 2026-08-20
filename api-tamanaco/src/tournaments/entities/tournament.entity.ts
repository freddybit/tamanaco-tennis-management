import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Participation } from "./participation.entity";

@Entity('tournament')
export class Tournament {

    @PrimaryGeneratedColumn({ name: 'tourkey', type: 'int' })
    tourKey!: number;

    @Column({ name: 'tourName', type: 'varchar', length: 100 })
    tourName!: string;

    @Column({ name: 'tourDescription', type: 'text' })
    tourDescription!: string;

    @Column({ name: 'startDate', type: 'date' })
    startDate!: Date;

    @Column({ name: 'endDate', type: 'date' })
    endDate!: Date;

    @OneToMany(() => Participation, (participation) => participation.tournament, { cascade: true })
    participations!: Participation[];

}
    