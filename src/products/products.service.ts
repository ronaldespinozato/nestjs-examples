import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities'
import { Product } from '../models'
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
    private logger = new Logger(ProductsService.name);

    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ) {}

    async createProduct(productModel: Product) {
        this.logger.log(`A new product will be created.`);

        let productEntity = new ProductEntity();
        productEntity.id = uuid().toString().toUpperCase();
        productEntity.name = productModel.name;
        productEntity.description = productModel.description;
        productEntity.price = productModel.price;
        productEntity.active = productModel.active;

        productEntity = await this.productRepository.save(productEntity);

        this.logger.log(`A new product with id ${productEntity.id} was created.`);

        return productEntity;
    }

    async updateProduct(productModel: Product) {
        this.logger.log(`A new product will be created.`);

        let productEntity = await this.productRepository.findOne({id : productModel.id});
        if(!productEntity) {
            this.logger.error(`The Product with id ${productModel.id} was not found in the store.`);
            throw new NotFoundException(`Product with id ${productModel.id} not found`);
        }
        
        productEntity.name = productModel.name;
        productEntity.description = productModel.description;
        productEntity.price = productModel.price;
        productEntity.active = productModel.active;

        productEntity = await this.productRepository.save(productEntity);

        this.logger.log(`Product with id ${productEntity.id} was updated.`);

        return productEntity;
    }

    async getAllProduct() {
        return this.productRepository.find();
    }

    async getById(productId: string) {
        return this.productRepository.findOne({id: productId});
    }
}
