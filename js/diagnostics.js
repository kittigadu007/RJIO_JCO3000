/*
 * File: systemCheck.js
 * Created on 4th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Validate IP Address / Domain Name
 * @method ipaddrValidate
 */
function ipaddrValidate(){
    if (txtFieldArrayCheck(["txtIpaddr,Please enter valid IP Address"]) == false) 
        return false;
	if (ipv6Validate('txtIpaddr', false, false, '') == true) 
        return true;
    if (checkHostName('txtIpaddr', true, 'Invalid IP Address/Domain name: ', false) == false) 
        return false;
    return true;
}

/**
 * Validate Internet Name / URL
 * @method intNameValidate
 */
function intNameValidate(){
    if (txtFieldArrayCheck(["txtIntName,Please enter valid Internet Name / URL"]) == false) 
        return false;
    if (checkHostName('txtIntName', true, 'Invalid Internet Name: ', false) == false) 
        return false;
    return true;
}

/**
 * Form Validation
 * @method diagnosticsValidate
 */
function diagnosticsValidate(action){
    var ipAddr = document.getElementById('txtIpaddr').value;
    switch (action) {
        case 1: /* ping */
            if (!ipaddrValidate()) 
                return false
            break;
        case 2: /* trace route */
            if (!ipaddrValidate()) 
                return false
            break;
        case 3: /* DNS lookup */
            if (intNameValidate()){}
            else 
                return false
            break;
        default:
            alert("Retrieving Route Table Data...");
            break;
    }
    return true;
}
