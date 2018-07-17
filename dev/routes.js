const express = require('express');
const path = require('path');
const { Router } = express;
const router = Router();
const paths = __dirname + '/views/';

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

router.get("/", (req,res) => {
  res.sendFile(paths + "credit-history.html");
});

router.get("/bording", (req,res) => {
  res.sendFile(paths + "on-bording.html");
});
/* //End 2018-07-17 */
// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found:'+path.join(__dirname, '..',  'html'));
  err.status = 404;
  next(err);
});

module.exports = router;
