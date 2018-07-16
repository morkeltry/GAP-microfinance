
const offerLoans = (req, res) => {
  var someJSON = {data:7};
  var someJstring = JSON.stringify (someJSON);
  res.send(someJstring);
}

const retrieveLoans = (req, res) => {
  var someJSON = {data:7};
  var someJstring = JSON.stringify (someJSON);
  res.send(someJstring);

}

const hasLoanOffer = (req, res) => {
  var someJSON = {data:7};
  var someJstring = JSON.stringify (someJSON);
  res.send(someJstring);

}


module.exports = { offerLoans, retrieveLoans, hasLoanOffer}
