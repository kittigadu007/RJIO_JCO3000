/*
 * File: lanSettings.js
 * Created on 5th Nov 2012 - Laxmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * On submit validation
 * @method validateLansettings
 * This function calls when user clicks on submit button
 */
function validateLansettings(){
    var txtValidArray = new Array();
    txtValidArray[0] = "tf1_ipAddr, Please enter a valid IP Address";
    txtValidArray[1] = "tf1_subnetmask, Please enter a valid Subnet Mask";
    txtValidArray[2] = "tf1_dhcpStartIp, Please enter a valid Starting IP Address";
    txtValidArray[3] = "tf1_dhcpEndIp, Please enter a valid Ending IP Address";
    txtValidArray[4] = "tf1_defaultGateway, Please enter a valid Defalut Gateway";
    txtValidArray[5] = "tf1_dhcpLeaseTime, Please enter a valid Lease Time";
    txtValidArray[6] = "tf1_dhcpRelayGw, Please enter a valid Realay Gateway";
    txtValidArray[7] = "tf1_dnsMappingHost, Please enter a valid Host Name";
    txtValidArray[8] = "tf1_dnsMappingIP, Please enter a valid IP Address";
    
    if (txtFieldArrayCheck(txtValidArray) == false) 
        return false;
    
    if (ipv4Validate('tf1_ipAddr', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (validNetMask('tf1_subnetmask') == false) 
        return false;
    
    if (ipv4Validate('tf1_dhcpStartIp', 'IP', false, true, "Invalid Starting IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_dhcpEndIp', 'IP', false, true, "Invalid Ending IP address.", "for octet ", true) == false) 
        return false;
    
    if (checkIPAddrRange() == false) 
        return false;
    
    if (ipv4Validate('tf1_defaultGateway', 'IP', false, true, "Invalid Default Gateway.", "for octet ", true) == false) 
        return false;
    
    var leaseTimeObj = document.getElementById('tf1_dhcpLeaseTime');
    if (leaseTimeObj && !leaseTimeObj.disabled) {
        if (numericValueRangeCheck(leaseTimeObj, '', '', 1, 262800, true, 'Invalid Lease Time:', 'Hours') == false) 
            return false;
    }
    
    if (ipv4Validate('tf1_priDnsServer', 'IP', true, true, "Invalid Primary DNS Server.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_secDnsServer', 'IP', true, true, "Invalid Secondary DNS Server.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_dhcpWinsSer', 'IP', true, true, "Invalid WINS Server.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_dhcpRelayGw', 'IP', false, true, "Invalid Gateway.", "for octet ", true) == false) 
        return false;
    
    var dnsMapHost = document.getElementById('tf1_dnsMappingHost');
    if (validateHostName(dnsMapHost, '') == false) 
        return false;
    
    if (ipv4Validate('tf1_dnsMappingIP', 'IP', false, true, "Invalid IP Address.", "for octet ", true) == false) 
        return false;
    
    return true;
    
}

/**
 * This function calls to check ip address range
 * @method checkIPAddrRange
 */
function checkIPAddrRange(){
    var startIpObj = document.getElementById('tf1_dhcpStartIp');
    var endIpObj = document.getElementById('tf1_dhcpEndIp');
    
    if (startIpObj && !startIpObj.disabled && endIpObj && !endIpObj.disabled) {
        var dhcpStart = getIPInt1('tf1_dhcpStartIp')
        var dhcpEnd = getIPInt1('tf1_dhcpEndIp');
        if (compareIP(dhcpStart, dhcpEnd) > 0) {
            alert("Ending IP Address should be higher than Starting IP Address");
            document.getElementById('tf1_dhcpStartIp').focus();
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
        fieldStateChangeWr('tf1_dhcpRelayGw', '', 'tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_defaultGateway tf1_priDnsServer tf1_secDnsServer tf1_dhcpWinsSer', '');
        vidualDisplay('tf1_dhcpRelayGw', 'hide');
        vidualDisplay('tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_priDnsServer tf1_secDnsServer tf1_dhcpWinsSer tf1_configuredns tf1_defaultGateway', 'configRow');
        vidualDisplay('break3 break4 break5 break7 break8 break9 break10 break11 break12', 'break');
        onConfigureDnsChange({
            imageId: 'tf1_configuredns',
            disableIndividual: 'tf1_priDnsServer tf1_secDnsServer tf1_dhcpWinsSer',
            disableGrp: '',
            enableIndividual: '',
            enableGrp: '',
            hideClass: 'hide',
            showClass: 'configRow',
            breakDivs: 'break9 break10 break11',
            breakClass: 'break',
            imagesInfo: {
                disableImages: '',
                enableImages: '',
                disableClass: '',
                enableClass: ''
            }
        });
    }
    else 
        if (isDhcpEnabled == 3) {//DHCP Relay
            fieldStateChangeWr('tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_priDnsServer tf1_secDnsServer tf1_dhcpWinsSer tf1_defaultGateway', '', 'tf1_dhcpRelayGw', '');
            vidualDisplay('tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_priDnsServer tf1_secDnsServer tf1_dhcpWinsSer tf1_configuredns tf1_defaultGateway', 'hide');
            vidualDisplay(' break3 break4 break5 break7 break8 break9 break10 break11 break12', 'hide');
            vidualDisplay('tf1_dhcpRelayGw', 'configRow');
            vidualDisplay('break12', 'break');
            
        }
        else {
            fieldStateChangeWr('tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_priDnsServer tf1_secDnsServer tf1_dhcpWinsSer tf1_dhcpRelayGw tf1_defaultGateway', '', '', '');
            vidualDisplay('tf1_dhcpLeaseTime tf1_dhcpStartIp tf1_dhcpEndIp tf1_priDnsServer tf1_secDnsServer tf1_dhcpWinsSer tf1_dhcpRelayGw tf1_configuredns tf1_defaultGateway', 'hide');
            vidualDisplay('break3 break4 break5 break7 break8 break9 break10 break11 break12', 'hide');
        }
}

/**
 This function is called always when image is clicked
 **/
function onConfigureDnsChange(data, thisObj){
    if (!thisObj || thisObj.id == "tf1_configuredns") {
        onImageToggle(data);
    }
}

/**
 Set jQuery function call
 **/
jQuery(function(){
    onloadCall(onConfigureDnsChange, {
        imageId: 'tf1_configuredns',
        disableIndividual: 'tf1_priDnsServer tf1_secDnsServer tf1_dhcpWinsSer',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break9 break10 break11',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    })
});

/**
 window onload call
 **/
window.onload = function(){
    dhcpCheck();
}
