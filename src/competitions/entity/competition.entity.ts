import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '.prisma/client';

export class CompetitionEntity {
  constructor({ ...data }: Partial<CompetitionEntity>) {
    Object.assign(this, data);
  }

  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  athletes: CompetitionAthleteEntity[];
  games: CompetitionGameEntity[];
}

export class CompetitionAthleteEntity {
  athlete: {
    firstName: string;
    lastName: string;
    patronymicName?: string | null;
    region: string;
    class: $Enums.AthleteClass;
  };
  athleteId: number;
}

export class CompetitionGameEntity {
  id: number;
}
