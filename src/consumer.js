#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

//1 -> Criando a conexão
amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }

    // 2 -> Criando o canal
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        //3 -> validando a fila
        var queue = 'minha-primeira-fila';
        channel.assertQueue(queue, {
            durable: false
        });

        //4 -> Recebendo e consumindo as menssagens
        console.log(" [*] Mensagens que estão na fila %s para você Zé Aldo", queue);
        channel.consume(queue, function (msg) {
            console.log(" [x] %s", msg.content.toString());
        }, {
            noAck: true
        });

    });
});