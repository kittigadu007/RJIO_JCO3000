/*
 * File: macFiltering.js
 * Created on 3rd Jan 2013 - Bala krishna G
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls when user clicks on submit button.
 * OnSubmit validation
 * @method fwMACFilteringConfigValidate
 */
function pageValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "txtMacAddr, Please enter valid MAC Address";
    txtFieldIdArr[1] = "txtDescription, Please enter valid Description";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) {
        return false;
    }

	var txtFieldIdArr1 = new Array();
    txtFieldIdArr1[0] = "txtMacAddr, Please enter valid MAC Address";
	if (isProblemCharArrayCheck(txtFieldIdArr1, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

    macObj = document.getElementById('txtMacAddr');
    if (!(macAddrValidate(macObj.value, true, "", '', macObj))) {
        macObj.focus();
        return false;
    }
    return true;
}

