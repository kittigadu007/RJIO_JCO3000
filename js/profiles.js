/*
 * File: profileConfig.js
 * Created on 17th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    profileSecurityCheck();
    onloadCall();
});

/**
 * Alerts if some character is not supported in the field
 * @method isProblemCharArrayCheckSSID
 * @param txtFieldIdArr - ',' separated list of fieldIds and messages
 * @param notSupportedChar -
 */
function isProblemCharArrayCheckSSID(txtFieldIdArr){
    for (var i = 0; i < txtFieldIdArr.length; ++i) {
        var result = false;
		var ssidCheck = false;
        var strArr = txtFieldIdArr[i].split(",");
        var obj = document.getElementById(strArr[0]);
		if (strArr[0] == "tf1_txtSSID"){ssidCheck = true;}
        if (!obj || obj.disabled) 
            continue;
        else {
            if (strArr.length > 1) {
				if (ssidCheck) {
                if (obj.value.indexOf("'") != -1 || obj.value.indexOf("\"") != -1) {
                    if (document.getElementById(strArr[0] + "Err")) 
                        document.getElementById(strArr[0] + "Err").innerHTML = "' and \" characters are not supported for this field"
                    else 
                        alert("' and \" characters are not supported for this field");
                    obj.focus();
                    return false;
                }}
				else {
                if (obj.value.indexOf("'") != -1 || obj.value.indexOf("\"") != -1 || obj.value.indexOf(" ") != -1) {
                    if (document.getElementById(strArr[0] + "Err")) 
                        document.getElementById(strArr[0] + "Err").innerHTML = "Empty space, ' and \" characters are not supported for this field"
                    else 
                        alert("Empty space, ' and \" characters are not supported for this field");
                    obj.focus();
                    return false;
                }}
            }
        }
    }
    return true;
}


/**
 * Form Validation
 * @method profileConfValidate
 */
function profileConfValidate(frmId){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtProfName,Please enter valid Profile Name.";
    txtFieldIdArr[1] = "tf1_txtSSID,Please enter SSID for the profile.";
    txtFieldIdArr[2] = "tf1_txtWPAPasswd,Please enter WPA Password.";
    txtFieldIdArr[3] = "tf1_txtWepKey1,Please enter WEP key.";
    txtFieldIdArr[4] = "tf1_txtWepKey2,Please enter WEP key.";
    txtFieldIdArr[5] = "tf1_txtWepKey3,Please enter WEP key.";
    txtFieldIdArr[6] = "tf1_txtWepKey4,Please enter WEP key.";
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
    /* added check for not allowing space as first character starts */
    var profileObj = document.getElementById('tf1_txtProfName');
    if ( profileObj.value.charAt(0) == ' ' )
    {
         alert("Profile Name cannot start with space character");
         profileObj.focus();
         return false;
    }
    /* added check for not allowing space as first character ends */
    var txtFieldIdArrProfile = new Array();
    txtFieldIdArrProfile[0] = "tf1_txtProfName,Please enter valid Profile Name.";
     /* added to condition to prevent semicolon & pipe characters */
    if (isProblemCharArrayCheck(txtFieldIdArrProfile, "'\";|", "Following characters are not supported for this field:\r\ndouble quote( \" ), single quote( \' ), Pipe ( | ), Semi-Colon ( ; )") == false) 
        return false;
    /* added below condition to allow space for host name for the SPR-48304 additional comments */
   
   var txtFieldIdArrConfig = new Array();
    txtFieldIdArrConfig[0] = "tf1_txtSSID,Please enter SSID for the profile.";
    txtFieldIdArrConfig[1] = "tf1_txtWPAPasswd,Please enter WPA Password.";
    txtFieldIdArrConfig[2] = "tf1_txtWepKey1,Please enter WEP key.";
    txtFieldIdArrConfig[3] = "tf1_txtWepKey2,Please enter WEP key.";
    txtFieldIdArrConfig[4] = "tf1_txtWepKey3,Please enter WEP key.";
    txtFieldIdArrConfig[5] = "tf1_txtWepKey4,Please enter WEP key.";

   if (isProblemCharArrayCheckSSID(txtFieldIdArrConfig) == false) 
        return false;
    var txtFieldIdArrSSID = new Array();

    txtFieldIdArrSSID[0] = "tf1_txtSSID,Please enter SSID for the profile.";
     
if (isProblemCharArrayCheckSSID(txtFieldIdArrSSID) == false) 
        return false;

    if (fieldLengthCheck('tf1_txtWPAPasswd', 8, 63, "WPA password should be at least 8 charactes long.") == false) 
        return false;
    
    if (wepKeyCheck() == false) {
        return false;
    }

    /* Confirm the message to user for Andriod behaior */    
    var SecurityOptValue = comboSelectedValueGet("tf1_selSecurityOpt");
    if ( SecurityOptValue == "WEP" ) {
        if (radioCheckedValueGet('tf1_rdbWepKey1') != "0") {
            var cnfSecurity = confirm("Please note that choosing any key other than \"WEP Key 1\" may result in loss of\nconnectivity with some \"Android\" based smart phones. Do you wish to continue?");
        if ( cnfSecurity == false) {
            return false;
        }
        
        }
    }   
    var security = $("#tf1_selSecurityOpt").val();
    if(security == "OPEN" || security == "WEP"){
        var r = confirm("OPEN/WEP modes are known to be less secure. Do you wish to continue?");
        if (r == true) {
            setHiddenChks(frmId);
            return true;
        } else {
            return false
        }
    } 
    setHiddenChks(frmId);
    return true;
}

