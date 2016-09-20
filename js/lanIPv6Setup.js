/*
 * File: ipv6LanSettings.js
 * Created on 26th Oct 2012 - Bala Krishna G
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
 
/**
 * Validating the form elements
 * @method lanSetupValidate
 * @param txtFieldIdArr
 */
function lanSetupValidate(frmId){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_ipv6_addr, Please enter a valid IPv6 address.";
    txtFieldIdArr[1] = "tf1_ipv6_maxlength, Please enter a valid IPv6 prefix length.";
    txtFieldIdArr[2] = "tf1_ipv6_DomName, Please enter a valid Domain Name.";
    txtFieldIdArr[3] = "tf1_serpre, Please enter a valid Server Preference.";
    txtFieldIdArr[4] = "tf1_ipv6_PriDnsServer,Please enter a valid Primary DNS Server";
    txtFieldIdArr[5] = "tf1_ipv6_SecDnsServer,Please enter a valid Secondary DNS Server";
    txtFieldIdArr[6] = "tf1_ipv6_leasetime,Please enter a valid Lease / Rebind Time";
	txtFieldIdArr[7] = "tf1_dhcpRelayGw,Please enter a valid Relay Gateway";
	
	var selSipServerType = comboSelectedValueGet("tf1_sipServerType");
	if ( parseInt(selSipServerType, 10) == 1 ) {
		txtFieldIdArr[8] = "tf1_sipServer,Please enter a valid SIP Server Domain Name";
	}
	if ( parseInt(selSipServerType, 10) == 2) {
		txtFieldIdArr[8] = "tf1_sipServer,Please enter a valid SIP Server IPv6 Address";
	}
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
		
	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;    


    if (ipv6Validate('tf1_ipv6_addr', false, true, '') == false) 
        return false;
		
	if (ipv6Validate('tf1_dhcpRelayGw', false, true, '') == false) 
        return false;
    
    
    var preLenObj = document.getElementById('tf1_ipv6_maxlength');
    if (numericValueRangeCheck(preLenObj, '', '', 1, 128, true, 'Invalid IPv6 prefix length.', '') == false) 
        return false;
    
    if (checkHostName('tf1_ipv6_DomName', true, 'Invalid Domain name: ', false) == false) 
        return false;
    
    var svrPrefObj = document.getElementById('tf1_serpre');
    if (!svrPrefObj) 
        return;
    if (!svrPrefObj.disabled) {
        if (numericValueRangeCheck(svrPrefObj, '', '', 0, 255, true, 'Invalid Server Preference.', '') == false) 
            return false;
    }
    
    if (ipv6Validate('tf1_ipv6_PriDnsServer', false, true, '') == false) 
        return false;
    
    if (ipv6Validate('tf1_ipv6_SecDnsServer', false, true, '') == false) 
        return false;
    
    var leaseTimeObj = document.getElementById('tf1_ipv6_leasetime');	
    if (!leaseTimeObj) 
        return;
		
    if (!leaseTimeObj.disabled) {
        if (numericValueRangeCheck(leaseTimeObj, '', '', 0, 604800, true, 'Invalid Lease / Rebind Time', 'Seconds') == false)             return false;
	}
	
	if ( parseInt(selSipServerType, 10) == 1 ) {
		  if (checkHostName('tf1_sipServer', true, 'Invalid Domain name: ', false) == false) 
        return false;

        /* IF IPV6 or IPv4 disallow  */
        if (ipv6Validate('tf1_sipServer', false, false, '') == true) {
            alert("Invalid Domain name, it cannot be IPV6 address");
            return false;
        } 
        if (ipv4Validate('tf1_sipServer', false, false, '') == true) {
            alert("Invalid Domain name, it cannot be IPV4 address");
            return false;
        }
        
	}
	if ( parseInt(selSipServerType, 10) == 2) {
		  if (ipv6Validate('tf1_sipServer', false, true, '') == false) 
		  return false;
	}
    
    setHiddenChks(frmId);
    return true;
}

/**
 * Wrapper function called onreset
 * @method changeDhcpStatusReset
 * @param obj
 */
function changeDhcpStatusReset(frmId){
	dhcpCheck();
	dnsServerChange();
    modeChange();
    resetImgOnOff(frmId);
}

/**
 * DNS Server Change
 * @method dnsServerChange
 */
