import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserAccountEntity } from './user.account';
import { type } from 'os';

@Entity({name: "user"})
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

  @Column({ default: true })
  isActive: boolean;
}