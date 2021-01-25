import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags} from '@nestjs/swagger';
import { query } from 'express';
import { QueryCustomer } from './../models';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CustomersService } from './customers.service';
import { CustomerModel } from 'src/models/customer.model';


@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
    constructor(private readonly service: CustomersService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Post()
    async create(@Body() customer: CustomerModel) {
        return this.service.createCustomer(customer);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get()
    async searchCustomers(@Query() query: QueryCustomer) {
        console.log(query);
        let name_or_ci_or_nit_or_phone = query.query;
        return this.service.searchCustomers(name_or_ci_or_nit_or_phone);
    }

}
