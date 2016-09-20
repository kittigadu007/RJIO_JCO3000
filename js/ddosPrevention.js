/*
 * File: ddosPrevention.js
 * Created on 12th June 2013 - Bala krishna G
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/****
 * validate the form
 * OnClick validation
 * @method pageValidate
 */
function pageValidate(frmId){
    var txtFieldIdArr = new Array();  
    
    txtFieldIdArr[0] = "tf1_tcpSYNPackets, Please enter valid TCP SYN Packets";
    txtFieldIdArr[1] = "tf1_udpConnectionLimits, Please enter valid UDP Connection Limits";
    txtFieldIdArr[2] = "tf1_cimpPing, Please enter valid Confirm ICMP Ping Requests";
    txtFieldIdArr[3] = "tf1_icmpControl, Please enter valid ICMP Control / Notification Packets";
       
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;    
   
    if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 
    
     var portObj = document.getElementById("tf1_tcpSYNPackets");
    if (!portObj.disabled) {
        if (numericValueRangeCheck(portObj, "", "", 0, 256, true, "", "") == false) 
            return false;
    }
	
	 var portObj = document.getElementById("tf1_udpConnectionLimits");
    if (!portObj.disabled) {
        if (numericValueRangeCheck(portObj, "", "", 0, 128, true, "", "") == false) 
            return false;
    }
	
	 var portObj = document.getElementById("tf1_cimpPing");
    if (!portObj.disabled) {
        if (numericValueRangeCheck(portObj, "", "", 0, 50, true, "", "") == false) 
            return false;
    }
	
	 var portObj = document.getElementById("tf1_icmpControl");
    if (!portObj.disabled) {
        if (numericValueRangeCheck(portObj, "", "", 0, 50, true, "", "") == false) 
            return false;
    }

    setHiddenChks(frmId); 
    return true;
}

/**
 * This function calls changeConfigurablePort
 * OnChange validation
 * @method OnChange
 */
function changeConfigurablePort(radioName){
    var selValue = radioCheckedValueGet(radioName);
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1: /* Default Settings */
            fieldStateChangeWr('tf1_tcpSYNPackets tf1_udpConnectionLimits tf1_cimpPing tf1_icmpControl', '', '', '')
            vidualDisplay('break_tcpSYNPackets break_udpConnectionLimits break_cimpPing break_icmpControl', 'hide');
            vidualDisplay('tf1_tcpSYNPackets tf1_udpConnectionLimits tf1_cimpPing tf1_icmpControl', 'hide');
           // changeConnectionType('tf1_connectionType');
            break;
        case 0: /* Custom Settings */
            fieldStateChangeWr('', '', 'tf1_tcpSYNPackets tf1_udpConnectionLimits tf1_cimpPing tf1_icmpControl', '');
            vidualDisplay('tf1_tcpSYNPackets tf1_udpConnectionLimits tf1_cimpPing tf1_icmpControl', 'configRow');
            vidualDisplay('break_tcpSYNPackets break_udpConnectionLimits break_cimpPing break_icmpControl', 'break');
          //  changeDhcpMode();

            break;
    }
}
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    onloadCall(enableDosDDoS, {
        imageId: 'tf1_dosDDoS',
        disableIndividual: 'tf1_useDefaultDoS tf1_useCustomDoS tf1_tcpSYNPackets tf1_udpConnectionLimits tf1_cimpPing tf1_icmpControl',
        disableGrp: 'tf1_useDefaultDoS_div tf1_useCustomDoS_div',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_useDefaultDoS break_useCustomDoS break_tcpSYNPackets break_udpConnectionLimits break_cimpPing break_icmpControl',
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
    enableDosDDoS({
        imageId: 'tf1_dosDDoS',
        disableIndividual: 'tf1_useDefaultDoS tf1_useCustomDoS tf1_tcpSYNPackets tf1_udpConnectionLimits tf1_cimpPing tf1_icmpControl',
        disableGrp: 'tf1_useDefaultDoS_div tf1_useCustomDoS_div',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_useDefaultDoS break_useCustomDoS break_tcpSYNPackets break_udpConnectionLimits break_cimpPing break_icmpControl',
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
function enableDosDDoS(toggleObj){
    onImageToggle(toggleObj);
	var imgObj = document.getElementById('tf1_dosDDoS').src;	 
    var imageName = imgObj.substring(imgObj.lastIndexOf('/') + 1);
    if (imageName == ON_IMAGE)         
		changeConfigurablePort('tf1_useDefSettings1')
}
 
 function dosDDoSOnreset() {
 enableDosDDoS({
        imageId: 'tf1_dosDDoS',
        disableIndividual: 'tf1_useDefaultDoS tf1_useCustomDoS tf1_tcpSYNPackets tf1_udpConnectionLimits tf1_cimpPing tf1_icmpControl',
        disableGrp: 'tf1_useDefaultDoS_div tf1_useCustomDoS_div',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_useDefaultDoS break_useCustomDoS break_tcpSYNPackets break_udpConnectionLimits break_cimpPing break_icmpControl',
        breakClass: 'break',
        imagesInfo: {
            disableImages: '',
            enableImages: '',
            disableClass: '',
            enableClass: ''
        }
    })
 
}

 
