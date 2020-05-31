
import * as path from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: `${path.resolve(__dirname, "..")}/data/con-cruise.sqlite`,
      entities: [ User ],
      logging: true
    }),
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
