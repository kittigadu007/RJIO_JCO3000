/*
 * File: prefixConfig.js
 * Created on 3rd Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    checkType();
});

/**
 * Form Validation
 * @method pageValidate
 */
function prefixValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtIntName,Please enter a valid IPv4 Interface Name";
    txtFieldIdArr[1] = "tf1_txtSlaId,Please enter a valid SLA ID";
    txtFieldIdArr[2] = "tf1_txtPrefix,Please enter a valid IPv6 Prefix";
    txtFieldIdArr[3] = "tf1_txtIpv6PreLen,Please enter a valid IPv6 Prefix Length";
    txtFieldIdArr[4] = "tf1_txtPrefLifeTime,Please enter a valid Prefix Lifetime";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

    var slaObj = document.getElementById('tf1_txtSlaId');
    if (numericValueRangeCheck(slaObj, '', '', 0, 999, true, '', '') == false) 
        return false;
    
    if (ipv6Validate('tf1_txtPrefix', false, true, '') == false) 
        return false;
    
    var preObj = document.getElementById('tf1_txtIpv6PreLen');
    if (numericValueRangeCheck(preObj, '', '', 0, 128, true, '', '') == false) 
        return false;
    
    var lifeObj = document.getElementById('tf1_txtPrefLifeTime');
    if (numericValueRangeCheck(lifeObj, '', '', 5, 65536, true, '', '') == false) 
        return false;
    return true;
}

/**
 * Manage Input fields when select an option from IPv6 Prefix Type
 * @method pageValidate
 */
function checkType(){
    var selectedVal = comboSelectedValueGet('tf1_selPrefixType');
    if (!selectedVal) 
        return;
    if (parseInt(selectedVal, 10) == 1) {
        fieldStateChangeWr('tf1_txtPrefix tf1_txtIpv6PreLen', '', 'tf1_txtIntName tf1_txtSlaId', '');
        vidualDisplay('tf1_txtPrefix tf1_txtIpv6PreLen', 'hide');
        vidualDisplay('break_txtPrefix break_txtIpv6PreLen', 'hide');
        vidualDisplay('tf1_txtIntName tf1_txtSlaId', 'configRow');
        vidualDisplay('break_txtIntName break_txtSlaId', 'break');
    }
    else {
        fieldStateChangeWr('tf1_txtIntName tf1_txtSlaId', '', 'tf1_txtPrefix tf1_txtIpv6PreLen', '');
        vidualDisplay('tf1_txtPrefix tf1_txtIpv6PreLen', 'configRow');
        vidualDisplay('break_txtPrefix break_txtIpv6PreLen', 'break');
        vidualDisplay('tf1_txtIntName tf1_txtSlaId', 'hide');
        vidualDisplay('break_txtIntName break_txtSlaId', 'hide');
    }
    
}
