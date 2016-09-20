/*
 * File: lanIPv4Setup.js
 * Created on 10th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */

var pppSubnetMask = "255.255.255.255";

/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(lanIPV4SetupOnload, {
        imageId: '',
        disableIndividual: '',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: '',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
    dhcpCheck();
	dnsServerChange();
});

/**
 * DNS Server Change
 * @method dnsServerChange
 */
function dnsServerChange(){
    var tf1_DnsSvrsObj = document.getElementById('tf1_DnsSvrs');
    if (tf1_DnsSvrsObj && !tf1_DnsSvrsObj.disabled) {
        var selValue = parseInt(tf1_DnsSvrsObj.value, 10);
        if (selValue == 1 || selValue == 2) {
            fieldStateChangeWr("tf1_priDnsServer tf1_secDnsServer", "", "", "");
            vidualDisplay("tf1_priDnsServer tf1_secDnsServer", 'hide');
            vidualDisplay("break_priDnsServer break_secDnsServer", 'hide');
        }
        else {
            fieldStateChangeWr("", "", "tf1_secDnsServer tf1_priDnsServer", "");
            vidualDisplay("tf1_priDnsServer tf1_secDnsServer", 'configRow');
            vidualDisplay("break_priDnsServer break_secDnsServer", 'break');
        }
    }
}

/**
 * @param data - image data
 * @param thisObj - currtent image id
 */
function lanIPV4SetupOnload(data, thisObj){
    onImageToggle(data);
}

/**
 * lanIPV4SetupOnReset
 */
function lanIPV4SetupOnReset(frmId){

	resetImgOnOff(frmId);
	dhcpCheck();
	dnsServerChange();
	 
}


/**
 * On submit validation
 * @method validateLansettings
 * This function calls when user clicks on submit button
 */
