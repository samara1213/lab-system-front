/**
     * Funcion que se encarga de validar cuando un moddal esta abirto si se pica fuera de el
     * o si se oorime la tecla escape
     * @param {*} reason 
     * @returns 
*/
export const ValidateCloseModal = (reason) => (reason !== 'backdropClick' && reason !== 'escapeKeyDown');