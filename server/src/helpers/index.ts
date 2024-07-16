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

export const IsStrongPasswordRequirements = {
  requirements: {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  },
  message: {
    message:
      'The password should contain at least 1 uppercase character, 1 lowercase, 1 number, 1 special character and should be at least 8 characters long.',
  },
};
