// schemas/StringSchema.ts
import { BaseSchema } from '../BaseSchema';

export class StringSchema extends BaseSchema<string> {
  required(message: string = 'Campo requerido'): this {
    return this.addValidator((value) => {
      if (value == null || value === '') {
        throw new Error(message);
      }
    });
  }

  min(length: number, message?: string): this {
    return this.addValidator((value) => {
      if (typeof value !== 'string' || value.length < length) {
        throw new Error(message || `Debe tener al menos ${length} caracteres`);
      }
    });
  }

  email(message: string = 'Debe ser un email válido'): this {
    return this.addValidator((value) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        throw new Error(message);
      }
    });
  }

  oneOfField(refField: string, message = 'Los campos no coinciden'): this {
    return this.addValidator((value, allValues) => {
      if (!allValues || value !== allValues[refField]) {
        throw new Error(message);
      }
    });
  }
}
