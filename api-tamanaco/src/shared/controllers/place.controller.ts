import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { PlaceService } from "../services/place.service";
import type { CreatePlaceDto } from "../dto/create-place.dto";

@Controller('place')
export class PlaceController {
    constructor(private readonly placeService: PlaceService) {}

    @Post()
    async create(@Body() place: CreatePlaceDto ) {
        return await this.placeService.create(place);
    }

    @Get()
    async findAll() {
        return await this.placeService.findAll();
    }

    @Get(':placeKey')
    async findById(@Param('placeKey', ParseIntPipe) placeKey: number) {
        return await this.placeService.findById(placeKey);
    }

    @Delete(':placeKey')
    async delete(@Param('placeKey') placeKey: number) {
        return await this.placeService.deleteById(placeKey);
    }
}