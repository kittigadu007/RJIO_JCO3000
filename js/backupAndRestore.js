/*
 * File: backupAndRestore.js
 * Created on 17th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
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

function uploadImageSizeCheck(){
	var uploadFileObj = document.getElementById('tf1_txtRestoreFile');
	if (uploadFileObj && !uploadFileObj.disabled && uploadFileObj.value != '') {
		var fSize = uploadFileObj.files[0].size;
		if (fSize > 104857600)
		{
			alert("Invalid Restore file, please upload a correct Restore file");
			return false;
		} 
	}
}

/**
 * File extention type check
 * @method check
 * @param objId - File input Id
 * @param exten - Required Extention type
 * @param flag - Alert Message
 */
function check(objId, exten, flag, exten2){

var extParam2=false;
    if(exten2){
extParam2=true;
    }else{
exten2=exten;

   }

 
    var ext = document.getElementById(objId).value;
    if (ext == "") {
        alert("Please enter the full path and file name");
        return false;
    }

    /* upload file check starts */
	if($.browser.msie)
    {
     	if (navigator.userAgent.indexOf("MSIE 9") != -1) { 
        var objFSO = new ActiveXObject("Scripting.FileSystemObject");
        var sPath = document.getElementById("tf1_txtRestoreFile").value;
        var objFile = objFSO.getFile(sPath);
        var iSize = objFile.size;
        if (iSize > 104857600)
			{
				alert("Invalid Restore file, please upload a correct Restore file");
				return false;
			} 
     	}
     	else{
     		if (uploadImageSizeCheck () == false)
				return false;
     	}

    }
    else{
    	if (uploadImageSizeCheck () == false)
				return false;
	}
/* upload file check ends */
	if (flag == 1) {
						var conf = confirm("Preparing to restore saved settings from user provided file. Are you sure want to proceed?\n WARNING: Current configuration will be erased.");
					if (conf == false) {
						return false;
					}
			 }
    ext = ext.substring(ext.lastIndexOf('.') + 1, ext.length);
    ext = ext.toLowerCase();
    if (ext.length > 4) {
        alert('please select a .' + exten + ' file');
        return false;
    }
    else 
        if (ext != exten2) {
           alert('You selected a .' + ext + ' file; please select a .' + exten2 + ' file instead!');
            return false;
        }      
}

/**
 * Onclick event
 * @method revertToDefaults
 */
function revertToDefaults(animationDelay){
    if (accessLevelCheck() == false) 
        return false;
    var proceed = confirm('Preparing to restore factory default settings. Are you sure you want to proceed?\n' + 'WARNING: Current configuration will be erased.', '');
    if (proceed) {
        return true;
    }
    return false;
}
