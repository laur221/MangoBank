import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { Users } from '../users/entities/user.entity';
import { Account } from '../accounts/entities/account.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async create(createCardDto: CreateCardDto, userId?: number) {
    const card: Card = Object.assign(new Card(), (createCardDto as any));

    if (userId) {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      if (user) {
        card.user = user as any;
        // try to associate account: pick first account for the user if exists
        const account = await this.accountsRepository.findOne({ where: { user: { id: userId } } });
        if (account) {
          card.account = account as any;
        }
      }
    }

    // If frontend sent raw cvv, store it in cvv_hash as plain text for this university project
    const anyDto: any = createCardDto as any;
    if (anyDto.cvv) {
      card.cvv_hash = anyDto.cvv;
    } else if (anyDto.cvv_hash) {
      card.cvv_hash = anyDto.cvv_hash;
    }

    return this.cardRepository.save(card as any);
  }

  async findAll() {
    return this.cardRepository.find({ relations: ['account', 'user'] });
  }

  async findOne(id: number) {
    return this.cardRepository.findOne({ where: { id }, relations: ['account', 'user'] });
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    await this.cardRepository.update(id, updateCardDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const card = await this.findOne(id);
    if (card) {
      await this.cardRepository.delete(id);
    }
    return card;
  }
}
