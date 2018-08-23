const uuid = require('uuid/v4');
const joi = require('joi');
const ValidationError = require('../errors/ValidationError');

const schema = joi.object().keys({
    _id: joi.string().length(36).required(),
    _email: joi.string().email({ minDomainAtoms: 2 }).max(60).required(),
    _nome: joi.string().max(60).required(),
    _senha: joi.string().alphanum().max(100).required()
});

class Usuario {
    get id() { return this._id; }
    get email() { return this._email; }
    get nome() { return this._nome; }

    constructor(id, email, nome, senha) {
        this._id = id;
        this._email = email;
        this._nome = nome;
        this._senha = senha;

        if (!id)
            this._id = uuid();
        else
            this._id = id;

        this.validar();

        Object.freeze(this);
    }

    validar() {
        let result = joi.validate(this, schema, { abortEarly: false, stripUnknown: true });
        let messages = '';
        if (result.error) {
            throw new ValidationError(result.error);
        }
    }
}

module.exports = function () {
    return Usuario;
}