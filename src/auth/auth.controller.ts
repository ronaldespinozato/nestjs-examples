import { Controller, Post, Body, Put, Inject } from '@nestjs/common';
import { Account } from './../models/account.model';
import { AuthService } from './../auth/auth.service';
import { UserAccountEntity } from 'src/entities';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Create a account' })
    @ApiResponse({ status: 201, description: 'The account was created successfully.' , type: Account})
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
