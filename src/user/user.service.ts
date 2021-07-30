import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.interface';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}
  findOne(username: string): Promise<User> {
    return this.repository.findOne({ username: username });
  }
  findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
  findOneById(id: number): Promise<User> {
    return this.repository.findOne({ id });
  }
  async create(user: User): Promise<User> {
    try {
      return await this.repository.save(new UserEntity(user));
    } catch (err) {
      throw new HttpException(
        'Username or email is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async update(user: User) {
    return this.repository.update(user.id, user);
  }
}
