/*
 * File: radiusConfig.js
 * Created on 4th Jan 2013 - bala krishan G
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Form Validation
 * @method radiusValidate
 */
function radiusValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtIpAddress,Please enter a valid IP Address for Primary Authentication Server.";
    txtFieldIdArr[1] = "tf1_txtAuthPort,Please enter a valid Authentication Port for Primary Authentication Server.";
    txtFieldIdArr[2] = "tf1_txtSecret,Please enter a valid Secret value for Primary Authentication Server.";
    txtFieldIdArr[3] = "tf1_txtTimeOut,Please enter a valid TimeOut value for Primary Authentication Server.";
    txtFieldIdArr[4] = "tf1_txtRetries,Please enter a valid Retries value for Primary Authentication Server.";
    txtFieldIdArr[5] = "tf1_txtIpAddress2,Please enter a valid IP Address for Secondary Authentication Server.";
    txtFieldIdArr[6] = "tf1_txtAuthPort2,Please enter a valid Authentication Port for Secondary Authentication Server.";
    txtFieldIdArr[7] = "tf1_txtSecret2,Please enter a valid Secret value for Secondary Authentication Server.";
    txtFieldIdArr[8] = "tf1_txtTimeOut2,Please enter a valid TimeOut value for Secondary Authentication Server.";
    txtFieldIdArr[9] = "tf1_txtRetries2,Please enter a valid Retries value for Secondary Authentication Server.";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
    
	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;
		
    if (ipv4Validate('tf1_txtIpAddress', 'IP', false, true, "Invalid IP address.", "for octet ", true) ==
    false) 
        return false;
    
    /* get and validate port */
    var obj = document.getElementById('tf1_txtAuthPort');
    if (numericValueRangeCheck(obj, '', '', 1, 65535, true, '', '') == false) 
        return false;

    var timeoutobj = document.getElementById('tf1_txtTimeOut');
    if (numericValueRangeCheck(timeoutobj, '', '', 1, 999, true, '', '') == false) 
        return false;

    var retryobj = document.getElementById('tf1_txtRetries');
    if (numericValueRangeCheck(retryobj, '', '', 1, 9, true, '', '') == false) 
        return false;
    
    
    if (ipv4Validate('tf1_txtIpAddress2', 'IP', false, true, "Invalid IP address.", "for octet ", true) ==
    false) 
        return false;
    
    /* get and validate port */
    var obj1 = document.getElementById('tf1_txtAuthPort2');
    if (numericValueRangeCheck(obj1, '', '', 1, 65535, true, '', '') == false) 
        return false;
    
    var timeoutobj2 = document.getElementById('tf1_txtTimeOut2');
    if (numericValueRangeCheck(timeoutobj2, '', '', 1, 999, true, '', '') == false) 
        return false;

    var retryobj2 = document.getElementById('tf1_txtRetries2');
    if (numericValueRangeCheck(retryobj2, '', '', 1, 9, true, '', '') == false) 
        return false;
    return true;
}