function dnsServerChange(){
    var tf1_DnsSvrsObj = document.getElementById('tf1_DnsSvrs');
    if (tf1_DnsSvrsObj && !tf1_DnsSvrsObj.disabled) {
        var selValue = parseInt(tf1_DnsSvrsObj.value, 10);
        if (selValue == 1 || selValue == 2) {
            fieldStateChangeWr("tf1_ipv6_PriDnsServer tf1_ipv6_SecDnsServer", "", "", "");
            vidualDisplay("tf1_ipv6_PriDnsServer tf1_ipv6_SecDnsServer", 'hide');
            vidualDisplay("break4 break5", 'hide');
        }
        else {
            fieldStateChangeWr("", "", "tf1_ipv6_SecDnsServer tf1_ipv6_PriDnsServer", "");
            vidualDisplay("tf1_ipv6_PriDnsServer tf1_ipv6_SecDnsServer", 'configRow');
            vidualDisplay("break4 break5", 'break');
        }
    }
}

/**
 * State Mode Change
 * @method modeChange
 */
function modeChange(){
    var selValue = radioCheckedValueGet('tf1_stateless');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 0: /* Stateful */
        	fieldStateChangeWr("tf1_prefixDel tf1_prefixHidden", "", "", "");
            vidualDisplay("tf1_prefixDel ", 'hide');
            vidualDisplay("break7", 'hide');
            break;
            
        case 1: /* Stateless */
        	fieldStateChangeWr("", "", "tf1_prefixDel tf1_prefixHidden", "");
            vidualDisplay("tf1_prefixDel", 'configRow');
            vidualDisplay("break7", 'break');
            break;
    }
}

// On body load call the respective function
window.onload = function(){
	dhcpCheck();
	dnsServerChange();
    modeChange();
    onloadCall();
	 
}

/* Address Pools Page Validation Start */
/**
 * function for validate form when user clicks on submit button
 * OnSubmit event
 * @method ipv6AddressPoolsValidate
 */
function ipv6AddressPoolsValidate(){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtIpv6StAddr,Please enter a valid Start IPv6 Address";
    txtFieldIdArr[1] = "tf1_txtIpv6EndAddr,Please enter a valid End IPv6 Address";
    txtFieldIdArr[2] = "tf1_txtIpv6PrefLen,Please enter a valid Prefix Length";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

		if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;    
    
    if (ipv6Validate('tf1_txtIpv6StAddr', true, true, '') == false) 
        return false;
    
    if (ipv6Validate('tf1_txtIpv6EndAddr', true, true, '') == false) 
        return false;
    
    if (startEndCompare('tf1_txtIpv6StAddr', 'tf1_txtIpv6EndAddr') == false) {
        return false;
    }
    
    var preLenObj = document.getElementById('tf1_txtIpv6PrefLen');
    if (numericValueRangeCheck(preLenObj, '', '', 1, 128, true, 'Invalid Prefix Length', '') == false) 
        return false;
    return true;
}

/* Address Pools Page Validation End */
/* Prefix Length Page Validation Start */
/****
 * validate the form
 * @method prefixValidate
 */
function prefixValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_clientIdentifier,Please enter a valid IPv6 Client Identifier: HexaDecimal XX:XX:XX:XX:XX.XX";
    txtFieldIdArr[1] = "tf1_prefix,Please enter a valid IPv6 Prefix";
    txtFieldIdArr[2] = "tf1_ipv6PreLen,Please enter a valid IPv6 Prefix Length";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
		
	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;		

    if (validateClientIdentifier("tf1_clientIdentifier") == false) {
		alert("Please enter a valid Client Identifier format: HexaDecimal XX:XX:XX:XX:XX....");
		document.getElementById("tf1_clientIdentifier").focus();
		return false;
	}
    
		
    if (ipv6Validate('tf1_prefix', false, true, '') == false) 
        return false;
    
    var preLenObj = document.getElementById('tf1_ipv6PreLen');
    if (numericValueRangeCheck(preLenObj, '', '', 1, 128, true, 'Invalid IPv6 Prefix Length.', '') == false) 
        return false;

    return true;
}

/**
 * Select box onchange event
 * @method dhcpCheck
 * This function calls when user selects drop down item from "DHCP Mode" select box
 */
