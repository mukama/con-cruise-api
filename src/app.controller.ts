import { Controller, Get } from '@nestjs/common';
import { UserType, User } from './users/user.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/customer')
  async getCustomers(): Promise<User[]> {
    return await this.usersService.findAll(UserType.CUSTOMER);
  }

  @Get('/cruiser')
  async getCruisers(): Promise<User[]> {
    return await this.usersService.findAll(UserType.CRUISER);
  }

  @Get('/match')
  async match(): Promise<string> {
    return await this.usersService.match();
  }
}
