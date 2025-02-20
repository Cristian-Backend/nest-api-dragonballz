import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';
import { Dragonballz } from 'src/dragonballz/entities/dragonballz.entity';
import { DbzResponse } from './interfaces/dbz-respones.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Dragonballz.name)
    private readonly dragonballzModel: Model<Dragonballz>,
    private readonly http: AxiosAdapter
  ) {}

  async executeSeed() {
    try {
      // 1. Eliminar datos existentes
      await this.dragonballzModel.deleteMany();
      console.log('✅ Base de datos limpiada');

      // 2. Obtener datos de la API
      const { items } = await this.http.get<DbzResponse>(
        'https://dragonball-api.com/api/characters?page=1&limit=100'
      );

      if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error('❌ No se encontraron personajes en la API');
      }

      // 3. Transformar los datos e incluir las imágenes
      const charactersToInsert = items.map(({ name, id, image }) => ({
        name,
        np: id,
        images: image, // Guardar la URL de la imagen
      }));

      // 4. Insertar en la base de datos
      await this.dragonballzModel.insertMany(charactersToInsert);
      console.log(`✅ ${charactersToInsert.length} personajes insertados en la base de datos`);

      return 'Seed ejecutado correctamente';
    } catch (error) {
      console.error('❌ Error ejecutando el seed:', error.message);
      throw new Error('Fallo en la ejecución del seed');
    }
  }
}