/**
 * Manage WAPKey Fields
 * @method wepKeyCheck
 */
function wepKeyCheck(){
    var selSecObj = document.getElementById("tf1_selSecurityOpt");
    if (selSecObj != null && !selSecObj.disabled) {
        var sec = comboSelectedValueGet("tf1_selSecurityOpt");
        if (sec == "WEP") {
            var wepKeyLength = parseInt(comboSelectedValueGet("tf1_selWepEncrMethod"), 10);
            var asciiLen = 5;
            var hexLen = 10;
            if (wepKeyLength == 64) {
                asciiLen = 5;
                hexLen = 10;
            }
            else {
                asciiLen = 13;
                hexLen = 26;
            }
            for (var i = 1; i <= 4; i++) {
                var wepKey = document.getElementById('tf1_txtWepKey' + i);
                if (wepKey && !wepKey.disabled) {
                    if (wepKey.value.length != asciiLen && wepKey.value.length != hexLen) {
                        alert("Invalid WEP Key Length: Key Length should be " + asciiLen + " for ASCII Key and " + hexLen + " for Hex Key");
                        wepKey.focus();
                        return false;
                    }
                    var isAscii = true
                    var isHex = true
                    for (var idx = 0; idx < wepKey.value.length; idx++) {
                        var exceptionChars = '"\''
                        var charCode = wepKey.value.charCodeAt(idx)
                        if (!((charCode >= 97 && charCode <= 122) ||
                        (charCode >= 65 && charCode <= 90) ||
                        (charCode >= 48 && charCode <= 57) ||
                        charCode != exceptionChars.charCodeAt(0) ||
                        charCode != exceptionChars.charCodeAt(1))) {
                            isAscii = false;
                            break;
                        }
                        if (!((charCode >= 97 && charCode <= 102) ||
                        (charCode >= 65 && charCode <= 70) ||
                        (charCode >= 48 && charCode <= 57))) {
                            isHex = false;
                            break;
                        }
                    }
                    if (isAscii && !(isHex) && wepKey.value.length != asciiLen) {
                        alert("Invalid WEP Key Length: Key Length should be " + asciiLen + " for ASCII Key");
                        return false;
                    }
                    if (!isHex && wepKey.value.length == hexLen) {
                        alert("Invalid WEP Key Length: Key Length should be " + hexLen + " for Hex Key");
                        return false;
                    }
                }
            }
        }
    }
}

