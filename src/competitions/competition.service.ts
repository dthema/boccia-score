import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Competition } from '../models/competition';

@Injectable()
export class CompetitionService {
  constructor(private httpService: HttpService) {}

  getMockCompetitions() {
    return [
      new Competition('ПР 2024'),
      new Competition('ЧР 2024'),
      new Competition('КР 2024'),
      new Competition('ВР 2024'),
    ];
  }
}
