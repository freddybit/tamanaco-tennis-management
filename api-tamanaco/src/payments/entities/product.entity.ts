import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    constructor(partial?: Partial<Product>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}