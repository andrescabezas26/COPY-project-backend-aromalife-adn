import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp'
  ];
  
  private readonly maxSize = 5 * 1024 * 1024; // 5MB

  transform(file: Express.Multer.File): Express.Multer.File {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    // Validar tipo MIME
    if (!this.allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
      throw new BadRequestException(
        'Tipo de archivo no permitido. Solo se admiten archivos JPG, JPEG, PNG y WEBP.'
      );
    }

    // Validar tamaño
    if (file.size > this.maxSize) {
      throw new BadRequestException(
        'El archivo es muy grande. Máximo 5MB permitido.'
      );
    }

    // Validar extensión del archivo (doble verificación)
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        'Extensión de archivo no permitida. Solo se admiten archivos .jpg, .jpeg, .png y .webp.'
      );
    }

    // Validar que el archivo tenga contenido
    if (!file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('El archivo está vacío o corrupto');
    }

    return file;
  }
}
