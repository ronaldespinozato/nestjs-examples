import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccountEntity } from './../entities';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
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

    async createAccount(account: Account): Promise<UserAccountEntity> {
        
        const passwordPlainText = account.password;

        //add validation rules for user and password.
        const passwordHashed = AuthService.getPasswordHashed(passwordPlainText);

        let userAccount = AuthService.getRandomUserAccount();        
        userAccount.isActive = false;
        userAccount.userName = account.userName;
        userAccount.password = passwordHashed;
        userAccount.type = AccountType.WAITER;
        
        userAccount = await this.accountRepository.save(userAccount);

        return userAccount;
    }

    static getRandomPassword() {        
        const passwordPlainText = uuid().toString().toUpperCase();
        return AuthService.getPasswordHashed(passwordPlainText);
    }

    static getRandomUserAccount(): UserAccountEntity {
        let userAccount = new UserAccountEntity();
        userAccount.id = uuid().toString().toUpperCase();
        userAccount.isActive = false;
        userAccount.userName = uuid().toString().replace("-", "");
        userAccount.password = this.getRandomPassword();
        userAccount.type = AccountType.WAITER;
        return userAccount;
    }

    static getPasswordHashed(passwordPlainText: string) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHashed = bcrypt.hashSync(passwordPlainText, salt);
        return passwordHashed;
    }
}
