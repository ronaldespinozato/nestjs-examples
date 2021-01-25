import { Module } from '@nestjs/common';
import { CustomerEntity, SaleEntity } from './../entities';
import { ProductsService } from './../products/products.service';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsModule } from '../products/products.module';
import { ProductItemEntity } from 'src/entities/product.item.entity';

// Repositories for entities
let entityModels = TypeOrmModule.forFeature([
  SaleEntity, ProductItemEntity, CustomerEntity  
])

@Module({
  imports: [entityModels, FoodsModule],
  controllers: [SalesController],
  providers: [
    SalesService, 
    ProductsService, 
    SaleEntity, 
    ProductItemEntity],
  exports: []
})
export class SalesModule {}
