# Global Abundance Project microfinance

[![Join the chat at https://gitter.im/GAP-microfinance/Lobby](https://badges.gitter.im/GAP-microfinance/Lobby.svg)](https://gitter.im/GAP-microfinance/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The Global Abundance Project aims to facilitate microfinance loans in developing countries using a simple platform with funds distributed in ERC20 tokens and with each borrower's loan and repayment history stored in a smart contract.
As soon as is practicable, we will use the [Qi Currency](http://fintechworldwide.blogspot.com/2018/06/blockchain-capital-women-and.html) as the token in which funds are transferred.

### Stack:
Node.js & PostgreSQL backend,

Ropsten testnet for running smart contracts in Solidity

Twilio and ngrok to integrate with IDbox

### Flow overview:
#### Loan receiver pages (mobile first, responsive down to 320x240):
* registers with IDbox blockchain separately, and associates phone number with fingerprint.
* sets up Ethereum account using MetaMask separately.
* User lands on page with no Ethereum account set up -> Welcome / info page with instructions
* User lands on page with Ethereum account set up but no loans outstanding -> Displays credit rating and available loans 
* User lands on page with Ethereum account set up and loans outstanding -> Displays credit rating, loan due date, loan payment information (ethereum address)
* User pays off part of loan -> Page updates with thankyou AND
* if the whole loan paid off, redirects to Thankyou page, with credit rating and message about credit rating.

[ONBOARDING FLOW](https://raw.githubusercontent.com/morkeltry/GAP-microfinance/master/onboarding.png | width=600)

[LOANS FLOW](https://raw.githubusercontent.com/morkeltry/GAP-microfinance/master/loans.png | width=600)

#### Lender portal (responsive for desktop / modern mobile):

##### Login page
* Login
##### Console page features
* Display/ Update incoming payments address; 
* Display/ Update minimum and maximum loan amounts
* Display/ Update preferrred loan amount
* Display/ Update minimum and maximum loan duration
* Display/ Update preferred loan duration

