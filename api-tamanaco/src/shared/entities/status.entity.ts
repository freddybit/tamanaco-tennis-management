import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('status')
export class Status {

    @PrimaryGeneratedColumn({ name: 'statuskey', type: 'int'})
    statusKey!: number;

    @Column({ name: 'statusname', type: 'varchar'})
    statusName!: string;

    @Column({ name: 'statusdescription', type: 'text'})
    statusDescription!: string;

    constructor(partial?: Partial<Status>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}