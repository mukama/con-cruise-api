import * as hungarian from 'hungarian-on3'
import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { SeedDrivers } from 'src/data/drivers';
import { SeedCustomers } from 'src/data/customers';


@Injectable()
export class UsersService {
  getCustomers(): User[] | undefined {
    return SeedCustomers;
  }

  getCruisers(): User[] | undefined {
    return SeedDrivers;
  }

  addCustomer(): number {
    const customer = {
      "id": SeedCustomers.length,
      "name": "Cory Crudge",
      "latitude": 22.791223,
      "longitude": 110.454459,
      "rides": 18,
      "rating": 3.9
    };
    return SeedDrivers.push(customer);
  }

  // GeoDataSource
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
    const distance = this.distance(c.latitude, c.longitude, d.latitude, d.longitude);
    if(distance < 10 ) console.log(c.latitude, c.longitude, d.latitude, d.longitude, distance);
    const distanceScore = distance <= 3 ? 7 : (distance <= 5 ? 3 : 0);
    const ratingScore = c.rating >= d.rating ? 2 : 0;
    const ridesScore1 = c.rides <= 2 && d.rides >= 3 ? 5 : 0;
    const ridesScore2 = c.rides > 2 && d.rides < 3 ? 2 : 0;
    
    return (distanceScore + ratingScore + ridesScore1 + ridesScore2);
  }

  getMatrix(customer: User[], driver: User[]): any[] {
    const scoresMatrix = [];
    for (let i = 0; i < customer.length; i++) {
      const driverScore = [];
      for (let j = 0; j < driver.length; j++) {
        driverScore.push(this.score(customer[i], driver[j]));
      }
      scoresMatrix.push(driverScore);
    }
    return scoresMatrix;
  }

  match(): string {
    const data = this.getMatrix(this.getCustomers(), this.getCruisers());
    return hungarian(data, true);
  }
}
