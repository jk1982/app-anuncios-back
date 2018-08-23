const mysql = require('mysql');
const aws = require('aws-sdk');

function createDBConnection(banco) {

    if (banco === 'mysql') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'soeusei',
            database: 'vrobots_mdp'
        });
    }
    else if (banco == 'dynamodb') {                
        aws.config.update({
            region: 'us-east1',
            endpoint: 'http://localhost:8000'
        });
        
        return aws;
    }
}

module.exports = function () {
    return createDBConnection;
}