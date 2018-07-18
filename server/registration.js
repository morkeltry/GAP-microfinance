const mysql = require('mysql');

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'db_build'
});

conn.connection(function(err){
	if(err) throw err;
	var sql = "INSERT INTO registration (eth_address, phone) VALUE ('"+req.body.eth_address+"','"+req.body.phone+"')";
	conn.query(sql, function(err, result){
		if(err) throw err;
		console,log('1 record inserted');
	});
});