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
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CompetitionRequestDto } from './dto/competitionRequest.dto';
import { CompetitionResponseDto } from './dto/competitionResponse.dto';
import { Auth } from '../auth/auth.decorator';

@Controller()
@ApiTags('competition')
@Auth('ADMIN')
@ApiBearerAuth()
export class CompetitionController {
  constructor(private competitionService: CompetitionService) {}

  @Get('competition/all')
  @ApiOkResponse({ type: [CompetitionResponseDto] })
  async getAllCompetitions(): Promise<CompetitionResponseDto[]> {
    return (await this.competitionService.getAll()).map(
      (x) => new CompetitionResponseDto(x),
    );
  }

  @Get('competition/:id')
  @ApiOkResponse({ type: CompetitionResponseDto })
  async getCompetitionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompetitionResponseDto> {
    return new CompetitionResponseDto(await this.competitionService.get(id));
  }

  @Post('competition')
  @ApiOkResponse({ type: CompetitionResponseDto })
  @ApiBody({ type: CompetitionRequestDto })
  async addCompetition(
    @Body() competitionData: CompetitionRequestDto,
  ): Promise<CompetitionResponseDto> {
    return new CompetitionResponseDto(
      await this.competitionService.add(this.getDataFromDto(competitionData)),
    );
  }

  @Put('competition/:id')
  @ApiOkResponse({ type: CompetitionResponseDto })
  @ApiBody({ type: CompetitionRequestDto })
  async updateCompetition(
    @Param('id', ParseIntPipe) id: number,
    @Body() competitionData: CompetitionRequestDto,
  ): Promise<CompetitionResponseDto> {
    return new CompetitionResponseDto(
      await this.competitionService.update({
        id,
        data: this.getDataFromDto(competitionData),
      }),
    );
  }

  @Delete('competition/:id')
  @ApiOkResponse({ type: CompetitionResponseDto })
  async deleteCompetition(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompetitionResponseDto> {
    return new CompetitionResponseDto(await this.competitionService.delete(id));
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
