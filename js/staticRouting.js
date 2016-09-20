/*
 * File: staticRouting.js
 * Created on 28th March 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */

/**
 * function for validate form when user clicks on submit button
 * OnSubmit event
 * @method staticRoutingConfigValidate
 */
function staticRoutingConfigValidate(frmId){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtRouteName,Please enter valid Route Name.";
    txtFieldIdArr[1] = "tf1_txtDestIpAddr,Please enter valid Destination IP Address.";
    txtFieldIdArr[2] = "tf1_txtDestSnetMask,Please enter valid IP Subnet Mask.";
    txtFieldIdArr[3] = "tf1_txtGwIpAddr,Please enter the Gateway IP Address.";
    txtFieldIdArr[4] = "tf1_txtMetric,Please enter the Metric.";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

    /* added check for not allowing space as first character starts */
    var routeObj = document.getElementById('tf1_txtRouteName');
    if ( routeObj.value.charAt(0) == ' ' )
    {
         alert("Route Name cannot start with space character");
         routeObj.focus();
         return false;
    }
    /* added check for not allowing space as first character ends */

    var txtFieldIdArrRoute = new Array();
    txtFieldIdArrRoute[0] = "tf1_txtRouteName,Please enter valid Profile Name.";
     /* added to condition to prevent semicolon & pipe characters */
    if (isProblemCharArrayCheck(txtFieldIdArrRoute, "'\";|", "Following characters are not supported for this field:\r\ndouble quote( \" ), single quote( \' ), Pipe ( | ), Semi-Colon ( ; )") == false) 
        return false;
    /* added below condition to allow space for host name for the SPR-48304 additional comments */
   
    var txtFieldIdArrStatic = new Array();
    txtFieldIdArrStatic[0] = "tf1_txtDestIpAddr,Please enter valid Destination IP Address.";
    txtFieldIdArrStatic[1] = "tf1_txtDestSnetMask,Please enter valid IP Subnet Mask.";
    txtFieldIdArrStatic[2] = "tf1_txtGwIpAddr,Please enter the Gateway IP Address.";
    txtFieldIdArrStatic[3] = "tf1_txtMetric,Please enter the Metric.";

	if (isProblemCharArrayCheck(txtFieldIdArrStatic, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

    if (ipv4Validate('tf1_txtDestIpAddr', 'SN', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (validNetMask('tf1_txtDestSnetMask') == false) 
        return false;
    
    if (ipv4Validate('tf1_txtGwIpAddr', 'SN', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    var metricObj = document.getElementById('tf1_txtMetric');
    if (numericValueRangeCheck(metricObj, '', '', 2, 15, true, '', ' ') == false) 
        return false;

    setHiddenChks(frmId);
    return true;
}
