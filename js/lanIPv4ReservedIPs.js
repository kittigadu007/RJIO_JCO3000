/*
 * File: lanDhcpReservedIpsConfig.js
 * TeamF1 Inc, 2012
 * Created on 9th Nov 2012 - Bala Krishna G
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */

var dhcpPoolMsg = "Reserved IP cannot be configured in DHCP Server address range pool of Vlan. Please configure different IP";

jQuery(function(){
    onloadCall();
});
/****
 * validate the form
 * @method pageValidate
 */

function pageValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_hostName,Please enter a valid Computer Name";
    txtFieldIdArr[1] = "tf1_ipAddr,Please enter a valid IP Address";
    txtFieldIdArr[2] = "tf1_macAddr,Please enter a valid MAC Address.";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

    /* added check for not allowing space as first character starts */
    var computerObj = document.getElementById('tf1_hostName');
    if ( computerObj.value.charAt(0) == ' ' )
    {
         alert("Computer Name cannot start with space character");
         computerObj.focus();
         return false;
    }
    /* added check for not allowing space as first character ends */

    var txtFieldIdArrName = new Array();
    txtFieldIdArrName[0] = "tf1_hostName,Please enter a valid Computer Name";
    /* added to condition to prevent semicolon & pipe characters */
    if (isProblemCharArrayCheck(txtFieldIdArrName, "'\";|", "Following characters are not supported for this field:\r\ndouble quote( \" ), single quote( \' ), Pipe ( | ), Semi-Colon ( ; )") == false) 
        return false;
    /* added below condition to allow space for host name for the SPR-48304 additional comments */
    var txtFieldIdArr1 = new Array();   
    txtFieldIdArr1[0] = "tf1_ipAddr,Please enter a valid IP Address";
    txtFieldIdArr1[1] = "tf1_macAddr,Please enter a valid MAC Address.";

	if (isProblemCharArrayCheck(txtFieldIdArr1, "'\" ", NOT_SUPPORTED) == false) 
        return false;    

    if (ipv4Validate('tf1_ipAddr', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    var macObj = document.getElementById('tf1_macAddr');
    if (macAddrValidate(macObj.value, true, "", '', macObj) == false) {
        macObj.focus();
        return false;
    }
    return true;
}
