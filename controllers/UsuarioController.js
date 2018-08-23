const logger = require('../servicos/logger');

class UsuarioController {
    incluir() {
        let conexao = new this._app.infra.connectionFactory('mysql');

        try {
            let { id, email, senha, nome } = this._req.body;

            const usuario = new this._app.model.Usuario(id, email, senha, nome);

            let usuarioDAO = new this._app.infra.UsuarioDAO(conexao);
            usuarioDAO.incluir(usuario, function (error, results) {
                if (error) {
                    logger.error(error);
                    this._res.status(400).send(error);
                }
                else {
                    this._res.location('/usuario/' + usuario.id);
                    this._res.status(201).json(results);
                }
            }.bind(this));
        }
        catch (e) {
            logger.error(e.message);
            this._res.status(400).send(e.message);
        }
        finally{
            conexao.end();
        }
    }
}