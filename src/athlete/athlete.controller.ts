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
import { AthleteService } from './athlete.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AthleteDto } from './dto/athlete.dto';
import { AthleteRequestDto } from './dto/athleteRequest.dto';
import { Auth } from '../auth/auth.decorator';

@Controller()
@ApiTags('athlete')
@Auth('ADMIN')
@ApiBearerAuth()
export class AthleteController {
  constructor(private athleteService: AthleteService) {}

  @Get('athlete/all')
  @ApiOkResponse({ type: [AthleteDto] })
  async getAllAthletes(): Promise<AthleteDto[]> {
    return this.athleteService.getAll();
  }

  @Get('athlete/:id')
  @ApiOkResponse({ type: AthleteDto })
  async getAthleteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AthleteDto> {
    return this.athleteService.get(id);
  }

  @Post('athlete')
  @ApiOkResponse({ type: AthleteDto })
  @ApiBody({ type: AthleteRequestDto })
  async addAthlete(
    @Body() athleteData: AthleteRequestDto,
  ): Promise<AthleteDto> {
    return this.athleteService.add(athleteData);
  }

  @Put('athlete/:id')
  @ApiOkResponse({ type: AthleteDto })
  @ApiBody({ type: AthleteRequestDto })
  async updateAthlete(
    @Param('id', ParseIntPipe) id: number,
    @Body() athleteData: AthleteRequestDto,
  ): Promise<AthleteDto> {
    return this.athleteService.update({
      id,
      data: athleteData,
    });
  }

  @Delete('athlete/:id')
  @ApiOkResponse({ type: AthleteDto })
  async deleteAthlete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AthleteDto> {
    return this.athleteService.delete(id);
  }
}
