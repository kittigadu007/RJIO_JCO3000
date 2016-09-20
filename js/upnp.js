/*
 * File: upnp.js
 * Created on 3rd Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
jQuery(function(){
    onloadCall(changeUPNPStatus, {
        imageId: 'tf1_enableUpnp',
        disableIndividual: 'tf1_txtAdvPeriod tf1_txtAdvTime',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_txtAdvPeriod break_txtAdvTime',
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
    changeUPNPStatus({
        imageId: 'tf1_enableUpnp',
        disableIndividual: 'tf1_txtAdvPeriod tf1_txtAdvTime',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_txtAdvPeriod break_txtAdvTime',
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
function changeUPNPStatus(toggleObj){
    onImageToggle(toggleObj);
}

function upNpOnReset(frmId) {

	resetImgOnOff(frmId);
    changeUPNPStatus({
        imageId: 'tf1_enableUpnp',
        disableIndividual: 'tf1_txtAdvPeriod tf1_txtAdvTime',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_txtAdvPeriod break_txtAdvTime',
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
 * @method upnpStatusCheck
 */
function upnpConfValidate(frmId){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtAdvPeriod,Please enter a valid Advertisement Period";
    txtFieldIdArr[1] = "tf1_txtAdvTime,Please enter a valid Advertisement Time To Live";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
   
	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

    var advObj = document.getElementById('tf1_txtAdvPeriod');
    if (advObj && !advObj.disabled) {
        if (numericValueRangeCheck(advObj, 1, "Please enter valid advertisement period.", 1, 86400, true, "Invalid advertisement period.", " in seconds.") == false) 
            return false;
    }
    
    var advObj = document.getElementById('tf1_txtAdvTime');
    if (advObj && !advObj.disabled) {
        if (numericValueRangeCheck(advObj, 1, "Please enter valid advertisement TTL.", 1, 255, true, "Invalid advertisement TTL.", " in hops.") == false) 
            return false;
    }
    setHiddenChks(frmId);
    return true;
}
