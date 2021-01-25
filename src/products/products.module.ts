import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductEntity } from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

let entityModels = TypeOrmModule.forFeature([
  ProductEntity
])

@Module({
  imports: [entityModels],
  controllers: [ProductController],
  providers: [ProductsService, ProductEntity],
  exports: [TypeOrmModule]
})
export class FoodsModule {}
