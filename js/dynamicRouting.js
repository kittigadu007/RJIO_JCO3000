/*
 * File: rip.js
 * Created on 28th March 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */

/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */ 
$(document).ready(function() {
	onloadCall (ripOnload, {imageId:'', disableIndividual:'', disableGrp:'', enableIndividual:'', enableGrp:'', hideClass:'hide', showClass:'configRow', breakDivs:'', breakClass:'break', imagesInfo:{disableImages:'', enableImages:'', disableClass:'', enableClass:''}});	
	
	ripDirectionTypeCheck('tf1_ripDirection','tf1_ripVersion');
	enableTextFieldByImageClick('tf1_ripAuthentication','tf1_ripFirstParametersBlock_div tf1_ripSecondParametersBlock_div','');
});

function ripOnreset(formId) {
	resetImgOnOff(formId);
	enableTextFieldByImageClick('tf1_ripAuthentication','tf1_ripFirstParametersBlock_div tf1_ripSecondParametersBlock_div','');	
	ripDirectionTypeCheck('tf1_ripDirection','tf1_ripVersion');	
}
/**
 * function for toggle the image
 * @method ripOnload
 * @param toggleObj - object
 */
function ripOnload(toggleObj, thisObj) {
	onImageToggle(toggleObj);
	var imgId=thisObj.id;    
    switch(imgId){
    	case 'tf1_ripAuthentication':   
			enableTextFieldByImageClick('tf1_ripAuthentication','tf1_ripFirstParametersBlock_div tf1_ripSecondParametersBlock_div','');	
    	break;    	
    }
}

/**
 * This function for enable or disable fields while clicking on on off image
 * Onclick event
 * @method enableTextFieldByImageClick
 * @param imgId - image Id
 * @param fieldIds - space separated field names
 * @param brk - space separated break names
 */
function enableTextFieldByImageClick(imgId,fieldIds,brk){	
	
	var imgObjVal = document.getElementById(imgId).src;    
    var imageName = imgObjVal.substring (imgObjVal.lastIndexOf ('/') + 1);
   	if (imageName == ON_IMAGE) {    	           
   		fieldStateChangeWr ('', '', '', fieldIds);
       	vidualDisplay(fieldIds.replace(/_div/g,''),'');	   
       	vidualDisplay (brk,'break');
	}else if (imageName == OFF_IMAGE) {   
   		fieldStateChangeWr ('', fieldIds, '', '');
   	    vidualDisplay(fieldIds.replace(/_div/g,''),'hide');
   	    vidualDisplay (brk,'hide');
    }
}


/**
 * function for validate form when user clicks on submit button
 * OnSubmit event
 * @method ripValidate
 */
