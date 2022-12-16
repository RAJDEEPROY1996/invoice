const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');

const privateKey = "cc8bf997fdfa40e7a3b6464d8c2fbf68382aec0bdd6a4d02a33a9c6478b0284a";
const acc = "0xf5537a1b9bf7672f55cf12ef1abd3b072223e453";
const CAddress = "0xC199FfA555327bD5d8c187071bBeE1a3e10083B1";

let web3;
let accounts;
let Owner;
let instance;


const Connect = async() => {
  const provider = new HDWalletProvider(privateKey,`https://data-seed-prebsc-2-s1.binance.org:8545/`);
  web3 = new Web3(provider);
  let abi = [{"inputs":[{"internalType":"string","name":"_buyerPan","type":"string"},{"internalType":"string","name":"_sellerPan","type":"string"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"createInvoice","outputs":[{"internalType":"uint256","name":"invoiceNo","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"showAllInvoiceDetails","outputs":[{"internalType":"uint256","name":"len","type":"uint256"},{"components":[{"internalType":"string","name":"BuyerPAN","type":"string"},{"internalType":"string","name":"SellerPAN","type":"string"},{"internalType":"uint256","name":"InvoiceAmount","type":"uint256"},{"internalType":"uint256","name":"InvoiceDate","type":"uint256"}],"internalType":"struct dygnifyInvoice.invoice[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"invoiceNo","type":"uint256"}],"name":"showInvoiceDetails","outputs":[{"components":[{"internalType":"string","name":"BuyerPAN","type":"string"},{"internalType":"string","name":"SellerPAN","type":"string"},{"internalType":"uint256","name":"InvoiceAmount","type":"uint256"},{"internalType":"uint256","name":"InvoiceDate","type":"uint256"}],"internalType":"struct dygnifyInvoice.invoice","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}];
  instance = new web3.eth.Contract(
    abi,
    CAddress,
  );
  accounts = await web3.eth.getAccounts()
  Owner = accounts[0];
  console.log(Owner);
}


const createInvoice = async(buyer,seller,amount) => {
  
  accounts = await web3.eth.getAccounts()
  await instance.methods.createInvoice(buyer,seller,amount).send({
    from: accounts[0]
  })
  .then((len)=>{
    console.log("---------------------------");
    console.log("Invoice NO is ",len);
    console.log("---------------------------");
  });  
}

const showInvoiceDetails = async(invoiceNO) => {
  accounts = await web3.eth.getAccounts()
  //Owner
  await instance.methods.showInvoiceDetails(invoiceNO).call()
  .then(message =>{    
    console.log("buyersPan---------------------------",message.BuyerPAN);
    console.log("sellerPan---------------------------",message.SellerPAN);
    console.log("Amount---------------------------",message.InvoiceAmount);
    console.log("Date---------------------------",message.InvoiceDate);
  }).catch(()=>{
    console.log("Provide correct Invoice NO")
  })  
}

const showAllInvoiceDetails = async(buyerPan) => {
    accounts = await web3.eth.getAccounts()
    //Owner
    let a = []
    await instance.methods.showAllInvoiceDetails().call()
    .then(message =>{    
        console.log("buyersPan---------------------------",message.len);
        
        for(i=0;i<message.len;i++){          
            if(message[1][i].BuyerPAN ==buyerPan){
                a.push(message[1][i]);
            }
        }
        console.log("buyerPan Details",a);
    });  
  }



Connect();                                             //Connect to the Blockchain
//createInvoice("abcdefgh","rajpr4875g",50000);       //Smart contract should be able to store invoice data 
showInvoiceDetails(4);                              //smart contract should be able to capture payment status of particular invoice by providing invoice NO.
//showAllInvoiceDetails("abcdefgh");                    //Input buyer pan, it will fetch all the details   




