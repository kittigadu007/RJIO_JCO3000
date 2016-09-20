/*
 * File: bandwidthProfiles.js
 * Created on 4th July 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */

/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */ 
$(document).ready(function(){
	onloadCall (enableDisableFieldsByImageClick, {imageId:'', disableIndividual:'', disableGrp:'', enableIndividual:'', enableGrp:'', hideClass:'hide', showClass:'configRow', breakDivs:'', breakClass:'break', imagesInfo:{disableImages:'', enableImages:'', disableClass:'', enableClass:''}});

	enableTextFieldByImageClick('tf1_enableStreams','tf1_upstream','break_upstream');
});
//for popup
function bandwidthOnloadCallPopupFn(){
	enableTextFieldByImageClick('tf1_enableRateEntry','tf1_percentageBandwidth','break_percentageBandwidth');
}
function enableDisableFieldsByImageClick(data, thisObj) { 
    onImageToggle(data);  
	var imgId=thisObj.id;   
    switch(imgId){
	
    	case 'tf1_enableStreams':  
			enableTextFieldByImageClick('tf1_enableStreams','tf1_upstream','break_upstream');	
    	break;
	//popup

		case 'tf1_enableRateEntry':  
			enableTextFieldByImageClick('tf1_enableRateEntry','tf1_percentageBandwidth','break_percentageBandwidth');	
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
   		fieldStateChangeWr ('', '', fieldIds, '');
       	vidualDisplay(fieldIds,'configRow');	   
       	vidualDisplay (brk,'break');
	}else if (imageName == OFF_IMAGE) {   
   		fieldStateChangeWr (fieldIds, '', '', '');
   	    vidualDisplay(fieldIds,'hide');
   	    vidualDisplay (brk,'hide');
    }
}
function bandwidthProfilesValidate(frmId){

	var txtFieldIdArr = new Array();
 	txtFieldIdArr[0] = "tf1_upstream, Please enter a valid Upstream Bandwidth"; 
		
    if (txtFieldArrayCheck(txtFieldIdArr) == false)
	    return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

    var maxObj = document.getElementById('tf1_upstream');
    if (maxObj.value && !maxObj.disabled) {
        if (numericValueRangeCheck(maxObj, '', '', 100, 1024000, true, 'Invalid Upstream Bandwidth.', 'Kbps') == false) 
            return false;
    } 
		/* changes for change in BW Profiles Page starts */
		var bandwidthConf = false;
		var bandwidthImgSrc = $("#tf1_enableStreams").attr("src");
		if ( bandwidthImgSrc.indexOf("_on") != -1 && $("#tf1_bandwidthProfileStatus").val() == "0" ) {
			var bandwidthConf =  confirm('Enabling this feature would impact the throughput for the added traffic selector.\nDo you wish to continue?');
				 if  ( bandwidthConf == false) {                
						 return false;
				 }
		}
		/* changes for change in BW Profiles Page starts */
	setHiddenChks(frmId);
	return true;	
}

function resetBandwidthFn(frmId){
	resetImgOnOff(frmId);
	enableTextFieldByImageClick('tf1_enableStreams','tf1_upstream','break_upstream');
}

function bandwidthProfilesPopupPageValidate(frmId){
	var txtFieldIdArr = new Array();
	
	txtFieldIdArr[0] = "tf1_txtProfileName, Please enter a valid Profile Name";
 	txtFieldIdArr[1] = "tf1_percentageBandwidth, Please enter a valid Percentage Bandwidth";  
		
  if (txtFieldArrayCheck(txtFieldIdArr) == false)
	    return false;   

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

	var bandObj = document.getElementById('tf1_percentageBandwidth');
    if (bandObj.value && !bandObj.disabled) {
        if (numericValueRangeCheck(bandObj, '', '', 1, 100, true, 'Invalid Percentage Bandwidth.', '%') == false) 
            return false;
    } 

	setHiddenChks(frmId);
	return true;	
}


