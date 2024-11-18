import {
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CustomHttpError } from '../globals/responses/exceptions';

@Injectable()
export class CustomUploadFilePipe implements PipeTransform {
  transform(file: any) {
    console.log('file pipe: ');
    console.log(file);
    if (!file) {
      throw new CustomHttpError('Nenhum arquivo foi enviado', 400);
    }

    const fileTypeValidator = new FileTypeValidator({
      fileType: '^(image/png|image/jpeg|image/jpg|image/svg)$',
    });

    const isValidType = fileTypeValidator.isValid(file);

    if (!isValidType) {
      throw new UnprocessableEntityException(
        'O tipo de arquivo enviado não é suportado. Apenas imagens nos formatos PNG, JPEG, JPG e SVG são aceitas.',
      );
    }

    const maxSizeValidator = new MaxFileSizeValidator({
      maxSize: 20000,
    });
    const isValidSize = maxSizeValidator.isValid(file);

    if (!isValidSize) {
      throw new UnprocessableEntityException(
        'O arquivo excede o tamanho máximo permitido de 20KB.',
      );
    }

    return file;
  }
}
