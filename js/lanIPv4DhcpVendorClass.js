/*
 * File: lanIPv4DhcpVendorClass.js
 * Created on 5th August 2013 - Bala Krishna G
 * Copyright (c) 2013 TeamF1, Inc.
 * All rights reserved.
 */

/**
 * Form Validation
 * @method pageValidate
 */
function pageValidate(frmId){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_classId,Please enter valid Class ID.";
    txtFieldIdArr[1] = "tf1_numberOfLeases,Please enter Number of Leases.";
    txtFieldIdArr[2] = "tf1_startIpAddress,Please enter Valid Start IP Address";

    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
	
	var txtFieldIdArr2 = new Array();
    txtFieldIdArr2[0] = "tf1_classId,Please enter valid Class ID.";
	if (isProblemCharArrayCheck(txtFieldIdArr2, "'\"", "Following characters are not supported for this field:\r\ndouble quote( \" ), single quote( \' )") == false) 
        return false;
	
	var txtFieldIdArr3 = new Array();
    txtFieldIdArr3[0] = "tf1_numberOfLeases,Please enter Number of Leases.";
    txtFieldIdArr3[1] = "tf1_startIpAddress,Please enter Valid Start IP Address";

    if (isProblemCharArrayCheck1(txtFieldIdArr3) == false) 
        return false;
    
    if (ipv4Validate('tf1_startIpAddress', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    return true;
}
