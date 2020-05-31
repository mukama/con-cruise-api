import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserType } from './user/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/customer')
  getCustomers(): string {
    return this.appService.getUser(UserType.CUSTOMER);
  }

  @Get('/cruiser')
  getCruisers(): string {
    return this.appService.getUser(UserType.CRUISER);
  }

  @Get('/match')
  match(): string {
    return this.appService.match();
  }
}
