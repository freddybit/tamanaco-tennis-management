import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "./payment.entity";

@Entity('paymentmethod')
export class PaymentMethod {

    @PrimaryGeneratedColumn({ name: 'paymetkey', type: 'int'})
    payMetKey!: number;

    @Column({ name: 'typemethod', type: 'varchar', length: 50 })
    typeMethod!: string;

    @OneToMany(() => Payment, payment => payment.paymentMethod)
    payments!: Payment[];

    constructor(partial?: Partial<PaymentMethod>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }

}