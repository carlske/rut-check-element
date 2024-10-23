import RutCheckElement from "./rut-check-elment";
declare global {
    interface Window {
        RutCheckElement: typeof RutCheckElement;
    }
}
