
const registerOffer = (req, res) => {
  var someJSON = {data:7};
  var someJstring = JSON.stringify (someJSON);
  res.send(someJstring)
}

 module.exports = { registerOffer }
