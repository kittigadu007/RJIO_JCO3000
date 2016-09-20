/*
 * File: vendorSpecificInformation.js
 * TeamF1 Inc, 2014
 * Created on 22nd Nov 2014 - Bala Krishna G
 */
 
/****
 * validate the form
 * @method pageValidate
 */

function pageValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_vendorOptionCode,Please enter a valid Vendor Option Code";
    txtFieldIdArr[1] = "tf1_vendorOptionInfo,Please enter a valid Vendor Option info";
     
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	  
	  var vendorOptionCode = document.getElementById("tf1_vendorOptionCode");	
    if (numericValueRangeCheck(vendorOptionCode, '', '', 1, 254, true, '', '') == false) 
        return false;
 	  
    return true;
}