function profileSecurityCheck(){
    var encryptionList = ["TKIP", "CCMP", "TKIP+CCMP"];
    var selectedValue = comboSelectedValueGet('tf1_selSecurityOpt');
    if (!selectedValue) 
        return;
    if((selectedValue != 'WEP') ||  (selectedValue != 'OPEN') ){
       prevSelVal = document.getElementById('tf1_hid_selSecurity').value; 
        if(prevSelVal != selectedValue){
           document.getElementById('tf1_txtWPAPasswd').value = '';
        }
    }
    switch (selectedValue) {
        case 'WPA+WPA2':
            fieldStateChangeWr('tf1_enablePreAuth tf1_enablePreAuthHid', 'tf1_tblWEP_div', 'tf1_selEncType tf1_selAuthType tf1_txtWPAPasswd', '');
            vidualDisplay('tf1_enablePreAuth tf1_tblWEP', 'hide');
            vidualDisplay('break_enablePreAuth break_tblWEP', 'hide');
            
            vidualDisplay('tf1_selEncType tf1_selAuthType tf1_txtWPAPasswd', 'configRow');
            vidualDisplay('break_selEncType break_selAuthType break_txtWPAPasswd', 'break');
            break;
        case 'WPA2':
            fieldStateChangeWr('tf1_enablePreAuth tf1_enablePreAuthHid', 'tf1_tblWEP_div', 'tf1_selEncType tf1_selAuthType tf1_txtWPAPasswd', '');
            vidualDisplay('tf1_enablePreAuth tf1_tblWEP', 'hide');
            vidualDisplay('break_enablePreAuth break_tblWEP', 'hide');
            
            vidualDisplay('tf1_selEncType tf1_selAuthType tf1_txtWPAPasswd', 'configRow');
            vidualDisplay('break_selEncType break_selAuthType break_txtWPAPasswd', 'break');
            var selectedAuth = comboSelectedValueGet('tf1_selAuthType');
            if (selectedAuth == 'RADIUS') {
                fieldStateChangeWr('', '', 'tf1_enablePreAuth tf1_enablePreAuthHid', '');
                vidualDisplay('tf1_enablePreAuth', 'configRow');
                vidualDisplay('break_enablePreAuth', 'break');
            }
            break;
        case 'WPA':
            fieldStateChangeWr('tf1_enablePreAuth tf1_enablePreAuthHid', 'tf1_tblWEP_div', 'tf1_selEncType tf1_selAuthType tf1_txtWPAPasswd', '');
            vidualDisplay('tf1_enablePreAuth tf1_tblWEP', 'hide');
            vidualDisplay('break_enablePreAuth break_tblWEP', 'hide');
            
            vidualDisplay('tf1_selEncType tf1_selAuthType tf1_txtWPAPasswd', 'configRow');
            vidualDisplay('break_selEncType break_selAuthType break_txtWPAPasswd', 'break');
            break;
        case 'WEP':
            fieldStateChangeWr('tf1_selEncType tf1_selAuthType tf1_txtWPAPasswd tf1_enablePreAuth tf1_enablePreAuthHid', '', '', 'tf1_tblWEP_div');
            vidualDisplay('tf1_selEncType tf1_selAuthType tf1_txtWPAPasswd tf1_enablePreAuth', 'hide');
            vidualDisplay('break_selEncType break_selAuthType break_txtWPAPasswd break_enablePreAuth', 'hide');
            
            vidualDisplay('tf1_tblWEP', 'configRow');
            vidualDisplay('', '');
            /* added changes from V4 to common starts */
            var modelNameobj = document.getElementById('tf1_hid_modelName');
            if(modelNameobj && modelNameobj.value == 1 ){}else{
            wepKeyIdCheck();
            }
            /* added changes from V4 to common ends */
            break;
        default:
            fieldStateChangeWr('tf1_selEncType tf1_selAuthType tf1_txtWPAPasswd tf1_enablePreAuth tf1_enablePreAuthHid', 'tf1_tblWEP_div', '', '');
            vidualDisplay('tf1_selEncType tf1_selAuthType tf1_txtWPAPasswd tf1_enablePreAuth tf1_tblWEP', 'hide');
            vidualDisplay('break_selEncType break_selAuthType break_txtWPAPasswd break_enablePreAuth break_tblWEP', 'break');
            break;
    }
    AuthTypeCheck();
    var chObj = document.getElementById('tf1_selEncType');	 
	getEncySelectedValue = $(chObj).val();

    if (chObj && !chObj.disabled) {
        opIdx = 0;
		
        if (selectedValue == 'WPA2') {
            chObj.options[0] = null;
            chObj.options[0] = new Option(encryptionList[1], 'CCMP', false, false);
            /* free remaining options */
            var len = chObj.options.length;
            for (delIdx = 1; opIdx < len; ++opIdx) 
                chObj.options[delIdx] = null;
            /* chObj.options[1] = new Option(encryptionList[2], 'TKIP+CCMP', false, false); */
			$(chObj).val(getEncySelectedValue);

        }
        else 
            if (selectedValue == 'WPA+WPA2') {
                chObj.options[0] = null;
                chObj.options[0] = new Option(encryptionList[2], 'TKIP+CCMP', false, false);
                /* free remaining options */
                var len = chObj.options.length;
                for (delIdx = 1; opIdx < len; ++opIdx) 
                    chObj.options[delIdx] = null;
				$(chObj).val(getEncySelectedValue);
            }
            else {				 
                chObj.options[0] = null;
                chObj.options[0] = new Option(encryptionList[0], 'TKIP', false, false);
                /* free remaining options */
                var len = chObj.options.length;
                for (delIdx = 1; opIdx < len; ++opIdx) 
                    chObj.options[delIdx] = null;
                chObj.options[1] = new Option(encryptionList[1], 'CCMP', false, false);
				$(chObj).val(getEncySelectedValue);
            }
    }
}