function validateLansettings(frmId){
    var txtValidArray = new Array();
    txtValidArray[0] = "tf1_ipAddr, Please enter a valid IP Address";
    txtValidArray[1] = "tf1_subnetmask, Please enter a valid Subnet Mask";
    txtValidArray[2] = "tf1_dhcpStartIp, Please enter a valid Starting IP Address";
    txtValidArray[3] = "tf1_dhcpEndIp, Please enter a valid Ending IP Address";
    txtValidArray[4] = "tf1_dhcpLeaseTime, Please enter a valid Lease Time";
    txtValidArray[5] = "tf1_dhcpRelayGw, Please enter a valid Realay Gateway";
	txtValidArray[6] = "tf1_priDnsServer,Please enter a valid Primary DNS Server";
    txtValidArray[7] = "tf1_secDnsServer,Please enter a valid Secondary DNS Server";
    
    if (txtFieldArrayCheck(txtValidArray) == false) 
        return false;

	txtValidArray[8] = "tf1_dhcpDomainName,Please enter a valid Domain Name";

	if (isProblemCharArrayCheck(txtValidArray, "'\" ", NOT_SUPPORTED) == false) 
        return false;    

    if (ipv4Validate('tf1_ipAddr', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (validNetMask('tf1_subnetmask') == false) 
        return false;
    /* subnet mask restriction 51350 fix*/
    var subnetMaskvalue = $("#tf1_subnetmask").val();
    if(parseInt(calcSubnetbits(subnetMaskvalue),10) == -1){
        return false;
    }
    if(parseInt(calcSubnetbits(subnetMaskvalue),10) < 16){
        alert("Configured Subnet Mask should be greater than 16")
        return false;
    }
    /* 51350 ends */
    if (ipv4Validate('tf1_dhcpStartIp', 'IP', false, true, "Invalid Starting IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_dhcpEndIp', 'IP', false, true, "Invalid Ending IP address.", "for octet ", true) == false) 
        return false;
    
    if (checkIPAddrRange('tf1_dhcpStartIp', 'tf1_dhcpEndIp') == false) 
        return false;
    
    var leaseTimeObj = document.getElementById('tf1_dhcpLeaseTime');
    if (leaseTimeObj && !leaseTimeObj.disabled) {
        if (numericValueRangeCheck(leaseTimeObj, '', '', 1, 24, true, 'Invalid Lease Time:', 'Hours') == false) 
            return false;
    }
    
    if (ipv4Validate('tf1_priDnsServer', 'IP', true, true, "Invalid Primary DNS Server.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_secDnsServer', 'IP', true, true, "Invalid Secondary DNS Server.", "for octet ", true) == false) 
        return false;
    
    
    if (ipv4Validate('tf1_dhcpRelayGw', 'IP', false, true, "Invalid Gateway.", "for octet ", true) == false) 
        return false;
    
    /*Begin: Subnet checking for Wan1 */	
	var wanIpAddrObj = document.getElementById('tf1_wanIpAddress');
	var wanIpSnetObj = document.getElementById('tf1_wanSubnetMask');
	var lanIpObj = document.getElementById('tf1_ipAddr');

	if(wanIpAddrObj.value != '0.0.0.0' && wanIpSnetObj.value != '0.0.0.0')	
		{
		if(wanIpSnetObj.value == pppSubnetMask)
			{
			if(wanIpAddrObj.value == lanIpObj.value)
				{
				alert ("WAN has the same IP. Please configure different IP.");
				lanIpObj.focus();
				return false;
				}
			}
		else if (subnetValidation('tf1_ipAddr', 'tf1_subnetmask', 'tf1_wanIpAddress', 'tf1_wanSubnetMask')) 
			{
			var errorstr = "WAN IP address is in the same subnet. Please specify IP address in a different subnet.";
			alert (errorstr);
			lanIpObj.focus();
			return false;
			}
		}
	/*End: Subnet checking for Wan*/

	/* Start checking for DHCP server starting/ending subnets */ 	
	var selectedDhcpMode = comboSelectedValueGet('tf1_dhcpModel');
    
   	/*Check validations only when DHCP mode is DHCP server */    
   	if ( parseInt(selectedDhcpMode, 10 ) == 1)
   	{
		
		/* Start Check with DHCP Starting/Ending IP address in same subnet of LAN */		
		var lanIpAddr = getIPInt1('tf1_ipAddr');
		var lanSnMask = getIPInt1('tf1_subnetmask');
		var dhcpStIpAddress = getIPInt1('tf1_dhcpStartIp');
		var dhcpEndIpAddress = getIPInt1('tf1_dhcpEndIp');				
		
		/*	StartingIP Subnet checking */
		if ( isInSubnet(dhcpStIpAddress, lanIpAddr , lanSnMask) == false )
		{ 
			alert ('DHCP Starting IP address and LAN should be in the same subnet');
			document.getElementById('tf1_dhcpStartIp').focus();
			return false;
		}
		/*	Ending IP Subnet checking */	
		if ( isInSubnet(dhcpEndIpAddress, lanIpAddr , lanSnMask) == false )
		{ 
			alert ('DHCP Ending IP address and LAN should be in the same subnet');
			document.getElementById('tf1_dhcpEndIp').focus();
			return false;
		}

		/* End Check with DHCP Starting/Ending IP address in same subnet of LAN */
	
   	}

    var domainNameObj = document.getElementById('tf1_dhcpDomainName');
    if (domainNameObj && !domainNameObj.disabled) {
        if (validateDomainName(domainNameObj,'') == false) 
            return false;
    }
    
    setHiddenChks(frmId);
    return true;
    
}

/**
 * This function calls to check ip address range
 * @method checkIPAddrRange
 */
function checkIPAddrRange(startIP, endIP){
    var startIpObj = document.getElementById(startIP);
    var endIpObj = document.getElementById(endIP);
    
    if (startIpObj && !startIpObj.disabled && endIpObj && !endIpObj.disabled) {
        var dhcpStart = getIPInt1(startIP)
        var dhcpEnd = getIPInt1(endIP);
        if (compareIP(dhcpStart, dhcpEnd) > 0) {
            alert("Ending IP Address should be higher than Starting IP Address");
            document.getElementById(startIP).focus();
            return false;
        }
    }
    else {
        return true;
    }
}

/**
 * Select box onchange event
 * @method dhcpCheck
 * This function calls when user selects drop down item from "DHCP Mode" select box
 */
function dhcpCheck(){
    var isDhcpEnabled = parseInt(comboSelectedValueGet('tf1_dhcpModel'), 10);
    if (isDhcpEnabled == 1) {//DHCP Server
        fieldStateChangeWr('tf1_dhcpRelayGw', '', 'tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_DnsSvrs tf1_priDnsServer tf1_secDnsServer tf1_dhcpDomainName', '');
        vidualDisplay('tf1_dhcpRelayGw', 'hide');
        
        vidualDisplay('tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_DnsSvrs tf1_priDnsServer tf1_secDnsServer tf1_dhcpDomainName', 'configRow');
        
        vidualDisplay('break_dhcpLeaseTime break_dhcpStartIp break_dhcpEndIp break_DnsSvrs break_priDnsServer break_secDnsServer break_dhcpDomainName', 'break');
	dnsServerChange();
    }
    else 
        if (isDhcpEnabled == 2) {//DHCP Relay
            fieldStateChangeWr('tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_DnsSvrs tf1_priDnsServer tf1_secDnsServer tf1_dhcpDomainName', '', 'tf1_dhcpRelayGw', '');
            
            vidualDisplay('tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_DnsSvrs tf1_priDnsServer tf1_secDnsServer tf1_dhcpDomainName tf1_DnsSvrs', 'hide');
            
            vidualDisplay('break_dhcpLeaseTime break_dhcpStartIp break_dhcpEndIp break_DnsSvrs break_priDnsServer break_secDnsServer break_dhcpDomainName break_DnsSvrs break_priDnsServer break_secDnsServer', 'hide');
            
            vidualDisplay('tf1_dhcpRelayGw', 'configRow');
            vidualDisplay('break_dhcpRelayGw', 'break');
            
        }
        else {
            fieldStateChangeWr('tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_DnsSvrs tf1_priDnsServer tf1_secDnsServer tf1_dhcpRelayGw tf1_dhcpDomainName', '', '', '');
            
            vidualDisplay('tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_DnsSvrs tf1_priDnsServer tf1_secDnsServer tf1_dhcpRelayGw tf1_configuredns tf1_dhcpDomainName', 'hide');
            
            vidualDisplay('break_dhcpLeaseTime break_dhcpStartIp break_dhcpEndIp break_DnsSvrs break_priDnsServer break_secDnsServer break_dhcpRelayGw break_configuredns break_dhcpDomainName', 'hide');
        }
}
