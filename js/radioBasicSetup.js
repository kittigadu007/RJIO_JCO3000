/*
 * File: radioConfig.js
 * Created on 4th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */
jQuery(function(){
    pageInit();
    wlNwInit();
});

/**
 * This function calls Page Reset
 * OnReset validation
 * @method radioBasicSetupReset
 */
function radioBasicSetupReset(){
    pageInit();
    wlNwInit();
};


/**
 * Form Validation
 * @method radioValidate
 */
function radioValidate(){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "txtDefTransPwr,Please enter a valid Default Transmit Power";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

    if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;
    
    var transPwrObj = document.getElementById('txtDefTransPwr')
    var hdObj = document.getElementById('hdTxPowerMax');
    var maxValue = 31;
    if (hdObj && !isNaN(hdObj.value)) 
        maxValue = parseInt(hdObj.value, 10);
    if (numericValueRangeCheck(transPwrObj, '', '', 1, maxValue, false, '', '(dBm)') == false) {
        var errStr = "Please enter a value between 1 to " + maxValue + " (dBm)"
        if (document.getElementById('txtDefTransPwrErr')) 
            document.getElementById('txtDefTransPwrErr').innerHTML = errStr;
        else 
            alert(errStr);
        return false;
    }
    
    return true
}

/**
 * Onload Function
 * @method pageInit
 */
function pageInit(){
    /* pick the correct ISO country code corresponding to atheros country code */
    var cntryobj = document.getElementById('hdWlanCountry');
    var configuredCountry = "356"
    
    for (count = 0; count < wlNwAthObjLst.length; count++) {
        try {
            if (wlNwAthObjLst[count].countryCode == configuredCountry) 
                break;
        } 
        catch (err) {
        }
    }
    
    cntryobj.value = wlNwAthObjLst[count].countryISOName;
}
