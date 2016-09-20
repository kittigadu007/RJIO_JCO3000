/*
 * File: sslUser.js
 * Created on 4th Jan 2013 - Bala krishna G
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */

/****
 * validate the form
 * OnClick validation
 * @method pageValidate
 */
function pageValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtUserName, Please enter valid User Name";
    txtFieldIdArr[1] = "tf1_txtPwd, Please enter valid Password";
    txtFieldIdArr[2] = "tf1_txtCfmPwd, Please enter valid Confirm Password";
    txtFieldIdArr[3] = "tf1_userDescription, Please enter valid Description";
    txtFieldIdArr[4] = "tf1_loginTimeout, Please enter valid Idle Time Out";
       
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	var usrObj = document.getElementById('tf1_txtUserName');
    
	if (usrObj.value.length > 32)
	{
		 alert("Username field length cannot be greater than 32 characters");
		 usrObj.focus();
		 return false;
	}
	
	if ( usrObj.value.charAt(0) == '_' || usrObj.value.charAt(0) == '-' || usrObj.value.charAt(0) == ' ')
	{
		 alert("Username cannot start with underscore, hyphen or space characters");
		 usrObj.focus();
		 return false;
	}

	if ( validUserName(usrObj.value) == false ) {

		alert("Username cannot have special characters");
		 usrObj.focus();
		 return false;
	}	
	
    var txtFieldIdArr1 = new Array();
    txtFieldIdArr1[0] = "tf1_txtPwd, Please enter valid Password";
    txtFieldIdArr1[1] = "tf1_txtCfmPwd, Please enter valid Confirm Password";
    txtFieldIdArr1[2] = "tf1_loginTimeout, Please enter valid Idle Time Out";
	
	if (isProblemCharArrayCheck(txtFieldIdArr1, "'\" ", NOT_SUPPORTED) == false) 
        return false;
	
    var pwdObj = document.getElementById('tf1_txtPwd');
    var cnfPwdObj = document.getElementById('tf1_txtCfmPwd');

	if (pwdObj.value.length < 8 || pwdObj.value.length > 32)
	{
		 alert("Password field length should be between 8 and 32 characters only");
		 pwdObj.focus();
		 return false;
	}

    if (pwdObj && !pwdObj.disabled && cnfPwdObj && !cnfPwdObj.disabled && pwdObj.value != cnfPwdObj.value) {
        alert("Passwords do not match");
        document.getElementById('tf1_txtPwd').focus();
        return false;
    }	
   
    var loginTimeout = document.getElementById("tf1_loginTimeout");	
    if (numericValueRangeCheck(loginTimeout, '', '', 1, 999, true, '', '') == false) 
        return false;
    return true;
}

/****
 * This function will check var valid username characters
 * OnClick validation
 * @method validUserName
 */

function validUserName(txtUserName) {
	var strUname = txtUserName.toString();
	/* changed regex pattern to allow space */
	return /^[a-z\d\s]+$/i.test(strUname);
}
