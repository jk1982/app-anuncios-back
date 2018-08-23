class AnuncioDAO {
    get nomeTabela() { return 'Anuncio' }

    constructor(connection) {
        this._connection = new connection.DynamoDB.DocumentClient();
    }

    criaTabela(aws) {
        let dynamoDB = new aws.DynamoDB();

        dynamoDB.describeTable({ TableName: this.nomeTabela },
            function (error, results) {
                if (error) {
                    let tabela = {
                        TableName: this.nomeTabela,
                        ProvisionedThroughput: {
                            ReadCapacityUnits: 1,
                            WriteCapacityUnits: 1
                        },
                        KeySchema: [
                            { AttributeName: "id", KeyType: "HASH" }
                        ],
                        AttributeDefinitions: [
                            { AttributeName: "id", AttributeType: "S" }
                        ]
                    }

                    dynamoDB.createTable(tabela, function (errorCreate, resultsCreate) {
                        if (errorCreate) {
                            throw errorCreate;
                        }
                    });
                }
            }.bind(this));
    }

    incluir(anuncio, callback) {
        let payload = {
            TableName: this.nomeTabela,
            Item: {
                'id': anuncio.id,
                'titulo': anuncio.titulo,
                'descricao': anuncio.descricao,
                'preco': anuncio.preco
            }
        };

        this._connection.put(payload, callback);
    }

    obter(id, callback) {
        let params = {
            TableName: this.nomeTabela,
            Key: {
                'id': id
            }
        }

        this._connection.get(params, callback);
    }
}

module.exports = function () {
    return AnuncioDAO;
};