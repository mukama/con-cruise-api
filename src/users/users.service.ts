import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType, User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        name: 'john',
        longitude: 75.57,
        latitude: 75.57,
        rides: 0,
        type: UserType.CUSTOMER,
      },
      {
        id: 2,
        name: 'chris',
        longitude: 73.5352,
        latitude: 75.57,
        rides: 0,
        type: UserType.CUSTOMER,
      },
      {
        id: 3,
        name: 'maria',
        longitude: 35.35,
        latitude: 75.57,
        rides: 0,
        type: UserType.CUSTOMER,
      },
    ];
  }
  
  async findOne(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findAll(type: UserType): Promise<User[] | undefined> {
    throw new Error("Method not implemented.");
  }
  async match(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}