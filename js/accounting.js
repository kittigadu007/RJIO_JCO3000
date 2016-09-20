/*
 * File: accounting.js
 * Created on 8th August  2013 - Bala krishna G
 * Copyright (c) 2013 TeamF1, Inc.
 * All rights reserved.
 */
jQuery(function(){
   accountTypeCheck();
   onloadCall();
});
 

/**
 * Form Validation
 * @method pageValidate
 * @param frmId - Form field id
 */
function pageValidate(frmId){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_ipAddress,Please enter a valid IP Address";
    txtFieldIdArr[1] = "tf1_macAddress,Please enter a valid MAC Address";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
		
	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;
		
	if (ipv4Validate('tf1_ipAddress', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
			return false;
		
	 macObj = document.getElementById('tf1_macAddress');
	 if (macObj && !macObj.disabled) {
		if (!(macAddrValidate(macObj.value, true, "", '', macObj))) {
			macObj.focus();
			return false;
		}
	 }
    setHiddenChks(frmId);
    return true;
}


function accountingOnReset(frmId) {
	resetImgOnOff(frmId);
	
}


/****
 * This function is used to change IP Mode
 * OnChange validation
 * @method remoteMgmtAccessTypeCheck
 */
function accountTypeCheck(){
    var selValue = comboSelectedValueGet("tf1_accountType");
    if (!selValue) return;    
    switch (parseInt(selValue, 10)) {
        case 1:
            fieldStateChangeWr("tf1_macAddress", "", "tf1_ipAddress", "");
            vidualDisplay('tf1_macAddress', 'hide');
            vidualDisplay('break_macAddress', 'hide');
			
			vidualDisplay('tf1_ipAddress', 'configRow');
            vidualDisplay('break_ipAddress', 'break'); 
            break;
        case 2:
            fieldStateChangeWr("tf1_ipAddress", "", "tf1_macAddress", "");
            vidualDisplay('tf1_ipAddress', 'hide');
            vidualDisplay('break_ipAddress', 'hide');
                
           vidualDisplay('tf1_macAddress', 'configRow');
            vidualDisplay('break_macAddress', 'break'); 
            break;
    	}
}

