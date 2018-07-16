const express = require('express');
const path = require('path');
const { Router } = express;
const router = Router();

const { offerLoans, retrieveLoans, hasLoanOffer} = require ('./loans');
const { registerOffer } = require ('./register-offer');

// whitelist and serve the directory navigated to from this file
router.use( express.static( path.join(__dirname, '..',  'html')));

router.get('/', (req, res) => res.send('Hello World!'));

router.get ('/sms', ()=>{}); // TODO - Twilio,
router.get ('/offers', offerLoans);
router.get ('/retrieve', retrieveLoans);
router.get ('/hasloanoffer', hasLoanOffer);
router.get ('/registeroffer', registerOffer);





// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found:'+path.join(__dirname, '..',  'html'));
  err.status = 404;
  next(err);
});

module.exports = router;
