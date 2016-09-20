/*
 * File: wirelessStatistics.js
 * Created on 18th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Form Validation
 * @method vapConfigValidate
 */
function validatePage(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_pollInterval,Please enter a valid Poll Interval";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
    
    var pollObj = document.getElementById('tf1_pollInterval');
    if (pollObj && !pollObj.disabled) {
        if (numericValueRangeCheck(pollObj, '', '', 1, 120, true, '', '') == false) 
            return false;
    }
    return true;
    
}
