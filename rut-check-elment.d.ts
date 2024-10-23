export default class RutCheckElement extends HTMLInputElement {
    static observedAttributes: string[];
    static formats: string[];
    format: string;
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    validateRut(): void;
    addRutEventListener(): void;
}
