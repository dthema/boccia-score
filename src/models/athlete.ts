export class Athlete {
  fullName: string;
  rank: number;
  score: number;
  region: string;
  class: AthleteClass;
}

export enum AthleteClass {
  BC1,
  BC2,
  BC3,
  BC4,
}
