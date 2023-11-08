import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsFullname(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFullname',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.split(' ').length > 1;
        },
      },
    });
  };
}
