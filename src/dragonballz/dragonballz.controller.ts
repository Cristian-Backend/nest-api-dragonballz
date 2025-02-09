import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DragonballzService } from './dragonballz.service';
import { CreateDragonballzDto } from './dto/create-dragonballz.dto';
import { UpdateDragonballzDto } from './dto/update-dragonballz.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Controller('dragonballz')
export class DragonballzController {
  constructor(private readonly dragonballzService: DragonballzService) {}

  @Post()
  create(@Body() createDragonballzDto: CreateDragonballzDto) {
    return this.dragonballzService.create(createDragonballzDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    
   
    return this.dragonballzService.findAll(paginationDto);
  }

  @Get(':term') // termino que basicamente es un ID
  findOne(@Param('term') term: string) {
    return this.dragonballzService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateDragonballzDto: UpdateDragonballzDto) {
    return this.dragonballzService.update(term, updateDragonballzDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) { // ParseMongoIdPipe es un pipe que se encarga de validar que el id sea un ObjectId de mongo
    return this.dragonballzService.remove(id);
  }
}
