/*
 * File: maptConfigutartion.js
 * Created on 17th Jun 2013 - Bala Krishna G
 * Copyright (c) 2013 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Form Validation
 * @method pageValidate
 */
function pageValidate (frmId){
    var txtFieldIdArr = new Array ();
    txtFieldIdArr[0] = "tf1_ipv4Prefix, Please enter a valid  IPv4 Prefix";
	txtFieldIdArr[1] = "tf1_ipv4PrefixLength, Please enter a valid IPv4 Prefix Length";
	txtFieldIdArr[2] = "tf1_ipv6Prefix, Please enter a valid IPv6 Prefix";
	txtFieldIdArr[3] = "tf1_ipv6PrefixLength, Please enter a valid IPv6 Prefix Length";
	txtFieldIdArr[4] = "tf1_borderRelayipv6Prefix, Please enter a valid Border Relay IPv6 Prefix";
	txtFieldIdArr[5] = "tf1_borderRelayipv6PrefixLength, Please enter a valid  Border Relay IPv6 Prefix Length";
	txtFieldIdArr[6] = "tf1_embeddedAddress, Please enter a valid Embedded Address";	
	txtFieldIdArr[7] = "tf1_embeddedAddressLen, Please enter a valid Embedded Address Length";	
	txtFieldIdArr[8] = "tf1_psidOffsetLen, Please enter a valid PSID offset";	
    
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;
    
 	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

     if (ipv4Validate('tf1_ipv4Prefix', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
		
     var preLenObj = document.getElementById('tf1_ipv4PrefixLength');
    if (preLenObj && !preLenObj.disabled) {
        if (numericValueRangeCheck(preLenObj, '', '', 1, 32, true, 'Invalid IPv4 Prefix Length', '') == false) 
            return false;
    }
   
    if (ipv6Validate('tf1_ipv6Prefix', false, true, '') == false) 
        return false;    

   
  
	 var preLenObj = document.getElementById('tf1_ipv6PrefixLength');
    if (preLenObj && !preLenObj.disabled) {
        if (numericValueRangeCheck(preLenObj, '', '', 1, 128, true, 'Invalid IPv6 Prefix Length', '') == false) 
            return false;
    }
   
   if (ipv6Validate('tf1_borderRelayipv6Prefix', false, true, '') == false) 
        return false;  

	 var preLenObj = document.getElementById('tf1_borderRelayipv6PrefixLength');
    if (preLenObj && !preLenObj.disabled) {
        if (numericValueRangeCheck(preLenObj, '', '', 1, 128, true, 'Invalid IPv6 Prefix Length', '') == false) 
            return false;
    }
	 var preLenObj = document.getElementById('tf1_embeddedAddress');
    if (preLenObj && !preLenObj.disabled) {
        if (numericValueRangeCheck(preLenObj, '', '', 0, 281474976710656, true, 'Invalid Embedded Address', '') == false) 
            return false;
    }
    var preLenObj = document.getElementById('tf1_embeddedAddressLen');
    if (preLenObj && !preLenObj.disabled) {
        if (numericValueRangeCheck(preLenObj, '', '', 0, 48, true, 'Invalid Embedded Address Length', '') == false) 
            return false;
    }
    var preLenObj = document.getElementById('tf1_psidOffsetLen');
    if (preLenObj && !preLenObj.disabled) {
        if (numericValueRangeCheck(preLenObj, '', '', 0, 16, true, 'Invalid PSID offset', '') == false) 
            return false;
    }
      setHiddenChks(frmId);
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
    onloadCall(enableMaptConfig, {
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_ipv4Prefix tf1_ipv4PrefixLength tf1_ipv6Prefix tf1_ipv6PrefixLength tf1_borderRelayipv6Prefix tf1_borderRelayipv6PrefixLength tf1_embeddedAddress tf1_embeddedAddressLen tf1_psidOffsetLen',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_ipv4Prefix break_ipv4PrefixLength break_ipv6Prefix break_ipv6PrefixLength break_borderRelayipv6Prefix break_borderRelayipv6PrefixLength break_embeddedAddress break_embeddedAddressLen break_psidOffsetLen',
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
    enableMaptConfig({
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_ipv4Prefix tf1_ipv4PrefixLength tf1_ipv6Prefix tf1_ipv6PrefixLength tf1_borderRelayipv6Prefix tf1_borderRelayipv6PrefixLength tf1_embeddedAddress tf1_embeddedAddressLen tf1_psidOffsetLen',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_ipv4Prefix break_ipv4PrefixLength break_ipv6Prefix break_ipv6PrefixLength break_borderRelayipv6Prefix break_borderRelayipv6PrefixLength break_embeddedAddress break_embeddedAddressLen break_psidOffsetLen',
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
function enableMaptConfig(toggleObj){
    onImageToggle(toggleObj);
	 
}


function maptConfigOnReset(frmId){
	
	resetImgOnOff(frmId);
	enableMaptConfig({
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_ipv4Prefix tf1_ipv4PrefixLength tf1_ipv6Prefix tf1_ipv6PrefixLength tf1_borderRelayipv6Prefix tf1_borderRelayipv6PrefixLength tf1_embeddedAddress tf1_embeddedAddressLen tf1_psidOffsetLen',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_ipv4Prefix break_ipv4PrefixLength break_ipv6Prefix break_ipv6PrefixLength break_borderRelayipv6Prefix break_borderRelayipv6PrefixLength break_embeddedAddress break_embeddedAddressLen break_psidOffsetLen',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
	
	 
}
