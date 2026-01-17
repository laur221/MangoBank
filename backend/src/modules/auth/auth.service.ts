import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Account } from '../accounts/entities/account.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { Setting } from '../settings/entities/setting.entity';
import { Card } from '../cards/entities/card.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(Setting)
    private settingsRepository: Repository<Setting>,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    try {
      const result = await this.dataSource.transaction(async (manager) => {
        const userRepo = manager.getRepository(Users);
        const accountRepo = manager.getRepository(Account);
        const profileRepo = manager.getRepository(Profile);
        const settingRepo = manager.getRepository(Setting);
        const cardRepo = manager.getRepository(Card);

        const user = userRepo.create(registerDto as any);
        const savedUser = (await userRepo.save(user as any)) as Users;

        const accountNumber = `ACC${Date.now()}${Math.floor(Math.random() * 9000) + 1000}`;
        const account = accountRepo.create({
          user: savedUser,
          account_number: accountNumber,
          currency: registerDto['currency'] ?? 'EUR',
          balance: 0.0,
          status: 'active',
          created_by: savedUser,
          updated_by: savedUser,
        } as any);
        const savedAccount = (await accountRepo.save(account as any)) as Account;

        const profile = profileRepo.create({
          user: savedUser,
          phone: registerDto['phone'] ?? null,
          address: registerDto['address'] ?? null,
        } as any);
        const savedProfile = (await profileRepo.save(profile as any)) as Profile;

        const setting = settingRepo.create({
          user: savedUser,
          language: registerDto['language'] ?? 'en',
          theme: registerDto['theme'] ?? 'light',
          two_factor_enabled: false,
          notification_email: true,
        } as any);
        const savedSetting = (await settingRepo.save(setting as any)) as Setting;

        return { savedUser, savedAccount, savedProfile, savedSetting };
      });

      const { savedUser, savedAccount, savedProfile, savedSetting } = result;

      return {
        message: 'User registered successfully',
        user: {
          id: savedUser.id,
          email: savedUser.email,
          fullName: savedUser.fullName,
        },
        account: {
          id: savedAccount.id,
          account_number: savedAccount.account_number,
          currency: savedAccount.currency,
          balance: savedAccount.balance,
        },
        profile: {
          id: savedProfile.id,
          phone: savedProfile.phone,
          address: savedProfile.address,
        },
        settings: {
          id: savedSetting.id,
          language: savedSetting.language,
          theme: savedSetting.theme,
        },
      };
    } catch (error) {
      console.error('Registration transaction failed:', error);
      throw error;
    }
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
    // fetch user first (Users does not declare inverse relation to Profile)
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // load profile separately via profilesRepository
    const profile = await this.profilesRepository.findOne({ where: { user: { id: userId } } as any });

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.created_at,
      profile: {
        id: profile?.id ?? null,
        phone: profile?.phone ?? null,
        address: profile?.address ?? null,
      },
    };
  }

  async updateProfile(userId: number, payload: { fullName?: string; email?: string; phone?: string; address?: string; }) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (payload.fullName !== undefined) user.fullName = payload.fullName;
    if (payload.email !== undefined) user.email = payload.email;

    await this.usersRepository.save(user as any);

    let profile = await this.profilesRepository.findOne({ where: { user: { id: userId } } as any, relations: ['user'] });
    if (!profile) {
      const newProfile = new Profile();
      newProfile.user = user as any;
      newProfile.phone = payload.phone ?? '';
      newProfile.address = payload.address ?? '';
      profile = newProfile;
    } else {
      if (payload.phone !== undefined) profile.phone = payload.phone;
      if (payload.address !== undefined) profile.address = payload.address;
    }

    const savedProfile = await this.profilesRepository.save(profile as any);

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      profile: {
        id: savedProfile.id,
        phone: savedProfile.phone,
        address: savedProfile.address,
      },
    };
  }

}
