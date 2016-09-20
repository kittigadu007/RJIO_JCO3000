/*
 * File: accessPointsMacFilter.js
 * Created on 18th Jan 2013 - Lakshmi
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
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
    
    macObj = document.getElementById('txtMacAddr');
    if (!(macAddrValidate(macObj.value, true, "", '', macObj))) {
        macObj.focus();
        return false;
    }
    return true;
}
