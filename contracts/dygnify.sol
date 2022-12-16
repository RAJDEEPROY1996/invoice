// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract dygnifyInvoice{
    struct invoice{
        string BuyerPAN;
        string SellerPAN;
        uint InvoiceAmount;
        uint InvoiceDate;
    }
  
    invoice[] invoiceList;

    function createInvoice(string memory _buyerPan,string memory _sellerPan, uint _amount) public returns(uint invoiceNo){
        uint len = invoiceList.length;
        invoiceList.push(invoice(_buyerPan,_sellerPan,_amount,block.timestamp));
        return len;
    }

    function showInvoiceDetails(uint invoiceNo) public view returns(invoice memory){
        return invoiceList[invoiceNo];
    }

    function showAllInvoiceDetails() public view returns(uint len,invoice[] memory){
        len = invoiceList.length;
        return (len,invoiceList);    
    }    
}