import { Body, HttpCode, Param, Put, Request } from '@nestjs/common';
import { Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SaleModel, JwtUser } from './../models';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ProductsService } from '../products/products.service';
import { SalesService } from './sales.service';
const { isBlank, isEmpty, getLength, getCount, getTitleCase } = require('npm-stringutils');

@ApiBearerAuth()
@ApiTags('sales')
@Controller('sales')
export class SalesController {
    constructor(        
        private readonly salesService: SalesService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Post("/")
    async createSale(@Body() sale: SaleModel, @Request() req) {        
        let jwtUser = req.user;
        return this.salesService.createSale(jwtUser, sale)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Put("/:id")
    async updateSale(
        @Param("id") id: string, 
        @Body() sale: SaleModel, 
        @Request() req) {

        let jwtUser = req.user;
        sale.id = id;

        return this.salesService.createSale(jwtUser, sale)
    }
}
