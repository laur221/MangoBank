import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const acc = this.accountRepository.create(createAccountDto as any);
    return this.accountRepository.save(acc);
  }

  async findAll() {
    return this.accountRepository.find();
  }

  async findOne(id: number) {
    return this.accountRepository.findOneBy({ id });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    await this.accountRepository.update(id, updateAccountDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const acc = await this.findOne(id);
    if (acc) {
      await this.accountRepository.delete(id);
    }
    return acc;
  }
}
