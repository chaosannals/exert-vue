import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../../auth/jwt-auth.guard';

@Controller('animal')
export class AnimalController {
    @Public()
    @Get("all")
    async getAll() {
        return "all"
    }
}
