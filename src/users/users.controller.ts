import { Controller, Post, Body, Get, Param, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './../models';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Post()
    async login(@Body() user: User): Promise<any> {
        return this.service.createUser(user)
    }

    @Get(":id")
    @HttpCode(200)
    async getUserById(@Param("id") id: string) {
        return this.service.getUserById(id)
    }

    @Get("/")
    @HttpCode(200)
    async getAllUser() {
        return this.service.getAllUsers()
    }

}
