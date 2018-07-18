const borrowerEthAddr = '0xa609653c58c36e5fb905627fad46dd28b112504b';
const contractAddr = '0xa609653c58c36e5fb905627fad46dd28b112504b'; // use env2 to set this as app constant - '0x12345' is fine
var nonce = 1234;

const tx = {
  from: borrowerEthAddr,
  to: contractAddr,
  gasPrice: "9000000000",
  gas: "85000",
  data: ""
};

const offerLoans = (req, res) => {
  nonce++;
  const jsonResponse = {tx, nonce};
  const jString = JSON.stringify (jsonResponse);
  res.send (jString);
}

const retrieveLoans = (req, res) => {
  const jsonResponse = [
    {date : '15/3/18', amount : 150 },
    {date : '15/4/18', amount : 500 },
    {date : '1/8/18', amount : 75 },
    {date : '15/9/18', amount : 100 },
    {date : '15/10/18', amount : 1750 },
    {date : '1/11/18', amount : 75 },
  ]
  const jString = JSON.stringify (jsonResponse);
  res.send (jString);

}

const hasLoanOffer = (req, res) => {
  const jsonResponse = {
    borrowerEthAddr,
    lenderName : "Global Abundance Project",
    amount : 1125,
    duration : 28,
    tx
  };
  const jString = JSON.stringify (jsonResponse);
  res.send (jString);
}

module.exports = { offerLoans, retrieveLoans, hasLoanOffer}
