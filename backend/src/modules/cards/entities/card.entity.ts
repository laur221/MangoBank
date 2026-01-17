import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Account } from '../../accounts/entities/account.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ type: 'varchar', length: 16, unique: true, nullable: false })
  card_number: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name_on_card: string;

  // Stored as string in MM/YY or YYYY-MM-DD formats coming from client
  @Column({ type: 'varchar', length: 20, nullable: true })
  expiry_date: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cvv_hash: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  
}
