'use strict'

const msgs = require('./messages.json');

let errorMessage = "";

function ErrorMessage() {
    errorMessage = "";
}

ErrorMessage.prototype.getMessage = (campo, validador, extra, idioma) => {
    idioma = idioma ? idioma : 'pt';

    if (!validador) { return "Invalid validator."; }

    const msgsValidador = msgs[validador];

    if (!msgsValidador) { return "Invalid validator"; }

    errorMessage = msgsValidador[idioma].message;

    if (campo) { errorMessage = errorMessage.replace("{campo}", campo); }
    if (extra) { errorMessage = errorMessage.replace("{extra}", extra); }

    return errorMessage;
}

module.exports = ErrorMessage;