function ripValidate(formId) {

	var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_ripFirstMd5KeyId, Please enter a valid MD5 Key ID";
    txtFieldIdArr[1] = "tf1_ripFirstMd5AuthKey, Please enter first MD5 authentication key";
    txtFieldIdArr[2] = "tf1_ripSecMd5KeyId, Please enter a valid MD5 Key ID";
    txtFieldIdArr[3] = "tf1_ripSecMd5AuthKey, Please enter second MD5 authentication key";

	if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

	var firstMd5KeyIdObj = document.getElementById('tf1_ripFirstMd5KeyId');
	if (firstMd5KeyIdObj && !firstMd5KeyIdObj.disabled) {
		if (numericValueRangeCheck(firstMd5KeyIdObj, '', '', 1, 255, true, 'Invalid MD5 Key ID:', '') == false)
			return false;
	}	

	var secMd5KeyIdObj = document.getElementById('tf1_ripSecMd5KeyId');
	if (secMd5KeyIdObj && !secMd5KeyIdObj.disabled) {
		if (numericValueRangeCheck(secMd5KeyIdObj, '', '', 1, 255, true, 'Invalid MD5 Key ID:', '') == false)
			return false;
	}	
	
	var firstDateObj = document.getElementById('tf1_firstBeforeDateYear');
	if (firstDateObj && !firstDateObj.disabled) {
		if(dateCompare('first')==false){
	        alert("First Key Parameters Before Date should be lesser than After date");
	        return false;
	    }
	}
	
	
	var secDateObj = document.getElementById('tf1_secBeforeDateYear');
	if (secDateObj && !secDateObj.disabled) {
	    if(dateCompare('sec')==false){
	        alert("Second Key Parameters Before Date should be lesser than After date");
	        return false;
	    }
	}	
	setHiddenChks(formId);
	/* if Atype is hidden and disabled we will send the value as 0 to server */
	var ripAuthType = document.getElementById('tf1_ripAuthenticationType');
	if ( ripAuthType.disabled ) {
		ripAuthType.disabled = false;
		ripAuthType.value = 0;
	}
	return true;
}
function dateCompare(prefix){	
	
    var startYear = parseInt(document.getElementById('tf1_'+prefix+'BeforeDateYear').value, 10);
	var startMonth = parseInt(document.getElementById('tf1_'+prefix+'BeforeDateMonth').value, 10);
	var startDay = parseInt(document.getElementById('tf1_'+prefix+'BeforeDateDay').value, 10);
	var startHour = parseInt(document.getElementById('tf1_'+prefix+'BeforeTimeHour').value, 10);
	var startMin = parseInt(document.getElementById('tf1_'+prefix+'BeforeTimeMin').value, 10);
	var startSec = parseInt(document.getElementById('tf1_'+prefix+'BeforeTimeSec').value, 10);
	var start = new Date(startYear, startMonth, startDay, startHour, startMin, startSec);
	
	var endYear = parseInt(document.getElementById('tf1_'+prefix+'AfterDateYear').value, 10);
	var endMonth = parseInt(document.getElementById('tf1_'+prefix+'AfterDateMonth').value, 10);
	var endDay = parseInt(document.getElementById('tf1_'+prefix+'AfterDateDay').value, 10);
	var endHour = parseInt(document.getElementById('tf1_'+prefix+'AfterTimeHour').value, 10);
	var endMin = parseInt(document.getElementById('tf1_'+prefix+'AfterTimeMin').value, 10);
	var endSec = parseInt(document.getElementById('tf1_'+prefix+'AfterTimeSec').value, 10);	
	var end = new Date(endYear, endMonth, endDay, endHour, endMin, endSec);    	
	
   if(start.getTime() >= end.getTime()){
    	return false
    }else{
    	return true;
    }
}




/**
 * function for changing the Direction and Version settings of radio buttons and select box
 * Onclick event and onchange event
 * @method ripDirectionTypeCheck
 * @param radioName - Radio button name
 */
function ripDirectionTypeCheck(directionId, versionId) {
	var selecteDir = comboSelectedValueGet(directionId);
	var selectedVer = comboSelectedValueGet(versionId);	
	if (selectedVer && selecteDir) {
		if ((!isNaN(selecteDir) && parseInt(selecteDir, 10) == 0) || (!isNaN(selectedVer) && parseInt(selectedVer, 10) == 0) || (!isNaN(selectedVer) && parseInt(selectedVer, 10) == 1)) {								
			fieldStateChangeWr('tf1_ripAuthentication', 'tf1_ripAuthEnableBlock_div tf1_ripFirstParametersBlock_div tf1_ripSecondParametersBlock_div', '', '');			
			vidualDisplay('tf1_ripAuthentication tf1_ripAuthEnableBlock tf1_ripFirstParametersBlock tf1_ripSecondParametersBlock', 'hide');
	
		} else {
			fieldStateChangeWr('', '', 'tf1_ripAuthentication', 'tf1_ripAuthEnableBlock_div');			
			vidualDisplay('tf1_ripAuthentication', 'configRow');
			vidualDisplay('tf1_ripAuthEnableBlock', '');
			enableTextFieldByImageClick('tf1_ripAuthentication','tf1_ripFirstParametersBlock_div tf1_ripSecondParametersBlock_div','');				
		}
	}
	 
}

