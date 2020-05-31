import { Injectable } from '@nestjs/common';
import {UserType } from './user/user.entity'

@Injectable()
export class AppService {
  getUser(type: UserType): string {
    throw new Error("Method not implemented.");
  }
  match(): string {
    throw new Error("Method not implemented.");
  }
  getHello(): string {
    return 'Hello World!';
  }
}
