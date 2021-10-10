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
        
        //3 -> validando a fila
        const fila = 'envioEmail';
        canal.assertQueue(fila);

        //4 -> Recebendo as menssagens
        canal.consume(fila, (msg) => {
            console.log('Menssagem recebida: ' + msg.content.toString());
        },{ noAck: true});
    })
})