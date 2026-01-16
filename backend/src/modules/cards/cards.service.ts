import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const card = this.cardRepository.create(createCardDto as any);
    return this.cardRepository.save(card as any);
  }

  async findAll() {
    return this.cardRepository.find({ relations: ['account'] });
  }

  async findOne(id: number) {
    return this.cardRepository.findOne({ where: { id }, relations: ['account'] });
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
