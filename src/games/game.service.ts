import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { GameEntity } from './entity/game.entity';
import { $Enums } from '.prisma/client';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  add(data: Prisma.GameCreateInput): Promise<GameEntity> {
    return this.prisma.game.create({
      data,
      include: this.defaultInclude,
    });
  }

  update(params: {
    id: number;
    data: Prisma.GameUpdateInput;
  }): Promise<GameEntity> {
    const { data, id } = params;
    return this.prisma.game.update({
      data,
      where: {
        id: id,
      },
      include: this.defaultInclude,
    });
  }

  delete(id: number): Promise<GameEntity> {
    return this.prisma.game.delete({
      where: { id: id },
      include: this.defaultInclude,
    });
  }

  get(id: number): Promise<GameEntity> {
    return this.prisma.game.findUniqueOrThrow({
      where: { id: id },
      include: this.defaultInclude,
    });
  }

  getAll(): Promise<GameEntity[]> {
    return this.prisma.game.findMany({
      include: this.defaultInclude,
    });
  }

  getAllByCompetition(competitionId: number): Promise<GameEntity[]> {
    return this.prisma.game.findMany({
      where: {
        competitionId: competitionId,
      },
      include: this.defaultInclude,
    });
  }

  getAllByStatus(status: $Enums.GameStatus): Promise<GameEntity[]> {
    return this.prisma.game.findMany({
      where: {
        status: status,
      },
      include: this.defaultInclude,
    });
  }

  getAllByCompetitionAndStatus(
    competitionId: number,
    status: $Enums.GameStatus,
  ): Promise<GameEntity[]> {
    return this.prisma.game.findMany({
      where: {
        competitionId: competitionId,
        status: status,
      },
      include: this.defaultInclude,
    });
  }

  private defaultInclude = {
    redAthlete: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        patronymicName: true,
        region: true,
      },
    },
    blueAthlete: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        patronymicName: true,
        region: true,
      },
    },
    competition: {
      select: {
        id: true,
      },
    },
  };
}
