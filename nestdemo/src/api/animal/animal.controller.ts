import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('animal')
export class AnimalController {
    @UseGuards()
    @Get("all")
    async getAll() {
        return "all"
    }
}
