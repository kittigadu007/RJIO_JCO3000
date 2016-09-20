/*
 * File: wan1Setup.js
 * Created on 4th Jan 2013 - Lakshmi
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
    onloadCall(wan1SetupOnload, {
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
    checkISPType();
});

/**
 * @param data - image data
 * @param thisObj - currtent image id
 */
function wan1SetupOnload(data, thisObj){
    onImageToggle(data);    
}
/*
* @method wanIPv4ConfigOnReset
*/
function wanIPv4ConfigOnReset(frmId){

	resetImgOnOff(frmId);
	checkISPType();
	
}

/**
 * Manage input fields when select an option from ISP Connection Type
 * OnChange Validation
 * @method checkISPType
 */
function checkISPType(){
    var loadBal = document.getElementById('isLoadBal').value;
    var selectedValue = comboSelectedValueGet('tf1_ispType');
    
    
    if (!selectedValue) 
        return;
    switch (parseInt(selectedValue, 10)) {	
		 case 4:/* L2TP */
                
            /* Enable the fields */
            fieldStateChangeWr('', '', 'tf1_l2tpSecret tf1_dnsServerSource tf1_serverAddr tf1_ipAddr tf1_username tf1_password tf1_maximumIdleTime', 'tf1_reConnectMode_div');
            vidualDisplay('tf1_dnsServerSource tf1_serverAddr tf1_ipAddr tf1_username tf1_password tf1_reConnectMode tf1_maximumIdleTime tf1_l2tpSecret', 'configRow');
            vidualDisplay('break_dnsServerSource break_serverAddr break_ipAddr break_username break_password  break_reConnectMode break_maximumIdleTime  break_l2tpSecret', 'break');
            
            
            /* Disable the fields */
            fieldStateChangeWr('tf1_chkMppe tf1_maximumIdleTime tf1_service tf1_stIpAddr tf1_stIpSnetMask tf1_stGwIpAddr tf1_authenticationType');
            vidualDisplay('tf1_chkMppe tf1_service  tf1_stIpAddr tf1_stIpSnetMask tf1_stGwIpAddr tf1_authenticationType', 'hide');
            vidualDisplay('break_chkMppe break_service break_stIpAddr break_stIpAddr break_stIpSnetMask break_stGwIpAddr break_authenticationType', 'hide');
            
            dnsServerCheck();
            routerMACAddrCheck();
            dnsServerCheck();
            idleTimeOutCheck();
            break;
		
        case 3: /* PPTP */
            /* Enable the fields */
            fieldStateChangeWr('', '', 'tf1_dnsServerSource tf1_serverAddr tf1_ipAddr tf1_username tf1_password tf1_maximumIdleTime tf1_chkMppe', 'tf1_reConnectMode_div');
            vidualDisplay('tf1_dnsServerSource tf1_serverAddr tf1_ipAddr tf1_username tf1_password tf1_reConnectMode tf1_maximumIdleTime tf1_chkMppe', 'configRow');
            vidualDisplay('break_dnsServerSource break_serverAddr break_ipAddr break_username break_password  break_chkMppe break_reConnectMode break_maximumIdleTime  break_chkMppe', 'break');
            
            
            /* Disable the fields */
            fieldStateChangeWr('tf1_l2tpSecret tf1_maximumIdleTime tf1_service tf1_stIpAddr tf1_stIpSnetMask tf1_stGwIpAddr tf1_authenticationType');
            vidualDisplay('tf1_service  tf1_stIpAddr tf1_stIpSnetMask tf1_stGwIpAddr tf1_authenticationType tf1_l2tpSecret', 'hide');
            vidualDisplay('break_service break_stIpAddr break_stIpAddr break_stIpSnetMask break_stGwIpAddr break_authenticationType break_l2tpSecret', 'hide');
            
            dnsServerCheck();
            routerMACAddrCheck();
            dnsServerCheck();
            idleTimeOutCheck();
            break;
            
        case 2: /* PPPoE */
            /* Enable the fields */
            fieldStateChangeWr('tf1_l2tpSecret', '', 'tf1_dnsServerSource tf1_username tf1_password tf1_service tf1_authenticationType tf1_maximumIdleTime','tf1_reConnectMode_div');
            vidualDisplay('tf1_dnsServerSource tf1_username tf1_password tf1_service tf1_authenticationType tf1_reConnectMode tf1_maximumIdleTime', 'configRow');
            vidualDisplay('break_dnsServerSource break_username break_password break_service break_authenticationType break_reConnectMode break_maximumIdleTime', 'break');
            
            fieldStateChangeWr('tf1_ipAddr tf1_maximumIdleTime tf1_stIpAddr tf1_stIpSnetMask tf1_stGwIpAddr tf1_serverAddr tf1_chkMppe');
            vidualDisplay('tf1_ipAddr tf1_stIpAddr tf1_stIpSnetMask tf1_stGwIpAddr tf1_serverAddr tf1_chkMppe tf1_l2tpSecret', 'hide');
            vidualDisplay('break_ipAddr break_stIpAddr break_stIpSnetMask break_stGwIpAddr break_serverAddr break_chkMppe break_serverAddress break_l2tpSecret', 'hide');

            dnsServerCheck();
            routerMACAddrCheck();
            idleTimeOutCheck();
            break;
            
        case 1:/* STATIC */
            fieldStateChangeWr('tf1_dnsServerSource tf1_ipAddr tf1_serverAddr tf1_username tf1_password tf1_service tf1_authenticationType tf1_chkMppe tf1_maximumIdleTime tf1_l2tpSecret tf1_dnsServerSource', 'tf1_reConnectMode_div', '', '');
            
            vidualDisplay('tf1_dnsServerSource tf1_maximumIdleTime tf1_ipAddr tf1_serverAddr tf1_reConnectMode tf1_serverAddr tf1_username tf1_password tf1_service tf1_authenticationType tf1_chkMppe tf1_serverAddress tf1_l2tpSecret tf1_dnsServerSource', 'hide');
            vidualDisplay('break_dnsServerSource_div break_ipAddr break_serverAddr break_serverAddr break_username break_password break_service break_authenticationType break_chkMppe break_reConnectMode break_maximumIdleTime break_l2tpIpAddr break_serverAddress break_l2tpSecret break_dnsServerSource', 'hide');
            
            fieldStateChangeWr('', '', 'tf1_primaryDns tf1_secDns tf1_stIpAddr tf1_stIpSnetMask tf1_stGwIpAddr', '');
            vidualDisplay('tf1_primaryDns tf1_secDns tf1_stIpAddr tf1_stIpSnetMask tf1_stGwIpAddr', 'configRow');
            vidualDisplay('break_primaryDns break_secDns break_stIpAddr break_stIpSnetMask break_stGwIpAddr', 'break');
            
            dnsServerCheck();
            routerMACAddrCheck();
            break;
            
        case 0:/* DHCP */
        default:
            
            fieldStateChangeWr('tf1_stIpAddr tf1_stIpSnetMask tf1_stGwIpAddr tf1_ipAddr tf1_serverAddr tf1_username tf1_password tf1_service tf1_authenticationType tf1_chkMppe tf1_maximumIdleTime tf1_l2tpSecret', 'tf1_reConnectMode_div', '', '');
			
            vidualDisplay('tf1_stIpAddr tf1_stIpSnetMask tf1_stGwIpAddr tf1_maximumIdleTime tf1_ipAddr tf1_serverAddr tf1_reConnectMode tf1_serverAddr tf1_username tf1_password tf1_service tf1_authenticationType tf1_chkMppe tf1_l2tpSecret', 'hide');
			
            vidualDisplay('break_stIpAddr break_stIpSnetMask break_stGwIpAddr break_ipAddr break_serverAddr break_serverAddr break_username break_password break_service break_authenticationType break_chkMppe break_reConnectMode break_maximumIdleTime break_serverAddress break_l2tpSecret', 'hide');
            
            fieldStateChangeWr('', '', 'tf1_dnsServerSource', '');
            vidualDisplay('tf1_dnsServerSource', 'configRow');		 
            vidualDisplay('break_dnsServerSource', 'break');
            dnsServerCheck();
            routerMACAddrCheck();
            
            break;
		
    }
}


