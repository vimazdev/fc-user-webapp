import { StringSchema } from './core/schema/StringSchema';
import { NumberSchema } from './core/schema/NumberSchema';
import { ObjectSchema } from './core/schema/ObjectSchema';

export const miniYup = {
    string: () => new StringSchema(),
    number: () => new NumberSchema(),
    object: <T extends Record<string, any>>(shape: T) =>
        new ObjectSchema(shape),
};