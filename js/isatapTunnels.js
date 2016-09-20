/*
 * File: isatapTunnelConfig.js
 * Created on 3rd Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    localEndPointCheck();
});

/**
 * Form Validation
 * @method tunnelValidate
 */
function tunnelValidate(){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtPrefixLen,Please enter a valid IPv6 Address.";
    txtFieldIdArr[1] = "tf1_txtIpAddr,Please enter a valid IPv4 Address";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

    if (ipv6Validate('tf1_txtPrefixLen', false, true, '') == false) 
        return false;
    
    if (ipv4Validate('tf1_txtIpAddr', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    var ipaddrObj = document.getElementById('tf1_txtIpAddr');
    if (ipaddrObj && !ipaddrObj.disabled) {
        if (ipaddrObj.value == "0.0.0.0") {
            alert("Invalid IP address");
            return false;
        }
    }
    return true;
}

/**
 * Manage input fields when select an option from Local End Point Address
 * @method localEndPointCheck
 */
function localEndPointCheck(){
    var selValue = comboSelectedValueGet('tf1_selEndPointType');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 0: /*Other IPv4 Address */
            fieldStateChangeWr('', '', 'tf1_txtIpAddr', '');
            vidualDisplay('tf1_txtIpAddr', 'configRow');
            break;
        case 1: /* LAN   */
        default:
            fieldStateChangeWr('tf1_txtIpAddr', '', '', '');
            vidualDisplay('tf1_txtIpAddr', 'hide');
            break;
    }
}
