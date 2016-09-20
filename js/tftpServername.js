/*
 * File: tftpServername.js
 * Created on 1st Sep 2014 - Bala Krishna G
 * Copyright (c) 2014 TeamF1, Inc.
 * All rights reserved.
 */

  
 
/**
 * Manage input fields when select an option from Destination Hosts
 * @method tftpServerChange
 */
function tftpServerChange(){
    var selValue = comboSelectedValueGet('tf1_tftpServerType');
 
    if (!selValue) 
        return;
    switch (selValue) {
        case '1':
            fieldStateChangeWr('tf1_tftpServerIp', '', 'tf1_tftpServerDomain','');
            vidualDisplay('tf1_tftpServerDomain', 'configRow');
            vidualDisplay('break_tftpServerDomain', 'break');
			
			 vidualDisplay('tf1_tftpServerIp', 'hide');
            vidualDisplay('break_tftpServerIp', 'hide');
        break;
        case '2':
            fieldStateChangeWr('tf1_tftpServerDomain', '', 'tf1_tftpServerIp','');
            vidualDisplay('tf1_tftpServerIp', 'configRow');
            vidualDisplay('break_tftpServerIp', 'break');
			
			 vidualDisplay('tf1_tftpServerDomain', 'hide');
            vidualDisplay('break_tftpServerDomain', 'hide');
        break;		
		
        case '0':
            fieldStateChangeWr('tf1_tftpServerIp tf1_tftpServerDomain', '', '', '');
            vidualDisplay('tf1_tftpServerIp tf1_tftpServerDomain', 'hide');
            vidualDisplay('break_tftpServerIp break_tftpServerDomain', 'hide');
        break;
      
    }
}


jQuery(function(){
   tftpServerChange();
 
});

/**
 * lanIPV4SetupOnReset
 */
function tftpServerOnReset(frmId){
 tftpServerChange();
	 
	 
}




function ipaddrValidate(frmId){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_tftpServerIp,Please enter a valid IP Address";
    txtFieldIdArr[1] = "tf1_tftpServerDomain,Please enter a valid Domain";
     
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;    

    if (ipv4Validate('tf1_tftpServerIp', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;

    setHiddenChks(frmId);    
     
    return true;
}


 


