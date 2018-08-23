module.exports = function (app) {
    app.post('/anuncio', function (req, res) {
        new app.controllers.AnuncioController(app, req, res).incluir();
    });

    app.get('/anuncio/:id', function (req, res) {
        new app.controllers.AnuncioController(app, req, res).obter();
    });

    app.put('/anuncio', function(req, res){

    });

    app.delete('/anuncio/:id', function (req, res) {
        
    });
};