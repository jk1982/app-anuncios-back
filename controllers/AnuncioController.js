const logger = require('../servicos/logger');

class AnuncioController {  
  constructor(app, req, res) {
    this._app = app;
    this._req = req;
    this._res = res;    
  }

  incluir() {
    try {
      let { id, titulo, descricao, preco } = this._req.body;
      
      const anuncio = new this._app.model.Anuncio(id, titulo, descricao, preco);

      let  conexao = new this._app.infra.connectionFactory('dynamodb');

      let anuncioDAO = new this._app.infra.AnuncioDAO(conexao);
      anuncioDAO.incluir(anuncio, function (error, results) {
        if (error) {
          logger.error(error);
          this._res.status(400).send(error);
        }
        else {
          this._res.location('/anuncio/' + anuncio.id);
          this._res.status(201).json(results);
        }
      }.bind(this));
    }
    catch (e) {
      logger.error(e.message);
      this._res.status(400).send(e.message);
    }
  }

  obter(){
    try {
      let { id } = this._req.params;
  
      let conexao = new this._app.infra.connectionFactory('dynamodb');

      let anuncioDAO = new this._app.infra.AnuncioDAO(conexao);  
      anuncioDAO.obter(id, function (error, results) {
        if (error) {
          logger.info('erro: ' + error);
          this._res.status(400).send(error);
        }
        else {
          this._res.status(201).json(results);
        }
      }.bind(this));
    }
    catch (e) {
      logger.error(e.message);
      this._res.status(400).send(e.message);
    }
  }
}

module.exports = function() {
  return AnuncioController;
}