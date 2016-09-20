/*
 * File: dmzDhcpReservedIpsConfig.js
 * TeamF1 Inc, 2012
 * Created on 10th Jan 2013 - Lakshmi
 */
/****
 * validate the form
 * @method pageValidate
 */
var dhcpPoolMsg = "Reserved IP cannot be configured in DHCP Server address range pool of Vlan. Please configure different IP";
function pageValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_ipAddr,Please enter a valid IP Address";
    txtFieldIdArr[1] = "tf1_macAddr,Please enter a valid MAC Address.";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
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
