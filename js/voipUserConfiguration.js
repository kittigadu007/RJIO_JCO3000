/*
 * File: voipUserConfiguration.js
 * Copyright (c) 2013 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Form Validation
 * @method pageValidate
 */

function accessLevelCheck(){
    var accessLevel = '';
    if (!accessLevel || isNaN(accessLevel)) 
        return true;
    if (parseInt(accessLevel, 10) != 0) {
        alert("Administrator privilages required");
        return false;
    }
    return true;
}


function pageValidate (frmId){
    var txtFieldIdArr = new Array ();
    txtFieldIdArr[0] = "tf1_ipAddress, Please enter a valid IMS Server IP Address";
 
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;
    
     if (ipv4Validate('tf1_ipAddress', 'IP', false, true, "Invalid IP address.", "for octet ", true) == false) 
        return false;
		
    setHiddenChks(frmId);        
    return true; 
	   
 }
    


 $("#chkShowPassword").click(function () {       
    if($(this).html() == "Show"){ 
        $(this).html("Hide");
        $("#txtPassword").prop("type","text");
    } else {
        $(this).html("Show");
        $("#txtPassword").prop("type","password");
    }
});
