import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './User'
import { Message } from './Message'

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  username!: string

  @Column({
    type: 'enum',
    enum: ['group', 'pv', 'bot'],
    default: 'pv',
  })
  type?: string

  @CreateDateColumn()
  createAt!: Date

  @UpdateDateColumn()
  updateAt!: Date

  @ManyToMany(() => User, user => user.chats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinTable()
  subscriptions!: User[]

  @OneToMany(() => Message, message => message.chat)
  messages?: Message[]

  @ManyToOne(() => User, user => user.ownerChats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
  })
  createBy!: User
}
