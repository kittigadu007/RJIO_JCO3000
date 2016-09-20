/*
 * File: p2pSessionLimitation.js
 * Created on 6th Sep 2013 - Bala Krishna G
 * Copyright (c) 2013 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Form Validation
 * @method pageValidate
 */
function pageValidate (frmId){
    var txtFieldIdArr = new Array ();
    txtFieldIdArr[0] = "tf1_p2pSessionLanHost,Please enter a valid P2P Session LAN Host";
    
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;
    
    var _2=document.getElementById("tf1_p2pSessionLanHost");
    if (numericValueRangeCheck(_2,1,"Invalid P2P Session LAN Host",1,31960,true,"","")==false)
        return false;
		
    var mg = $("#tf1_p2pSessionLimitating").attr("src");
    if (mg.indexOf("button_on.png") != -1 && $("#tf1_hd_P2P").val() == "0" ) {
    var cnf = confirm ('Enabling \'P2P Session Limiting Configuration\' will result in drop in throughput of the device. Are you sure you want to enable it?');
    if (cnf == false)
        {
        return false;
        }
    }

	setHiddenChks (frmId);
    return true;
}
    
function validateTextField (txtFldEvent, errMsg){
    if (!isProblemChar (txtFldEvent, " '\"", errMsg) == false)
        return false;
    return true;
}

function showWarning (opFlag)
	{
	var prechk = document.getElementById ('hdEnable').value;

	if (opFlag == 1)
		{
		if (confirm ('Enabling \'P2P Session Limiting Configuration\' will result in drop in throughput of the device. Are you sure you want to enable it?', ''))
		    {
			return true;
			}
		}

	} 

/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(enableP2pSessionLimitation, {
        imageId: 'tf1_p2pSessionLimitating',
        disableIndividual: 'tf1_p2pSessionLanHost',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_p2pSessionLanHost',
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
    enableP2pSessionLimitation({
        imageId: 'tf1_p2pSessionLimitating',
        disableIndividual: 'tf1_p2pSessionLanHost',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_p2pSessionLanHost',
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
function enableP2pSessionLimitation(toggleObj){
    onImageToggle(toggleObj);
}
 
/* Reset function for form */
function p2pSessionLimitationOnReset(frmId) {
		resetImgOnOff(frmId);
	  enableP2pSessionLimitation({
        imageId: 'tf1_p2pSessionLimitating',
        disableIndividual: 'tf1_p2pSessionLanHost',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',

        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_p2pSessionLanHost',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
}

