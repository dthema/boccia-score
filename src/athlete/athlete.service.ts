import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AthleteService {
  constructor(private prisma: PrismaService) {}

  add(data: Prisma.AthleteCreateInput) {
    return this.prisma.athlete.create({ data });
  }

  update(params: { id: number; data: Prisma.AthleteUpdateInput }) {
    const { data, id } = params;
    return this.prisma.athlete.update({
      data,
      where: {
        id: id,
      },
    });
  }

  delete(id: number) {
    return this.prisma.athlete.delete({
      where: { id: id },
    });
  }

  get(id: number) {
    return this.prisma.athlete.findUniqueOrThrow({
      where: { id: id },
    });
  }

  getAll() {
    return this.prisma.athlete.findMany();
  }

  getAllByCompetition(competitionId: number) {
    return this.prisma.athlete.findMany({
      where: {
        competitions: {
          some: {
            competitionId: competitionId,
          },
        },
      },
    });
  }
}
