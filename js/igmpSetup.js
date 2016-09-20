/*
 * Copyright (c) 2013 TeamF1, Inc. (www.TeamF1.com)
 * All rights reserved.
 */

function pageValidate () {
    var txtFieldIdArr = new Array ();    
    txtFieldIdArr[0] = "txtSenderAddr,Please enter a valid Sender Address";
    txtFieldIdArr[1] = "txtmaskLength,Please enter a valid Mask Length";
    
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;

    
    var maskObj = document.getElementById('txtmaskLength');
    if (maskObj && !maskObj.disabled)
        {
            /* If mask length is between 25 to 32 then last octet (i.e., 4th octet) of IP address should not be zero */
        if (maskObj.value > 24 && maskObj.value <= 32)
            {
                if (ipv4Validate ('txtSenderAddr', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false)
                    return false;
            }
        if (numericValueRangeCheck (maskObj, '', '', 0, 32, true, 'Invalid Mask Length:', '') == false)
            return false;
        }

    if (ipv4Validate ('txtSenderAddr', 'SN', false, true, "Invalid IP address.", "for octet ", true) == false)
        return false;
            
    return true;
    }

function igmpCheck (chkIGMPConfiguration, ids){
    var chkIGMPConfigurationObj = document.getElementById (chkIGMPConfiguration);
    if (chkIGMPConfigurationObj){
        if (chkIGMPConfigurationObj.checked){
            fieldStateChangeWr ('', '', ids, '');
       }
        else{
            fieldStateChangeWr (ids, '', '', '');
         }
    }
}



/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(enableIGMPproxy, {
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_selUpStreamInterface tf1_selDownStreamInterface tf1_allowAddr',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_selUpStreamInterface break_selDownStreamInterface break_allowAddr',
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
    enableIGMPproxy({
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_selUpStreamInterface tf1_selDownStreamInterface tf1_allowAddr',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_selUpStreamInterface break_selDownStreamInterface break_allowAddr',
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
function enableIGMPproxy(toggleObj){
    onImageToggle(toggleObj);
 
}

function validateIgmpSetup(frmId) {
 		setHiddenChks (frmId);
    return true;
}

/* Reset function for form

*/

function igmpProxyOnReset(frmId) {
		resetImgOnOff(frmId);
		enableIGMPproxy({
        imageId: 'tf1_chkEnable',
        disableIndividual: 'tf1_selUpStreamInterface tf1_selDownStreamInterface tf1_allowAddr',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_selUpStreamInterface break_selDownStreamInterface break_allowAddr',
        breakClass: 'break',
        imagesInfo: {

            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
}
