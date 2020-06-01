import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from './users/user.interface';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/customer')
  addCustomer(@Body() user: Partial<User>): number {
    return this.usersService.addCustomer(user);
  }

  @Get('/customer')
  getCustomers(): User[] {
    return this.usersService.getCustomers();
  }

  @Get('/driver')
  getDrivers(): User[] {
    return this.usersService.getDrivers();
  }

  @Get('/match')
  match(): string {
    return this.usersService.match();
  }
}
