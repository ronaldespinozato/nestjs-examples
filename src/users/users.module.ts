import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity, UserAccountEntity } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

let entityModels = TypeOrmModule.forFeature([
  UserEntity
])

@Module({
  imports: [entityModels, AuthModule], // We need to import the entities in the providers[]
  controllers: [UsersController],
  providers: [UsersService, UserAccountEntity],
  exports: [TypeOrmModule] // It helps to use the repository outside of this module
})
export class UsersModule {}
