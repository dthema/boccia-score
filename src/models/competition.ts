import { Athlete } from './athlete';

export class Competition {
  constructor(name: string) {
    this.name = name;
  }

  name: string;
  startDate: Date;
  endDate: Date;
  athletes: Athlete[];
  link: string = '#';
}
