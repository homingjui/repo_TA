
var net = require("net");
var PORT = 1900;


var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'landis',
  port: '3306',
  database: 'TA'
});


var tcpServer = net.createServer();

var addsql = 'insert into test(data) values(?)';
var getsql = 'select * from led';

tcpServer.on('listening',function(){
        console.log('listening port',PORT);

	connection.connect();

	connection.query('show tables', function (error, results) {
  		if (error) console.log(error);
  		console.log('The solution is: ', results);
	});
	connection.query(getsql,function(err,result,fields){
                        if(err) throw err;
                        console.log(result[0].state);
	});

});


tcpServer.on('connection', function(socket){
	console.log('a new connection:'+ socket.remoteAddress);

        socket.on('data', function(data){

		data.toString();
		data = data.slice(0,-1);
		
        	console.log('client '+socket.remoteAddress+' data '+data+'\n');
		var sqlvalues = [data];
		var send ='client '+socket.remoteAddress+' data '+data+'\n';
		connection.query(addsql,sqlvalues,function(error,result){
			if(error) console.log(error);
			console.log(result);
		});
		connection.query(getsql,function(err,result,fields){
                        if(err) throw err;
			console.log(result);
			socket.write(send+result[0].state.toString());
		});
	});

});

tcpServer.listen(PORT);
