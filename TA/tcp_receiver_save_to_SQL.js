
var net = require("net");
var PORT = 1900;
var mysql  = require('mysql');
var connection = mysql.createConnection({  
	host : 'localhost', 
	user : 'root', 
	password : 'landis', 
	port: '3306',
	database: 'TA'
});
var tcpServer = net.createServer();
var addsql = 'insert into xxx ( data ) values(?)';
tcpServer.on('listening',function(){ 
	console.log('listening port',PORT);
	connection.connect();
	connection.query('show tables', function (error, results) {
		if (error) console.log(error);
		console.log('The solution is: ', results); 
	});
}); 
tcpServer.on('connection', function(socket){ 
	console.log('a new connection:'+ socket.remoteAddress); 
	socket.on('data', function(data){
		data.toString();
		data = data.slice(0,-1);
		socket.write('client ' +socket.remoteAddress +' data '+ data+'\n');
		console.log('client '+socket.remoteAddress+' data '+data+'\n'); 
		var sqlvalues = [data]; 
		connection.query(addsql,sqlvalues,function(error,result){
			if(error) console.log(error);
			console.log(result); 
		}); 
	});
}); 
tcpServer.listen(PORT); 
