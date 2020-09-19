
var PORT = 1900;
var net = require("net");

var tcpServer = net.createServer();

tcpServer.on('listening',function(){ 
	console.log('listening port',PORT);
}); 
tcpServer.on('connection', function(socket){ 
	console.log('a new connection:'+ socket.remoteAddress); 
	socket.on('data', function(data){
		socket.write('client ' +socket.remoteAddress +' data '+ data+'\n');
		console.log('client '+socket.remoteAddress+' data '+data+'\n') 
	});
}); 
tcpServer.listen(PORT); 

