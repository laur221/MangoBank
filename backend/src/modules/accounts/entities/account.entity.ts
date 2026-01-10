import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity';

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @Column({ type: 'varchar', length: 24, unique: true, nullable: false })
    account_number: string;

    @Column({ type: 'varchar', length: 3, nullable: true })
    currency: string;

    @Column({ type: 'numeric', precision: 15, scale: 2, default: 0.00 })
    balance: number;

    @Column({ type: 'varchar', length: 20, nullable: true })
    status: string;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'created_by' })
    created_by: Users;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'updated_by' })
    updated_by: Users;
}