#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

//1 -> Criando a conexão
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }

  // 2 -> Criando o canal
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    //3 -> criando a fila
    var queue = 'minha-primeira-fila';
    var msg = 'Olá seja bem vindo a fila Zé Aldo.';

    channel.assertQueue(queue, {
      durable: false
    });

    //4 -> Enviando mensagem para a fila
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Mensagem envia para a fila :  %s", msg);
  });
});