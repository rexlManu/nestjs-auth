import { UserEntity } from '../../user/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { User } from 'src/user/user.interface';

@Entity('password_resets')
export class PasswordReset {
  constructor(data: any) {
    Object.assign(this, data);
  }
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.passwordResets, {
    eager: true,
  })
  @JoinColumn()
  user: User;
  @Column({ unique: true })
  token: string;
  @Column()
  expiresAt: Date;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @BeforeInsert()
  generateToken() {
    this.token = nanoid(40);
  }
}
