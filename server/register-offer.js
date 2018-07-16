
const registerOffer = (req, res) => {
  const someJSON = {
    id : 78643589,
    startDate : '1/3/18',
    endDate : '1/11/18',
    duration : 245,
    repaymentSchedule : [
      {date : '15/3/18', amount : 150 },
      {date : '15/4/18', amount : 500 },
      {date : '1/8/18', amount : 75 },
      {date : '15/9/18', amount : 100 },
      {date : '15/10/18', amount : 1750 },
      {date : '1/11/18', amount : 75 }
    ],
    lenderName : 'Global Abundance Project',
    lenderEthAddr : '0xa609653c58c36e5fb905627fad46dd28b112504b',
    BorrowerEthAddr : '0xa609653c58c36e5fb905627fad46dd28b112504b'
  }
  const someJstring = JSON.stringify (someJSON);
  res.send(someJstring)
}

 module.exports = { registerOffer }
