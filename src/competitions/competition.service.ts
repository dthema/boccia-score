import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { CompetitionEntity } from './entity/competition.entity';

@Injectable()
export class CompetitionService {
  constructor(private prisma: PrismaService) {}

  add(data: Prisma.CompetitionCreateInput): Promise<CompetitionEntity> {
    return this.prisma.competition.create({
      data,
      include: this.defaultInclude,
    });
  }

  update(params: {
    id: number;
    data: Prisma.CompetitionUpdateInput;
  }): Promise<CompetitionEntity> {
    const { data, id } = params;
    return this.prisma.competition.update({
      data,
      where: {
        id: id,
      },
      include: this.defaultInclude,
    });
  }

  delete(id: number): Promise<CompetitionEntity> {
    return this.prisma.competition.delete({
      where: { id: id },
      include: this.defaultInclude,
    });
  }

  get(id: number): Promise<CompetitionEntity> {
    return this.prisma.competition.findUniqueOrThrow({
      where: { id: id },
      include: this.defaultInclude,
    });
  }

  getAll(): Promise<CompetitionEntity[]> {
    return this.prisma.competition.findMany({
      include: this.defaultInclude,
    });
  }

  private defaultInclude = {
    athletes: {
      select: {
        athleteId: true,
      },
    },
    games: {
      select: {
        id: true,
      },
    },
  };
}
