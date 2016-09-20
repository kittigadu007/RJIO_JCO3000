/*
 * File: lanIpv4DhcpSipServer.js
 * Created on 1st Sep 2014 - Bala Krishna G
 * Copyright (c) 2014 TeamF1, Inc.
 * All rights reserved.
 */

  
 
/**
 * Manage input fields when select an option from Destination Hosts
 * @method sipServerChange
 */
function sipServerChange(){
    var selValue = comboSelectedValueGet('tf1_sipServerType');
 
    if (!selValue) 
        return;
    switch (selValue) {
        case '1':
            fieldStateChangeWr('tf1_sipServerIp', '', 'tf1_sipServerDomain','');
            vidualDisplay('tf1_sipServerDomain', 'configRow');
            vidualDisplay('break_sipServerDomain', 'break');
			
			 vidualDisplay('tf1_sipServerIp', 'hide');
            vidualDisplay('break_sipServerIp', 'hide');
        break;
        case '2':
            fieldStateChangeWr('tf1_sipServerDomain', '', 'tf1_sipServerIp','');
            vidualDisplay('tf1_sipServerIp', 'configRow');
            vidualDisplay('break_sipServerIp', 'break');
			
			 vidualDisplay('tf1_sipServerDomain', 'hide');
            vidualDisplay('break_sipServerDomain', 'hide');
        break;		
		
        case '0':
            fieldStateChangeWr('tf1_sipServerIp tf1_sipServerDomain', '', '', '');
            vidualDisplay('tf1_sipServerIp tf1_sipServerDomain', 'hide');
            vidualDisplay('break_sipServerIp break_sipServerDomain', 'hide');
        break;
      
    }
}


jQuery(function(){
   sipServerChange();
 
});

/**
 * lanIPV4SetupOnReset
 */
function sipServerOnReset(frmId){
 sipServerChange();
	 
	 
}




function ipaddrValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_sipServerIp,Please enter a valid IP Address";
    txtFieldIdArr[1] = "tf1_sipServerDomain,Please enter a valid Domain";
     
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;    

    if (ipv4Validate('tf1_sipServerIp', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
    
     
    return true;
}


 

