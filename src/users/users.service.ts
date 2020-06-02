import * as hungarian from 'hungarian-on3'
import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { SeedDrivers } from 'src/data/drivers';
import { SeedCustomers } from 'src/data/customers';


@Injectable()
export class UsersService {
  drivers: User[] = SeedDrivers;
  customers: User[] = SeedCustomers;

  getCustomers(): User[] | undefined {
    return this.customers;
  }

  getDrivers(): User[] | undefined {
    return this.drivers;
  }

  addCustomer(customer: Partial<User>): number {
    const id = this.customers.length;
    const { name, latitude, longitude, rides, rating } = customer;
    return this.customers.push({ id, name, latitude, longitude, rides, rating });
  }

  distance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    return dist * 60 * 1.1515 * 1.609344; // to KM
  }

  score(c: User, d: User): number {
    const MAX_SCORE = Math.pow(2, 10);
    const distance = this.distance(c.latitude, c.longitude, d.latitude, d.longitude);
    const distanceScore = distance <= 3 ? 7 : (distance <= 5 ? 3 : 0);
    const ratingScore = c.rating >= d.rating ? 2 : 0;
    const ridesScore1 = c.rides <= 2 && d.rides >= 3 ? 5 : 0;
    const ridesScore2 = c.rides > 2 && d.rides < 3 ? 2 : 0;

    return (distanceScore + ratingScore + ridesScore1 + ridesScore2) - MAX_SCORE;
  }

  getMatrix(customers: User[], drivers: User[]): any[] {
    const scoresMatrix = [];
    for (let i = 0; i < customers.length; i++) {
      const driverScore = [];
      for (let j = 0; j < drivers.length; j++) {
        driverScore.push(this.score(customers[i], drivers[j]));
      }
      scoresMatrix.push(driverScore);
    }
    return scoresMatrix;
  }

  match(): any {
    const data = this.getMatrix(this.customers, this.drivers);
    const pairs = hungarian(data)
      .filter(([c, d]) => d >= 0 && c >= 0);
    const customerToDriverMatches = pairs.map(([cIndex, dIndex]) => {
      const customer = this.customers[cIndex];
      const driver = this.drivers[dIndex];
      return `${customer.id}. ${customer.name} => ${driver.id}. ${driver.name}`;
    });
    const matchedCustomers = pairs.map(([c]) => c);
    const matchedDrivers = pairs.map(([, d]) => d);
    const unfulfilledCustomers = this.customers
      .filter((c, i) => matchedCustomers.indexOf(i) < 0)
      .map(c => `${c.id}. ${c.name}`);
    const unassignedDrivers = this.drivers
      .filter((d, i) => matchedDrivers.indexOf(i) < 0)
      .map(c => `${c.id}. ${c.name}`);

    return { customerToDriverMatches, unfulfilledCustomers, unassignedDrivers };
  }
}
