/*
 * File: ipMode.js
 * Created on 30th July 2014 - Bala krishna G
 * Copyright (c) 2014 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Form Validation
 * @method wanSetupValidate
 */
function ipModeValidation(frmId){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_apnName,Please enter valid APN Name";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
	var ip_mode_confirm = confirm('An IP Mode change will cause the device to reboot, Click OK to continue or Cancel to abort');  
    if(ip_mode_confirm == false){
        document.tf1_frmipMode.reset();  
		return false;
	 }
    
    return true;
}


  
