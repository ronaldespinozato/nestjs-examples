import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './../entities';
import { v4 as uuid } from 'uuid';
import { CustomerModel } from 'src/models/customer.model';
const { isBlank, isEmpty, getLength, getCount, getTitleCase } = require('npm-stringutils');

@Injectable()
export class CustomersService {
    private logger = new Logger(CustomersService.name);

    constructor(
        @InjectRepository(CustomerEntity)
        private customerRepository: Repository<CustomerEntity>
    ) {}

    async createCustomer(customer: CustomerModel): Promise<CustomerEntity> {
        if(isBlank(customer.fullName)) {
            throw new BadRequestException(`Customer name is required.`);
        }

        let customerEntity = new CustomerEntity();
        customerEntity.id = uuid().toString().toUpperCase();
        customerEntity.fullName = customer.fullName;
        customerEntity.ci = customer.ci;
        customerEntity.nit = customer.nit;
        customerEntity.phone = customer.phone;

        customerEntity = await this.customerRepository.save(customerEntity);

        this.logger.log(`The customer ${customerEntity.id} was created.`);

        return customerEntity;
    }

    async searchCustomers(name_or_ci_or_nit_or_phone): Promise<CustomerEntity[]>{
        if(isBlank(name_or_ci_or_nit_or_phone)) {
            return [];
        }

        let customers = await this.customerRepository.createQueryBuilder()
        .where('fullName like :value', {value: `%${name_or_ci_or_nit_or_phone}%`})
        .orWhere('ci like :value', {value: `%${name_or_ci_or_nit_or_phone}%`})
        .orWhere('nit like :value', {value: `%${name_or_ci_or_nit_or_phone}%`})
        .orWhere('phone like :value', {value: `%${name_or_ci_or_nit_or_phone}%`})
        .getMany();

        return customers;
    }
}
