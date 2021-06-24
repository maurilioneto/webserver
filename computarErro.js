const { ValidationError } = require("sequelize");
const config = require('./config.json');

var computarErro = (e) => {
    if (e instanceof ValidationError) {
        let message = '';
        e.errors.forEach((error) => {
            switch (error.validatorKey) {
                case 'isEmail':
                    message += '"'+error.path +'" deve ser um e-mail válido!';
                    message += '\r\n';
                    break;
                case 'isDate':
                    message += '"'+error.path +'" deve ser uma data válida!';
                    message += '\r\n';
                    break;
                case 'len':
                    if (error.validatorArgs[0] === error.validatorArgs[1]) {
                        message += '"'+error.path +'" deve ter ' + error.validatorArgs[0] + ' caracteres!';
                    } else {
                        message += '"'+error.path +'" deve ter entre '+ error.validatorArgs[0] + ' e ' + error.validatorArgs[1] + ' caracteres!';
                    }
                    message += '\r\n';
                    break;
                case 'min':
                    message += '"'+error.path + '" deve ser maior ou igual a ' + error.validatorArgs[0] + '!';
                    message += '\r\n';
                    break;
                case 'max':
                    message += '"'+error.path + '" deve ser menor ou igual a ' + error.validatorArgs[0] + '!';
                    message += '\r\n';
                    break;
                case 'isInt':
                    message += '"'+error.path + '" deve ser um número inteiro!';
                    message += '\r\n';
                    break;
                case 'is_null':
                    message += '"'+error.path + '" deve ser informado!';
                    message += '\r\n';
                    break;
                case 'not_unique':
                    message += error.value + ' já está sendo utilizado, deve ser único!';
                    message += '\r\n';
                    break;
                case 'notEmpty':
                    message += error.path + ' não pode ser vazio!';
                    message += '\r\n';
                    break;
                default: 
                    config.DEBUG && console.log(error);
            }
        });
        return message ? message : "Erro ao requisitar operação!";
    }
    return e; //fazer nada
}

module.exports = computarErro;