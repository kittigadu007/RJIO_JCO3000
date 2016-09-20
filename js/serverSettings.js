/*
 * File: serverSettings.js
 * Created on 20th Aug 2015 - Devaki N
 * Copyright (c) 2015 TeamF1, Inc.
 * All rights reserved.
 */  

/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(enableDMSSetup, {
        imageId: '',
        disableIndividual: '',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: '',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
    enableDisableDMS();
	/* Commenting changes for ContentAggregation in SDK 1.2.0 */
    /* enableDisableContentAggregaion(); */
    var dmsVal = $("#hdDmsDelayVal").val();
      if(dmsVal == "0"){
            fieldStateChangeWr("tf1_contentAggregation tf1_selContentAggOpt tf1_txtfriendlyName tf1_selContentTreeOpt tf1_shareMode tf1_headingDeviceSettings tf1_selDeviceParentalOpt tf1_headingContentSettings tf1_selContentParentalOpt", "", "", "");
            vidualDisplay("tf1_contentAggregation tf1_selContentAggOpt tf1_txtfriendlyName tf1_selContentTreeOpt tf1_shareMode tf1_headingDeviceSettings tf1_selDeviceParentalOpt tf1_headingContentSettings tf1_selContentParentalOpt", 'hide');
            vidualDisplay("break_contentAggregation break_selContentAggOpt break_txtfriendlyName break_selContentTreeOpt break_shareMode break_selDeviceParentalOpt break_selContentParentalOpt", 'hide');
        } 
});

/**
 * Wrapper function called onload
 * @method enableDMSSetup
 * @param obj
 */
