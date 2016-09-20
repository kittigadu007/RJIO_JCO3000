/*
 * File: lanIPv4Setup.js
 * Created on 18th April 2014 - suresh g
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */

/**
 * Select box onchange event
 * @method wanPortType
 * This function calls when user selects drop down item from "WAN Port Type" select box
 */
function accessLevelCheck(){
    var accessLevel = '';
    if (!accessLevel || isNaN(accessLevel)) 
        return true;
    if (parseInt(accessLevel, 10) != 0) {
        alert("Administrator privilages required");
        return false;
    }
    return true;
}

function pageValidate(frmId) {
	var txtFieldIdArr = new Array();
	txtFieldIdArr[0] = "tf1_vlanId,Please enter a valid VLAN ID";

	if (txtFieldArrayCheck(txtFieldIdArr) == false)
		return false;

	if (!isProblemChar(txtFieldIdArr, " '\"", "Invalid Characters") == false)
		return false;

	var vlanId1Obj = document.getElementById('tf1_vlanId');
	if (vlanId1Obj && !vlanId1Obj.disabled) {
    /* added changes for GPON VLAN ID starts */
    var brcmcheckobj = document.getElementById('tf1_hid_BRCMJCO300Check');
    if(brcmcheckobj && brcmcheckobj.value == "1"){
      message = "Invalid GPON VLAN ID."
    }
    else{
      message = "Invalid VLAN ID."
    }
    /* added changes for GPON VLAN ID ends */
		if (numericValueRangeCheck(vlanId1Obj, "", "", 1, 4094, true, message, "") == false)
			return false;
	}

	setHiddenChks(frmId);
	return true;

}


function wanPortTypeFn() {
    var iswanPortTypeEnabled = parseInt(comboSelectedValueGet('tf1_wanPortType1'), 10);
    if (iswanPortTypeEnabled == 1) {//Ethernet
    	fieldStateChangeWr('tf1_serialNumber tf1_slId tf1_vlanId', '', '', '');
    	vidualDisplay('tf1_serialNumberStatus tf1_serialNumber tf1_slId tf1_vlanStatus tf1_vlanId', 'hide');
    	vidualDisplay('break_serialNumberStatus break_serialNumber break_slId break_vlanStatus break_vlanId', 'hide');
    }
    else { // GPON
    	fieldStateChangeWr('', '', 'tf1_serialNumber tf1_slId tf1_vlanId', '');
    	vidualDisplay('tf1_serialNumberStatus tf1_serialNumber tf1_slId tf1_vlanStatus tf1_vlanId', 'configRow');
    	vidualDisplay('break_serialNumberStatus break_serialNumber break_slId break_vlanStatus break_vlanId', 'break');
		enableTextFieldByImageClick('tf1_enableSerialNumberStatus','tf1_serialNumber','break_serialNumber');
		enableTextFieldByImageClick('tf1_enableVLANStatus', 'tf1_vlanId','break_vlanId');
	}
}

function wanPortTypeOnload(){
	wanPortTypeFn();
}

function wanPortTypeImg(toggleObj, thisObj) {
	onImageToggle(toggleObj);
	var imgId=thisObj.id;
    switch(imgId){
    	case 'tf1_enableSerialNumberStatus':
			enableTextFieldByImageClick('tf1_enableSerialNumberStatus','tf1_serialNumber','break_serialNumber');
    	break;    	
    	case 'tf1_enableVLANStatus':
			enableTextFieldByImageClick('tf1_enableVLANStatus', 'tf1_vlanId','break_vlanId');
    	break;    	
    }
}

function enableTextFieldByImageClick(imgId,fieldIds,brk){	
	
	var imgObjVal = document.getElementById(imgId).src;    
    var imageName = imgObjVal.substring (imgObjVal.lastIndexOf ('/') + 1);
   	if (imageName == ON_IMAGE) {    	           
   		fieldStateChangeWr ('', '', '', fieldIds);
       	vidualDisplay(fieldIds.replace(/_div/g,''),'configRow');	   
       	vidualDisplay (brk,'break');
	}else if (imageName == OFF_IMAGE) {   
   		fieldStateChangeWr ('', fieldIds, '', '');
   	    vidualDisplay(fieldIds.replace(/_div/g,''),'hide');
   	    vidualDisplay (brk,'hide');
    }
}

jQuery(function(){
	onloadCall(wanPortTypeImg, {
		imageId: '',
		disableIndividual: '',
		disableGrp: '',
		enableIndividual: '',
		enableGrp: '',
		hideClass: '',
		showClass: '',
		breakDivs: '',
		breakClass: '',
		imagesInfo: {
			disableImages: '',
			enableImages: '',
			disableClass: '',
			enableClass: ''
			}
		});
});

/**
 * Reset function for form
 * @method enableBridgeModeOnReset
 * @param frmId Form ID
 */

function wanPortTypeSetupOnReset (frmId) {
	resetImgOnOff(frmId);
	wanPortTypeFn()
}

