import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Account } from '../accounts/entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = this.usersRepository.create(registerDto);
    await this.usersRepository.save(user);

    // Create a default account for the newly registered user
    const accountNumber = `ACC${Date.now()}${Math.floor(Math.random() * 9000) + 1000}`; // simple unique-ish account number

    const account = this.accountsRepository.create({
      user: user,
      account_number: accountNumber,
      currency: registerDto['currency'] ?? 'EUR',
      balance: 0.0,
      status: 'active',
      created_by: user,
      updated_by: user,
    });

    await this.accountsRepository.save(account);

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      account: {
        id: account.id,
        account_number: account.account_number,
        currency: account.currency,
        balance: account.balance,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email, password: loginDto.password },
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const payload = { id: user.id, email: user.email, fullName: user.fullName };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      access_token: token,
    };
  }

  async getProfile(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.created_at,
    };
  }

}
