/*
 * File: customServices.js
 * Created on 4th Jan 2013 - Lakshmi
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
 * @method vapConfigValidate
 */
function serviceAddFormValidate(){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtAddCustServName,Please enter a valid service name";
    txtFieldIdArr[1] = "tf1_txtAddCustServIcmpType,Please enter ICMP Type";
    txtFieldIdArr[2] = "tf1_txtAddCustServStartPort,Please enter a valid start Port number";
	txtFieldIdArr[3] = "tf1_txtAddCustServPorts, Please enter at least one port value";
    
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	
	 /* added check for not allowing space as first character starts */
    var nameObj = document.getElementById('tf1_txtAddCustServName');
    if ( nameObj.value.charAt(0) == ' ' )
    {
         alert("Name cannot start with space character");
         nameObj.focus();
         return false;
    }
    /* added check for not allowing space as first character ends */
    var txtFieldIdArrName = new Array();
    txtFieldIdArrName[0] = "tf1_txtAddCustServName,Please enter a valid service name";
     /* added to condition to prevent semicolon & pipe characters */
    if (isProblemCharArrayCheck(txtFieldIdArrName, "'\";|", "Following characters are not supported for this field:\r\ndouble quote( \" ), single quote( \' ), Pipe ( | ), Semi-Colon ( ; )") == false) 
        return false;
    /* added below condition to allow space for host name for the SPR-48304 additional comments */
    
    var txtFieldIdArrServices = new Array();
    txtFieldIdArrServices[0] = "tf1_txtAddCustServIcmpType,Please enter ICMP Type";
    txtFieldIdArrServices[1] = "tf1_txtAddCustServStartPort,Please enter a valid start Port number";
    txtFieldIdArrServices[2] = "tf1_txtAddCustServPorts, Please enter at least one port value";
    txtFieldIdArrServices[3] = "tf1_txtAddCustServEndPort, Please enter a valid end Port number";

    if (isProblemCharArrayCheck(txtFieldIdArrServices, "'\" ", NOT_SUPPORTED) == false) 
        return false;

    if (icmpTypeRangeCheck() == false) 
        return false;
    
    var obj = null;
    var obj = document.getElementById('tf1_txtAddCustServStartPort');
	
    if (!obj.disabled) {			
        if (numericValueRangeCheck(obj, '', '', 1, 65535, true, '', '') == false) 
            return false;
        var startPort = obj.value;
    }
    
    var obj = document.getElementById('tf1_txtAddCustServEndPort');
   if (!obj.disabled && obj.value != ''){
        if (numericValueRangeCheck(obj, '', '', 1, 65535, true, '', '') == false) 
            return false;
        if (parseInt(obj.value, 10) < parseInt(startPort, 10)) {
            var errStr = "Invalid range of ports. end service port (" + obj.value + ") should be greater than start service port (" + startPort + ")";
            alert(errStr);
            return false;
        }
    }
    if (multiPortsValuesCheck() == false) 
        return false;
    return true;
}

/**
 * Range check of ICMP Type
 * @method icmpTypeRangeCheck
 */
function icmpTypeRangeCheck(){
    var obj = document.getElementById('tf1_txtAddCustServIcmpType');
    var selectedValue = comboSelectedValueGet('tf1_selTwKeyServiceProtoType');
    if (parseInt(selectedValue, 10) == 1) 
        return numericValueRangeCheck(obj, '', '', 0, 40, true, '', '');
    else 
        if (parseInt(selectedValue, 10) == 58) 
            return numericValueRangeCheck(obj, '', '', 1, 255, true, '', '');
    return true;
}

/**
 * Manage input fields when select an option from Type
 * @method checkServiceType
 */
