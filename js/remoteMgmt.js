/*
 * File: remoteMgmt.js
 * Created on 4th Jan 2013 - Bala krishna G
 * Modified on 8th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(enableRemoteMgmt, {
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_selAccessType tf1_txtRemoteFromAddr tf1_txtRemoteToAddr tf1_txtOnlyThisPC tf1_txtPort selAccessType',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_selAccessType break_txtRemoteFromAddr break_txtRemoteToAddr break_txtOnlyThisPC break_txtPort selAccessType',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    })
});

// On body load call the respective function
window.onload = function(){
    enableRemoteMgmt({
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_selAccessType tf1_txtRemoteFromAddr tf1_txtRemoteToAddr tf1_txtOnlyThisPC tf1_txtPort selAccessType',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_selAccessType break_txtRemoteFromAddr break_txtRemoteToAddr break_txtOnlyThisPC break_txtPort selAccessType',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
}

/**
 * Wrapper function called onload
 * @method changeDhcpStatus
 * @param obj
 */
function enableRemoteMgmt(toggleObj){
    onImageToggle(toggleObj);
    remoteMgmtAccessTypeCheck();
}

/* Reset function for form

*/

function remoteManagementOnReset(frmId) {

	resetImgOnOff(frmId);
	enableRemoteMgmt({
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_selAccessType tf1_txtRemoteFromAddr tf1_txtRemoteToAddr tf1_txtOnlyThisPC tf1_txtPort selAccessType',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_selAccessType break_txtRemoteFromAddr break_txtRemoteToAddr break_txtOnlyThisPC break_txtPort selAccessType',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });

	

}
/****
 * validate the form
 * OnClick validation
 * @method remoteMgmtValidation
 */
function remoteMgmtValidation(frmId){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtRemoteFromAddr, Please enter a valid From IP address.";
    txtFieldIdArr[1] = "tf1_txtRemoteToAddr, Please enter a valid IP address.";
    txtFieldIdArr[2] = "tf1_txtOnlyThisPC, Please enter a valid Ipv4 Address.";    
    txtFieldIdArr[3] = "tf1_txtPort, Please enter a valid Port";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;
    
    if (ipv4Validate("tf1_txtRemoteFromAddr", "IP", false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate("tf1_txtRemoteToAddr", "IP", false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipv4Validate("tf1_txtOnlyThisPC", "IP", false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
    if (ipRangeValidate("tf1_txtRemoteFromAddr", "tf1_txtRemoteToAddr", "", "") == false) 
        return false;
       
    var portObj = document.getElementById("tf1_txtPort");
    if (!portObj.disabled) {
        if (numericValueRangeCheck(portObj, "", "", 1, 65535, true, "", "") == false) 
            return false;
    }
    setHiddenChks (frmId);
    return true;
}

/****
 * This function is used to change IP Mode
 * OnChange validation
 * @method remoteMgmtAccessTypeCheck
 */
function remoteMgmtAccessTypeCheck(){
    var selValue = comboSelectedValueGet("tf1_selAccessType");
    if (!selValue) return;    
    switch (parseInt(selValue, 10)) {
        case 1:
            fieldStateChangeWr("tf1_txtRemoteFromAddr tf1_txtRemoteToAddr tf1_txtOnlyThisPC", "", "", "");
            vidualDisplay('tf1_txtRemoteFromAddr tf1_txtRemoteToAddr tf1_txtOnlyThisPC', 'hide');
            vidualDisplay('break_txtRemoteFromAddr break_txtRemoteToAddr break_txtOnlyThisPC', 'hide');
            break;
        case 3:
        	fieldStateChangeWr("tf1_txtOnlyThisPC", "", "tf1_txtRemoteToAddr tf1_txtRemoteFromAddr", "");
            vidualDisplay('tf1_txtOnlyThisPC', 'hide');
            vidualDisplay('break_txtOnlyThisPC', 'hide');
                
            vidualDisplay('tf1_txtRemoteToAddr tf1_txtRemoteFromAddr', 'configRow');
            vidualDisplay('break_txtRemoteToAddr break_txtRemoteFromAddr', 'break');                          
            break;
        case 2:
            fieldStateChangeWr("tf1_txtRemoteToAddr tf1_txtRemoteFromAddr", "", "tf1_txtOnlyThisPC", "");
            vidualDisplay('tf1_txtRemoteToAddr tf1_txtRemoteFromAddr', 'hide');
            vidualDisplay('break_txtRemoteToAddr break_txtRemoteFromAddr', 'hide');
                
            vidualDisplay('tf1_txtOnlyThisPC', 'configRow');
            vidualDisplay('break_txtOnlyThisPC', 'break'); 
            break;
    	}
}

