pragma solidity ^0.4.8;

contract Owned {
     address public owner;

    modifier only_owner() {
        if (msg.sender == owner) {
            _;
        }
    }

    event OwnerChanged(address oldOwner,address newOwner);

    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address _newOwner) external only_owner {
        address oldOwner = owner;
        owner = _newOwner;
        emit OwnerChanged(oldOwner,_newOwner);
    }
}


contract loans {
    /* Public variables */
    string public standard = 'Non- funds holding';
    string public name = 'Global Abundance Project microfinance loans';        // we will migrate to Qi
    uint32 public day = 24*60*60*1000;
    uint8 public decimals;

    uint32 internal lastLoanIdNo = 0;

    struct loan {
        uint256 startDate;
        uint256 endDate;
        uint16 loanId;
        address lender;
        uint32 amount;
        uint32 amountOutstanding;
        mapping (uint8 => uint32) // (cumulativeDays -> cumulativeAmount)
            repaymentSchedule;
    }

    struct history {
        uint16 loanId;
        mapping (uint8 => uint32) actualRepayments;
    }

    mapping (address => string) public lenderName;
    mapping (address => loan) public offers;
    mapping (address => loan) public loans;
    mapping (address => history) public getHistory;

    // assume money sent to contract is to repay sender's loan,
    // by wrapping makeRepayment().
    function () public {
    bool done;
        done = makeRepayment();
        return done;
    }


    event LoanAccepted (address indexed borrower,
        uint32 indexed loanId, address lender, int16 daysUntilLoanEnd,
        uint256 endDate, uint32 totalAmount);

    event RepaymentMade (address indexed borrower,
        uint32 loanId, int16 daysUntilLoanEnd, uint32 amount);

    event LoanFullyRepaid (address indexed borrower,
        uint32 loanId, int16 daysUntilLoanEnd, uint32 totalAmount);


    // future version will allow admin to whitelist new lenders.
    function newLender ( string name ) public returns (address lender) {
        require (lenderName[msg.sender] == "");
        lenderName[msg.sender] = name;
        return msg.sender;
    }

    function changeLenderName ( string name ) public only_owner returns (bool ok) {
        require (lenderName[msg.sender] != "");
        lenderName[msg.sender] = name;
        return true;
    }

    function offerLoan( address borrower, uint32 amount, uint16 duration, uint256 endDate,
            mapping (uint8 => uint32) repaymentSchedule // (cumulativeDays -> cumulativeAmount)
            ) public payable returns (address lender) {
        require (lenderName[msg.sender] == "");
        require (msg.value>=offer.amount);
        require (loans[borrower].lender=="0x0");

        loan memory offer;
        offer.lender = msg.sender;
        offer.amount = amount;
        offer.endDate = endDate;
        offer.startDate = (duration*day);
        offer.repaymentSchedule = repaymentSchedule;
        offer.loanID = ++lastLoanIdNo;

        offers[borrower] = offer;

    }


    function withdrawOfferedLoan( address borrower ) public returns (bool ok) {
        require (lenderName[msg.sender] == "");
        require (loans[borrower].lender==msg.sender);
        require ();
        require ();

        uint32 amount = offers[borrower].amount;
        offers[borrower] = loan();
        refundMistake( mas.ender, amount);
    }


    function acceptLoan(loan newLoan) public returns (address repaymentAddr) {
        require (loans[msg.sender].lender == "");
        require (offers[msg.sender].lender != "");
        require (offers[msg.sender].endDate - now >= 1*day);

        uint16 memory duration = offers[msg.sender];
        loan memory newLoan = {
            startDate = now;
            endDate = now + duration*day;
            lender = offers[msg.sender].lender;
            amount = offers[msg.sender].amount;
            repaymentSchedule = offers[msg.sender].repaymentSchedule;
            loanId = offers[msg.sender].loanId;
        }
        if offers[msg.sender].endDate < endDate {
            endDate = offers[msg.sender].endDate
        }

        offers[msg.sender] = loan();
        loans[msg.sender] = newLoan;
        msg.sender.transfer(amount);
        // emit placed after tranfer rather than vioce versa, since it is more likely to fail for lack of gas.
        // this opens the possibility a borrower can accept the loan without the event being logged
        // but any fraud will be identifiable as the transactions will still be logged.
        emit LoanAccepted (msg.sender, loanId, lender, duration,  endDate, amount);
    }

    function makeRepayment() public payable returns (bool ok) {
        require (loans[msg.sender].lender != "");
        require (msg.value>0);



    }


    function updateHistory() internal returns (bool ok) {

    }


    function refundMistake( address receiver, uint32 amount ) internal returns (bool ok) {
        receiver.transfer (amount);
        return true;
    }


    function newLender()
    function IdentifyLender() returns address
    function changeLenderName()

    function makeLoan()
    function getLoan() returns loan
    function makeRepayment()

    function getHistory (borrower) returns history


    /* Initializes contract with initial supply tokens to the creator of the contract */
    constructor (
            uint256 initialSupply,
            string tokenName,
            uint8 decimalUnits,
            string tokenSymbol
        ) public  {
            balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
            totalSupply = initialSupply;                        // Update total supply
            name = tokenName;                                   // Set the name for display purposes
            symbol = tokenSymbol;                               // Set the symbol for display purposes
            decimals = decimalUnits;                            // Amount of decimals for display purposes
    }
