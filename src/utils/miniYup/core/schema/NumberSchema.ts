// schemas/NumberSchema.ts
import { BaseSchema } from '../BaseSchema';

export class NumberSchema extends BaseSchema<number> {
    required(message: string = 'Campo requerido'): this {
        return this.addValidator((value) => {
            if (value == null) {
                throw new Error(message);
            }
        });
    }

    min(minValue: number, message?: string): this {
        return this.addValidator((value) => {
            if (value < minValue) {
                throw new Error(message || `Debe ser mayor o igual a ${minValue}`);
            }
        });
    }

    max(maxValue: number, message?: string): this {
        return this.addValidator((value) => {
            if (value > maxValue) {
                throw new Error(message || `Debe ser menor o igual a ${maxValue}`);
            }
        });
    }
}
