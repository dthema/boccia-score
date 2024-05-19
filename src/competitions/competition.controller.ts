import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CompetitionService } from './competition.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CompetitionRequestDto } from './dto/competitionRequest.dto';
import { CompetitionDto } from './dto/competition.dto';
import { Auth } from '../auth/auth.decorator';

@Controller()
@ApiTags('competition')
@ApiBearerAuth()
export class CompetitionController {
  constructor(private competitionService: CompetitionService) {}

  @Get('competition/all')
  @ApiOkResponse({ type: [CompetitionDto] })
  @Auth('ADMIN')
  async getAllCompetitions(): Promise<CompetitionDto[]> {
    return (await this.competitionService.getAll()).map(
      (x) => new CompetitionDto(x),
    );
  }

  @Get('competition/:id')
  @ApiOkResponse({ type: CompetitionDto })
  @Auth('ADMIN')
  async getCompetitionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompetitionDto> {
    return new CompetitionDto(await this.competitionService.get(id));
  }

  @Post('competition')
  @ApiOkResponse({ type: CompetitionDto })
  @ApiBody({ type: CompetitionRequestDto })
  @Auth('ADMIN')
  async addCompetition(
    @Body() competitionData: CompetitionRequestDto,
  ): Promise<CompetitionDto> {
    return new CompetitionDto(
      await this.competitionService.add(this.getDataFromDto(competitionData)),
    );
  }

  @Put('competition/:id')
  @ApiOkResponse({ type: CompetitionDto })
  @ApiBody({ type: CompetitionRequestDto })
  @Auth('ADMIN')
  async updateCompetition(
    @Param('id', ParseIntPipe) id: number,
    @Body() competitionData: CompetitionRequestDto,
  ): Promise<CompetitionDto> {
    return new CompetitionDto(
      await this.competitionService.update({
        id,
        data: this.getDataFromDto(competitionData),
      }),
    );
  }

  @Delete('competition/:id')
  @ApiOkResponse({ type: CompetitionDto })
  @Auth('ADMIN')
  async deleteCompetition(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompetitionDto> {
    return new CompetitionDto(await this.competitionService.delete(id));
  }

  private getDataFromDto(competitionData: CompetitionRequestDto) {
    return {
      name: competitionData.name,
      startDate: competitionData.startDate,
      endDate: competitionData.endDate,
      athletes: {
        create: competitionData.athleteIds.map((id) => ({
          athlete: {
            connect: {
              id: id,
            },
          },
        })),
      },
    };
  }
}
