/*
 * File: dateAndTime.js
 * Created on 17th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
var noDSTCountries = new Array("Eniwetok", "Midway Island", "Hawaii", "Marquesas Is.", "Pitcairn Is.", "Caracas", "Mid-Atlantic", "Baghdad", "Abu Dhabi", "Kabul", "Bombay", "Almaty", "Burma", "Bangkok", "Beijing", "Osaka", "Brisbane", "Norfolk Island (Kingston)", "Tonga", "Kiribati");
var domainNameExt = new Array('.com', '.net', '.aero', '.asia', '.cat', '.jobs', '.org', '.biz', '.coop', '.info', '.museum', '.name', '.pro', '.tel', '.travel', '.edu', '.gov', '.int', '.mil', '.mobi', '.ac', '.ad', '.ae', '.af', '.ag', '.ai', '.al', '.am', '.an', '.ao', '.aq', '.ar', '.as', '.at', '.au', '.aw', '.ax', '.az', '.ba', '.bb', '.bd', '.be', '.bf', '.bg', '.bh', '.bi', '.bj', '.bm', '.bn', '.bo', '.br', '.bs', '.bt', '.bv', '.bw', '.by', '.bz', '.ca', '.cc', '.cd', '.cf', '.cg', '.ch', '.ci', '.ck', '.cl', '.cm', '.cn', '.co', '.cr', '.cu', '.cv', '.cx', '.cy', '.cz', '.de', '.dj', '.dk', '.dm', '.do', '.dz', '.ec', '.ee', '.eg', '.er', '.es', '.et', '.eu', '.fi', '.fj', '.fk', '.fm', '.fo', '.fr', '.ga', '.gb', '.gd', '.ge', '.gf', '.gg', '.gh', '.gi', '.gl', '.gm', '.gn', '.gp', '.gq', '.gr', '.gs', '.gt', '.gu', '.gw', '.gy', '.hk', '.hm', '.hn', '.hr', '.ht', '.hu', '.id', '.ie', '.il', '.im', '.in', '.io', '.iq', '.ir', '.is', '.it', '.je', '.jm', '.jo', '.jp', '.ke', '.kg', '.kh', '.ki', '.km', '.kn', '.kp', '.kr', '.kw', '.ky', '.kz', '.la', '.lb', '.lc', '.li', '.lk', '.lr', '.ls', '.lt', '.lu', '.lv', '.ly', '.ma', '.mc', '.md', '.me', '.mg', '.mh', '.mk', '.ml', '.mm', '.mn', '.mo', '.mp', '.mq', '.mr', '.ms', '.mt', '.mu', '.mv', '.mw', '.mx', '.my', '.mz', '.na', '.nc', '.ne', '.nf', '.ng', '.ni', '.nl', '.no', '.np', '.nr', '.nu', '.nz', '.om', '.pa', '.pe', '.pf', '.pg', '.ph', '.pk', '.pl', '.pm', '.pn', '.pr', '.ps', '.pt', '.pw', '.py', '.qa', '.re', '.ro', '.rw', '.ru', '.sa', '.sb', '.sc', '.sd', '.se', '.sg', '.sh', '.si', '.sj', '.sk', '.sl', '.sm', '.sn', '.so', '.sr', '.st', '.sv', '.sy', '.sz', '.tc', '.td', '.tf', '.tg', '.th', '.tj', '.tk', '.tm', '.tn', '.to', '.tp', '.tr', '.tt', '.tv', '.tw', '.tz', '.ua', '.ug', '.uk', '.um', '.us', '.uy', '.uz', '.va', '.vc', '.ve', '.vg', '.vi', '.vn', '.vu', '.ws', '.wf', '.ye', '.yt', '.yu', '.za', '.zm', '.zw');

/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    timeZoneInit();
    timezoneCheck();
});

/**
 * Form Validation
 * @method timeZoneValidate
 */
