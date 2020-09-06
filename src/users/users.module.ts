import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

let entityModels = TypeOrmModule.forFeature([
  UserEntity
])

@Module({
  imports: [entityModels], // We need to import the entities in the providers[]
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule] // It helps to use the repository outside of this module
})
export class UsersModule {}
