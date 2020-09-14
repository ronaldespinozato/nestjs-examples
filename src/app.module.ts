import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import {UserAccountEntity, UserEntity} from './entities';
import { AuthModule } from './auth/auth.module';

let dbModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'control123!',
  database: 'food_db',
  entities: [UserAccountEntity, UserEntity],
  synchronize: true,
})

@Module({
  imports: [dbModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
