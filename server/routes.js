const express = require('express');
const path = require('path');
const { Router } = express;
const router = Router();
const paths = __dirname + '/views/';
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const mysql = require('mysql');
const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'db_build'
});

router.use(session({ secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: true }
  }
  )
  );
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
//router.use( express.static( path.join(__dirname, '..',  'html')));
router.use( express.static( path.join(__dirname, '..',  'views')));
//router.use('/css', express.static( path.join(__dirname, '..',  'views/css')));
//router.use('/img', express.static( path.join(__dirname, '..',  'views/img')));
//router.use('/js', express.static( path.join(__dirname, '..',  'views/js')));
//router.use('/fonts', express.static( path.join(__dirname, '..',  'views/fonts')));

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
	con.query('select * from accepted', function (err, recordset) {		
		if (err) throw err;
		else
			res.render('retrieve_loan', { loanList: recordset });		
	});
});

router.get("/apply_loan", (req,res) => {
  res.sendFile(paths + "loan-flow-3.html");
});

router.get("/lender_login", (req,res) => {
	res.sendFile(paths + "lender_login.html");		
});

router.get("/lender_dashboard", (req,res) => {
	res.sendFile(paths + "lender_dashboard.html");
});

router.get("/loans_given", (req,res) => {
	console.log(req.session.lender_eth_address);
	res.sendFile(paths + "loans_given.html");
});

router.get("/story", (req,res) => {
	res.sendFile(paths + "story.html");
});

router.get("/thanks", (req,res) => {
	res.sendFile(paths + "thanks.html");
});

router.post('/apply_loan', function(req, res, next) {
	con.connect(function(err){
		if(err) throw err;
		var sql = "INSERT INTO accepted (repayment_schedule,lender_name,lender_eth_address,borrower_eth_address,amount,duration,your_story) VALUES ('yearly','Jigna','0xa609653c58c36e5fb905627fad46dd28b112504b','"+req.body.borrower_eth_address+"','"+req.body.amount+"','"+req.body.duration+"','"+req.body.your_story+"')";
		con.query(sql, function (err2, result){
			if(err2) throw err2;
			res.redirect('/thanks');
		});
	});
});

router.post('/lender_login', function(req, res, next) {
	con.connect(function(err){
		if(err) throw err;
		else{
			
			var l_email = req.body.lender_name;
			var l_password = req.body.lender_pass;
			var sql = "SELECT * FROM lenders WHERE username='"+l_email+"' and password='"+l_password+"'";
			con.query(sql, function (err2, result){
				if(err2) throw err2;
				else{
					 
					if(result.length > 0){
						console.log(result);
						req.session.email_id = result[0].username;
						console.log(req.session.email_id);
						req.session.lender_eth_address = result[0].eth_address;
						console.log(req.session.lender_eth_address);
						res.redirect('/lender_dashboard');						
					}
					else{
						//req.flash('lender_login', 'invalid username or password');										
						//req.flash('success', 'invalid username or password');
						//res.locals.message = req.flash();
						//res.render('lender_login');
						res.redirect('/lender_login');	
					}						
				}
			});			
		}
	});
});

router.post('/signup', function(req, res, next) {    
    con.connect(function(err) {
		if (err) throw err;
		//console.log("connected");
		var edit_sql = "SELECT * FROM borrowers WHERE eth_address='"+req.body.eth_address+"'";
		con.query(edit_sql, function(err, result){
			if(err) throw err;
			//console.log(result.length);
			if(result.length > 0){
				//res.sendFile(paths + "loan-flow-1.html");
				var old_loan = "SELECT * FROM accepted WHERE borrower_eth_address='"+req.body.eth_address+"'";
				con.query(old_loan, function(err1, result_loan){
					if(err1) throw err1;
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
				con.query(sql, function(err, result){
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
  //var err = new Error('Not Found:'+path.join(__dirname, '..', 'html'));
  //err.status = 404;
  next();
});

module.exports = router;
