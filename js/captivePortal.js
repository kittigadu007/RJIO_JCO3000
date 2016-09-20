/*
 * File: captivePortal.js
 * Created on 4th July 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */

/**
 * @method isProblemCharArrayCheck1_Custom
 * @param txtFieldIdArr - ',' separated list of fieldIds and messages
 */
function isProblemCharArrayCheck1_Custom(txtFieldIdArr){
    for (var i = 0; i < txtFieldIdArr.length; ++i) {
        var result = false;
        var strArr = txtFieldIdArr[i].split(",");
        var obj = document.getElementById(strArr[0]);
        if (!obj || obj.disabled) 
            continue;
        else {
            if (strArr.length > 1) {
                if (obj.value.indexOf("'") != -1 || obj.value.indexOf("\"") != -1 || obj.value.indexOf(" ") != -1 || obj.value.indexOf("|") != -1 || obj.value.indexOf(";") != -1) {
                    if (document.getElementById(strArr[0] + "Err")) 
                        document.getElementById(strArr[0] + "Err").innerHTML = "Empty space, ' and \" characters are not supported for this field"
                    else 
                        alert("Empty space, ', \", | and ; characters are not supported for this field");
                    obj.focus();
                    return false;
                }
            }
        }
    }
    return true;
}

function loginConfirmPassword (){

	var newPassObj = document.getElementById('tf1_txtNewPassWd');
	var confNewPassObj = document.getElementById('tf1_txtCnfPwd');


	var txtFieldIdArr = new Array ();	    
    txtFieldIdArr[0] = "tf1_txtNewPassWd,Please enter a valid Password";
    txtFieldIdArr[1] = "tf1_txtCnfPwd,Please enter a valid Confirm Password";
    
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;
         
    if (isProblemCharArrayCheck1_Custom (txtFieldIdArr) == false)
         return false;
    /*  48829 starts */
    if (newPassObj.value.length < 8 || newPassObj.value.length > 32)
    {
         alert("Password field length should be between 8 and 32 characters only");
         newPassObj.focus();
         return false;
    }
     /*  48829 ends */
	if (newPassObj.value != confNewPassObj.value){
		alert ("Passwords do not match");
		confNewPassObj.focus();
		return false;
	}
	return true;
}


/*
* loginValidate - Used to validate login name and password                        
* 
* RETURNS: true or false 
*/
    
function loginValidate (){
    var txtFieldIdArr = new Array ();
    txtFieldIdArr[0] = "tf1_txtUserName,Please enter a valid Username";
    txtFieldIdArr[1] = "tf1_txtPwd,Please enter a valid password";
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;

    if (document.getElementById ('hdUserAgent'))
        document.getElementById ('hdUserAgent').value = navigator.userAgent;

    return true;
 }

/*
* loginInit - Used to show and hide screens based on from which 
* action we are coming to the page* 
*/
    
function loginValidate (){
    var txtFieldIdArr = new Array ();
    txtFieldIdArr[0] = "tf1_txtUserName,Please enter a valid Username";
    txtFieldIdArr[1] = "tf1_txtPwd,Please enter a valid password";
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;

    if (document.getElementById ('hdUserAgent'))
        document.getElementById ('hdUserAgent').value = navigator.userAgent;

    return true;
}
    
$(document).ready(function(){
    var usrObj = document.getElementById ('tf1_txtUserName');    
    var screenShowObj = document.getElementById ('hdSreenVal');
    if(screenShowObj){
        var screenVal = parseInt(screenShowObj.value, 10);
        switch (screenVal){            
            case 1:
                    fieldStateChangeWr ('tf1_txtUserName tf1_txtPwd tf1_txtNewPassWd tf1_txtCnfPwd', '', '', '');
                    vidualDisplay ('tf1_LoginTblBlock tf1_PasswordChengeTblBlock tf1_ForcedLoginTblBlock', 'hide');
					vidualDisplay ('tf1_LoggedinTblBlock', '');
                    break;
            case 2:
                    fieldStateChangeWr ('tf1_txtUserName tf1_txtPwd tf1_txtNewPassWd tf1_txtCnfPwd', '', '', '');
                    vidualDisplay ('tf1_LoginTblBlock tf1_PasswordChengeTblBlock tf1_LoggedinTblBlock', 'hide');
					vidualDisplay('tf1_ForcedLoginTblBlock','')
                    break;
            case 0:
            default:                    
                    fieldStateChangeWr ('tf1_txtNewPassWd tf1_txtCnfPwd', '', 'tf1_txtUserName tf1_txtPwd', '');
                    vidualDisplay ('tf1_PasswordChengeTblBlock tf1_LoggedinTblBlock tf1_ForcedLoginTblBlock', 'hide');
					vidualDisplay ('tf1_LoginTblBlock', '');

                    if (!usrObj) return;
                    usrObj.focus ();                    
                    break;
        }
    }                
});


/*
* changeScreenOnPassClick - Used to change screen                        
* 
* 
*/

function changeScreenOnPass (hideScreenId, showScreenId) {
    fieldStateChangeWr ('tf1_txtUserName tf1_txtPwd', '', 'tf1_txtNewPassWd tf1_txtCnfPwd', '');    
    //displayOrHideFields (hideScreenId, showScreenId);
	vidualDisplay(hideScreenId, 'hide');
	vidualDisplay(showScreenId,'')
}

