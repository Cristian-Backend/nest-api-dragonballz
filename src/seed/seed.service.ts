import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';
import { Dragonballz } from 'src/dragonballz/entities/dragonballz.entity';
import { DbzResponse } from './interfaces/dbz-respones.interface';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

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

      // 3. Crear directorio de imágenes
      const imagesDir = path.join(__dirname, '../../../public/images');
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      // 4. Descargar y almacenar las imágenes
      const charactersToInsert = await Promise.all(
        items.map(async ({ name, id, image }) => {
          const imageUrl = image;
          const imageName = `${id}.jpg`;
          const imagePath = path.join(imagesDir, imageName);

          // Descargar la imagen
          const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream',
          });

          // Guardar la imagen localmente
          response.data.pipe(fs.createWriteStream(imagePath));
          await new Promise((resolve, reject) => {
            response.data.on('end', resolve);
            response.data.on('error', reject);
          });

          // Retornar los datos a insertar
          return {
            name,
            np: id,
            image: `/images/${imageName}`, // Ruta local de la imagen
          };
        })
      );

      // 5. Insertar en la base de datos
      await this.dragonballzModel.insertMany(charactersToInsert);
      console.log(`✅ ${charactersToInsert.length} personajes insertados en la base de datos`);

      return 'Seed ejecutado correctamente';
    } catch (error) {
      console.error('❌ Error ejecutando el seed:', error.message);
      throw new Error('Fallo en la ejecución del seed');
    }
  }
}
