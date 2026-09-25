import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "./payment.entity";

@Entity('product')
export class Product {

    @PrimaryGeneratedColumn({ name: 'productkey', type: 'int'})
    productKey!: number;

    @Column({ name: 'productdescription', type: 'text'})
    productDescription!: string;

    @Column({ name: 'productobservation', type: 'text'})
    productObservation!: string;

    @Column({ name: 'productdate', type: 'timestamp'})
    productDate!: Date;
 
    @Column({ name: 'productprice', type: 'numeric', precision: 10, scale: 2 })
    productPrice!: number;

    @OneToMany(() => Payment, (payment) => payment.product)
    payments?: Payment[];

    constructor(partial?: Partial<Product>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}