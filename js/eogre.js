/*
 * File: eogre.js
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
    onloadCall(enableEogre, {
        imageId: 'tf1_enableEogre',
        disableIndividual: 'tf1_tunnelKey tf1_modeOfOperation tf1_remoteIp tf1_vlan tf1_dataRate',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_tunnelKey break_modeOfOperation break_remoteIp break_vlan break_dataRate',
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
    enableEogre({
        imageId: 'tf1_enableEogre',
        disableIndividual: 'tf1_tunnelKey tf1_modeOfOperation tf1_remoteIp tf1_vlan tf1_dataRate',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_tunnelKey break_modeOfOperation break_remoteIp break_vlan break_dataRate',
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
function enableEogre(toggleObj){
    onImageToggle(toggleObj);
   
}

/* Reset function for form

*/

function eogreOnReset(frmId) {

	resetImgOnOff(frmId);
	enableEogre({
        imageId: 'tf1_enableEogre',
        disableIndividual: 'tf1_tunnelKey tf1_modeOfOperation tf1_remoteIp tf1_vlan tf1_dataRate',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_tunnelKey break_modeOfOperation break_remoteIp break_vlan break_dataRate',
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
function eogreValidation(frmId){    
	var txtValidArray = new Array();
    //txtValidArray[0] = "tf1_tunnelKey, Please enter a valid Tunnel Key";
    txtValidArray[txtValidArray.length] = "tf1_remoteIp, Please enter a valid IP Address";
    if (txtFieldArrayCheck(txtValidArray) == false) 
        return false;

  if (ipv4Validate('tf1_remoteIp', 'IP', false, true, "Invalid Starting IP address.", "for octet ", true) == false) 
        return false;

  var vlanObj = document.getElementById("tf1_vlan");
  if (!vlanObj.disabled && $("#tf1_vlan").val() != ''){
	if (numericValueRangeCheck(vlanObj, "", "", 2, 4094, true, "", "") == false)
	{
	   return false;	
	}
  }
    
   var dataRateObj = document.getElementById("tf1_dataRate");
  if (!dataRateObj.disabled && $("#tf1_dataRate").val() != ''){
	if (numericValueRangeCheck(dataRateObj, "", "", 1, 30720, true, "", "") == false)
	{
	   return false;	
	}
  }
    setHiddenChks (frmId);
    return true;
}


