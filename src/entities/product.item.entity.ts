import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { SaleEntity } from "./sale.entity";

@Entity({ name: "product_item" })
export class ProductItemEntity {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => ProductEntity, product => product.id, { nullable: false })
    @JoinColumn()
    product: ProductEntity;

    @ManyToOne(() => SaleEntity, sale => sale.id, { nullable: false })
    @JoinColumn()
    sale: SaleEntity;

    @Column("double")
    unit_price: number;

    @Column("integer")
    quantity: number;

    @Column("double")
    total: number;
}