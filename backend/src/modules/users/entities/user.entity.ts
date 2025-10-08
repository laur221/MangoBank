import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
