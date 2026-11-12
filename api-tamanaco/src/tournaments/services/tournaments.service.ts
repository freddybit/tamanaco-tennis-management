import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';
import { TournamentRepository } from '../repositories/tournament.repository';
import { Tournament } from '../entities/tournament.entity';

@Injectable()
export class TournamentsService {

  private TournamentRepository: TournamentRepository;

  constructor(TournamentRepository: TournamentRepository) {
    this.TournamentRepository = TournamentRepository;
  }

  async create(createTournamentDto: CreateTournamentDto) {
    const newTournament: Tournament = new Tournament({
      tourName: createTournamentDto.tourName,
      tourDescription: createTournamentDto.tourDescription ,
      startDate: createTournamentDto.startDate,
      tennisCategory_catKey: createTournamentDto.categoryKey,
    });
    return await this.TournamentRepository.create(newTournament);
  }

  async findAll() {
    return await this.TournamentRepository.findAll();
  }

  async findOne(tourKey: number) {
    return await this.TournamentRepository.findById(tourKey);
  }

  async update(tourKey: number, updateTournamentDto: UpdateTournamentDto) {}

  async remove(tourKey: number) {
    return await this.TournamentRepository.remove(tourKey);
  }

}

