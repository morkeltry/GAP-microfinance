const express = require('express');
const path = require('path');
const { Router } = express;
const router = Router();
const paths = __dirname + '/views/';
const bodyParser = require('body-parser');
const mysql = require('mysql');
const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'db_build'
});

router.get('/loans', function (req, res) {
	con.query('select * from borrowers', function (err, recordset) {		
		if (err) 
			console.log(err)
		else
			res.render('loan', { loanList: recordset });		
	});
});

const { offerLoans, retrieveLoans, hasLoanOffer} = require ('./loans');
const { registerOffer } = require ('./register-offer');

// whitelist and serve the directory navigated to from this file
router.use( express.static( path.join(__dirname, '..',  'html')));

//router.get('/', (req, res) => res.send('Hello World!'));

router.get ('/sms', ()=>{}); // TODO - Twilio,
router.get ('/offers', offerLoans);
router.get ('/retrieve', retrieveLoans);
router.get ('/hasloanoffer', hasLoanOffer);
router.get ('/registeroffer', registerOffer);

//router.get ('/gap', gap);

router.get("/", (req,res) => {
  res.sendFile(paths + "on-bording.html");
});

router.get("/signup", (req,res) => {
  res.sendFile(paths + "on-bording-2.html");
});

router.get("/info", (req,res) => {
  res.sendFile(paths + "on-bording-3.html");
});

router.get("/loan_offer", (req,res) => {
  res.sendFile(paths + "loan-flow-2.html");
});

router.get("/retrieve_loan", (req,res) => {
  res.sendFile(paths + "loan-flow-1.html");
});

router.get("/apply_loan", (req,res) => {
  res.sendFile(paths + "loan-flow-3.html");
});

router.post('/signup', function(req, res, next) {    
    con.connect(function(err) {
		if (err) throw err;
		console.log("connected");
		var edit_sql = "SELECT * FROM borrowers WHERE eth_address='"+req.body.eth_address+"'";
		con.query(edit_sql, function(err, result){
			if(err) throw err;
			console.log(result.length);
			if(result.length > 0){
				//res.sendFile(paths + "loan-flow-1.html");
				var old_loan = "SELECT * FROM histories WHERE borrower_eth_address='"+req.body.eth_address+"'";
				con.query(old_loan, function(err, result_loan){
					if(err) throw err;
					if(result_loan.length > 0){
						res.redirect('/retrieve_loan');						
					}
					else{
						res.redirect('/loan_offer');						
					}
				});
			}
			else
			{
				var sql = "INSERT INTO borrowers (eth_address,phone_number) VALUES ('"+req.body.eth_address+"','"+req.body.phone+"')";
				con.query(sql, function(err, result)  {
					if(err) throw err;
					console.log("table created");
					res.redirect('/info');
				});					
			}
		});		
	});
	
});

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found:'+path.join(__dirname, '..', 'html'));
  err.status = 404;
  next(err);
});

module.exports = router;
