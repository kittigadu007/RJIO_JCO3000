/*
 * File: ftpServer.js
 * Created on 19th Sep 2013 - Bala Krishna G
 * Copyright (c) 2013 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Form Validation
 * @method pageValidate
 */
function pageValidate (frmId){
    var txtFieldIdArr = new Array ();
    txtFieldIdArr[0] = "tf1_ftpPort,Please enter a valid FTP Port";
    
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;
    
    var _2=document.getElementById("tf1_ftpPort");
    if (numericValueRangeCheck(_2,1,"Invalid FTP Port",1,65535,true,"","")==false)
        return false;
		
	setHiddenChks (frmId);
    return true;
}
    
function validateTextField (txtFldEvent, errMsg){
    if (!isProblemChar (txtFldEvent, " '\"", errMsg) == false)
        return false;
    return true;
}

 
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(enableFTPServer, {
        imageId: 'tf1_ftpServer',
        disableIndividual: 'tf1_ftpPort',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_ftpPort',
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
    enableFTPServer({
        imageId: 'tf1_ftpServer',
        disableIndividual: 'tf1_ftpPort',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_ftpPort',
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
function enableFTPServer(toggleObj){
    onImageToggle(toggleObj);
}
 
/* Reset function for form */
function ftpServerOnReset(frmId) {
		resetImgOnOff(frmId);
	  enableFTPServer({
        imageId: 'tf1_ftpServer',
        disableIndividual: 'tf1_ftpPort',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',

        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_ftpPort',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
}

