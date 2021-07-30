import { PasswordReset } from '../password-reset/entity/password-reset.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import normalizeEmail from 'validator/lib/normalizeEmail';

@Entity('users')
export class UserEntity {
  constructor(data: any) {
    Object.assign(this, data);
  }
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @OneToMany(
    () => PasswordReset,
    (passwordReset: PasswordReset) => passwordReset.user,
  )
  passwordResets: PasswordReset[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @BeforeInsert()
  emailToLowerCase() {
    this.email = normalizeEmail(this.email.toLowerCase()) as string;
  }
}
