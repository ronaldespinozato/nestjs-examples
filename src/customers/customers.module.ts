import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomerEntity } from './../entities';

let entityModels = TypeOrmModule.forFeature([
  CustomerEntity
])

@Module({
  imports: [entityModels],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
