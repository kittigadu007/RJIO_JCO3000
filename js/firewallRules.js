/*
 * File: firewallRules.js
 * Created on 17th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Form Validation
 * @method fwRuleValidate
 */
function fwRuleValidate(){
    var txtFieldIdArr = new Array();
  /* added changes for 57315 starts */
    sourceMsg = "";
    destMsg = "";
    var sourceSelValue = comboSelectedValueGet('tf1_addFwSrcUser');
    if(sourceSelValue == "1"){
    sourceMsg = "Please enter valid Source IP Address";
    }
    else if(sourceSelValue == "2"){
    sourceMsg = "Please enter valid Source Start IP Address";
    destMsg = "Please enter valid Source End IP Address";
    }
    txtFieldIdArr[0] = "tf1_txtFwSrcUserStart,"+sourceMsg;
    txtFieldIdArr[1] = "tf1_txtFwSrcUserFinish,"+destMsg;
    var destSelValue = comboSelectedValueGet('tf1_destinationHost');
    if(destSelValue == "1"){
    sourceMsg = "Please enter valid Destination IP Address";
    }
    else if(destSelValue == "2"){
    sourceMsg = "Please enter valid Destination Start IP Address";
    destMsg = "Please enter valid Destination End IP Address";
    }
    /* added changes for 57315 ends */
    txtFieldIdArr[2] = "tf1_destinationHostStart,"+sourceMsg;
    txtFieldIdArr[3] = "tf1_destinationHostFinish,"+destMsg;
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 
    
    if (ipv4Validate('tf1_txtFwSrcUserStart', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_txtFwSrcUserFinish', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipRangeValidate('tf1_txtFwSrcUserStart', 'tf1_txtFwSrcUserFinish') == false) 
        return false;
    
    if (ipv4Validate('tf1_destinationHostStart', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_destinationHostFinish', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipRangeValidate('tf1_destinationHostStart', 'tf1_destinationHostFinish') == false) 
        return false;
    
    return true;
}

/**
 * Manage input fields when select an option from Source Hosts
 * @method dropFieldSelectSrc
 */
function dropFieldSelectSrc(){
    var selValue = comboSelectedValueGet('tf1_addFwSrcUser');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1:
            fieldStateChangeWr('tf1_txtFwSrcUserFinish', '', 'tf1_txtFwSrcUserStart', '');
            vidualDisplay('tf1_txtFwSrcUserFinish', 'hide');
            vidualDisplay('break_txtFwSrcUserFinish', 'hide');
            
            vidualDisplay('tf1_txtFwSrcUserStart', 'configRow');
            vidualDisplay('break_txtFwSrcUserStart', 'break');
            /* added changes for 57315 starts */
            document.getElementById('tf1_lblsourceStart').innerHTML = 'IP Address';
            /* added changes for 57315 ends */
            break;
        case 2:
            fieldStateChangeWr('', '', 'tf1_txtFwSrcUserStart tf1_txtFwSrcUserFinish', '');
            vidualDisplay('tf1_txtFwSrcUserFinish tf1_txtFwSrcUserStart', 'configRow');
            vidualDisplay('break_txtFwSrcUserFinish break_txtFwSrcUserStart', 'break');
            /* added changes for 57315 starts */
            document.getElementById('tf1_lblsourceStart').innerHTML = 'Start IP Address';
            document.getElementById('tf1_lblsourceEnd').innerHTML = 'End IP Address';
            /* added changes for 57315 ends */
            break;
        default:
            fieldStateChangeWr('tf1_txtFwSrcUserStart tf1_txtFwSrcUserFinish', '', '', '');
            vidualDisplay('tf1_txtFwSrcUserStart tf1_txtFwSrcUserFinish', 'hide');
            vidualDisplay('break_txtFwSrcUserStart break_txtFwSrcUserFinish', 'hide');
            
            break;
    }
}

/**
 * Manage input fields when select an option from Destination Hosts
 * @method destinationHostSelect
 */
function destinationHostSelect(){
    var selValue = comboSelectedValueGet('tf1_destinationHost');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1:
            fieldStateChangeWr('tf1_destinationHostFinish', '', 'tf1_destinationHostStart', '');
            vidualDisplay('tf1_destinationHostFinish', 'hide');
            vidualDisplay('break_destinationHostFinish', 'hide');
            
            vidualDisplay('tf1_destinationHostStart', 'configRow');
            vidualDisplay('break_destinationHostStart', 'break');
            /* added changes for 57315 starts */
            document.getElementById('tf1_lblDestStart').innerHTML = 'IP Address';
            /* added changes for 57315 ends */
            break;
        case 2:
            fieldStateChangeWr('', '', 'tf1_destinationHostStart tf1_destinationHostFinish', '');
            vidualDisplay('tf1_destinationHostFinish tf1_destinationHostStart', 'configRow');
            vidualDisplay('break_destinationHostFinish break_destinationHostStart', 'break');
            /* added changes for 57315 starts */
            document.getElementById('tf1_lblDestStart').innerHTML = 'Start IP Address';
            document.getElementById('tf1_lblDestEnd').innerHTML = 'End IP Address';
            /* added changes for 57315 ends */
            break;
        default:
            fieldStateChangeWr('tf1_destinationHostStart tf1_destinationHostFinish', '', '', '');
            vidualDisplay('tf1_destinationHostStart tf1_destinationHostFinish', 'hide');
            vidualDisplay('break_destinationHostStart break_destinationHostFinish', 'hide');
            
            break;
    }
}

