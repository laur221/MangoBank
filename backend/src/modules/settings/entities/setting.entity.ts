import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity';

@Entity('settings')
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Users)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @Column({ type: 'varchar', length: 10, default: 'en' })
    language: string;

    @Column({ type: 'varchar', length: 10, default: 'light' })
    theme: string;

    @Column({ type: 'boolean', default: false })
    two_factor_enabled: boolean;

    @Column({ type: 'boolean', default: true })
    notification_email: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
