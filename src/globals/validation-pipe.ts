import {
  BadRequestException,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

const config: ValidationPipeOptions = {
  exceptionFactory(errors) {
    const result = errors.map((error) => ({
      property: error.property,
      message: error.constraints[Object.keys(error.constraints)[0]],
    }));

    return new BadRequestException({ details: result });
  },
};

export default new ValidationPipe(config);
