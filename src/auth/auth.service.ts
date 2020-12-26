import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccountEntity, UserEntity } from './../entities';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/models/account.model';
import { AccountType } from 'src/models/account.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        @InjectRepository(UserAccountEntity)
        private accountRepository: Repository<UserAccountEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    async getToken(account: Account) {
        
        let userAccount = await this.accountRepository.createQueryBuilder("userAccount")
            .where("userName = :userName", {userName: account.userName})            
            .select("userAccount.id, userAccount.userName, userAccount.password, userAccount.type, userAccount.isActive, userAccount.userId")
            .getRawOne();
        
        if(!userAccount) {
            this.logger.error(`The user name ${account.userName} was not found in the table account.`);
            throw new NotFoundException(`The username or password is invalid.`);
        }
        const passwordPlainText = account.password;
        const passwordHashed = userAccount.password;
        if(!AuthService.passwordMatch(passwordPlainText, passwordHashed)) {
            this.logger.error(`Password not match for user account ${account.userName} in the table account.`);
            throw new NotFoundException(`The username or password is invalid.`);
        }
        
        
        const userId = userAccount.userId;
        let payload = {
            sub: userId,
            type: userAccount.type
        };

        return {
            access_token: this.jwtService.sign(payload)
        }        
    }

    async createAccount(account: Account): Promise<UserAccountEntity> {        
        const user = await this.userRepository.findOne({id: account.userId})        
        if(!user) {
            this.logger.error(`The user with id ${account.userId} not found in the data store.`);
            throw new NotFoundException(`The user with id ${account.userId} not found.`);
        }
        
        let accountFound = await this.accountRepository.createQueryBuilder()
            .where("userId = :userId", {userId: user.id})
            .getRawOne();
        if(accountFound) {
            this.logger.error(`The user (${user.firstName}) with id ${user.id} already has an account with name: ${accountFound.userName}`);
            throw new NotFoundException(`The user already has an account.`);
        }
        
        
        // const userAccount = await this.userRepository.findOne({id: });
        accountFound = await this.accountRepository.createQueryBuilder()        
            .where("userName = :name", {name: account.userName})
            // .andWhere("userId = :userId", {userId: user.id})
            .getRawOne();

        if(accountFound) {
            this.logger.error(`The account ${account.userName} already exist in the store.`);
            throw new NotFoundException(`The user account ${account.userName} is not available.`);
        }

        
        const passwordPlainText = account.password;
        //add validation rules for user and password.

        const passwordHashed = AuthService.getPasswordHashed(passwordPlainText);
        
        let userAccount = AuthService.getRandomUserAccount();        
        userAccount.user
        userAccount.isActive = false;
        userAccount.userName = account.userName;
        userAccount.password = passwordHashed;
        userAccount.type = AccountType.WAITER;
        userAccount.user = user
        
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

    static passwordMatch(passwordPlainText: string, passwordHashed: string) {
        return bcrypt.compareSync(passwordPlainText, passwordHashed);
    }
}
