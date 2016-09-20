/*
 * File: radvd.js
 * Created on 10th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(changeRADVDStatus, {
        imageId: 'tf1_enableRADVD',
        disableIndividual: 'tf1_raManagedFlag tf1_raManagedFlagHid tf1_selAdvtMode tf1_txtAdvInterval tf1_routerPreference tf1_txtMTU tf1_txtRouterLifetime tf1_chkManagedFlag tf1_chkManagedFlagHid tf1_chkOtherFlag tf1_chkOtherFlagHid',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_raManagedFlag break_selAdvtMode break_txtAdvInterval break_routerPreference break_txtMTU break_txtRouterLifetime break_chkManagedFlag break_chkOtherFlag',
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
    changeRADVDStatus({
        imageId: 'tf1_enableRADVD',
        disableIndividual: 'tf1_raManagedFlag tf1_raManagedFlagHid tf1_selAdvtMode tf1_txtAdvInterval tf1_routerPreference tf1_txtMTU tf1_txtRouterLifetime tf1_chkManagedFlag tf1_chkManagedFlagHid tf1_chkOtherFlag tf1_chkOtherFlagHid',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_raManagedFlag break_selAdvtMode break_txtAdvInterval break_routerPreference break_txtMTU break_txtRouterLifetime break_chkManagedFlag break_chkOtherFlag',
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
function changeRADVDStatus(toggleObj){
    onImageToggle(toggleObj);
    checkMode();
}


/**
 * Wrapper function called reset
 * @method rdvdReset
 */
function rdvdReset(frmId){

	resetImgOnOff(frmId);
	
    changeRADVDStatus({
        imageId: 'tf1_enableRADVD',
        disableIndividual: 'tf1_raManagedFlag tf1_raManagedFlagHid tf1_selAdvtMode tf1_txtAdvInterval tf1_routerPreference tf1_txtMTU tf1_txtRouterLifetime tf1_chkManagedFlag tf1_chkManagedFlagHid tf1_chkOtherFlag tf1_chkOtherFlagHid',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_raManagedFlag break_selAdvtMode break_txtAdvInterval break_routerPreference break_txtMTU break_txtRouterLifetime break_chkManagedFlag break_chkOtherFlag',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
    checkMode();
     
}

/**
 * Validate MTU
 * @method checkMTU
 */
function checkMTU(){
    var mtuObj = document.getElementById('tf1_txtMTU');
    if (mtuObj.value != "0") 
        return numericValueRangeCheck(mtuObj, '', '', 1280, 1500, true, 'MTU must be 0 or', '');
    return true;
}

/**
 * Validate Router Lifetime
 * @method checkLifetime
 */
function checkLifetime(){
    var lifetimeObj = document.getElementById('tf1_txtRouterLifetime');
    if (lifetimeObj.value != "0") 
        return numericValueRangeCheck(lifetimeObj, '', '', 30, 9000, true, 'Lifetime value should be 0 or', '');
    return true;
}

/**
 * Validate Form
 * @method radvdValidate
 */
function radvdValidate(frmId){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtAdvInterval, Please enter a valid Advertise Interval.";
    txtFieldIdArr[1] = "tf1_txtMTU, Please enter a valid MTU.";
    txtFieldIdArr[2] = "tf1_txtRouterLifetime, Please enter a valid Router Lifetime.";

    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

    var myObj = document.getElementById('tf1_txtAdvInterval');
    if (numericValueRangeCheck(myObj, '', '', 10, 1800, true, '', 'seconds') == false) 
        return false;
    if (checkMTU() == false) 
        return false;
    if (checkLifetime() == false) 
        return false;
        
    setHiddenChks(frmId);
    return true;
}

/**
 * Manage input fields when select an option from Advertise Mode
 * @method checkMode
 */
function checkMode(){
    var selValue = comboSelectedValueGet('tf1_selAdvtMode');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1:
            fieldStateChangeWr('', '', 'tf1_txtAdvInterval', '');
            vidualDisplay('tf1_txtAdvInterval', 'configRow');
            vidualDisplay('break_txtAdvInterval', 'break');
            
            break;
        case 2:
            fieldStateChangeWr('tf1_txtAdvInterval', '', '', '');
            vidualDisplay('tf1_txtAdvInterval', 'hide');
            vidualDisplay('break_txtAdvInterval', 'hide');
            
            break;
    }
}