function dhcpCheck(){
    var isDhcpEnabled = parseInt(comboSelectedValueGet('tf1_dhcpModel'), 10);
    if (isDhcpEnabled == 1) {//DHCP Server
        fieldStateChangeWr('tf1_dhcpRelayGw', '', 'tf1_stateless tf1_ipv6_DomName tf1_serpre tf1_DnsSvrs tf1_ipv6_PriDnsServer tf1_ipv6_SecDnsServer  tf1_ipv6_leasetime tf1_prefixDel tf1_sipServerType tf1_sipServer', '');
        vidualDisplay('tf1_dhcpRelayGw', 'hide');
		 vidualDisplay('break9', 'hide');
        
        vidualDisplay('tf1_stateless tf1_ipv6_DomName tf1_serpre tf1_DnsSvrs tf1_ipv6_PriDnsServer tf1_ipv6_SecDnsServer  tf1_ipv6_leasetime tf1_prefixDel tf1_sipServerType tf1_sipServer', 'configRow');
        
        vidualDisplay('break1 break2 break3 break4 break5 break6 break7 break8 break10 break11', 'break');
	dnsServerChange();
    }
    else 
        if (isDhcpEnabled == 2) {//DHCP Relay
            fieldStateChangeWr('tf1_stateless tf1_ipv6_DomName tf1_serpre tf1_DnsSvrs tf1_ipv6_PriDnsServer tf1_ipv6_SecDnsServer  tf1_ipv6_leasetime tf1_prefixDel tf1_sipServerType tf1_sipServer', '', 'tf1_dhcpRelayGw', '');
            
            vidualDisplay('tf1_stateless tf1_ipv6_DomName tf1_serpre tf1_DnsSvrs tf1_ipv6_PriDnsServer tf1_ipv6_SecDnsServer  tf1_ipv6_leasetime tf1_prefixDel tf1_sipServerType tf1_sipServer', 'hide');
            
            vidualDisplay('break1 break2 break3 break4 break5 break6 break7 break8 break10 break11', 'hide');
            
            vidualDisplay('tf1_dhcpRelayGw', 'configRow');
            vidualDisplay('break9', 'break');
            
        }
        else {
            fieldStateChangeWr('tf1_stateless tf1_ipv6_DomName tf1_serpre tf1_DnsSvrs tf1_ipv6_PriDnsServer tf1_ipv6_SecDnsServer  tf1_ipv6_leasetime tf1_prefixDel tf1_dhcpRelayGw tf1_sipServerType tf1_sipServer', '', '', '');
            
            vidualDisplay('tf1_stateless tf1_ipv6_DomName tf1_serpre tf1_DnsSvrs tf1_ipv6_PriDnsServer tf1_ipv6_SecDnsServer  tf1_ipv6_leasetime tf1_prefixDel tf1_dhcpRelayGw tf1_sipServerType tf1_sipServer', 'hide');
            
            vidualDisplay('break1 break2 break3 break4 break5 break6 break7 break8 break9 break10 break11', 'hide');
        }
	sipServerTypeCheck();
}

/**
 * Select box onchange event
 * @method sipServerTypeCheck
 * This function calls when user selects drop down item from "Sip Server Type" select box
 */
function sipServerTypeCheck() {
 var selValue = comboSelectedValueGet('tf1_sipServerType');
    if (!selValue) 
        return;
    switch (selValue) {
        case '0':
            fieldStateChangeWr('tf1_sipServer', '', '', '');
            vidualDisplay('tf1_sipServer', 'hide');
            vidualDisplay('break11', 'hide');
            break;
		case '2':
		case '1':
            fieldStateChangeWr('', '', 'tf1_sipServer', '');
            vidualDisplay('tf1_sipServer', 'configRow');
            vidualDisplay('break11', 'break');
            break;
    }
}

/**
 * Validating the form elements
 * @method keyDownSipServerValidate
 * @param thisObject
 */
function keyDownSipServerValidate(thisObject) {	
	var selSipServerType = comboSelectedValueGet("tf1_sipServerType");
	switch (parseInt(selSipServerType, 10)) {
        case 1: /* Domain Name */
            return checkHostName('tf1_sipServer', true, 'Invalid Domain Name: ', false);
            break;
        case 2: /* IPv6 Address */
           	return ipv6AddrValidate (thisObject, false, true, '');
            break;
    	}
}

/**
 * Validating the form elements
 * @method keyPressSipServerValidate
 * @param event
 */
function keyPressSipServerValidate(event) {	
	var selSipServerType = comboSelectedValueGet("tf1_sipServerType");
	switch (parseInt(selSipServerType, 10)) {
        case 1: /* Domain Name */
            return true;
            break;
        case 2: /* IPv6 Address */
           	return numericValueCheck (event, 'ABCDEFabcdef:.');
            break;
    	}
}

/**
 * Validating the form elements
 * @method validateClientIdentifier
 * @param fieldId
 */
function validateClientIdentifier(fieldId) {
	var fldObj = document.getElementById(fieldId);
    if (!fldObj || fldObj.disabled) {
        return true;
	}
	var fieldValue = fldObj.value;
	var hexaDecimalBlocks = fieldValue.split(":");
	if ( hexaDecimalBlocks.length < 6 || hexaDecimalBlocks.length  > 20 ) {
		return false;	
	}
	for (var i=0; i < hexaDecimalBlocks.length; i++) {		
		if(alphaNumericValueCheck(hexaDecimalBlocks[i],'ABCDEFabcdef') == false || hexaDecimalBlocks[i].length != 2) {			
			 return false
		}	
	}
	return true;

}

