class UsuarioDAO {
    get nomeTabela() { return 'Usuario' }

    constructor(connection) {
        this._connection = connection;
    }

    incluir(usuario, callback) {
        this._connection.query('INSERT INTO Usuario SET ?', usuario, callback);
    }
}