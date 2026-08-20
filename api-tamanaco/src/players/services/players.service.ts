import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { PlayerRepository } from '../repositories/player.repository';
import { Player } from '../entities/player.entity';
import { IdentityDocumentService } from '../../shared/services/identity-document.service';
import { EmailService } from '../../shared/services/email.service';
import { PhoneService } from '../../shared/services/phone.service';
import { DataSource } from 'typeorm';

@Injectable()
export class PlayersService {

  private readonly dataSource: DataSource;
  private readonly playerRepository: PlayerRepository;
  private readonly identityDocumentService: IdentityDocumentService;
  private readonly emailService: EmailService;
  private readonly phoneService: PhoneService;

  constructor(playerRepository: PlayerRepository, identityDocumentService: IdentityDocumentService, emailService: EmailService, phoneService: PhoneService, dataSource: DataSource) {
    this.playerRepository = playerRepository;
    this.identityDocumentService = identityDocumentService;
    this.emailService = emailService;
    this.phoneService = phoneService;
    this.dataSource = dataSource;
  }

async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    if (!createPlayerDto) {
      throw new BadRequestException('El cuerpo de la petición no puede estar vacío');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newPlayer = new Player({
        firstName: createPlayerDto.firstName,
        secondName: createPlayerDto.secondName ?? null,
        firstLastname: createPlayerDto.firstLastname,
        secondLastname: createPlayerDto.secondLastname ?? null,
        birthday: createPlayerDto.birthday ?? null,
        sex: createPlayerDto.sex,
        place_placeKey: createPlayerDto.place_placeKey ?? null,
        photoOne: createPlayerDto.photoOne ?? null,
        photoTwo: createPlayerDto.photoTwo ?? null,
        participations: [],
      });

      const savedPlayer = await queryRunner.manager.save(Player, newPlayer);

      if (createPlayerDto.identityDocuments) {
        await this.identityDocumentService.createWithRunner(queryRunner, {
          type: createPlayerDto.identityDocuments.type,
          docNumber: createPlayerDto.identityDocuments.docNumber,
          Player_profileKey: savedPlayer.profileKey,
        });
      }

      if (createPlayerDto.emails && createPlayerDto.emails.length > 0) {
        for (const email of createPlayerDto.emails) {
          await this.emailService.createWithRunner(queryRunner, {
            username: email.username,
            domainName: email.domainName,
            Player_profileKey: savedPlayer.profileKey,
          });
        }
      }

      if (createPlayerDto.phones && createPlayerDto.phones.length > 0) {
        for (const phone of createPlayerDto.phones) {
          await this.phoneService.createWithRunner(queryRunner, {
            areaCode: phone.areaCode,
            operatorCode: phone.operatorCode,
            phoneNumber: phone.phoneNumber,
            Player_profileKey: savedPlayer.profileKey,
          });
        }
      }

      if (createPlayerDto.stats) {
        const stats = createPlayerDto.stats;
        await queryRunner.manager.save('Stats', {
          matchesPlayed: stats.matchesPlayed,
          matchesWon: stats.matchesWon,
          matchesLost: stats.matchesLost,
          averageMatchesWon: stats.averageMatchesWon,
          setsWon: stats.setsWon,
          setsLost: stats.setsLost,
          averageSetsWon: stats.averageSetsWon,
          gamesWon: stats.gamesWon,
          gamesLost: stats.gamesLost,
          averageGamesWon: stats.averageGamesWon,
          player_profileKey: savedPlayer.profileKey,
        });
      }

      await queryRunner.commitTransaction();

      return savedPlayer;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error al crear el jugador: ${(error as Error).message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return await this.playerRepository.findAll();
  }

  async findById(id: number) {
    return await this.playerRepository.findById(id);
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {

    if (!updatePlayerDto) {
      throw new BadRequestException('El cuerpo de la petición no puede estar vacío');
    }

    let playerToUpdate = await this.playerRepository.findById(id);
    if (!playerToUpdate) {
      throw new NotFoundException(`No se encontró un jugador con el ID ${id}`);
    }

    playerToUpdate.firstName = updatePlayerDto.firstName;
    playerToUpdate.secondName = updatePlayerDto.secondName ?? null;
    playerToUpdate.firstLastname = updatePlayerDto.firstLastname;
    playerToUpdate.secondLastname = updatePlayerDto.secondLastname ?? null;
    playerToUpdate.birthday = updatePlayerDto.birthday ?? null;
    playerToUpdate.sex = updatePlayerDto.sex;
    playerToUpdate.place_placeKey = updatePlayerDto.place_placeKey ?? null;
    playerToUpdate.photoOne = updatePlayerDto.photoOne ?? null;
    playerToUpdate.photoTwo = updatePlayerDto.photoTwo ?? null;

    return await this.playerRepository.update(playerToUpdate);
  }

  async deleteById(id: number) {
    return await this.playerRepository.deleteById(id);
  }
}
