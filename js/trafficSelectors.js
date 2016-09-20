
function trafficSelectorsPageValidate ()  {
    var txtFieldIdArr = new Array ();    
    txtFieldIdArr[0] = "tf1_selProfile, Please add Profile First.";
    txtFieldIdArr[1] = "tf1_txtIpAddr, Please enter a valid IP Address";
	txtFieldIdArr[2] = "tf1_txtPrefixLength, Please enter a valid Prefix Length";
    txtFieldIdArr[3] = "tf1_txtMacAddr, Please enter a valid MAC address";
    txtFieldIdArr[4] = "tf1_txtDscpVal, Please enter a valid DSCP Value";
    txtFieldIdArr[5] = "tf1_txtSsid, Please enter a valid SSID Value";

    if (txtFieldArrayCheck (txtFieldIdArr) == false)
        return false;
    
	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;

   	if (ipv4Validate('tf1_txtIpAddr', 'IP', false, true, 'Invalid IP address', 'for octet ', true) == false) 
        return false;
    
    var preObj = document.getElementById('tf1_txtPrefixLength');
    if (preObj && !preObj.disabled){
        return numericValueRangeCheck (preObj, '', '', 1, 32, true, 'Invalid Prefix Length', '');
    }
        
    var macObj = document.getElementById('tf1_txtMacAddr');
    if (macObj && !macObj.disabled){
        if (!(macAddrValidate (macObj.value, true, "", '', macObj))){
            macObj.focus ();
            return false;
        }
    }

    var dscpObj = document.getElementById('tf1_txtDscpVal');
    if (dscpObj && !dscpObj.disabled){
        return numericValueRangeCheck (dscpObj, '', '', 0, 63, true, 'Invalid DSCP value', '');
    }
    return true;
}


function optionCheck() {   
    var selValue = comboSelectedValueGet ('tf1_selMatchType');
    if (!selValue) return;
    switch (parseInt(selValue, 10)){
	    case 1:    /* Service / IP */
	        fieldStateChangeWr('tf1_txtMacAddr tf1_txtDscpVal tf1_txtSsid', '', 'tf1_txtIpAddr tf1_txtPrefixLength', '');
			vidualDisplay('tf1_txtMacAddr tf1_txtDscpVal tf1_txtSsid','hide');
			vidualDisplay('break_txtMacAddr break_txtDscpVal break_txtSsid','hide');

			vidualDisplay('tf1_txtIpAddr tf1_txtPrefixLength','configRow');
			vidualDisplay('break_txtIpAddr break_txtPrefixLength','break');
            break;
        case 2:    /* Mac Address */
            fieldStateChangeWr('tf1_txtIpAddr tf1_txtPrefixLength tf1_txtDscpVal tf1_txtSsid', '', 'tf1_txtMacAddr', '');
			vidualDisplay('tf1_txtIpAddr tf1_txtPrefixLength tf1_txtDscpVal tf1_txtSsid','hide');
			vidualDisplay('break_txtIpAddr break_txtPrefixLength break_txtDscpVal break_txtSsid','hide');

			vidualDisplay('tf1_txtMacAddr','configRow');
			vidualDisplay('break_txtMacAddr','break');
            break;
        case 5: /*DSCP Value */
            fieldStateChangeWr('tf1_txtIpAddr tf1_txtPrefixLength tf1_txtMacAddr tf1_txtSsid', '', 'tf1_txtDscpVal', '');
			vidualDisplay('tf1_txtIpAddr tf1_txtPrefixLength tf1_txtMacAddr tf1_txtSsid','hide');
			vidualDisplay('break_txtIpAddr break_txtPrefixLength break_txtMacAddr break_txtSsid','hide');

			vidualDisplay('tf1_txtDscpVal','configRow');
			vidualDisplay('break_txtDscpVal','break');
            break;
        case 6: /*Entire Network*/
            fieldStateChangeWr('tf1_txtIpAddr tf1_txtPrefixLength tf1_txtMacAddr tf1_txtDscpVal tf1_txtSsid', '', '', '');
			vidualDisplay('tf1_txtIpAddr tf1_txtPrefixLength tf1_txtMacAddr tf1_txtDscpVal tf1_txtSsid','hide');
			vidualDisplay('break_txtIpAddr break_txtPrefixLength break_txtMacAddr break_txtDscpVal break_txtSsid','hide');
            break;
        case 7: /*SSID*/
            fieldStateChangeWr('tf1_txtIpAddr tf1_txtPrefixLength tf1_txtMacAddr tf1_txtDscpVal', '', 'tf1_txtSsid', '');
			vidualDisplay('tf1_txtIpAddr tf1_txtPrefixLength tf1_txtMacAddr tf1_txtDscpVal','hide');
			vidualDisplay('break_txtIpAddr break_txtPrefixLength break_txtMacAddr break_txtDscpVal','hide');

			vidualDisplay('tf1_txtSsid','configRow');
			vidualDisplay('break_txtSsid','break');
            break;
    }
}


