const ValidationMaster = require('./validations');
const ErrorMessage = require('./errorMessage');

let validador;
let errMes;

function Validate() {
    validador = new ValidationMaster();
    errMes = new ErrorMessage();
}

Validate.prototype.validateUser = async (body) => {
    validador.clear();
    validador.isRequired(body.name, errMes.getMessage("name", "isRequired", "", "pt"));
    validador.isRequired(body.username, errMes.getMessage("username", "isRequired", "", "pt"));
    validador.isRequired(body.email, errMes.getMessage("email", "isRequired", "", "pt"));
    validador.isEmail(body.email, errMes.getMessage("email", "isEmail", "", "pt"));
    return await getResponseValidation();
}

getResponseValidation = async () => {
    if (validador.isValid()) {
        return null;
    } else {
        return validador.errors();
    }
}

module.exports = Validate;