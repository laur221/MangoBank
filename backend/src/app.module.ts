import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Users } from './modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [Users],
    synchronize: true,
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
 }
