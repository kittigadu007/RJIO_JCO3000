/*
 * File: dmzSetup.js
 * Created on 10th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(dmzSettingsOnload, {
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
    changeDhcpMode();
   
     
     
});
/**
 * @param data - image data
 * @param thisObj - currtent image id
 */
function dmzSettingsOnload(data, thisObj){
    onImageToggle(data);    
}
function dmzSettingsOnReset(frmId){

	resetImgOnOff(frmId);
    changeDhcpMode();     
    
    
}


var IP_ADDRESS = "Invalid IP address.";
var FOR_OCTET = "for octet";
var MESSAGE_1 = "Domain name don't support ending character as \\";
var INVALID_TIME = "Invalid Lease Time:";
var HOURS = "Hours";

/****
 * validate the form
 * @method dmzSetupValidate
 */
function dmzSetupValidate(frmId){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_ipv4_addr, Please enter a valid IP Address.";
    txtFieldIdArr[1] = "tf1_snet, Please enter a valid Subnet Mask.";
    txtFieldIdArr[2] = "tf1_ipv4_start, Please enter a valid Starting IP Address.";
    txtFieldIdArr[3] = "tf1_ipv4_end, Please enter a valid Ending IP Address.";
    txtFieldIdArr[4] = "tf1_ipv4_gateway,Please enter a valid Default Gateway.";
    txtFieldIdArr[5] = "tf1_lease_time,Please enter a valid Lease Time.";
    txtFieldIdArr[6] = "tf1_gateway,Please enter a Relay Gateway.";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
    
    if (ipv4Validate('tf1_ipv4_addr', 'IP', false, true, IP_ADDRESS, FOR_OCTET, true) == false) 
        return false;
    
    if (validNetMask('tf1_snet') == false) 
        return false;
    
    if (ipv4Validate('tf1_ipv4_start', 'IP', false, true, IP_ADDRESS, FOR_OCTET, true) == false) 
        return false;
    
    if (ipv4Validate('tf1_ipv4_end', 'IP', false, true, IP_ADDRESS, FOR_OCTET, true) == false) 
        return false;
    
    if (checkIPAddrRange('tf1_ipv4_start', 'tf1_ipv4_end') == false) 
        return false;
    
    if (ipv4Validate('tf1_ipv4_primary', 'IP', true, true, IP_ADDRESS, FOR_OCTET, true) == false) 
        return false;
    
    if (ipv4Validate('tf1_ipv4_secondary', 'IP', true, true, IP_ADDRESS, FOR_OCTET, true) == false) 
        return false;
    
    if (ipv4Validate('tf1_gateway', 'IP', false, true, IP_ADDRESS, FOR_OCTET, true) == false) 
        return false;
    
    var leaseTimeObj = document.getElementById('tf1_lease_time');
    if (leaseTimeObj && !leaseTimeObj.disabled) {
        if (numericValueRangeCheck(leaseTimeObj, '', '', 1, 262800, true, INVALID_TIME, HOURS) == false) 
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

/****
 * Domain Name Check
 * @method domainCheck
 */
function domainCheck(){
    var domain = document.getElementById('tf1_domain').value;
    var domainLength = domain.length;
    var lastChar = domain.charAt(domainLength - 1);
    var nextChar = domain.charAt(domainLength - 2);
    var errorstr = MESSAGE_1;
    if (lastChar == '\\' && nextChar != '\\') {
        alert(errorstr)
        return false;
    }
    return true;
}

function changeDhcpMode(){
    var selValue = comboSelectedValueGet('tf1_dhcpMode');
    
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1: /* None */
            fieldStateChangeWr('tf1_lease_time tf1_ipv4_start tf1_ipv4_end tf1_domain tf1_ipv4_secondary tf1_ipv4_gateway tf1_ipv4_primary tf1_gateway tt1_domain', '', '', '')
            
            vidualDisplay('tf1_lease_time tf1_ipv4_start tf1_ipv4_end tf1_domain tf1_ipv4_secondary tf1_ipv4_gateway tf1_ipv4_primary tf1_gateway tt1_domain', 'hide');
            vidualDisplay('break_lease_time break_ipv4_start break_ipv4_end break_domain break_ipv4_secondary break_ipv4_gateway break_ipv4_primary break_gateway break_domain', 'hide');
            break;
            
        case 2: /* Dhcp Server */
            fieldStateChangeWr('tf1_gateway', '', 'tf1_ipv4_start tf1_ipv4_end tf1_domain tf1_ipv4_gateway tf1_lease_time tf1_ipv4_primary tf1_ipv4_secondary');
            vidualDisplay('tf1_gateway', 'hide');
            vidualDisplay('break_gateway', 'hide');
            
            vidualDisplay('tf1_ipv4_start tf1_ipv4_end tf1_domain tf1_ipv4_gateway tf1_lease_time tf1_ipv4_primary tf1_ipv4_secondary', 'configRow');
            
            vidualDisplay('break_lease_time break_ipv4_start break_ipv4_end break_domain break_ipv4_secondary break_ipv4_gateway break_ipv4_primary', 'break');
            break;
            
        case 3: /* Dhcp Relay */
            fieldStateChangeWr('tf1_lease_time tf1_ipv4_start tf1_ipv4_end tf1_domain tf1_ipv4_secondary tf1_ipv4_gateway tf1_ipv4_primary tf1_gateway tf1_ipv4_primary', '', 'tf1_gateway');
            
            vidualDisplay('tf1_lease_time tf1_ipv4_start tf1_ipv4_end tf1_domain tf1_ipv4_secondary tf1_ipv4_gateway tf1_ipv4_primary tf1_gateway tf1_ipv4_primary', 'hide');
            
            vidualDisplay('break_lease_time break_ipv4_start break_ipv4_end break_domain break_ipv4_secondary break_ipv4_gateway break_ipv4_primary break_gateway break_ipv4_primary', 'hide');
            
            vidualDisplay('break_gateway', 'break');
            vidualDisplay('tf1_gateway', 'configRow');
            break;
    }
}
