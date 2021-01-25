import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity({ name: "sale" })
export class SaleEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserEntity, user => user.id, { nullable: false })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => CustomerEntity, customer => customer.id, { nullable: true })
  @JoinColumn()
  customer: CustomerEntity;
  
  @Column()
  forTable: boolean;

  @Column({ type: 'timestamp' })
  date_time: Date;
}