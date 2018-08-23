module.exports = function(app){
    app.post('/usuario', function(req, res){
        new app.controllers.UsuarioController(app, req, res).incluir();
    });
        
    app.get('/usuario/:id', function(req, res){

    });
    
    app.put('/usuario', function(req, res){

    });
    
    app.delete('/usuario/:id', function(req, res){

    });
}