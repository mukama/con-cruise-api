import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from './users/user.interface';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/add')
  addCustomer(): number {
    return this.usersService.addCustomer();
  }

  @Get('/customer')
  getCustomers(): User[] {
    return this.usersService.getCustomers();
  }

  @Get('/cruiser')
  getCruisers(): User[] {
    return this.usersService.getCruisers();
  }

  @Get('/match')
  match(): string {
    return this.usersService.match();
  }
}
