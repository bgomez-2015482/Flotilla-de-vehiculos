'use strict'

const mysql = require ('mysql');
const { promisify } = require('util')

const { database } = require('./keys');
const { purge } = require('./routes');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE WAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED')
        }
    }
    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

//PROMISIFY POOL QUERY

pool.query = promisify(pool.query);

module.exports = pool;

/*
var port = 3306;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DBFlotilla',
    port: 3306
});

connection.connect(function(err){

    if(err){
        console.error('Error de conexion: ' + err.stack);
        return;
    }else{
        console.log('Conexión a la base de datos correcta en el puerto:', port);
    }
});
connection.end();
*/
