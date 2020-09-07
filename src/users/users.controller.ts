import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './../models';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Post()
    async login(@Body() user: User): Promise<any> {
        return this.service.createUser(user)
    }
}