function timeZoneValidate(frmId){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtCustomNtp1,Please enter a valid Primary NTP Server Name/IP Address";
    txtFieldIdArr[1] = "tf1_txtCustomNtp2,Please enter a valid Secondary NTP Server Name/IP Address";    
    txtFieldIdArr[2] = "tf1_txtReSync,Please enter a valid Time to re-synchronize";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false; 
    
    if (ipaddrValidate('tf1_txtCustomNtp1') == false) 
        return false;
    
    if (ipaddrValidate('tf1_txtCustomNtp2') == false) 
        return false;
	

    var reSyncObj = document.getElementById("tf1_txtReSync");
	
	
    if (numericValueRangeCheck(reSyncObj, '', '', 5, 1440, true, '', '') == false) 
        return false;

		setHiddenChks(frmId);

    return true;
}

/**
 * Onclick event
 * @method ntpConfigTypeCheck
 */
function ntpConfigTypeCheck(){
    var selValue = radioCheckedValueGet('tf1_radConfigNtpSvr');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1: /* Use NTP server */
            fieldStateChangeWr('', 'tf1_tblBeforeDate1_div', '', 'tf1_tblNTPSvrs_div');
            vidualDisplay('tf1_tblNTPSvrs', 'configRow');
            vidualDisplay('tf1_tblBeforeDate1', 'hide');
            NtpSvrTypeCheck();
            break;
        case 0: /* Manual Time Setting */
            fieldStateChangeWr('', 'tf1_tblNTPSvrs_div', '', 'tf1_tblBeforeDate1_div');
            vidualDisplay('tf1_tblNTPSvrs', 'hide');
            vidualDisplay('tf1_tblBeforeDate1', 'configRow');
            break;
    }
}

/**
 * Onclick event
 * @method NtpSvrTypeCheck
 */
function NtpSvrTypeCheck(){
    var selValue = radioCheckedValueGet('tf1_radNtp1');
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1: /* Use Default NTP server */
            fieldStateChangeWr('tf1_txtCustomNtp1 tf1_txtCustomNtp2', '', '', '');
            vidualDisplay('tf1_txtCustomNtp1 tf1_txtCustomNtp2', 'hide');
			vidualDisplay('tf1_radDhcpNtp', 'configRow');
			vidualDisplay('break_radDhcpNtp', 'break');
            vidualDisplay('break_txtCustomNtp1 break_txtCustomNtp2', 'hide');
            break;
        case 0: /* Use Custom NTP server */
            fieldStateChangeWr('', '', 'tf1_txtCustomNtp1 tf1_txtCustomNtp2', '');
            vidualDisplay('tf1_txtCustomNtp1 tf1_txtCustomNtp2', 'configRow');
			vidualDisplay('tf1_radDhcpNtp break_radDhcpNtp', 'hide');
            vidualDisplay('break_txtCustomNtp1 break_txtCustomNtp2', 'break');
            break;
    }
}

/**
 * Onload function
 * @method timeZoneInit
 */
function timeZoneInit(){
    ntpConfigTypeCheck();
    timezoneCheck();
    onloadCall();
}
/**
 * Reset function
 * @method dateAndTimeOnReset
*/
function dateAndTimeOnReset(frmId) {

	resetImgOnOff(frmId);
	ntpConfigTypeCheck();
    timezoneCheck();
    
}

/**
 * OnChange event
 * @method timezoneCheck
 */
function timezoneCheck(){
    var selTimezone = document.getElementById('tf1_selTimezone');
    var timezone = selTimezone.options[selTimezone.selectedIndex].text;
    if (!timezone) 
        return;
    var len = noDSTCountries.length;
	
    for (var i = 0; i < len; ++i) {
        if (timezone.indexOf(noDSTCountries[i]) != -1) {
            fieldStateChangeWr('tf1_chkAutoDaylight tf1_chkAutoDaylightValue', '', '', '');
            vidualDisplay('tf1_chkAutoDaylight', 'hide');
            return;
        }
    }
    fieldStateChangeWr('', '', 'tf1_chkAutoDaylight tf1_chkAutoDaylightValue', '');
    vidualDisplay('tf1_chkAutoDaylight', 'configRow');
}

/**
 * Months and Day Format Validation
 * @method dayCheck
 */
