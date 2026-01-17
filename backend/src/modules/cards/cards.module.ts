import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card } from './entities/card.entity';
import { Users } from '../users/entities/user.entity';
import { Account } from '../accounts/entities/account.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Users, Account]), AuthModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
