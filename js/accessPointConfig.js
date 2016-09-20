/*
 * File: accessPointConfig.js
 * Created on 4th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
jQuery(function(){
    onloadCall(ativateTimeSettings, {
        imageId: 'tf1_activeTime',
        disableIndividual: 'tf1_txtSchedStartTimeHrs tf1_txtSchedStartTimeMns tf1_selStartMeridian tf1_txtSchedEndTimeHrs tf1_txtSchedEndTimeMns tf1_selEndMeridian',
        disableGrp: '',
        enableIndividual: '',
        enableGrp: '',
        hideClass: 'hide',
        showClass: 'configRow',
        breakDivs: 'break_txtSchedStartTimeHrs break_txtSchedEndTimeHrs',
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
    
}

/**
 * Wrapper function called onload
 * @method changeDhcpStatus
 * @param obj
 */
function ativateTimeSettings(toggleObj){
    onImageToggle(toggleObj);
}

/**
 * Form Validation
 * @method vapConfigValidate
 */
function vapConfigValidate(frmId){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtAPName,Please enter a valid AP Name";
    txtFieldIdArr[1] = "tf1_txtMaxAssClnt,Please enter a valid Max Associated Clients";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

    if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;
    
    var macObj = document.getElementById('tf1_txtMaxAssClnt');
    if (macObj && !macObj.disabled) {
        if (numericValueRangeCheck(macObj, '', '', 1, 22, true, '', '') == false) 
            return false;
    }
    if (dateValidate('tf1_txtSchedStartTimeHrs', 'tf1_txtSchedStartTimeMns', 'date1Err') == false) 
        return false;
    
    if (dateValidate('tf1_txtSchedEndTimeHrs', 'tf1_txtSchedEndTimeMns', 'date2Err') == false) 
        return false;
    
    var startMerdiumObj = document.getElementById('tf1_selStartMeridian');
    if (startMerdiumObj && !startMerdiumObj.disabled) {
        if (!timeValidate()) 
            return false;
    }
    
    setHiddenChks(frmId);
    return true;
}

/**
 * Time Validation
 * @method timeValidate
 */
function timeValidate(){
    var startMerdium = document.getElementById("tf1_selStartMeridian").value;
    var endMerdium = document.getElementById("tf1_selEndMeridian").value;
    if (startMerdium == endMerdium) {
        var startHr = parseInt(document.getElementById("tf1_txtSchedStartTimeHrs").value, 10);
        var endHr = parseInt(document.getElementById("tf1_txtSchedEndTimeHrs").value, 10);
        var startMin = parseInt(document.getElementById("tf1_txtSchedStartTimeMns").value, 10);
        var endMin = parseInt(document.getElementById("tf1_txtSchedEndTimeMns").value, 10);
        if (startHr == endHr) {
            if (startMin >= endMin) {
                alert("Please check minutes");
                document.getElementById("tf1_txtSchedStartTimeMns").focus();
                return false;
            }
        }
        else {
            if (startHr > endHr) {
                if (startHr != 12) {
                    alert("End hour cannot be less than the start hour");
                    document.getElementById("tf1_txtSchedEndTimeHrs").focus();
                    return false;
                }
            }
        }
    }
    else {
        if (startMerdium == "1" && endMerdium == "0") {
            alert("End Time hours cannot extend to next day");
            document.getElementById("tf1_selEndMeridian").focus();
            return false;
        }
    }
    return true;
}

/**
 * Manage dateValidation
 * @method numObj
 */
function numObj(id, minLen, minVal, maxVal, errMsg){
    this.id = id;
    this.minLen = minLen;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.errMsg = errMsg;
}

/**
 * Manage dateValidation
 * @method dateValidate
 */
function dateValidate(hoursId, minId, errObjId){
    var dtVarObj = new Array();
    
    dtVarObj[0] = new numObj(hoursId, 1, 1, 12, "Invalid Hours: Please enter a value between 1 - 12");
    dtVarObj[1] = new numObj(minId, 1, 0, 59, "Invalid Minutes: Please enter a value between 0 - 59");
    
    var idObj = null;
    for (var idx = 0; idx < dtVarObj.length; ++idx) {
        idObj = document.getElementById(dtVarObj[idx].id);
        if (!idObj || idObj.disabled) 
            continue;
        if ((idObj.value.length < dtVarObj[idx].minLen) ||
        (parseInt(idObj.value, 10) < dtVarObj[idx].minVal) ||
        ((dtVarObj[idx].maxVal != 0) && (parseInt(idObj.value, 10) > dtVarObj[idx].maxVal))) {
            alert(dtVarObj[idx].errMsg);
            idObj.focus();
            return false;
        }
    }
    return true;
}
