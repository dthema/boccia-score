import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GameService } from './game.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GameDto } from './dto/game.dto';
import { Auth } from '../auth/auth.decorator';
import { GameRequestDto } from './dto/gameRequest.dto';

@Controller()
@ApiTags('game')
@Auth('ADMIN')
@ApiBearerAuth()
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('game/all')
  @ApiOkResponse({ type: [GameDto] })
  async getAllGames(): Promise<GameDto[]> {
    return (await this.gameService.getAll()).map((x) => new GameDto(x));
  }

  @Get('game/:id')
  @ApiOkResponse({ type: GameDto })
  async getGameById(@Param('id', ParseIntPipe) id: number): Promise<GameDto> {
    return new GameDto(await this.gameService.get(id));
  }

  @Post('game')
  @ApiOkResponse({ type: GameDto })
  @ApiBody({ type: GameRequestDto })
  async addGame(@Body() gameData: GameRequestDto): Promise<GameDto> {
    if (gameData.blueAthleteId == gameData.redAthleteId) {
      throw new BadRequestException('Выберите различных игроков');
    }
    return new GameDto(
      await this.gameService.add(this.getDataFromDto(gameData)),
    );
  }

  @Put('game/:id')
  @ApiOkResponse({ type: GameDto })
  @ApiBody({ type: GameRequestDto })
  async updateGame(
    @Param('id', ParseIntPipe) id: number,
    @Body() gameData: GameRequestDto,
  ): Promise<GameDto> {
    if (gameData.blueAthleteId == gameData.redAthleteId) {
      throw new BadRequestException('Выберите различных игроков');
    }
    return new GameDto(
      await this.gameService.update({
        id,
        data: this.getDataFromDto(gameData),
      }),
    );
  }

  @Delete('game/:id')
  @ApiOkResponse({ type: GameDto })
  async deleteGame(@Param('id', ParseIntPipe) id: number): Promise<GameDto> {
    return new GameDto(await this.gameService.delete(id));
  }

  private getDataFromDto(gameData: GameRequestDto) {
    return {
      class: gameData.class,
      status: gameData.status,
      round: gameData.round,
      redScore: gameData.redScore,
      blueScore: gameData.blueScore,
      redAthlete: {
        connect: {
          id: gameData.redAthleteId,
        },
      },
      blueAthlete: {
        connect: {
          id: gameData.blueAthleteId,
        },
      },
      competition: {
        connect: {
          id: gameData.competitionId,
        },
      },
    };
  }
}