/**
 * Manage input fields when select an option from Reconnect Mode
 * OnClick Validation
 * @method idleTimeOutCheck
 */
function idleTimeOutCheck(){
    var selectedValue = radioCheckedValueGet('tf1_reConnectMode1');
    if (!selectedValue) 
        return;
    switch (parseInt(selectedValue, 10)) {
        case 1:
            fieldStateChangeWr('', '', 'tf1_maximumIdleTime', '');
            vidualDisplay('tf1_maximumIdleTime', 'configRow');
            vidualDisplay('break_maximumIdleTime', 'break');
            break;
        case 0:
            fieldStateChangeWr('tf1_maximumIdleTime', '', '', '');
            vidualDisplay('tf1_maximumIdleTime', 'hide');
            vidualDisplay('break_maximumIdleTime', 'hide');
    }
}


/**
 * Manage input fields when select an option from DNS Server Source
 * OnChange Validation
 * @method dnsServerCheck
 */
function dnsServerCheck(){
    var selValue = comboSelectedValueGet('tf1_dnsServerSource');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 0: /* Use These DNS Servers */
            fieldStateChangeWr('', '', 'tf1_primaryDns tf1_secDns', '');
            vidualDisplay('tf1_primaryDns tf1_secDns', 'configRow');
            vidualDisplay('break_primaryDns break_secDns', 'break');
            break;
        case 1: /* Get Automatically from ISP */
        default:
            fieldStateChangeWr('tf1_primaryDns tf1_secDns', '', '', '');
            vidualDisplay('tf1_primaryDns tf1_secDns', 'hide');
            vidualDisplay('break_primaryDns break_secDns', 'hide');
            break;
    }
}

/**
 * Manage input fields when select an option from MAC Address Source
 * OnChange Validation
 * @method routerMACAddrCheck
 */
