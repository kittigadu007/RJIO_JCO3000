/*
 * File: systemLogs.js
 * Created on 18th Nov 2014 - Bala Krishna G
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

	enableTextFieldByImageClick('tf1_sysLogServer','tf1_fqdnIpAddress tf1_facility tf1_severity','break_fqdnIpAddress break_facility break_severity');
});
//for popup
function bandwidthOnloadCallPopupFn(){
	enableTextFieldByImageClick('tf1_sysLogServer','tf1_fqdnIpAddress tf1_facility tf1_severity','break_fqdnIpAddress break_facility break_severity');
}
function enableDisableFieldsByImageClick(data, thisObj) { 
    onImageToggle(data);  
	var imgId=thisObj.id;   
    switch(imgId){
	
    	case 'tf1_sysLogServer':  
			enableTextFieldByImageClick('tf1_sysLogServer','tf1_fqdnIpAddress tf1_facility tf1_severity','break_fqdnIpAddress break_facility break_severity');
    	break;
	 

		 	
    }
}
function systemLogsOnreset() {
   	enableTextFieldByImageClick('tf1_sysLogServer','tf1_fqdnIpAddress tf1_facility tf1_severity','break_fqdnIpAddress break_facility break_severity');
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

 
/**
* function for validate form when user clicks on submit button
* OnSubmit event
* @method policiesFormValidate
*/ 
function pageValidate(frmId){
    var txtFieldIdArr = new Array ();     
    txtFieldIdArr[0] = "tf1_fqdnIpAddress,Please enter valid IP Address or FQDN";

    if (txtFieldArrayCheck(txtFieldIdArr) == false)
	    return false;
	
    if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;
	    
    setHiddenChks(frmId);
	return true;
}
