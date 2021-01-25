import { BadRequestException } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity, ProductEntity, SaleEntity, UserEntity } from './../entities'
import { JwtUser, SaleModel } from './../models';
import { getConnection } from "typeorm";
import { v4 as uuid } from 'uuid';
import { ProductItemEntity } from './../entities/product.item.entity';
import { SalesModule } from './sales.module';
const { isBlank, isEmpty, getLength, getCount, getTitleCase } = require('npm-stringutils');

@Injectable()
export class SalesService {
    private logger = new Logger(SalesService.name);

    constructor(
        @InjectRepository(SaleEntity)
        private saleRepository: Repository<SaleEntity>,
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        @InjectRepository(ProductItemEntity)
        private productItemRepository: Repository<ProductItemEntity>,
        @InjectRepository(CustomerEntity)
        private customerItemRepository: Repository<CustomerEntity>
    ) {}

    async createSale(user: JwtUser, saleModel: SaleModel): Promise<SaleModel> {
        
        if(isBlank(user.userId)) {
            throw new BadRequestException("User id is required.");
        }

        if(saleModel.products == undefined || saleModel.products.length == 0) { 
            throw new BadRequestException("Product item are required.");
        }

        let userEntity = new UserEntity();
        userEntity.id = user.userId;

        let salesEntity = new SaleEntity();
        salesEntity.id = uuid().toString().toUpperCase();
        salesEntity.forTable = saleModel.forTable;
        salesEntity.user = userEntity;

        let customerEntity = await this.customerItemRepository.findOne({id: saleModel.customerId});
        if(customerEntity) {
            salesEntity.customer = customerEntity;
        }
        
        let productItemEntity = new ProductItemEntity();
        productItemEntity.id = uuid().toString().toUpperCase();
        productItemEntity.quantity
        
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {

            salesEntity = await queryRunner.manager.save(salesEntity);

            for (let index = 0; index < saleModel.products.length; index++) {
                let productItemModel = saleModel.products[index];
                let productEntity = await queryRunner.manager.findOne(ProductEntity, {id: productItemModel.productId})
                if(!productEntity) {
                    this.logger.error(`The product with id ${productItemModel.productId} not found into store.`)
                    throw new BadRequestException(`Product ${productItemModel.productId} not found.`);
                }
                let productItemEntity = new ProductItemEntity();
                productItemEntity.id = uuid().toString().toUpperCase();                
                productItemEntity.quantity = productItemModel.quantity;
                productItemEntity.unit_price = productEntity.price;
                productItemEntity.total = this.calculateTotal(productEntity.price, productItemModel.quantity);                
                productItemEntity.product = productEntity;
                productItemEntity.sale = salesEntity;

                productItemEntity = await queryRunner.manager.save(productItemEntity);  
                this.logger.log(`The product item with id ${productItemEntity.id} was created.`);
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            this.logger.error(`Exception trying to save sale.`, error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

        return saleModel;
    }

    calculateTotal(unit_price: number, quantity: number): number {
        let total = unit_price * quantity;
        console.log(`################ ` + total);
        return Math.round(total);
    }
}
