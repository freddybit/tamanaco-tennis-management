import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethod } from "./payment-method.entity";
import { Participation } from "../../tournaments/entities/participation.entity";


@Entity('payment')
export class Payment {

    @PrimaryGeneratedColumn({ name: 'paymentkey', type: 'int'})
    paymentKey!: number;

    @Column({ name: 'paymentamount', type: 'numeric', precision: 10, scale: 2 })
    paymentAmount!: number;

    @Column({ name: 'paymentdate', type: 'timestamp' })
    paymentDate!: Date;

    @Column({ name: 'bolivarexchange', type: 'numeric', precision: 10, scale: 2 })
    bolivarExchange!: number;

    @Column({ name: 'transmitter', type: 'varchar', length: 100 })
    transmitter!: string;

    @Column({ name: 'receptor', type: 'varchar', length: 100 })
    receptor!: string;

    @Column({ name: 'badge', type: 'varchar', length: 50 })
    badge!: string;

    @Column({ name: 'participation_parkey', type: 'int' })
    participation_parKey!: number;

    @Column({ name: 'participation_tournament_tourkey', type: 'int' })
    participation_tournament_tourKey!: number;

    @Column({ name: 'paymentmethod_paymetkey', type: 'int' })
    paymentMethod_payMetKey!: number;

    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.payments)
    @JoinColumn({ name: 'paymentmethod_paymetkey'})
    paymentMethod!: PaymentMethod;

    @ManyToOne(() => Participation, participation => participation.payments)
    @JoinColumn({ name: 'participation_parkey' })
    participation!: Participation;

    constructor(partial?: Partial<Payment>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }

}

