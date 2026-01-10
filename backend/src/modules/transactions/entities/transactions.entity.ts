import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@Entity('transactions')
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'sender_account_id' })
    sender_account: Account;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'receiver_account_id' })
    receiver_account: Account;

    @Column({ type: 'numeric', precision: 15, scale: 2, nullable: false })
    amount: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    note: string;

    @Column({ type: 'varchar', length: 20, default: 'completed' })
    status: string;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;
}