function routerMACAddrCheck(){
    var selValue = comboSelectedValueGet('tf1_macAddrSource');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 0: /* Use Default Address */
            fieldStateChangeWr('tf1_macAddr', '', '', '');
            vidualDisplay('tf1_macAddr', 'hide');
            vidualDisplay('break_macAddr', 'hide');
            break;
        case 1: /* Use this computer's MAC */
            fieldStateChangeWr('tf1_macAddr', '', '', '');
            vidualDisplay('tf1_macAddr', 'hide');
            vidualDisplay('break_macAddr', 'hide');
            break;
        case 2: /* Use this MAC Address */
            fieldStateChangeWr('', '', 'tf1_macAddr', '');
            vidualDisplay('tf1_macAddr', 'configRow');
            vidualDisplay('break_macAddr', 'configRow');
            break;
    }
}

/**
 * Form Validation
 * @method wanSetupValidate
 */
function wanSetupValidate(frmId){

    var txtFieldIdArr = new Array();
    
    txtFieldIdArr[0] = "tf1_stIpAddr,Please enter a valid IP Address";
    txtFieldIdArr[1] = "tf1_stIpSnetMask,Please enter a valid Subnet Mask";
    txtFieldIdArr[2] = "tf1_stGwIpAddr,Please enter a valid Gateway IP Address";
    txtFieldIdArr[3] = "tf1_ipAddr,Please enter a valid IP Address";
    
    txtFieldIdArr[4] = "tf1_serverAddr,Please enter a valid Server Address";
    txtFieldIdArr[5] = "tf1_username,Please enter a valid username";
    txtFieldIdArr[6] = "tf1_password,Please enter a valid password";
    txtFieldIdArr[7] = "tf1_maximumIdleTime,Please enter maximum Idle Timeout";
    txtFieldIdArr[8] = "tf1_primaryDns,Please enter a valid Primary DNS Server";
    txtFieldIdArr[9] = "tf1_secDns,Please enter a valid Secondary DNS Server";
    txtFieldIdArr[10] = "tf1_macAddr,Please enter valid MAC Address";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;    
    
	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

    var idleTimeoutObj = document.getElementById('tf1_maximumIdleTime');
    if (idleTimeoutObj && !idleTimeoutObj.disabled) {
        if (numericValueRangeCheck(idleTimeoutObj, '', '', 5, 999, true, '', 'minutes') == false) 
            return false;
    }    
    
    if (ipv4Validate('tf1_stIpAddr', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (validNetMask('tf1_stIpSnetMask') == false) 
        return false;

    if (ipv4Validate('tf1_stGwIpAddr', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_ipAddr', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;

    if (ipv4Validate('tf1_serverAddr', 'IP', false, true, "Invalid Server IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_primaryDns', 'IP', false, true, "Invalid Primary DNS IP address.", "for octet ", true) == false) 
        return false;

    if (ipv4Validate('tf1_secDns', 'IP', true, true, "Invalid Secondary DNS IP address.", "for octet ", true) == false) 
        return false;

	if (ipv4Validate('tf1_serverAddr', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;


	/* 
    var macObj = document.getElementById('tf1_macAddr');
    if (!macObj || macObj.disabled) 
        return true;
    if (!(macAddrValidate(macObj.value, true, "", '', macObj))) {
        macObj.focus();
        return false;
    }*/
    
    var selectedValue = comboSelectedValueGet('tf1_ispType');
    
    /*Check validations only when ISP Connection Type is Static */    
    if ( parseInt(selectedValue, 10 ) == 1)
    {

	    /*Begin: Subnet checking for LAN/WAN */	
		var lanIpAddrObj = document.getElementById('tf1_lanIpAddress');
		var lanIpSnetObj = document.getElementById('tf1_lanSubnetMask');
		var wanIpObj = document.getElementById('tf1_stIpAddr');
	
		if(lanIpAddrObj.value != '0.0.0.0' && lanIpSnetObj.value != '0.0.0.0')	
			{
				if(lanIpSnetObj.value == pppSubnetMask)
					{
					if(lanIpAddrObj.value == wanIpObj.value)
						{
						alert ("LAN has the same IP. Please configure different IP.");
						lanIpObj.focus();
						return false;
						}
					}
				else if (subnetValidation('tf1_stIpAddr', 'tf1_stIpSnetMask', 'tf1_lanIpAddress', 'tf1_lanSubnetMask')) 
					{
					var errorstr = "LAN IP address is in the same subnet of WAN. Please specify IP address in a different subnet.";
					alert (errorstr);
					wanIpObj.focus();
					return false;
					}
			}
		/*End: Subnet checking for LAN/WAN */
		
		/* Start Check with Gateway in same subnet of WAN */
		
			var ipAddr = getIPInt1('tf1_stIpAddr');
			var snMask = getIPInt1('tf1_stIpSnetMask');
			var gateway = getIPInt1('tf1_stGwIpAddr');			
			 
			if ( isInSubnet(gateway, ipAddr, snMask) == false )
			{ 
				alert ('IP address and Gateway should be in the same subnet');
				return false;
			}
		/* End Check with Gateway in same subnet of WAN */
			 
	}

    
    setHiddenChks(frmId);
    return true;
}

