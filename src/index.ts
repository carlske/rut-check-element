import RutCheckElement  from "./rut-check-elment";

declare global {
    interface Window {
        RutCheckElement: typeof RutCheckElement
    }
}

     window.customElements.define('rut-check', RutCheckElement,{ extends: 'input' })
