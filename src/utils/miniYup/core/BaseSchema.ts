export abstract class BaseSchema<T> {
    protected validators: ((value: T, allValues?: any) => void)[] = [];

    validate(value: T, allValues?: any): T {
        for (const validator of this.validators) {
            validator(value, allValues);
        }
        return value;
    }

    protected addValidator(validator: (value: T, allValues?: any) => void): this {
        this.validators.push(validator);
        return this;
    }
}
