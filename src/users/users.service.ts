import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, AccountType } from './../models';
import { UserEntity, UserAccountEntity } from './../entities';
import { AuthService } from 'src/auth/auth.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(UserAccountEntity)
        private userAccountRepository: Repository<UserAccountEntity>
    ) {}

    getUserById(id: string): Promise<UserEntity>  {
        return this.usersRepository.findOne({id: id});
    }

    getAllUsers(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    async createUser(user: User): Promise<User> {
        //add validation for user input        
        
        let userEntity = new UserEntity();
        userEntity.id = uuid().toString().toUpperCase();
        userEntity.firstName = user.firstName;
        userEntity.lastName = user.lastName;
        userEntity.ciNit = user.ciNit;
        userEntity.phoneNumber = user.phoneNumber;
        userEntity.isActive = false;

        userEntity = await this.usersRepository.save(userEntity)

        const userAccountRandom =  AuthService.getRandomUserAccount();
        userAccountRandom.type = AccountType.DEFAULT_ACCOUNT;
        userAccountRandom.user = userEntity;



        await this.userAccountRepository.save(userAccountRandom);

        return userEntity;
    }
}
