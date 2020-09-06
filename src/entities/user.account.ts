import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({name: "user_account"})
export class UserAccountEntity {  
  @PrimaryColumn()
  id: string;

  @Column({name:"userName"})
  userName: string;

  @Column()
  password: string;

  @Column()
  type: string;

  @Column({name:"passwordSalt"})
  passwordSalt: string;

  @Column({name:"passwordHashAlgorithm"})
  passwordHashAlgorithm: string;

  @Column({ default: false })
  isActive: boolean;
}