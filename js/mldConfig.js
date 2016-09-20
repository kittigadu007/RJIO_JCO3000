/*
 * Copyright (c) 2013 TeamF1, Inc. (www.TeamF1.com)
 * All rights reserved.
 */
 /**
 * Form Validation
 * @method mldValidate
 */
function mldValidate(frmId){
    var txtFieldIdArr = new Array ();    
    txtFieldIdArr[0] = "tf1_queryResTime,Please enter a valid Maximum query response time";
    txtFieldIdArr[1] = "tf1_robustVar,Please enter a valid Robustness Variable Value";
    txtFieldIdArr[2] = "tf1_queryInt,Please enter a valid Query Interval";

    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;


    if (numericValueRangeCheck (document.getElementById('tf1_queryResTime'), '', '', 5000, 1800000, true, '', 'Milli seconds') == false)
    	 
 return false;
    if (numericValueRangeCheck (document.getElementById('tf1_robustVar'), '', '', 2, 8, true, '', '') == false)
    	  return false;

    if (numericValueRangeCheck (document.getElementById('tf1_queryInt'), '', '', 100, 1800, true, '', 'Seconds') == false)
    	 return false; 
    
    setHiddenChks (frmId);    
	return true;    	
}
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(enableMLDConfig, {
        imageId: 'tf1_mldEnabled',
        disableIndividual: 'tf1_queryResTime tf1_robustVar tf1_queryInt',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_queryResTime break_robustVar break_queryInt',
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
    enableMLDConfig({
        imageId: 'tf1_mldEnabled',
        disableIndividual: 'tf1_queryResTime tf1_robustVar tf1_queryInt',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_queryResTime break_robustVar break_queryInt',
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
function enableMLDConfig(toggleObj){
    onImageToggle(toggleObj);
 }


function validateMldSetup(frmId) {
 		setHiddenChks (frmId);
    return true;
}

/* Reset function for form */

function mldSetupOnReset(frmId) {
		resetImgOnOff(frmId);
		enableMLDConfig({
        imageId: 'tf1_mldEnabled',
        disableIndividual: 'tf1_queryResTime tf1_robustVar tf1_queryInt',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_queryResTime break_robustVar break_queryInt',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',

            enableClass: ''
        }
    });
		
}
	
