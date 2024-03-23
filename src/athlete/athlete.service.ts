import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Athlete } from '../models/athlete';

@Injectable()
export class AthleteService {
  constructor(private httpService: HttpService) {}

  async getMockAthletes() {
    const response = await firstValueFrom(
      this.httpService.get('https://dummyjson.com/users'),
    );
    const users: [object] = response.data.users;
    const randomizedUsers = users
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.random() * 20);
    return this.getAthletes(randomizedUsers).sort(
      (a: Athlete, b: Athlete) => a.rank - b.rank,
    );
  }

  private getAthletes(data: any) {
    const athletes = [];
    if (data && Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const athlete = new Athlete();
        athlete.fullName = this.getAthleteFullName(data[i]);
        athlete.rank = i + 1;
        athlete.score = 100 - i;
        athlete.region = 'Регион';
        athletes.push(athlete);
      }
    }

    return athletes;
  }

  private getAthleteFullName(athlete: any): string {
    return athlete.firstName + ' ' + athlete.lastName;
  }

  private getAthleteScore(athlete: any): number {
    return Math.floor(athlete.weight / (Math.random() * 10 + 10));
  }
}
