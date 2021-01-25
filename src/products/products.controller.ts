import { BadRequestException, Request, Body, Controller, Post, Put, Param, Get, UseGuards } from '@nestjs/common';
import { Product } from '../models';
import { ProductsService } from './products.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
const { isBlank, isEmpty, getLength, getCount, getTitleCase } = require('npm-stringutils');

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly service: ProductsService) {}

    @Post()
    async create(@Body() product: Product): Promise<any> {
        if (isBlank(product.name)) {
            throw new BadRequestException("Product name is required.");
        }
        return this.service.createProduct(product);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async update(
        @Param("id") id: string,
        @Body() product: Product): Promise<any> {

        if (isBlank(product.name)) {
            throw new BadRequestException("Product name is required.");
        }
        if(isBlank(id)) {
            throw new BadRequestException("Product id is required in the endpoint path.");
        }

        product.id = id;
        return this.service.updateProduct(product);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Request() req) {
        console.log(req.user)
        return this.service.getAllProduct();
    }    
}
