/*
* File: bridgeMode.js
* Created on 5th August 2013 - Bala Krishna G
* Copyright (c) 2013 TeamF1, Inc.
* All rights reserved.
*/
/**
 * Form Validation
 * @method pageValidate
 */
function pageValidate(frmId) {
	var txtFieldIdArr = new Array();
	txtFieldIdArr[0] = "tf1_vlanId,Please enter a valid VLAN ID";

	if (txtFieldArrayCheck(txtFieldIdArr) == false)
		return false;

	if (!isProblemChar(txtFieldIdArr, " '\"", "Invalid Characters") == false)
		return false;

	var vlanId1Obj = document.getElementById('tf1_vlanId');
	if (vlanId1Obj && !vlanId1Obj.disabled) {
		if (numericValueRangeCheck(vlanId1Obj, "", "", 2, 4094, true, "Invalid VLAN ID.", "") == false)
			return false;
	}

	setHiddenChks(frmId);
	return true;

}

/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function() {
	onloadCall(enableBridgeMode, {
		imageId : 'tf1_bridgeMode',
		disableIndividual : 'tf1_port tf1_vlanId',
		disableGrp : '',
		enableIndividual : '',
		enableGrp : '',
		hideClass : 'hide',
		showClass : 'configRow',
		breakDivs : 'break_port break_vlanId',
		breakClass : 'break',
		imagesInfo : {
			disableImages : '',
			enableImages : '',
			disableClass : '',
			enableClass : ''
		}
	})
});

/* On body load call the respective function */
window.onload = function() {
	enableBridgeMode({
		imageId : 'tf1_bridgeMode',
		disableIndividual : 'tf1_port tf1_vlanId',
		disableGrp : '',
		enableIndividual : '',
		enableGrp : '',
		hideClass : 'hide',
		showClass : 'configRow',
		breakDivs : 'break_port break_vlanId',
		breakClass : 'break',
		imagesInfo : {
			disableImages : '',
			enableImages : '',
			disableClass : '',
			enableClass : ''
		}
	});
}
/**
 * Wrapper function called onload
 * @method changeDhcpStatus
 * @param obj
 */
function enableBridgeMode(toggleObj) {
	onImageToggle(toggleObj);

}

/**
 * Reset function for form
 * @method enableBridgeModeOnReset
 * @param frmId Form ID
 */

function enableBridgeModeOnReset(frmId) {
	resetImgOnOff(frmId);
	enableBridgeMode({
		imageId : 'tf1_bridgeMode',
		disableIndividual : 'tf1_port tf1_vlanId',
		disableGrp : '',
		enableIndividual : '',
		enableGrp : '',

		hideClass : 'hide',
		showClass : 'configRow',
		breakDivs : 'break_port break_vlanId',
		breakClass : 'break',
		imagesInfo : {
			disableImages : '',
			enableImages : '',
			disableClass : '',
			enableClass : ''
		}
	});
}

