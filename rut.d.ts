export default class Rut {
    static clean(rut: string): string;
    static validate(rut: string): boolean;
    static getCheckDigit(input: string): string;
}
