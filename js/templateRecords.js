/*
 * File: firewallRules.js
 * Created on 26th Nov 2012 - Laxmi
 * Modified on 30th Nov 2012 - Laxmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
$(document).ready(function(){
    onloadCall();
    FromZoneTypeChange('tf1_fromZone');
    toZoneTypeChange('tf1_toZone');
    firewallActionCheck('tf1_action');
    dropFieldSelectSrc('tf1_sourceHost');
    dropFieldSelectDest('tf1_destinationHost');
});

/**
 * function for validate form when user clicks on submit button
 * OnSubmit event
 * @method firewallRulesValidate
 */
function firewallRulesValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_schedule, Please select Schedule";
    txtFieldIdArr[1] = "tf1_sourceHostFrom,Please enter valid Source From IP Address";
    txtFieldIdArr[2] = "tf1_sourceHostTo,Please enter valid Source To IP Address";
    txtFieldIdArr[3] = "tf1_destinationHostFrom,Please enter valid Destination From IP Address";
    txtFieldIdArr[4] = "tf1_destionationHostTo,Please enter valid Destination to IP Address";
    txtFieldIdArr[5] = "tf1_singleIpAddress,Please enter valid Nat Single IP Address";
    txtFieldIdArr[6] = "tf1_internalIpAddress,Please enter valid Internal IP Address";
    txtFieldIdArr[7] = "tf1_txtTranslatePortNum,Please enter valid Translate Port Number";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
    
    if (numericValueRangeCheck(document.getElementById('tf1_txtTranslatePortNum'), '', '', 0, 65535, true, 'Invalid Port Range', '') == false) 
        return false;
    
    if (ipv4Validate('tf1_sourceHostFrom', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_sourceHostTo', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipRangeValidate('tf1_sourceHostFrom', 'tf1_sourceHostTo') == false) 
        return false;
    
    if (ipv4Validate('tf1_destinationHostFrom', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_destionationHostTo', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipRangeValidate('tf1_destinationHostFrom', 'tf1_destionationHostTo') == false) 
        return false;
    
    if (ipv4Validate('tf1_singleIpAddress', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate('tf1_internalIpAddress', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    return true;
}

/**
 * function for removing To zone data
 * OnChange event
 * @method deleteOptions
 * @param selObj - ToZone
 */
function deleteOptions(selObj){
    while (selObj.options.length != 0) 
        selObj.options[0] = null;
}

/**
 * function for update To zone based on From Zone
 * OnChange event
 * @method updateToZones
 */
var zonesLst = ["SECURE", "INSECURE", "PUBLIC"];
function updateToZones(){
    var fromZoneVal = comboSelectedValueGet('tf1_fromZone');
    if (!fromZoneVal) 
        return;
    var toZoneObj = document.getElementById('tf1_toZone');
    if (!toZoneObj) 
        return;
    deleteOptions(toZoneObj);
    for (idx = 0, i = 0; i < zonesLst.length; i++) {
        if (fromZoneVal != zonesLst[i]) {
            var zoneName = zonesLst[i];
            if (zoneName == "SECURE") 
                zoneName += " (LAN)"
            else 
                if (zoneName == "INSECURE") 
                    zoneName += " (Dedicated WAN/Configurable WAN/WAN3 (3G Internet))";
                else 
                    if (zoneName == "PUBLIC") 
                        zoneName = "DMZ"
            toZoneObj.options[idx++] = new Option(zoneName, zonesLst[i], false, false);
        }
    }
    toZoneObj.options[idx++] = new Option("SECURE (VLAN)", "SECURE_VLAN", false, false);
    FromZoneTypeChange('tf1_fromZone');
}

/****
 * This function calls when user selects an option from select box
 * OnChange event
 * @method FromZoneTypeChange
 * @param selName - Select box Name
 */
function FromZoneTypeChange(selName){
    var selValue = comboSelectedValueGet(selName);
    if (!selValue) 
        return;
    switch (selValue) {
        case 'SECURE':
            /* SECURE (LAN) */
            fieldStateChangeWr('tf1_availableFromVLAN tf1_internalIpAddress tf1_enablePortForwarding tf1_txtTranslatePortNum', 'tf1_destExternalIpAddress_div', 'tf1_qosPriority', '');
            vidualDisplay('tf1_availableFromVLAN tf1_internalIpAddress tf1_enablePortForwarding tf1_txtTranslatePortNum tf1_destExternalIpAddress tf1_sourceNATSettings tf1_destinationNATSettings', 'hide');
            vidualDisplay('break1 break7', 'hide');
            vidualDisplay('tf1_qosPriority', 'configRow');
            break;
        case 'SECURE_VLAN':
            /* SECURE (VLAN) */
            fieldStateChangeWr('tf1_qosPriority', 'tf1_destinationNATSettings', 'tf1_availableFromVLAN', '');
            vidualDisplay('tf1_qosPriority tf1_destinationNATSettings', 'hide');
            
            vidualDisplay('tf1_availableFromVLAN', 'configRow');
            vidualDisplay('break1', 'break');
            break;
        case 'INSECURE':
            /* INSECURE (Option) */
            fieldStateChangeWr('tf1_availableFromVLAN tf1_qosPriority tf1_destinationHostFrom tf1_destinationHostTo tf1_internalIpAddress tf1_enablePortForwarding tf1_txtTranslatePortNum', 'tf1_destinationHost_div', '', 'tf1_destExternalIpAddress_div');
            vidualDisplay('tf1_availableFromVLAN tf1_qosPriority tf1_destinationHost tf1_destinationHostFrom tf1_destionationHostTo tf1_internalIpAddress tf1_enablePortForwarding tf1_txtTranslatePortNum', 'hide');
            
            vidualDisplay(' tf1_destinationNATSettings tf1_destExternalIpAddress', 'configRow');
            vidualDisplay('break1 break11 break12 break15 break19 break20', 'hide');
            break;
        case 'PUBLIC':
            /* DMZ */
            fieldStateChangeWr('tf1_availableFromVLAN tf1_qosPriority tf1_internalIpAddress tf1_enablePortForwarding tf1_txtTranslatePortNum', 'tf1_destExternalIpAddress_div', '', 'tf1_destinationHost_div');
            vidualDisplay('tf1_availableFromVLAN tf1_qosPriority tf1_internalIpAddress tf1_enablePortForwarding tf1_txtTranslatePortNum tf1_destinationNATSettings', 'hide');
            vidualDisplay('tf1_destinationHost', 'configRow');
            break;
    }
}

/****
 * This function calls when user selects an option from select box
 * OnChange event
 * @method toZoneTypeChange
 * @param selName - Select box Name
 */
function toZoneTypeChange(selName){
    var selValue = comboSelectedValueGet(selName);
    if (!selValue) 
        return;
    switch (selValue) {
        case 'INSECURE':
        /* INSECURE (Option) */
        case 'PUBLIC':
        /* DMZ */
        case 'SECURE':
            /* SECURE (LAN) */
            fieldStateChangeWr('tf1_availableToVLAN', '', '', '');
            vidualDisplay('tf1_availableToVLAN', 'hide');
            //vidualDisplay ('tf1_qosPriority', 'configRow');
            vidualDisplay('break3', 'hide')
            break;
        case 'SECURE_VLAN':
            /* SECURE (VLAN) */
            fieldStateChangeWr('', '', 'tf1_availableToVLAN', '');
            //vidualDisplay ('tf1_qosPriority', 'hide');
            vidualDisplay('tf1_availableToVLAN', 'configRow')
            vidualDisplay('break3 break4', 'break')
            break;
    }
}

/****
 * This function calls when user selects an option from select box
 * OnChange event
 * @method firewallActionCheck
 * @param selName - Select box Name
 */
function firewallActionCheck(selName){
    var selValue = comboSelectedValueGet(selName);
    //alert(selValue);
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1:
            /* Service / IP */
            fieldStateChangeWr('tf1_schedule tf1_singleIpAddress', 'tf1_externalIpAddress_div tf1_optionInterface_div', '', '');
            vidualDisplay('tf1_sourceNATSettings tf1_schedule tf1_singleIpAddress tf1_externalIpAddress tf1_optionInterface', 'hide');
            break;
        case 2:
            fieldStateChangeWr('tf1_schedule tf1_singleIpAddress', '', '', 'tf1_externalIpAddress_div tf1_optionInterface_div');
            vidualDisplay('tf1_schedule tf1_singleIpAddress', 'hide');
            vidualDisplay('tf1_sourceNATSettings tf1_externalIpAddress tf1_optionInterface', 'configRow');
            vidualDisplay('break16', 'hide');
            break;
        case 3:
        case 4:
            /* Mac Address */
            fieldStateChangeWr('tf1_singleIpAddress', '', 'tf1_schedule', 'tf1_externalIpAddress_div tf1_optionInterface_div');
            vidualDisplay('tf1_singleIpAddress', 'hide');
            vidualDisplay('tf1_schedule tf1_externalIpAddress tf1_optionInterface', 'configRow');
            vidualDisplay('break7', 'break');
            break;
    }
}

/****
 * This function calls when user selects an option from select box
 * OnChange event
 * @method dropFieldSelectSrc
 * @param radioName - Radio box Name
 */
function dropFieldSelectSrc(radioName){
    var selValue = radioCheckedValueGet(radioName);
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1:
            /* Service / IP */
            fieldStateChangeWr('tf1_sourceHostFrom tf1_sourceHostTo', '', '', '');
            vidualDisplay('tf1_sourceHostFrom tf1_sourceHostTo', 'hide');
            vidualDisplay('break8 break9', 'hide');
            break;
        case 2:
            fieldStateChangeWr('tf1_sourceHostTo', '', 'tf1_sourceHostFrom', '');
            vidualDisplay('tf1_sourceHostTo', 'hide');
            vidualDisplay('break8 break9', 'hide');
            vidualDisplay('tf1_sourceHostFrom', 'configRow');
            break;
        case 3:
            /* Mac Address */
            fieldStateChangeWr('', '', 'tf1_sourceHostFrom tf1_sourceHostTo', '');
            vidualDisplay('tf1_sourceHostFrom tf1_sourceHostTo', 'configRow');
            vidualDisplay('break9', 'break');
            break;
    }
}

/****
 * This function calls when user selects an option from radio Button
 * Onclick event
 * @method dropFieldSelectDest
 * @param radioName - Radio box Name
 */
function dropFieldSelectDest(radioName){
    var selValue = radioCheckedValueGet(radioName);
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1:
            /* Service / IP */
            fieldStateChangeWr('tf1_destinationHostFrom tf1_destionationHostTo', '', '', '');
            vidualDisplay('tf1_destinationHostFrom tf1_destionationHostTo', 'hide');
            vidualDisplay('break11 break12', 'hide');
            break;
        case 2:
            fieldStateChangeWr('tf1_destionationHostTo', '', 'tf1_destinationHostFrom', '');
            vidualDisplay('tf1_destionationHostTo', 'hide');
            vidualDisplay('break11 break12', 'hide');
            vidualDisplay('tf1_destinationHostFrom', 'configRow');
            break;
        case 3:
            /* Mac Address */
            fieldStateChangeWr('', '', 'tf1_destinationHostFrom tf1_destionationHostTo', '');
            vidualDisplay('tf1_destinationHostFrom tf1_destionationHostTo', 'configRow');
            vidualDisplay('break12', 'break');
            break;
    }
}

/****
 * This function calls when user selects an option from Radio Button
 * OnClick event
 * @method dropFieldSelectNAT
 * @param radioName - Radio box Name
 */
function dropFieldSelectNAT(radioName){
    var selValue = radioCheckedValueGet(radioName);
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1:
            /* Option Interface Address */
            fieldStateChangeWr('tf1_singleIpAddress', '', '', 'tf1_optionInterface');
            vidualDisplay('tf1_singleIpAddress', 'hide');
            vidualDisplay('tf1_optionInterface', 'configRow');
            break;
            
        case 2:
            /*Single Address*/
            fieldStateChangeWr('', 'tf1_optionInterface', 'tf1_singleIpAddress', '');
            vidualDisplay('tf1_optionInterface', 'hide');
            vidualDisplay('tf1_singleIpAddress', 'configRow');
            break;
    }
}