function checkServiceType(){
    var selectedValue = comboSelectedValueGet('tf1_selTwKeyServiceProtoType');
    if (!selectedValue) 
        return;
    switch (parseInt(selectedValue, 10)) {
        case 1: /* ICMP */
            fieldStateChangeWr('tf1_selTwKeyServicePortType tf1_txtAddCustServStartPort tf1_txtAddCustServEndPort tf1_txtAddCustServPorts', '', 'tf1_txtAddCustServIcmpType', '');
            vidualDisplay('tf1_selTwKeyServicePortType tf1_txtAddCustServStartPort tf1_txtAddCustServEndPort tf1_txtAddCustServPorts', 'hide');
            vidualDisplay('break_selTwKeyServicePortType break_txtAddCustServStartPort break_txtAddCustServEndPort break_txtAddCustServPorts', 'hide');
            
            vidualDisplay('tf1_txtAddCustServIcmpType', 'configRow');
            vidualDisplay('break_txtAddCustServIcmpType', 'break');
            break;
        default: /* TCP | UDP */
            fieldStateChangeWr('tf1_txtAddCustServIcmpType', '', 'tf1_selTwKeyServicePortType', '');
            vidualDisplay('tf1_txtAddCustServIcmpType', 'hide');
            vidualDisplay('break_txtAddCustServIcmpType', 'hide');
            vidualDisplay('tf1_selTwKeyServicePortType', 'configRow');
            vidualDisplay('break_selTwKeyServicePortType', 'break');
            vidualDisplay('', '');
            break;
    }
    checkServicePortType()
}

/**
 * Manage input fields when select an option from Port Type
 * @method checkServicePortType
 */
function checkServicePortType(){
    var selPortTypeValue = comboSelectedValueGet('tf1_selTwKeyServicePortType');
    if (!selPortTypeValue) 
        return;
    switch (parseInt(selPortTypeValue, 10)) {
        case 2: /* MultiPorts */
            fieldStateChangeWr('tf1_txtAddCustServStartPort tf1_txtAddCustServEndPort tf1_txtAddCustServIcmpType', '', 'tf1_txtAddCustServPorts', '');
            vidualDisplay('tf1_txtAddCustServStartPort tf1_txtAddCustServEndPort tf1_txtAddCustServIcmpType', 'hide');
            vidualDisplay('break_txtAddCustServStartPort break_txtAddCustServEndPort break_txtAddCustServIcmpType', 'hide');
            
            vidualDisplay('tf1_txtAddCustServPorts', 'configRow');
            vidualDisplay('break_txtAddCustServPorts', 'break');
            break;
        case 1: /* Port Range */
            fieldStateChangeWr('tf1_txtAddCustServIcmpType tf1_txtAddCustServPorts', '', 'tf1_txtAddCustServStartPort tf1_txtAddCustServEndPort', '');
            vidualDisplay('tf1_txtAddCustServIcmpType tf1_txtAddCustServPorts', 'hide');
            vidualDisplay('break_txtAddCustServIcmpType break_txtAddCustServPorts', 'hide');
            
            vidualDisplay('tf1_txtAddCustServStartPort tf1_txtAddCustServEndPort', 'configRow');
            vidualDisplay('break_txtAddCustServStartPort break_txtAddCustServEndPort', 'break');
            break;
    }
}

/**
 * Manage Multiple Ports
 * @method multiPortsValuesCheck
 */
function multiPortsValuesCheck(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtAddCustServPorts, Please enter at least one port value";
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
    
    var obj = document.getElementById('tf1_txtAddCustServPorts');
    var multiPortVal = document.getElementById('tf1_txtAddCustServPorts').value;
    var strArr = multiPortVal.split(",");
    var minVal = 1;
    var maxVal = 65535;
    if (strArr.length == 1 && strArr.length != 0) {
        if (numericValueRangeCheck(document.getElementById('tf1_txtAddCustServPorts'), '', '', 1, 65535, true, '', '') == false) 
            return false;
    }
    else {
        if (strArr.length > 1) {        	
        	if (strArr.length > 8) {
    	 
    	 		alert("Maximum 8 ports are allowed.");
    	 		obj.focus();
    	 		return false;    	 
    	 	}        	
            var j = 0;
            for (var i = 0; i < strArr.length; ++i) {
                j = j + 1
                var value = parseInt(strArr[i], 10);
                if ((value < minVal) || (value > maxVal)) {
                    alert('Please enter a value between' + ' ' + minVal + ' - ' + maxVal + ' at position ' + j);
                    obj.focus();
                    return false;
                    break;
                }
            }
        }
    }
    return true;
}
