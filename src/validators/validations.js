'use strict'

let erros;

function ValidationMaster() {
    erros = [];
}

ValidationMaster.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
    {
        erros.push({ message });
    }
}

ValidationMaster.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
    {
        erros.push({ message });
    }
}

ValidationMaster.prototype.errors = () => {
    return erros ? erros.map(e => e.message) : [];
}

ValidationMaster.prototype.clear = () => {
    erros = [];
}

ValidationMaster.prototype.isValid = () => {
    return erros.length == 0;
}

module.exports = ValidationMaster;