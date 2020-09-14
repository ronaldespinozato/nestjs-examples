import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserAccountEntity, UserEntity } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

let entityModelsModule = TypeOrmModule.forFeature([
  UserAccountEntity, UserEntity
]);

let jwtModule = JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: jwtConstants.expiresIn },
});

@Module({
  imports: [entityModelsModule, jwtModule], // We need to import the entities in the providers[]
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule] // It helps to use the repository outside of this module
})
export class AuthModule {}
