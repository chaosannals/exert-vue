import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { CatController } from './cat/cat.controller';
import { CatService } from './cat/cat.service';

@Module({
  controllers: [AnimalController, CatController],
  providers: [AnimalService, CatService]
})
export class AnimalModule {}
