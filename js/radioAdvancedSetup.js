/*
 * File: advancedWireless.js
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
    onloadCall();
});
/**
 * This function calls Page reset
 * OnReset
 * @method radioadvancedConfigOnReset
 */
function radioadvancedConfigOnReset(frmId){
	resetImgOnOff(frmId);
}
/**
 * Form Validation
 * @method advancedWirelessValidate
 */
function advancedWirelessValidate(frmId){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtBeconInt,Please enter a valid Beacon Interval";
    txtFieldIdArr[1] = "tf1_txtDtimInt,Please enter a valid Dtim Interval";
    txtFieldIdArr[2] = "tf1_txtRTSThld,Please enter a valid RTS Threshold";
    txtFieldIdArr[3] = "tf1_txtFgmThld,Please enter a valid Fragmentation Threshold";
    txtFieldIdArr[4] = "tf1_txtTrmPwrGain,Please enter a valid Transmit Power Gain";
    txtFieldIdArr[5] = "tf1_txtShortRetryLmit,Please enter a valid Short Retry Limit";
    txtFieldIdArr[6] = "tf1_txtLongRetryLmit,Please enter a valid Long Retry Limit";
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;

    var myObj = document.getElementById('tf1_txtBeconInt');
    if (numericValueRangeCheck(myObj, '', '', 20, 1000, true, '', 'Milliseconds') == false) 
        return false;
    
    myObj = document.getElementById('tf1_txtDtimInt');
    if (numericValueRangeCheck(myObj, '', '', 1, 255, true, '', '') == false) 
        return false;
    
    myObj = document.getElementById('tf1_txtRTSThld');
    if (numericValueRangeCheck(myObj, '', '', 256, 2347, true, '', '') == false) 
        return false;
    
    myObj = document.getElementById('tf1_txtFgmThld');
    if (numericValueRangeCheck(myObj, '', '', 257, 2346, true, '', '') == false) 
        return false;
    
    myObj = document.getElementById('tf1_txtTrmPwrGain');
    if (numericValueRangeCheck(myObj, '', '', -30, 5, true, '', 'dbm') == false) 
        return false;
    
    myObj = document.getElementById('tf1_txtShortRetryLmit');
    if (numericValueRangeCheck(myObj, '', '', 0, 128, true, '', '') == false) 
        return false;
    
    myObj = document.getElementById('tf1_txtLongRetryLmit');
    if (numericValueRangeCheck(myObj, '', '', 0, 128, true, '', '') == false) 
        return false;
    
    setHiddenChks(frmId);
    return true;
}
