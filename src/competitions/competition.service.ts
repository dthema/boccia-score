import { BadRequestException, Injectable } from '@nestjs/common';
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

  async update(params: {
    id: number;
    data: Prisma.CompetitionUpdateInput;
  }): Promise<CompetitionEntity> {
    const { data, id } = params;
    const trx = await this.prisma.$transaction([
      this.prisma.athletesOnCompetition.deleteMany({
        where: {
          competitionId: id,
        },
      }),
      this.prisma.competition.update({
        data,
        where: {
          id: id,
        },
        include: this.defaultInclude,
      }),
    ]);
    return trx[1];
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

  getAllBefore(date: Date): Promise<CompetitionEntity[]> {
    return this.prisma.competition.findMany({
      where: {
        endDate: {
          lt: date,
        },
      },
      include: this.defaultInclude,
    });
  }

  private defaultInclude = {
    athletes: {
      select: {
        athleteId: true,
        athlete: {
          select: {
            firstName: true,
            lastName: true,
            patronymicName: true,
            region: true,
            class: true,
          },
        },
      },
    },
    games: {
      select: {
        id: true,
      },
    },
  };
}
