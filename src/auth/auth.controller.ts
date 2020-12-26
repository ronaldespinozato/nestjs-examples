import { Controller, Post, Body, Put, Inject } from '@nestjs/common';
import { Account } from './../models/account.model';
import { AuthService } from './../auth/auth.service';
import { UserAccountEntity } from 'src/entities';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("/accounts")
    async createAccount(@Body() account: Account): Promise<any> {
        let userAccount = await this.authService.createAccount(account)
        return {
            id : userAccount.id,
            userName: userAccount.userName,
            activated: userAccount.isActive
        };
    }

    @Post("/login")
    async login(@Body() account: Account): Promise<any> {
        return this.authService.getToken(account)
    }

    @Put("/accounts")
    async updateAccount(@Body() account: Account): Promise<any> {
        return null;
    }
}
