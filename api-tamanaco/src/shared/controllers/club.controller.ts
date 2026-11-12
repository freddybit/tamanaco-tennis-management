import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import type { CreateClubDto } from "../dto/create-club.dto";
import { ClubService } from "../services/club.service";

@Controller('clubs')
export class ClubController {

    private readonly clubService: ClubService;

    constructor(clubService: ClubService) {
        this.clubService = clubService;
    }

    @Post()
    async create(@Body() createClubDto: CreateClubDto) {
        return await this.clubService.create(createClubDto);
    }

    @Get()
    async findAll() {
        return await this.clubService.findAll();
    }

    @Get(':clubKey')
    async findById(@Param('clubKey', ParseIntPipe) clubKey: number) {
        return await this.clubService.findById(clubKey);
    }
    
}