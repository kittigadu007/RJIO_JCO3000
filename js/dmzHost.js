/*
 * File: dmzHost.js
 * Created on 9th Oct 2013 - Bala Krishna G
 * Copyright (c) 2013 TeamF1, Inc.
 * All rights reserved.
 */

function dmzHostPageValidate (frmId) {
    var txtFieldIdArr = new Array ();    
    txtFieldIdArr[0] = "tf1_ipAddress,Please enter a valid IP Address";
    
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;    

    if (ipv4Validate ('tf1_ipAddress', 'SN', false, true, "Invalid IP address.", "for octet ", true) == false)
        return false;
		
	/* Check only if Ip address field is enabled */
	var lanIpObj = document.getElementById('tf1_ipAddress');	
	if (lanIpObj) {		
		/*Begin: Subnet checking for Wan They should not be in same subvnet*/	
		var lanIpAddr = getIPInt1('tf1_lanIpAddress');
		var lanSnMask = getIPInt1('tf1_lanSubnetMask');
		var wanIpAddr = getIPInt1('tf1_wanIpAddress');
		var wanSnMask = getIPInt1('tf1_wanSubnetMask');
		var dmzIpAddress = getIPInt1('tf1_ipAddress');	

		 if ( $("#tf1_wanIpAddress").val() != '' && $("#tf1_wanSubnetMask").val() != '' && isInSubnet(dmzIpAddress, wanIpAddr , wanSnMask) == true ) 
				{
				var errorstr = "WAN IP address is in the same subnet. Please specify IP address in a different subnet.";
				alert (errorstr);
				lanIpObj.focus();
				return false;
		}		
		/*End: Subnet checking for Wan*/	
		/* Start Check with DMZHost IP address in same subnet of LAN */
		if ( $("#tf1_lanIpAddress").val() != '' && $("#tf1_lanSubnetMask").val() != '' && isInSubnet(dmzIpAddress, lanIpAddr , lanSnMask) == false && $("#tf1_ipAddress").is(":visible"))
		{ 
			alert ('DMZ Host IP address and LAN should be in the same subnet');
			document.getElementById('tf1_ipAddress').focus();
			return false;
		}/*End: Check with DMZHost IP address in same subnet of LAN */	
	}
    setHiddenChks (frmId);
    return true;
}


/**
 * Wrapper function called onload
 * @method changeDhcpStatus
 * @param obj
 */
function enableDmzHost(toggleObj){
    onImageToggle(toggleObj);
 
}
 
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
/* binding image events */
    onloadCall(enableDmzHost,{
        imageId: 'tf1_dmzHost',
        disableIndividual: 'tf1_ipAddress',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_ipAddress',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
/* Apply onload function */
    enableDmzHost({
            imageId: 'tf1_dmzHost',
            disableIndividual: 'tf1_ipAddress',
            disableGrp: '',
            enableIndividual: '',
            enableGrp: '',
            hideClass: 'hide',
            showClass: 'configRow',
            breakDivs: 'break_ipAddress',
            breakClass: 'break',
            imagesInfo: {
                disableImages: '',
                enableImages: '',
                disableClass: '',
                enableClass: ''
            }
        });
});

/* Reset function for form*/

function dmzHostOnReset(frmId) {
		resetImgOnOff(frmId);
		enableDmzHost({
        imageId: 'tf1_dmzHost',
        disableIndividual: 'tf1_ipAddress',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_ipAddress',
        breakClass: 'break',
        imagesInfo: {

            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    });
}
