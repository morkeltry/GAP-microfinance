const express = require('express');
const path = require('path');
const { Router } = express;
const router = Router();
const paths = __dirname + '/views/';
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
var nodemailer = require('nodemailer');
var generator = require('generate-password');
const con = require('./database/db_connection');

router.use(session({
	secret: 'somerandonstuffs',
	resave: false,
	saveUninitialized: false,
	cookie: { expires: 600000 }
  }));
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

//whitelist and serve the directory navigated to from this file
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


  // con.query('select * from accepted', function (err, recordset) {
	// 	if (err) throw err;
	// 	else
	// 		res.render('retrieve_loan', { loanList: recordset });
	// });

	var lender_eth_address = req.session.lender_eth_address;
	var lender_name = req.session.lender_name;
	if(lender_eth_address){
		con.query('select * from accepted where lender_eth_address="'+lender_eth_address+'"', function (err, recordset) {
			if (err) throw err;
			else
				res.render('retrieve_loan', { loanList: recordset });
		});
	}
	else{
		res.redirect('/lender_login');
	}
});

router.get("/apply_loan", (req,res) => {
  res.sendFile(paths + "loan-flow-3.html");
});

router.get("/lender_login", (req,res) => {
	res.sendFile(paths + "lender_login.html");
});

router.get("/borrowers_list", (req,res) => {
	var lender_eth_address = req.session.lender_eth_address;
	var lender_name = req.session.lender_name;
	if(lender_eth_address){
		var sql = "SELECT * FROM accepted WHERE lender_eth_address=''";
		con.query(sql, (err, recordset) =>{
			if(err) throw err;
			res.render('borrowers_list', {user_name: lender_name, borrowerList: recordset});
		});
	}
	else{
		res.redirect('/lender_login');
	}
});

router.get("/lender_dashboard", (req,res) => {
	var lender_eth_address = req.session.lender_eth_address;
	var lender_name = req.session.lender_name;
	if(lender_eth_address){
		//res.sendFile(paths + "lender_dashboard.html");
		res.render('lender_dashboard', { user_name: lender_name });
	}
	else{
		res.redirect('/lender_login');
	}
});

router.get("/forgotPassword", (req,res) => {
  res.sendFile(paths + "forgotPassword.html");
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jignasheth407@gmail.com',
    pass: '123456'
  }
});

router.post('/resetPassword', function(req, res, next) {
	con.connect(function(err){
		if(err) throw err;
		else{
			var email_id = req.body.lender_email;
			var sql = "SELECT * FROM lenders WHERE username='"+email_id+"'";
			con.query(sql, function (err2, result){
				if(err2) throw err2;
				else{
					//console.log(result);
					if(result.length > 0){
						var n_password = generator.generate({
							length: 7,
							numbers: true
						});
						//console.log(n_password);
						var mailOptions = {
							from: 'jignasheth407@gmail.com',
							to: result[0].username,
							subject: 'Change password successful!',
							text: 'New password is: "'+n_password+'"'
						};

						transporter.sendMail(mailOptions, function(error, info){
							if (error) {
								console.log(error);
							} else {
								console.log('Email sent: ' + info.response);
							}
						});
						var update_sql = "UPDATE lenders SET password='"+n_password+"' WHERE eth_address='"+result[0].eth_address+"'";
						con.query(update_sql, function (err3, result3) {
							if (err3) throw err3;
							res.redirect('/lender_login');
						});
					}
					else{
						res.redirect('/forgotPassword');
					}
				}
			});
		}
	});
});

router.get("/loans_given", (req,res) => {
	//console.log(req.session.lender_eth_address);
	var lender_eth_address = req.session.lender_eth_address;
	var lender_name = req.session.lender_name;
	if(lender_eth_address){
		con.query('select * from accepted where lender_eth_address="'+lender_eth_address+'"', function (err, recordset) {
			if (err)
				console.log(err)
			else
				res.render('loans_given', { user_name: lender_name, loanGivenList: recordset });
		});
	}
	else{
		res.redirect('/lender_login');
	}
});

router.get("/story", (req,res) => {
	var lender_eth_address = req.session.lender_eth_address;
	var lender_name = req.session.lender_name;
	if(lender_eth_address){
		var id = req.param('a');
		var sql = 'select * from accepted where id="'+id+'"';
		con.query(sql, function (err, recordset) {
			if(recordset.length > 0){
				if (err)
					console.log(err)
				else
					res.render('story', { user_name: lender_name, storyDetails: recordset });
			}
			else{
				res.redirect('/loans_given');
			}
		});
	}
	else{
		res.redirect('/lender_login');
	}
});

router.get("/loan_accept", (req, res) =>{
	var lender_eth_address = req.session.lender_eth_address;
	var lender_name = req.session.lender_name;
	if(lender_eth_address){
		var id = req.param('e');
		var update_sql = "UPDATE accepted SET lender_name='"+lender_name+"', lender_eth_address='"+lender_eth_address+"' WHERE id='"+id+"'";
		con.query(update_sql, function (err3, result3) {
			if (err3) throw err3;
			res.redirect('/loans_given');
		});
	}
	else{
		res.redirect('/lender_login');
	}
});

router.get("/thanks", (req,res) => {
	res.sendFile(paths + "thanks.html");
});

router.get("/logout", (req,res) => {
	req.session.destroy()
	res.redirect('/lender_login');
});

router.post('/apply_loan', function(req, res, next) {
	con.connect(function(err){
		if(err) throw err;
		var sql = "INSERT INTO accepted (repayment_schedule,lender_eth_address,borrower_eth_address,amount,duration,your_story) VALUES ('yearly','Jigna','0xa609653c58c36e5fb905627fad46dd28b112504b','"+req.body.borrower_eth_address+"','"+req.body.amount+"','"+req.body.duration+"','"+req.body.your_story+"')";

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
						//console.log(result);
						req.session.email_id = result[0].username;
						req.session.lender_name = result[0].name;
						//console.log(req.session.email_id);
						req.session.lender_eth_address = result[0].eth_address;
						res.redirect('/lender_dashboard');
					}
					else{
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
					//console.log("table created");
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
