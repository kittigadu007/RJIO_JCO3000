/*
 * File: imsDomains.js
 * Created on 4th Jan 2013 - Saikumar D
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
 

 
/***************************************************************************
 * isProblemCharCheck - Checks if the field has any unsupported characters
 *
 * This routine checks for the unsupported characters in the value entered
 * for the field.
 * 
 * @param: fldId - Id of the Field, notSupportedChars - Characters that are
 * not supported for this field (provided as an array), errMsg - Error Message
 * @return: TRUE / FALSE
 */
function isProblemCharCheck (fldId, notSupportedChars, errMsg) {
    var fldObj =  document.getElementById(fldId);
    if (notSupportedChars.length > 0 ) {
        for (var i = 0; i < notSupportedChars.length; i++) {
            var charUnicode = notSupportedChars[i];
            if (fldObj.value.indexOf (charUnicode) != -1) {
                if (errMsg) {
                    alert (errMsg);
                }
                return false;
            }
        }
    }
    return true;
}

/****
 * This function  checks for imsDoman form validation
 * OnClick validation
 * @method imsDomainValidate
 */
function imsDomainValidate()
 {
 
	var txtFieldIdArr = new Array();

  	txtFieldIdArr[0] = "tf1_txtHostName,Please enter a valid Host Name";
	txtFieldIdArr[1] = "tf1_txtIpAddr,Please enter a valid IP Address";

	if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
    
    /* added check for not allowing space as first character starts */
    var hostObj = document.getElementById('tf1_txtHostName');
    if ( hostObj.value.charAt(0) == ' ' )
    {
         alert("Host Name cannot start with space character");
         hostObj.focus();
         return false;
    }
    /* added check for not allowing space as first character ends */

    /* added to condition to prevent semicolon & pipe characters */
 	if (isProblemCharArrayCheck(txtFieldIdArr, "'\";|", "Following characters are not supported for this field:\r\ndouble quote( \" ), single quote( \' ), Pipe ( | ), Semi-Colon ( ; )") == false) 
        return false;
 		
	var hostNameId = 'tf1_txtHostName';
	var ipAddrid ='tf1_txtIpAddr';
	var hostNameObj = document.getElementById(hostNameId);
    var ipAddrObj = document.getElementById(ipAddrid);
        if (hostNameObj.value == '') {
                
            alert("Please enter HostName");
            hostNameObj.focus();
            return false;

            }
       if (ipAddrObj.value == '') {
                
            alert("Please enter IP Address");
            ipAddrObj.focus();
            return false;

            }
		
		if (hostNameObj.value != "")
			{
			if (ipAddrObj.value == "")
				{
				errStr = "Please enter valid IP Address for the Host Name";
	     		alert(errStr);
	     		ipAddrObj.focus ();
	     		return false;
				}
			else
				{
				if (ipv4Validate (ipAddrid, 'IP', false, true,"Invalid IP address.", "for octet ", true) == false)
    				return false;
				}
			}
		else
			{
			if (ipAddrObj.value != "")
				{
				errStr = "Please enter valid Host Name for the IP Address";
     			alert(errStr);
     			hostNameObj.focus ();
     			return false;
				}
			}
 	return true;
 } 
