import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsUnique(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any[]) {
          if (!value) {
            return false;
          }
          const ids = value.map((item) => item.id);
          return new Set(ids).size === ids.length;
        },
      },
    });
  };
}
