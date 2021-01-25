import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity({ name: "product" })
export class ProductEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("double")
  price: number;

  @Column({ default: false })
  active: boolean;
}