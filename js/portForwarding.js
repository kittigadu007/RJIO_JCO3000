/*
 * File: portForwarding.js
 * Created on 17th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
});

/**
 * Form Validation
 * @method dropFieldSelectSrc
 */
function pageValidate(){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtFwSrcUserStart,Please enter a valid Start IP";
    txtFieldIdArr[1] = "tf1_txtFwSrcUserFinish,Please enter a valid End IP";
    txtFieldIdArr[2] = "tf1_txtFwSrcUserDestination,Please enter a valid Destination IP";
    txtFieldIdArr[3] = "tf1_txtinternalPort,Please enter a valid Internal Port";
    txtFieldIdArr[4] = "tf1_portRange,Please enter a valid Internal Port Range";

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
    
    if (ipv4Validate('tf1_txtFwSrcUserDestination', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    var portObj = document.getElementById('tf1_txtinternalPort');
    if (!portObj) 
        return;

    if (!portObj.disabled) {
        if (numericValueRangeCheck(portObj, '', '', 1, 65535, true, '', '') == false) 
            return false;
    }

     var portObj2 = document.getElementById('tf1_portRange');
    if (!portObj2) 
        return;

    if (!portObj2.disabled) {
        if (numericValueRangeCheck(portObj2, '', '', 1, 10, true, '', '') == false) 
            return false;
    }

     var a = $("#tf1_txtinternalPort").val();
     var b = $("#tf1_portRange").val();
     var total = +a + +b ;
     if(total > 65535){
        alert("Internal Port + Internal Port Range should not be greater than 65535");
        return false;    
     } 

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
            vidualDisplay('tf1_txtFwSrcUserStart tf1_txtFwSrcUserFinish', 'configRow');
            vidualDisplay('break_txtFwSrcUserStart break_txtFwSrcUserFinish', 'break');
            break;
        case 0:
            fieldStateChangeWr('tf1_txtFwSrcUserStart tf1_txtFwSrcUserFinish', '', '', '');
            vidualDisplay('tf1_txtFwSrcUserStart tf1_txtFwSrcUserFinish', 'hide');
            vidualDisplay('break_txtFwSrcUserStart break_txtFwSrcUserFinish', 'hide');
            break;
    }
}

/**
 * Manage input fields when select an option from Action
 * @method dropFieldSelectSrcAction
 */
function dropFieldSelectSrcAction(){
    var selValue = comboSelectedValueGet('tf1_selFwAction');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1:
            fieldStateChangeWr('', '', 'tf1_txtFwSrcUserDestination tf1_txtinternalPort', '');
            vidualDisplay('tf1_txtFwSrcUserDestination tf1_txtinternalPort', 'configRow');
            vidualDisplay('break_txtFwSrcUserDestination break_txtinternalPort', 'break');
            break;
        case 2:
            fieldStateChangeWr('tf1_txtFwSrcUserDestination tf1_txtinternalPort', '', '', '');
            vidualDisplay('tf1_txtFwSrcUserDestination tf1_txtinternalPort', 'hide');
            vidualDisplay('break_txtFwSrcUserDestination break_txtinternalPort', 'hide');
            break;
    }
}

/**
 * Manage input fields when select an option from Action
 * @method portTypeChange
 */
function portTypeChange() {
    var selValue = comboSelectedValueGet('tf1_portType');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        
        case 0:
           fieldStateChangeWr('tf1_portRange', '', '', '');
            vidualDisplay('tf1_portRange', 'hide');
            vidualDisplay('break_portRange', 'hide');
            break;
        case 2:
            fieldStateChangeWr('', '', 'tf1_portRange', '');
            vidualDisplay('tf1_portRange', 'configRow');
            vidualDisplay('break_portRange', 'break');
            break;
    }
}
