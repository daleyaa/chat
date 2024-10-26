import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm'
import { Message } from './Message'
import { Chat } from './Chat'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column()
  username!: string

  @Column({ select: false })
  password!: string

  @Column({ nullable: true })
  age!: number

  @CreateDateColumn()
  createAt!: Date

  @UpdateDateColumn()
  updateAt!: Date

  @OneToMany(() => Message, message => message.sender)
  messages?: Message[]

  @ManyToMany(() => Chat, chat => chat.subscriptions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  chats?: Chat[]

  @OneToMany(() => Chat, chat => chat.createBy)
  ownerChats?: Chat[]
}
