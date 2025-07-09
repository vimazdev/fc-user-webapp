// schemas/ObjectSchema.ts
import { BaseSchema } from '../BaseSchema';

type Shape = {
    [key: string]: BaseSchema<any>;
};

export class ObjectSchema<T extends Shape> extends BaseSchema<any> {
    constructor(private shape: T) {
        super();
    }

    validate(value: any): { values?: any; errors?: Record<string, string> } {
        const errors: Record<string, string> = {};
        const result: any = {};

        for (const key in this.shape) {
            try {
                result[key] = this.shape[key].validate(value[key], value); // ← pasar todo el objeto
            } catch (e) {
                errors[key] = (e as Error).message;
            }
        }

        if (Object.keys(errors).length > 0) {
            return { errors };
        }

        return { values: result };
    }
}
