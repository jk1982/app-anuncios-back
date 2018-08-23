const uuid = require('uuid/v4');
const joi = require('joi');
const ValidationError = require('../errors/ValidationError');

const schema = joi.object().keys({
    _id: joi.string().length(36).required(),
    _titulo: joi.string().min(10).max(100).required(),
    _descricao: joi.string().max(5000),
    _preco: joi.number().precision(2).min(1).required()
});

class Anuncio {
    get id() { return this._id; }
    get titulo() { return this._titulo; }
    get preco() { return this._preco; }
    get descricao() { return this._descricao; }

    constructor(id, titulo, descricao, preco) {
        this._titulo = titulo;
        this._descricao = descricao;
        this._preco = preco;

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
    return Anuncio;
}