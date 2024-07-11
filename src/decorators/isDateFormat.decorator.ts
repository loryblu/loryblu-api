import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsDateFormat(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          try {
            if (typeof value !== 'string') return false;

            const [year, month, day] = value.split('-');

            const isValidYear = Number(year) > 1900;
            const isValidMonth = Number(month) > 0 && Number(month) < 13;
            const isValidDay = Number(day) > 0 && Number(month) < 32;

            return isValidDay && isValidMonth && isValidYear;
          } catch (_) {
            return false;
          }
        },
      },
    });
  };
}
