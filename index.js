'use strict';

class Rut {
    static clean(rut) {
        return typeof rut === 'string'
            ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
            : '';
    }
    static validate(rut) {
        if (typeof rut !== 'string') {
            return false;
        }
        if (!/^([1-9]\d{0,2}(\.?\d{3})*)-?[\dkK]$/.test(rut)) {
            return false;
        }
        rut = this.clean(rut);
        let t = parseInt(rut.slice(0, -1), 10);
        let m = 0;
        let s = 1;
        while (t > 0) {
            s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
            t = Math.floor(t / 10);
        }
        const v = s > 0 ? '' + (s - 1) : 'K';
        return v === rut.slice(-1);
    }
    static getCheckDigit(input) {
        const rut = Array.from(this.clean(input), Number);
        if (rut.length === 0 || rut.includes(NaN)) {
            throw new Error(`"${input}" as RUT is invalid`);
        }
        const modulus = 11;
        const initialValue = 0;
        const sumResult = rut
            .reverse()
            .reduce((accumulator, currentValue, index) => accumulator + currentValue * ((index % 6) + 2), initialValue);
        const checkDigit = modulus - (sumResult % modulus);
        if (checkDigit === 10) {
            return 'K';
        }
        else if (checkDigit === 11) {
            return '0';
        }
        else {
            return checkDigit.toString();
        }
    }
}

class RutCheckElement extends HTMLInputElement {
    constructor() {
        super();
        this.format = "none";
    }
    connectedCallback() {
        this.focus();
        this.addEventListener("keyup", (e) => {
            this.validateRut();
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }
    validateRut() {
        this.addRutEventListener();
    }
    addRutEventListener() {
        const event = new CustomEvent('rutCheck', {
            detail: {
                isValidate: Rut.validate(this.value)
            }
        });
        this.dispatchEvent(event);
    }
}
RutCheckElement.observedAttributes = ["format"];
RutCheckElement.formats = ["inline", "points", "inlinePoints", "none"];

window.customElements.define('rut-check', RutCheckElement, { extends: 'input' });
