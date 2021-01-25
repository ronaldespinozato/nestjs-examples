import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import {CustomerEntity, ProductEntity, SaleEntity, UserAccountEntity, UserEntity, ProductItemEntity } from './entities';
import { AuthModule } from './auth/auth.module';
// import {environment} from './environment/';
import { FoodsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { CustomersModule } from './customers/customers.module';

let dbModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'control123!',
  database: 'food_db',
  entities: [
    UserAccountEntity,
    UserEntity,
    ProductEntity,
    ProductItemEntity,
    SaleEntity,
    CustomerEntity],
  synchronize: true,
  // logging: true //It display sql queries in the logs
})

@Module({
  imports: [dbModule,
    UsersModule,
    AuthModule,
    FoodsModule,
    SalesModule,
    CustomersModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
