import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { RankingService } from "../services/ranking.service";
import type { CreateRankingDto } from "../dto/create-ranking.dto";
import { Logger } from '@nestjs/common';

const logger: Logger = new Logger('Bootstrap');

@Controller('ranking')
export class RankingController {

    private readonly rankingService: RankingService;
    constructor(rankingService: RankingService) {
        this.rankingService = rankingService;
    }

    @Post()
    async create(@Body() createRankingDto: CreateRankingDto) {
        return await this.rankingService.create(createRankingDto);
    }

    @Get()
    async findAll() {
        return this.rankingService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.rankingService.findById(+id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.rankingService.delete(+id);
    }

}           