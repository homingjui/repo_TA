
var net = require("net");
var PORT = 1902;
var mysql  = require('mysql');
var connection = mysql.createConnection({  
	host : 'localhost', 
	user : 'root', 
	password : 'landis', 
	port: '3306',
	database: 'TA'
});
var tcpServer = net.createServer(function(socket){
	socket.on('error', function(err){
	console.log('Caught flash policy server socket error:');
	console.log(err.stack);
	console.log('\n');
  	});
});
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
		console.log('new data:'+data); 
		var sqlvalues = [parseFloat(data)]; 
		connection.query(addsql,sqlvalues,function(error,result){
			if(error) console.log(error); 
		}); 
	});
}); 
tcpServer.listen(PORT); 
