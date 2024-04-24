export class CompetitionEntity {
  constructor({ ...data }: Partial<CompetitionEntity>) {
    Object.assign(this, data);
  }

  name: string;
  startDate: Date;
  endDate: Date;
  athletes: CompetitionAthleteEntity[];
  games: CompetitionGameEntity[];
}

export class CompetitionAthleteEntity {
  athleteId: number;
}

export class CompetitionGameEntity {
  id: number;
}
