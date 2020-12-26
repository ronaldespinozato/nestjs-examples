import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  ciNit: string;

  @Column()
  phoneNumber: string;

  @Column({ default: false })
  isActive: boolean;
}