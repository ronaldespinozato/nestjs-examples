import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './../entities';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    getUserById(id: string): Promise<UserEntity>  {
        return this.usersRepository.findOne({id: id});
    }

    getAllUsers(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }
}
