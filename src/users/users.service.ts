import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../models';
import { UserEntity, } from './../entities';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
    private logger = new Logger(UsersService.name);
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    async getUserById(id: string): Promise<UserEntity>  {        
        const user =  await this.usersRepository.findOne({id});
        if(!user) {
            this.logger.error(`The user with id ${id} was not found in the store.`);
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async getAllUsers(): Promise<UserEntity[]> {
        const users = this.usersRepository.find();
        return users;
    }

    async createUser(user: User): Promise<User> {
        //add validation for user input        
        this.logger.log(`A new user will be created.`);

        let userEntity = new UserEntity();
        userEntity.id = uuid().toString().toUpperCase();
        userEntity.firstName = user.firstName;
        userEntity.lastName = user.lastName;
        userEntity.ciNit = user.ciNit;
        userEntity.phoneNumber = user.phoneNumber;
        userEntity.isActive = false;

        userEntity = await this.usersRepository.save(userEntity);
        
        this.logger.log(`A new user with id ${userEntity.id} was created.`);

        return userEntity;
    }
}
