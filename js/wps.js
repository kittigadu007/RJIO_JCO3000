/*
 * File: wps.js
 * Created on 8th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
jQuery(function(){
    onloadCall(enableWPSStatus, {
        imageId: 'tf1_enableWPSStatus',
        disableIndividual: 'tf1_txtPINNum tf1_btPINNum tf1_btPInPbc tf1_wpsSetupSubmit',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_txtPINNum break_btPINNum break_btPInPbc break_wpsSetupSubmit',
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
    enableWPSStatus({
        imageId: 'tf1_enableWPSStatus',
        disableIndividual: 'tf1_txtPINNum tf1_btPINNum tf1_btPInPbc tf1_wpsSetupSubmit',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_txtPINNum break_btPINNum break_btPInPbc break_wpsSetupSubmit',
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
function enableWPSStatus(toggleObj){
    onImageToggle(toggleObj);
}
/**
 * Wrapper function called onReset
 * @method wpsOnReset
 */
function wpsOnReset(frmId){

	resetImgOnOff(frmId);
	enableWPSStatus({
        imageId: 'tf1_enableWPSStatus',
        disableIndividual: 'tf1_txtPINNum tf1_btPINNum tf1_btPInPbc tf1_wpsSetupSubmit',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_txtPINNum break_btPINNum break_btPInPbc break_wpsSetupSubmit',
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
 * Form Validation
 * @method vapConfigValidate
 */
function pageValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtPINNum,Please enter the PIN";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;

    var pinValue = document.getElementById('tf1_txtPINNum').value;
    if (pinValue.length % 4 != 0) {
        var errStr = "Station PIN length is a multiple of 4."
        alert(errStr);
        document.getElementById('tf1_txtPINNum').focus();
        return false;
    }
    
    if (isNaN(pinValue)) {
        alert(errStr);
        document.getElementById('tf1_txtPINNum').focus();
        return false;
    }
    
    return true;
}

function wpsStatusCheck(){
    var selValue = comboSelectedValueGet('tf1_selStatus');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1:
            fieldStateChangeWr('tf1_txtPINNum tf1_btPINNum tf1_btPInPbc', '', '', '');
            vidualDisplay('tf1_txtPINNum tf1_btPINNum tf1_btPInPbc', 'hide');
            vidualDisplay('break_txtPINNum break_btPINNum break_btPInPbc', 'hide');
            break;
        case 2:
            fieldStateChangeWr('', '', 'tf1_txtPINNum tf1_btPINNum tf1_btPInPbc', '');
            vidualDisplay('tf1_txtPINNum tf1_btPINNum tf1_btPInPbc', 'configRow');
            vidualDisplay('break_txtPINNum break_btPINNum break_btPInPbc', 'break');
            
            break;
    }
    
}