function enableDMSSetup(obj, thisObj){
    onImageToggle(obj);
    var imgId=thisObj.id;
    switch(imgId){
        case 'tf1_dmsEnable':  
           enableDisableDMS();
        break;
        /* Commenting changes for ContentAggregation in SDK 1.2.0 */
        /*
        case 'tf1_contentAggregation':  
            enableDisableContentAggregaion();
        break; 
        */      
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
function enableDisableDMS(){
    var imgObjVal = document.getElementById('tf1_dmsEnable').src;
    var hddmsVal = $("#hdDmsDelayVal").val();
            var imageName = imgObjVal.substring(imgObjVal.lastIndexOf('/') + 1);
            if (imageName == "button_off.png") {
                fieldStateChangeWr("tf1_contentAggregation tf1_selContentAggOpt tf1_txtfriendlyName tf1_selContentTreeOpt tf1_shareMode tf1_headingDeviceSettings tf1_selDeviceParentalOpt tf1_headingContentSettings tf1_selContentParentalOpt", "", "", "");
                vidualDisplay("tf1_contentAggregation tf1_selContentAggOpt tf1_txtfriendlyName tf1_selContentTreeOpt tf1_shareMode tf1_headingDeviceSettings tf1_selDeviceParentalOpt tf1_headingContentSettings tf1_selContentParentalOpt", 'hide');
                vidualDisplay("break_contentAggregation break_selContentAggOpt break_txtfriendlyName break_selContentTreeOpt break_shareMode break_selDeviceParentalOpt break_selContentParentalOpt", 'hide');
                /* Commenting changes for ContentAggregation in SDK 1.2.0 */
                /* enableDisableContentAggregaion(); */
            }
            else if(hddmsVal == "1" && imageName == "button_on.png"){
                fieldStateChangeWr("", "", "tf1_contentAggregation tf1_selContentAggOpt tf1_txtfriendlyName tf1_selContentTreeOpt tf1_shareMode tf1_headingDeviceSettings tf1_selDeviceParentalOpt tf1_headingContentSettings tf1_selContentParentalOpt", "");
                vidualDisplay("tf1_contentAggregation tf1_selContentAggOpt tf1_txtfriendlyName tf1_selContentTreeOpt tf1_shareMode tf1_headingDeviceSettings tf1_selDeviceParentalOpt tf1_headingContentSettings tf1_selContentParentalOpt", 'configRow');
                vidualDisplay("break_contentAggregation break_selContentAggOpt break_txtfriendlyName break_selContentTreeOpt break_shareMode break_selDeviceParentalOpt break_selContentParentalOpt", 'break');
               /* Commenting changes for ContentAggregation in SDK 1.2.0  */
               /* enableDisableContentAggregaion(); */
            }
}
function enableDisableContentAggregaion(){
    var imgObjVal = document.getElementById('tf1_contentAggregation').src;
            var imageName = imgObjVal.substring(imgObjVal.lastIndexOf('/') + 1);
            if (imageName == "button_off.png") {
                fieldStateChangeWr("tf1_selContentAggOpt", "", "", "");
                vidualDisplay("tf1_selContentAggOpt", 'hide');
                vidualDisplay("break_selContentAggOpt", 'hide');
            }
            else if(imageName == "button_on.png"){
                fieldStateChangeWr("", "", "tf1_selContentAggOpt", "");
                vidualDisplay("tf1_selContentAggOpt", 'configRow');
                vidualDisplay("break_selContentAggOpt", 'break');
            }
}
/* Reset function for form */

function serverSettingsOnReset(frmId) {
    resetImgOnOff(frmId);
    enableDisableDMS();
   /* Commenting changes for ContentAggregation in SDK 1.2.0 */
   /* enableDisableContentAggregaion(); */
    var dmsVal = $("#hdDmsDelayVal").val();
      if(dmsVal == "0"){
            fieldStateChangeWr("tf1_contentAggregation tf1_selContentAggOpt tf1_txtfriendlyName tf1_selContentTreeOpt tf1_shareMode tf1_headingDeviceSettings tf1_selDeviceParentalOpt tf1_headingContentSettings tf1_selContentParentalOpt", "", "", "");
            vidualDisplay("tf1_contentAggregation tf1_selContentAggOpt tf1_txtfriendlyName tf1_selContentTreeOpt tf1_shareMode tf1_headingDeviceSettings tf1_selDeviceParentalOpt tf1_headingContentSettings tf1_selContentParentalOpt", 'hide');
            vidualDisplay("break_contentAggregation break_selContentAggOpt break_txtfriendlyName break_selContentTreeOpt break_shareMode break_selDeviceParentalOpt break_selContentParentalOpt", 'hide');
        } 
        else if (dmsVal == "1"){
            fieldStateChangeWr("", "", "tf1_contentAggregation tf1_selContentAggOpt tf1_txtfriendlyName tf1_selContentTreeOpt tf1_shareMode tf1_headingDeviceSettings tf1_selDeviceParentalOpt tf1_headingContentSettings tf1_selContentParentalOpt", "");
            vidualDisplay("tf1_contentAggregation tf1_selContentAggOpt tf1_txtfriendlyName tf1_selContentTreeOpt tf1_shareMode tf1_headingDeviceSettings tf1_selDeviceParentalOpt tf1_headingContentSettings tf1_selContentParentalOpt", 'configRow');
            vidualDisplay("break_contentAggregation break_selContentAggOpt break_txtfriendlyName break_selContentTreeOpt break_shareMode break_selDeviceParentalOpt break_selContentParentalOpt", 'break');
            /* Commenting changes for ContentAggregation in SDK 1.2.0 */
            /* enableDisableContentAggregaion(); */
        }

}

/**
 * Form Validation
 * @method pageValidate
 */
function pageValidate (frmId){
    var txtFieldIdArr = new Array ();
    txtFieldIdArr[0] = "tf1_txtfriendlyName,Please enter a valid Friendly Name";
    
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;

     var imgObjVal = document.getElementById('tf1_dmsEnable').src;
    var imageName = imgObjVal.substring(imgObjVal.lastIndexOf('/') + 1);
    var conAggObj = document.getElementById("tf1_selContentAggOpt");
    if (conAggObj && !conAggObj.disabled && imageName == "button_on.png"){
        if (conAggObj.selectedIndex == -1) {
            alert("Please select Content Aggregation Path");
            return false;
        }
    }

    setHiddenChks (frmId);
    return true;
 
}