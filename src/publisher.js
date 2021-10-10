const amqplib = requerie('amqplib/callback_api');

// 1 -> Criando a conexão
amqplib.connect('amqplib://localhost',(erroConexao, conexao) => {
    if(erroConexao){
        throw erroConexao;
    }

    // 2 -> Criando o canal
    conexao.createChannel((erroCanal, canal) => {
        if(erroCanal){
            throw erroCanal;
        }
        
        //3 -> criando a fila
        const fila = 'envioEmail';
        canal.assertQueue(fila);

        //4 -> Enviando mensagem para a fila
        canal.sendToQueue(fila, Buffer.from('Enviando mensagem para a fila.'));
    })
})