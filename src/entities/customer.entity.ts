import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: "customer"})
export class CustomerEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    fullName: string;

    @Column()
    ci: string;

    @Column()
    nit: string;

    @Column()
    phone: string;
}