import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDragonballzDto } from './dto/create-dragonballz.dto';
import { UpdateDragonballzDto } from './dto/update-dragonballz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Dragonballz } from './entities/dragonballz.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class DragonballzService {
  constructor(
    @InjectModel(Dragonballz.name)
    private readonly dragonballzModel: Model<Dragonballz>,
  ) {}

async create(createDragonballzDto: CreateDragonballzDto) {
    createDragonballzDto.name = createDragonballzDto.name.toLowerCase();; // pasamos minuscula
    try {
      const personaje = await this.dragonballzModel.create(createDragonballzDto)
      return personaje;

    
      
    } catch (error) {
      // error de duplicacion
      this.handleExceptions(error); // este error esta definitivo abajo de el archivo.
      
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto; // destructuramos el dto.

    return this.dragonballzModel.find()
    .limit(limit) // limite de 5 pokemons.
    .skip( offset )// saltar 5 pokemons.
    .sort({no: 1}) // ordenar por numero de pokemon.
    .select('-__v') // quitar el __v
  }

  async findOne(term: string) {
    // Busquedas para este endpoint

    let dragonbz : Dragonballz // entity

    // buscar por numero
    if(!isNaN(+term)){ // si es un numero
       dragonbz = await this.dragonballzModel.findOne({np: term}) // BUSCAR POR TERMINO , numero del dragonballz.
    }

    // buscar por Mongoid
    if( !dragonbz && isValidObjectId(term)){ // si no existe un dbz y es un mongoID
      dragonbz = await this.dragonballzModel.findById(term) // BUSCAR POR TERMINO, mongoID
    }

    //buscar por   nombre del dragonballz.
    if(!dragonbz) dragonbz = await this.dragonballzModel.findOne({name: term.toLowerCase().trim()})  // BUSCAR POR TERMINO, nombre

    // si no existe el dragonballz
    if(!dragonbz) throw new NotFoundException(`Character not found with term ${term}`)
    
    return dragonbz;
   
  }
  

  

  async update(term: string, updateDragonballzDto: UpdateDragonballzDto) {
    const dragonbz = await this.findOne( term ); // buscamos el personaje
  if(updateDragonballzDto.name) 
    updateDragonballzDto.name = updateDragonballzDto.name.toLowerCase(); // pasamos a minuscula

  try {

    await dragonbz.updateOne(updateDragonballzDto); // actualizamos el pokemon
    return { ...dragonbz.toJSON(), ...updateDragonballzDto }; // retornamos el pokemon actualizado con los datos nuevos
    
  } catch (error) {
      // error de duplicacion
    this.handleExceptions(error);
  }



  }
  

  async remove(id: string) {

    const { deletedCount } = await this.dragonballzModel.deleteOne({_id: id});

    // si es 0 no se elimino, si es 1 se elimino
    if(deletedCount === 0) throw new NotFoundException(`character dbz  not found with id ${id}`);  // si no se elimina 

   return;
   
  }

  // ESTE METODO ES CREADO PARA QUE NO SE REPITA UNA Y OTRA VEZ EL MISMO CODIGO.
  private handleExceptions(error: any) {
    if (error.code === 11000) { // codigo de duplicacion
      throw new BadRequestException(`Character exists ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't update character - Check server logs`);
  }
}