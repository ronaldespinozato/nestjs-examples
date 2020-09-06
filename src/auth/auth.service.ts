import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccountEntity } from './../entities';
import { v4 as uuid } from 'uuid';
import { Account } from 'src/models/account.model';
import { AccountType } from 'src/models/account.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserAccountEntity)
        private accountRepository: Repository<UserAccountEntity>,
        private jwtService: JwtService
    ) {}

    async getToken(account: Account) {
        let userAccount = await this.accountRepository.findOne({userName: account.userName});
        
        let payload = {
            sub: userAccount.id,
            type: userAccount.type
        };

        return {
            access_token: this.jwtService.sign(payload)
        }        
    }

    createAccount(account: Account): UserAccountEntity {
        let userAccount = new UserAccountEntity();
        userAccount.id = uuid().toString().toUpperCase();
        userAccount.isActive = false;
        userAccount.password = "encrypted" + account.password;
        userAccount.type = AccountType.WAITER;
        
        userAccount = this.accountRepository.create(userAccount);

        return userAccount;
    }
}
