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
    txtFieldIdArr[0] = "tf1_txtFwSrcUserStart,Please enter valid Source From IP Address";
    txtFieldIdArr[1] = "tf1_txtFwSrcUserFinish,Please enter valid Source To IP Address";
    txtFieldIdArr[2] = "tf1_destinationHostStart,Please enter valid Destination From IP Address";
    txtFieldIdArr[3] = "tf1_destinationHostFinish,Please enter valid Destination To IP Address";
    
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 
    
  
    
    if (ipv6Validate('tf1_txtFwSrcUserStart', false, true, '') == false)
       return false;

    if (ipv6Validate('tf1_txtFwSrcUserFinish', false, true, '') == false)
       return false;

    
    if (startEndCompare('tf1_txtFwSrcUserStart','tf1_txtFwSrcUserFinish') == false)
               return false;

   
    
          
    if (ipv6Validate('tf1_destinationHostStart', false, true, '') == false)
       return false;

    if (ipv6Validate('tf1_destinationHostFinish', false, true, '') == false)
       return false;


    
    
    if (startEndCompare('tf1_destinationHostStart','tf1_destinationHostFinish') == false)
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
            
            break;
        case 2:
            fieldStateChangeWr('', '', 'tf1_txtFwSrcUserStart tf1_txtFwSrcUserFinish', '');
            vidualDisplay('tf1_txtFwSrcUserFinish tf1_txtFwSrcUserStart', 'configRow');
            vidualDisplay('break_txtFwSrcUserFinish break_txtFwSrcUserStart', 'break');
            
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
            break;
        case 2:
            fieldStateChangeWr('', '', 'tf1_destinationHostStart tf1_destinationHostFinish', '');
            vidualDisplay('tf1_destinationHostFinish tf1_destinationHostStart', 'configRow');
            vidualDisplay('break_destinationHostFinish break_destinationHostStart', 'break');
            
            break;
        default:
            fieldStateChangeWr('tf1_destinationHostStart tf1_destinationHostFinish', '', '', '');
            vidualDisplay('tf1_destinationHostStart tf1_destinationHostFinish', 'hide');
            vidualDisplay('break_destinationHostStart break_destinationHostFinish', 'hide');
            
            break;
    }
}