function dayCheck(srcObj, mnthId, yearObjId){
    var day = parseInt(srcObj.value, 10);
    var month = parseInt(document.getElementById(mnthId).value, 10);
    if (month == 2) {
        if (document.getElementById(yearObjId).value != "" && !isNaN(document.getElementById(yearObjId).value)) {
            if (isLeapYear(parseInt(document.getElementById(yearObjId).value, 10)) && day > 29) {
                alert("Invalid: Day should be in range of (1 - 29) for the Month '2' (February) in a Leap Year");
                srcObj.focus();
                return false;
            }
            else 
                if (!isLeapYear(parseInt(document.getElementById(yearObjId).value, 10)) && day > 28) {
                    alert("Invalid: Day should be in range of (1 - 28) for the Month '2' (February)");
                    srcObj.focus();
                    return false;
                }
        }
        else 
            if (day > 28) {
                alert("Invalid: Day should be in range of (1 - 28) for the Month '2' (February)");
                srcObj.focus();
                return false;
            }
    }
    if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
        if (day > 30) {
            alert("Invalid: Day should be in range of (1 - 30) for Months April, June, September, November");
            srcObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * Days Months Hours and Mins Digit Format Validation
 * @method dateCheck
 */
function dateCheck(srcObj){
    if (!srcObj) 
        return false;
    if (srcObj.value.length < 2) {
        alert("Please enter it in 2 digit Format : 01");
        srcObj.focus();
        return false;
    }
    return true;
}

/**
 * leap year and Format Validation
 * @method yearCheck
 */
function yearCheck(srcObj){
    if (!srcObj) 
        return false;
    if (srcObj.value.length < 4) {
        alert("Please enter in 4 digits Format: 2010");
        srcObj.focus();
        return false;
    }
    return true;
}

/**
 * leap year and Format Validation
 * @method dateCheck
 */
function isLeapYear(year){
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) 
        return true;
    return false;
}

/**
 * IP address or Domain name Validation
 * @method ipaddrValidate
 */
function ipaddrValidate(ipAddr){
    var lastOctateVal = 0;
    var ipAddrObj = document.getElementById(ipAddr);
    if (!ipAddrObj || ipAddrObj.disabled) 
        return true;
    var ipAddrObjArr = (ipAddrObj.value).split(".");
    if (ipAddrObjArr.length == 1) {
        alert("Invalid IP Address/Domain name. Please enter a valid IP Address/Domain name.");
        ipAddrObj.focus();
        return false;
    }
    if (ipAddrObjArr.length) 
        lastOctateVal = ipAddrObjArr[ipAddrObjArr.length - 1];
    if (!isNaN(lastOctateVal)) {
        if (ipv4AddrValidate(ipAddrObj, 'IP', false, true, 'Invalid IP address.', 'for octet ', true) == false) {
            ipAddrObj.focus();
            return false;
        }
    }
    else {
        if (checkDomainExtension(lastOctateVal) == false) {
            alert("Please enter a valid domain name extension.");
            return false;
        }
        if (ipAddrObj.value.length > 253 || ipAddrObj.value.length < 1) {
            alert("The domain cannot be bigger than 253 or less than 1 characters");
            return false;
        }
        if (checkEachNodeLength(ipAddrObjArr) == false) 
            return false;
        if (checkHostName(ipAddr, true, 'Invalid IP Address/Domain name: ', false) == false) 
            return false;
        return true;
    }
}

/*
 function: checkEachNodeLength
 parameters: Array of nodes in a domain name.
 purpose : Checks is number of characters in a node of a domain exceeds 63 characters.
 return : true or false;
 */
function checkEachNodeLength(nodeArray){
    for (var i = 0; i <= nodeArray.length - 1; i++) {
        var node = nodeArray[i];
        if (node.length > 63) {
            alert("Each node in the domain can only be 63 characters long.")
            return false;
        }
    }
    return true;
}

/*
 function: checkDomainExtension
 parameters: last octate value of domain name.
 purpose : checks if the extension falls in the specified domains.
 return : true or false;
 */
function checkDomainExtension(lastOctateVal){
    var ext = "." + lastOctateVal;
    for (var i = 0; i <= domainNameExt.length - 1; i++) {
        if (ext == domainNameExt[i]) 
            return true;
    }
    return false;
}