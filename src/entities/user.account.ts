import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({name: "user_account"})
export class UserAccountEntity {  
  @PrimaryColumn()
  id: string;

  @Column({name:"userName", unique: true})  
  userName: string;

  @Column()
  password: string;

  @Column({default: false})
  type: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(type => UserEntity, user => user.id, { nullable: false })
  @JoinColumn()
  user: UserEntity
}