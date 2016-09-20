/*
 * File: vlanSettings.js
 * Created on 9th nov 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */ 
$(document).ready(function(){
	onloadCall();	
});

/**
 * This function calls when user clicks on submit button.
 * OnSubmit validation
 * @method validateVlanSettingsConfig
 */
function vlanWanPageValidate() {
	var txtFieldIdArr = new Array();
	txtFieldIdArr[0] = "tf1_vlanId, Please enter valid VLAN ID";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false)
	    return false;
    
	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

    var vlanId1Obj = document.getElementById('tf1_vlanId');
    if (vlanId1Obj && !vlanId1Obj.disabled) {
        if (numericValueRangeCheck(vlanId1Obj , "", "", 1, 4094, true, "Invalid VLAN ID.", "") == false) 
            return false;
    }  
    return true;
}
