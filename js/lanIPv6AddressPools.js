/*
 * File: ipv6AddressPools.js
 * Created on 22nd nov 2012 - Laxmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
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
    
    if (ipv6Validate('tf1_txtIpv6StAddr', true, true, '') == false) 
        return false;
    
    if (ipv6Validate('tf1_txtIpv6EndAddr', true, true, '') == false) 
        return false;
    
    if (startEndCompare('tf1_txtIpv6StAddr', 'tf1_txtIpv6EndAddr') == false) {
        return false;
    }
    
    var preLenObj = document.getElementById('tf1_txtIpv6PrefLen');
    if (numericValueRangeCheck(preLenObj, '', '', 0, 128, true, 'Invalid Prefix Length', '') == false) 
        return false;
    
    return true;
}
