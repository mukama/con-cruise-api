import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserType, User } from './user.entity';
import { SeedUsers } from 'src/database/database.seed';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }

  async seed(): Promise<any> {
    return this.userRepository.insert(SeedUsers);
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ id });
  }

  async findAll(type: UserType): Promise<User[] | undefined> {
    return this.userRepository.find({ type });
  }
  async match(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