function AuthTypeCheck(){
    var selectedValue = comboSelectedValueGet('tf1_selAuthType');
    if (!selectedValue) 
        return;
    switch (selectedValue) {
        case 'PSK+RADIUS':
            fieldStateChangeWr('tf1_enablePreAuth tf1_enablePreAuthHid', '', 'tf1_txtWPAPasswd', '');
            vidualDisplay('tf1_enablePreAuth', 'hide');
            vidualDisplay('break_enablePreAuth', 'hide');
            
            vidualDisplay('tf1_txtWPAPasswd', 'configRow');
            vidualDisplay('break_txtWPAPasswd', 'break');
            break;
        case 'RADIUS':
            fieldStateChangeWr('tf1_txtWPAPasswd tf1_enablePreAuth tf1_enablePreAuthHid', '', '', '');
            vidualDisplay('tf1_txtWPAPasswd tf1_enablePreAuth', 'hide');
            vidualDisplay('break_txtWPAPasswd break_enablePreAuth', 'hide');
            
            var selectedSec = comboSelectedValueGet('tf1_selSecurityOpt');
            if (selectedSec == 'WPA2') {
                fieldStateChangeWr('', '', 'tf1_enablePreAuth tf1_enablePreAuthHid', '');
                vidualDisplay('tf1_enablePreAuth', 'configRow');
                vidualDisplay('break_enablePreAuth', 'break');
            }
            break;
        default:
            fieldStateChangeWr('tf1_enablePreAuth tf1_enablePreAuthHid', '', 'tf1_txtWPAPasswd', '');
            vidualDisplay('tf1_enablePreAuth', 'hide');
            vidualDisplay('break_enablePreAuth', 'hide');
            
            vidualDisplay('tf1_txtWPAPasswd', 'configRow');
            vidualDisplay('break_txtWPAPasswd', 'break');
            break;
    }
}

function wepKeyIdCheck(){
    var wepKeyId = parseInt(radioCheckedValueGet('tf1_rdbWepKey1'), 10);
    switch (wepKeyId) {
        case 0:
            fieldStateChangeWr('tf1_txtWepKey2 tf1_txtWepKey3 tf1_txtWepKey4', '', 'tf1_txtWepKey1', '');
            break;
        case 1:
            fieldStateChangeWr('tf1_txtWepKey1 tf1_txtWepKey3 tf1_txtWepKey4', '', 'tf1_txtWepKey2', '');
            break;
        case 2:
            fieldStateChangeWr('tf1_txtWepKey2 tf1_txtWepKey1 tf1_txtWepKey4', '', 'tf1_txtWepKey3', '');
            break;
        case 3:
            fieldStateChangeWr('tf1_txtWepKey2 tf1_txtWepKey3 tf1_txtWepKey1', '', 'tf1_txtWepKey4', '');
            break;
        default:
            document.getElementById('tf1_rdbWepKey1').checked = true;
            fieldStateChangeWr('tf1_txtWepKey2 tf1_txtWepKey3 tf1_txtWepKey4', '', 'tf1_txtWepKey1', '');
            break;
    }
}

function wepKeyLenGet(){
    var encrMethod = comboSelectedValueGet('tf1_selWepEncrMethod');
    var keyLen = 0;
    switch (parseInt(encrMethod, 10)) {
        case 152: /* 152 bit */
            keyLen = 32; /* 32 hex chars */
            break;
        case 128: /* 126 bit */
            keyLen = 26; /* 26 hex chars */
            break;
        case 64: /* 64 bit */
        default:
            keyLen = 10; /* 10 hex chars */
    }
    return keyLen;
}


function wepKeyLenSet(){
    var keyLen = wepKeyLenGet();
    var wepKeyObj = null;
    for (idx = 1; idx <= 4; ++idx) {
        wepKeyObj = document.getElementById('tf1_txtWepKey' + idx);
        if (wepKeyObj) {
            wepKeyObj.maxLength = keyLen;
            if (wepKeyObj.value.length > keyLen) 
                wepKeyObj.value = wepKeyObj.value.substr(0, keyLen);
        }
    }
    pass = document.getElementById('tf1_txtWepPsk')
    if (pass.value != "") {
        generateWepKeys();
    }
}

function generateWepKeys(){
    var keyLen = wepKeyLenGet();
    var wepPsk = document.getElementById('tf1_txtWepPsk').value;
    if (wepPsk == "") {
        /* document.getElementById('tf1_txtWepPskErr').innerHTML = "Enter Pass Phrase"; */
        return
    }
    document.getElementById('tf1_txtWepKey1').value = hex_md5(wepPsk).substr(0, keyLen);
    wepPsk += document.getElementById('tf1_txtWepKey1').value;
    document.getElementById('tf1_txtWepKey2').value = hex_md5(wepPsk).substr(0, keyLen);
    wepPsk += document.getElementById('tf1_txtWepKey2').value;
    document.getElementById('tf1_txtWepKey3').value = hex_md5(wepPsk).substr(0, keyLen);
    wepPsk += document.getElementById('tf1_txtWepKey3').value;
    document.getElementById('tf1_txtWepKey4').value = hex_md5(wepPsk).substr(0, keyLen);
    wepPsk += document.getElementById('tf1_txtWepKey4').value;
}
