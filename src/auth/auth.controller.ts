import { Controller, Post, Body, Put, Inject } from '@nestjs/common';
import { Account } from './../models/account.model';
import { AuthService } from './../auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("/accounts")
    async createAccount(@Body() account: Account): Promise<any> {
        return this.authService.createAccount(account)
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
