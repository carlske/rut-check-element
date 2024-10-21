import rut from './rut';
import Rut from "./rut";

export  default class RutCheckElement extends  HTMLInputElement{

    static observedAttributes = ["format"];
    static formats: string[] = ["inline","points","inlinePoints","none"]

    format: string = "none"

    constructor() {
        super();
    }

    connectedCallback() {
        this.focus();
        this.addEventListener("keyup",(e)=> {
            this.validateRut()
        });
    }

    attributeChangedCallback(name : string, oldValue : string, newValue : string) {
        console.log(`Attribute ${name} has changed.`);
    }

    validateRut(){
        this.addRutEventListener()
    }

    addRutEventListener(){
        const event: CustomEvent = new CustomEvent('rutCheck', {
            detail: {
                isValidate: Rut.validate(this.value)
            }
        });
        this.dispatchEvent(event);
    }

}

