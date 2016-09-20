/*
 * File: wanConfigIPv6.js
 * Modified on 3rd Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall();
    ipAddrCheck();    
});
/**
 * @param data - image data
 * @param thisObj - currtent image id
 */
function wan1SetupOnload(data, thisObj){
    onImageToggle(data);    
}

function wanIpv6ConfigOnReset(frmId){

	resetImgOnOff(frmId);
  	ipAddrCheck();
   
}

/**
 * This function calls when page submits
 * Onsubmit validation
 * @method wanSetupValidate
 */
function wanSetupValidate(frmId){
    ipModeObj = document.getElementById('isDisable');
    if (ipModeObj) 
        ipModeObjVal = ipModeObj.value;
    if (parseInt(ipModeObjVal, 10) == 1) 
        return false;
    
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_ipV6Addr, Please enter a valid IPv6 Address";
    txtFieldIdArr[1] = "tf1_ipV6AddrPrefixLength,Please enter a valid Prefix Length";
    txtFieldIdArr[2] = "tf1_ipV6AddrGateway,Please enter a valid Default IPv6 Gateway";
    txtFieldIdArr[3] = "tf1_staticPrimaryDns, Please enter a valid Primary DNS Server";
    txtFieldIdArr[4] = "tf1_staticSecondaryDns, Please enter a valid Secondary DNS Server";

    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
    
    if (isProblemCharArrayCheck1(txtFieldIdArr) == false) 
        return false;
    
    if (ipv6Validate('tf1_ipV6Addr', false, true, '') == false) 
        return false;
    
    var preLenObj = document.getElementById('tf1_ipV6AddrPrefixLength');
    if (numericValueRangeCheck(preLenObj, '', '', 0, 128, true, '', '') == false) 
        return false;
    
    if (ipv6Validate('tf1_staticPrimaryDns', true, true, '') == false) 
        return false;
    
    if (ipv6Validate('tf1_staticSecondaryDns', true, true, '') == false) 
        return false;
    
    var tblWi1IpAddrObj = document.getElementById('tf1_ipV6Addr');
    if (tblWi1IpAddrObj && tblWi1IpAddrObj.disabled == false) {
        if (ipv6SubnetValidation1('tf1_ipV6Addr', 'tf1_ipV6AddrPrefixLength', 'tf1_ipV6AddrGateway') == false) {
            alert("IP address and Gateway IP should be in the same subnet.");
            return false;
        }
    }
    setHiddenChks(frmId);
    return true;
}

/**
 * Manage input fields when select an option form IPv6
 * Onchange validation
 * @method ipAddrCheck
 */
function ipAddrCheck(){
    var selValue = comboSelectedValueGet('tf1_ispType');
    if (!selValue) 
        return;
    switch (selValue) {
        case 'ifStatic6': /* Use Static IP Address */
            //Just Disable all input/select fields
            fieldStateChangeWr('tf1_dhcpV6SatelessMode1 tf1_dhcpV6SatelessMode2 tf1_prefixDeleg tf1_prefixDelegHid', '', '', '');
            
            vidualDisplay('tf1_dhcpV6SatelessMode1 tf1_dhcpV6SatelessMode2 tf1_prefixDeleg tf1_DHCPV6Block', 'hide');
            
            vidualDisplay('break_dhcpV6SatelessMode1 break_dhcpV6SatelessMode2 break_prefixDeleg', 'hide');
            
            //Just Enable all input/select fields
            fieldStateChangeWr('', '', 'tf1_ipV6Addr tf1_ipV6AddrPrefixLength tf1_ipV6AddrGateway tf1_staticPrimaryDns tf1_staticSecondaryDns', '');
            
            vidualDisplay('tf1_ipV6Addr tf1_ipV6AddrPrefixLength tf1_ipV6AddrGateway tf1_staticPrimaryDns tf1_staticSecondaryDns tf1_staticIPAddressBlock', 'configRow');
            
            vidualDisplay('break_ipV6Addr break_ipV6AddrPrefixLength break_ipV6AddrGateway break_staticPrimaryDns break_staticSecondaryDns', 'break');
            
            //enablePrefix();
            
            break;
        case 'dhcp6c': /* Get Dynamically from ISP */
        default:
            //Just Disable all input/select fields
            fieldStateChangeWr('tf1_ipV6Addr tf1_ipV6AddrPrefixLength tf1_ipV6AddrGateway tf1_staticPrimaryDns tf1_staticSecondaryDns', '', '', '');
            
            vidualDisplay('tf1_ipV6Addr tf1_ipV6AddrPrefixLength tf1_ipV6AddrGateway tf1_staticPrimaryDns tf1_staticSecondaryDns tf1_staticIPAddressBlock', 'hide');
            
            vidualDisplay('break_ipV6Addr break_ipV6AddrPrefixLength break_ipV6AddrGateway break_staticPrimaryDns break_staticSecondaryDns', 'hide');
            
            //Just Enable all input/select fields
            fieldStateChangeWr('', '', 'tf1_dhcpV6SatelessMode1 tf1_dhcpV6SatelessMode2 tf1_prefixDeleg tf1_prefixDelegHid', '');
            
            vidualDisplay('tf1_dhcpV6SatelessMode1 tf1_dhcpV6SatelessMode2 tf1_prefixDeleg tf1_DHCPV6Block', 'configRow');
            
            vidualDisplay('break_dhcpV6SatelessMode1 break_dhcpV6SatelessMode2 break_prefixDeleg', 'break');
            
            //enablePrefix();
            
            break;
    }
}

/**
 * Manage input fields when select an option form statelessMode
 * Onclick validation
 * @method enablePrefix
 */
function enablePrefix(){
    var selectedMode = radioCheckedValueGet('tf1_dhcpV6SatelessMode1');
    if (!selectedMode || isNaN(selectedMode)) 
        return;
    if (parseInt(selectedMode, 10) == 1) {
        fieldStateChangeWr('', '', 'tf1_prefixDeleg tf1_prefixDelegHid', '');
        vidualDisplay('tf1_prefixDeleg', 'configRow');
        vidualDisplay('break_prefixDeleg', 'break');
        
    }
    else {
        fieldStateChangeWr('tf1_prefixDeleg tf1_prefixDelegHid', '', '', '');
        vidualDisplay('tf1_prefixDeleg', 'hide');
        vidualDisplay('break_prefixDeleg', 'hide');
        
    }
}

