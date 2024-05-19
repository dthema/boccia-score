import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { CompetitionEntity } from '../entity/competition.entity';

@ApiExtraModels()
export class CompetitionDto {
  constructor({ ...entity }: Partial<CompetitionEntity>) {
    const keys = ['athletes', 'games'];
    Object.assign(
      this,
      Object.fromEntries(
        Object.entries(entity).filter(([key]) => !keys.includes(key)),
      ),
    );

    if (entity.athletes) {
      this.athleteIds = entity.athletes.map((x) => x.athleteId);
    }
    if (entity.games) {
      this.gameIds = entity.games.map((x) => x.id);
    }
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty({
    type: Number,
    isArray: true,
  })
  athleteIds: number[];

  @ApiProperty({
    type: Number,
    isArray: true,
  })
  gameIds: number[];
}
