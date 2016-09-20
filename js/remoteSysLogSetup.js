/*
 * File: remoteSysLogSetup.js
 * Created on 11th Jun 2013 - Bala Krishna G
 * Copyright (c) 2013 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Form Validation
 * @method pageValidate
 */
function pageValidate (frmId){
    var txtFieldIdArr = new Array ();
    txtFieldIdArr[0] = "tf1_server,Please enter a valid SysLog Server";
    txtFieldIdArr[1] = "tf1_port,Please enter a valid SysLog Server Port";
    
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 
    
    var serverObj = document.getElementById('tf1_server');
    if(!(serverObj.disabled)){
	 if (ipv4Validate('tf1_server', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false)
		{
			serverObj.focus();
			return false;
		}
    }
    var _2=document.getElementById("tf1_port");
    if (numericValueRangeCheck(_2,1,"Invalid Syslog server port",1,65535,true,"","")==false)
        return false;

	setHiddenChks (frmId);
    return true;
 
}
    
function validateTextField (txtFldEvent, errMsg){
    if (!isProblemChar (txtFldEvent, " '\"", errMsg) == false)
        return false;
    return true;
}

function sysLogConfCheck (){
    var sysLogEnableObj = document.getElementById ('chkSysLogEnable');
    if (!sysLogEnableObj) return;
    if (sysLogEnableObj.checked){
        fieldStateChangeWr ('','','tf1_selNetwork tf1_server tf1_port tf1_hostName tf1_selFacilityOpt tf1_selSeverityOpt','');
        displayHideOrShow ('','tf1_selNetwork tf1_server tf1_port tf1_hostName tf1_selFacilityOpt tf1_selSeverityOpt','','');
    }
    else{
        fieldStateChangeWr ('tf1_selNetwork tf1_server tf1_port tf1_hostName tf1_selFacilityOpt tf1_selSeverityOpt','','','');
        displayHideOrShow  ('tf1_selNetwork tf1_server tf1_port tf1_hostName tf1_selFacilityOpt tf1_selSeverityOpt','','','');
    }
}
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(enableRemoteSysLogSetup, {
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_selNetwork tf1_server tf1_port tf1_hostName tf1_selFacilityOpt tf1_selSeverityOpt',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_selNetwork break_server break_port break_hostName break_selFacilityOpt break_selSeverityOpt',
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
    enableRemoteSysLogSetup({
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_selNetwork tf1_server tf1_port tf1_hostName tf1_selFacilityOpt tf1_selSeverityOpt',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_selNetwork break_server break_port break_hostName break_selFacilityOpt break_selSeverityOpt',
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
function enableRemoteSysLogSetup(toggleObj){
    onImageToggle(toggleObj);
 
}
 

/* Reset function for form */

function remoteSyslogSetupOnReset(frmId) {
		resetImgOnOff(frmId);
	  enableRemoteSysLogSetup({
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_selNetwork tf1_server tf1_port tf1_hostName tf1_selFacilityOpt tf1_selSeverityOpt',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',

        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_selNetwork break_server break_port break_hostName break_selFacilityOpt break_selSeverityOpt',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
}

