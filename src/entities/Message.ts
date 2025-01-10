import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Chat } from './Chat';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  context!: string;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @ManyToOne(() => User, user => user.messages, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
  })
  sender?: User;

  @ManyToOne(() => Chat, chat => chat.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  chat?: Chat;
}
