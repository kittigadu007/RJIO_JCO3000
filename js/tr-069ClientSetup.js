/*
 * File: tr-069ClientSetup.js
 * Created on 4th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(enableTrClientMgmt, {
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_acsURL tf1_acsUsername tf1_acsPassword tf1_informInterval tf1_conReqUsername tf1_conReqPassword tf1_stunEnable tf1_serverAddress tf1_stunUsername tf1_stunPassword',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_acsURL break_acsUsername break_acsPassword break_informInterval break_conReqUsername break_conReqPassword break_stunEnable break_serverAddress break_stunUsername break_stunPassword',
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
    enableTrClientMgmt({
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_acsURL tf1_acsUsername tf1_acsPassword tf1_informInterval tf1_conReqUsername tf1_conReqPassword  tf1_stunEnable tf1_serverAddress tf1_stunUsername tf1_stunPassword',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_acsURL break_acsUsername break_acsPassword break_informInterval break_conReqUsername break_conReqPassword break_stunEnable break_serverAddress break_stunUsername break_stunPassword',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
}

function onReset() {
document.tf1_frmTr069ClientConfig.reset(); resetImgOnOff('tf1_frmTr069ClientConfig');
 enableTrClientMgmt({
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_acsURL tf1_acsUsername tf1_acsPassword tf1_informInterval tf1_conReqUsername tf1_conReqPassword  tf1_stunEnable tf1_serverAddress tf1_stunUsername tf1_stunPassword',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_acsURL break_acsUsername break_acsPassword break_informInterval break_conReqUsername break_conReqPassword break_stunEnable break_serverAddress break_stunUsername break_stunPassword',
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
function enableTrClientMgmt(toggleObj){
    onImageToggle(toggleObj);
}

/*function reset for cancel button
*
*Call the onload function again

*/

function tr069ClientConfigOnReset(frmId) {

	resetImgOnOff(frmId);
	
	enableTrClientMgmt({
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_acsURL tf1_acsUsername tf1_acsPassword tf1_informInterval tf1_conReqUsername tf1_conReqPassword  tf1_stunEnable tf1_serverAddress tf1_stunUsername tf1_stunPassword',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_acsURL break_acsUsername break_acsPassword break_informInterval break_conReqUsername break_conReqPassword break_stunEnable break_serverAddress break_stunUsername break_stunPassword',
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
 * Form Validation
 * @method vapConfigValidate
 */
function pageValidate(frmId){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_acsURL,Please enter a valid ACS URL";    
    txtFieldIdArr[1] = "tf1_informInterval,Please enter a valid Inform Interval";

    if ($("#tf1_stunEnable").length > 0) {
    var stunImgSrc = $("#tf1_stunEnable").attr("src");
    
        if ( stunImgSrc.indexOf("_on") != -1 ) {
            txtFieldIdArr[txtFieldIdArr.length] = "tf1_serverAddress,Please enter a valid  STUN Server Address";
        }
    }
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;    
		
    txtFieldIdArr[txtFieldIdArr.length] = "tf1_acsUsername,Please enter a valid ACS Username";    
    txtFieldIdArr[txtFieldIdArr.length] = "tf1_acsPassword,Please enter a valid ACS Password";
    txtFieldIdArr[txtFieldIdArr.length] = "tf1_conReqUsername,Please enter a valid Connection Request Username";    
    txtFieldIdArr[txtFieldIdArr.length] = "tf1_conReqPassword,Please enter a valid  Connection Request Password"; 

     /* added check for not allowing space as first character starts */
    var acsUsernameObj = document.getElementById('tf1_acsUsername');
    if ( acsUsernameObj.value.charAt(0) == ' ' )
    {
         alert("ACS Username cannot start with space character");
         acsUsernameObj.focus();
         return false;
    }
    var conReqUsernameObj = document.getElementById('tf1_conReqUsername');
    if ( conReqUsernameObj.value.charAt(0) == ' ' )
    {
         alert("Connection Request Username cannot start with space character");
         conReqUsernameObj.focus();
         return false;
    }
    var stnUsernameObj = document.getElementById('tf1_stunUsername');
    if ( stnUsernameObj.value.charAt(0) == ' ' )
    {
         alert("STUN Username cannot start with space character");
         stnUsernameObj.focus();
         return false;
    }
    /* added check for not allowing space as first character ends */
    var txtFieldIdArrNames = new Array();
    txtFieldIdArrNames[0] = "tf1_acsUsername,Please enter a valid ACS Username";
    txtFieldIdArrNames[1] = "tf1_conReqUsername,Please enter a valid Connection Request Username";
    txtFieldIdArrNames[2] = "tf1_stunUsername,Please enter a valid STUN Username";
     /* added to condition to prevent semicolon & pipe characters */
    if (isProblemCharArrayCheck(txtFieldIdArrNames, "'\";|", "Following characters are not supported for this field:\r\ndouble quote( \" ), single quote( \' ), Pipe ( | ), Semi-Colon ( ; )") == false) 
        return false;
    /* added below condition to allow space for host name for the SPR-48304 additional comments */  
   
    var txtFieldIdArrTr = new Array();
    txtFieldIdArrTr[0] = "tf1_acsURL,Please enter a valid ACS URL";  
    txtFieldIdArrTr[1] = "tf1_informInterval,Please enter a valid Inform Interval";
    txtFieldIdArrTr[2] = "tf1_serverAddress,Please enter a valid  STUN Server Address";
    txtFieldIdArrTr[3] = "tf1_acsPassword,Please enter a valid ACS Password";
    txtFieldIdArrTr[4] = "tf1_conReqPassword,Please enter a valid  Connection Request Password";
    
    if (isProblemCharArrayCheck(txtFieldIdArrTr, "'\" ", NOT_SUPPORTED) == false) 
        return false;  
    var informInterval = document.getElementById("tf1_informInterval");	
    if (numericValueRangeCheck(informInterval, '', '', 60, 86400, true, '', '') == false) 
        return false;

    var tr69Conf = false;
    var tr69ImgSrc = $("#tf1_chkEnable").attr("src");
    if ( tr69ImgSrc.indexOf("_on") != -1 && $("#tf1_tr69Status").val() == "0" ) {
         var tr69Conf =  confirm('Enabling TR-069 will cause the device to reboot, Click OK to continue or Cancel to abort');
            if  ( tr69Conf == false) {                
                return false;
            }
    }
    
    if ( tr69Conf == false ) {
        var acsURLObj = document.getElementById("tf1_acsURL");
        if ( acsURLObj.disabled == false ){        
            if (document.getElementById("tf1_hidAcsURL").value != acsURLObj.value) {
              alert("Please ensure Username and Password are updated as per ACS server configured")
                var conf =  confirm('Changing ACS URL will cause the device to reboot, Click OK to continue or Cancel to abort');
                if  ( conf == false) {                
                    return false;
                }
            }
        }   
    }

   /* if ( stunImgSrc.indexOf("_on") != -1 ) {

        if ( tr69Conf == false ) {
        var serverAddressObj = document.getElementById("tf1_serverAddress");
        if ( serverAddressObj.disabled == false ){        
            if (document.getElementById("tf1_hidServerAddress").value != serverAddressObj.value) {
                var conf =  confirm('Changing Server Address will cause the device to reboot, Click OK to continue or Cancel to abort');
                if  ( conf == false) {                
                    return false;
                }
              }
            } 
        }	

    }*/

    setHiddenChks(frmId);
    return true;
}
