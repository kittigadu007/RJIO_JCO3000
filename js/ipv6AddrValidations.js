/*
 * File: ipv6AddrValidations.js
 * Created on 22nd Oct 2012 - Bala Krishna G
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
var ipv6Regex = /^[0-9A-Fa-f:]+$/;

function ipv6Validate(tblIPAddrId, optFlag, alertFlag, prefixStr){
    if (!tblIPAddrId) 
        return false;
    var obj = document.getElementById(tblIPAddrId);
    if (!obj || obj.disabled) 
        return true;
    
    var errorMsg = ""
    if (prefixStr) 
        errorMsg += prefixStr + ": "
    
    if (obj.value == "" && !optFlag) {
        errorMsg += "Invalid IPv6 Address";
        printError(tblIPAddrId, alertFlag, errorMsg);
        obj.focus();
        return false;
    }
    else 
        if (obj.value == "" && optFlag) {
            clearError(tblIPAddrId)
            return true;
        }
    
    var ip = obj.value;
    var v6Components = ip.split(":");
    var numEmptyComponents = 0;
    var numComponents = 0;
    var components = new Array();
    var idx = 0;
    var ipv4Addrcount = 0;
    var flag = 0;
    var regex = ipv6Regex;
    
    // count number of consecutive colons. If there are more than 2 in a row, the address is invalid.
    for (var i = 0; i < v6Components.length; i++) {
        components[i] = v6Components[i];
        if (i < v6Components.length - 2 && v6Components[i] == false && v6Components[i + 1] == false && v6Components[i + 2] == false) {
            flag = 1;
            break;
        }
        if (v6Components[i].length > 4) 
            ipv4Addrcount++;
        if (v6Components[i] == "") 
            numEmptyComponents++;
        else 
            numComponents++;
    }
    
    if (flag == 1) {
        errorMsg += 'Please check ":" positions';
        printError(tblIPAddrId, alertFlag, errorMsg);
        obj.focus();
        return false;
    }
    
    // If number of component which have length > 4 are more
    // than one then ipv6 address is invalid.
    if (ipv4Addrcount > 1) {
        errorMsg += 'Each octet length should not exceed 4';
        printError(tblIPAddrId, alertFlag, errorMsg);
        obj.focus();
        return false;
    }
    // If no component length > 4 then whole string represents
    // ipv6 address.
    else 
        if (ipv4Addrcount == 0) {
            if (!regex.test(ip)) {
                errorMsg += 'Enter address in the form abcd:abcd:abcd:abcd:abcd:abcd:abcd:abcd';
                printError(tblIPAddrId, alertFlag, errorMsg);
                obj.focus();
                return false;
            }
        }
        else {
            // check the component with length > 4 is last component
            // or not. If yes then check that component string
            // should be in ipv4 format. and the rest of string is
            // in ipv6 format.
            if (components[components.length - 1].length > 4) {
                var ipv6String = ""
                for (idx = 0; idx < components.length - 2; idx++) 
                    ipv6String += components[idx] + ":";
                ipv6String += components[idx];
                if (!regex.test(ipv6String)) {
                    errorMsg += 'Please enter valid ipv6 address';
                    printError(tblIPAddrId, alertFlag, errorMsg);
                    obj.focus();
                    return false;
                }
                if (ipAddrValueFormatCheck(components[components.length - 1]) == false) {
                    errorMsg += 'Please enter valid ipv6 address in the last two octets';
                    printError(tblIPAddrId, alertFlag, errorMsg);
                    obj.focus();
                    return false;
                }
            }
            else {
                errorMsg += 'Please enter valid ipv6 address';
                printError(tblIPAddrId, alertFlag, errorMsg);
                obj.focus();
                return false;
            }
        }
    if (numEmptyComponents > 2) {
        errorMsg += 'Please check ":" positions';
        printError(tblIPAddrId, alertFlag, errorMsg);
        obj.focus();
        return false;
    }
    else 
        if (numEmptyComponents == 1) {
            // Check for address like a:b: , :a:b which returns
            // numEmpty Components = 1
            if (ip.charAt(0) == ":") {
                errorMsg += 'Please enter valid ipv6 address';
                printError(tblIPAddrId, alertFlag, errorMsg);
                obj.focus();
                return false;
            }
            if (ip.charAt(ip.length - 1) == ":") {
                errorMsg += 'Please enter valid ipv6 address like xxxx:: / ::xxxx / xxxx:xxxx:: / ::xxxx:xxxx / xxxx::xxxx';
                printError(tblIPAddrId, alertFlag, errorMsg);
                obj.focus();
                return false;
            }
            // If ipv4 component exists then max number of
            // components should not greater than 6.
            if (ipv4Addrcount == 1) {
                if (numComponents < 2 || numComponents > 6) {
                    errorMsg += 'Please check number of octets';
                    printError(tblIPAddrId, alertFlag, errorMsg);
                    obj.focus();
                    return false;
                }
                clearError(tblIPAddrId)
                return true;
            }
            else {
                if (numComponents < 2 || numComponents > 7) {
                    errorMsg += 'Please check number of octets';
                    printError(tblIPAddrId, alertFlag, errorMsg);
                    obj.focus();
                    return false;
                }
                clearError(tblIPAddrId)
                return true;
            }
        }
        else 
            if (numEmptyComponents == 2) {
                //check for address like ::a or a::, otherwise return false.
                if (!((ip.charAt(0) == ":" && ip.charAt(1) == ":") || (ip.charAt(ip.length - 2) == ":" && ip.charAt(ip.length - 1) == ":"))) {
                    errorMsg += 'Please enter valid ipv6 address like xxxx:: / ::xxxx / xxxx:xxxx:: / ::xxxx:xxxx / xxxx::xxxx';
                    printError(tblIPAddrId, alertFlag, errorMsg);
                    obj.focus();
                    return false;
                }
                if (ipv4Addrcount == 1) {
                    if (numComponents < 1 || numComponents > 6) {
                        errorMsg += 'Please check number of octets';
                        printError(tblIPAddrId, alertFlag, errorMsg);
                        obj.focus();
                        return false;
                    }
                    clearError(tblIPAddrId)
                    return true;
                }
                else {
                    if (numComponents < 1 || numComponents > 7) {
                        errorMsg += 'Please check number of octets';
                        printError(tblIPAddrId, alertFlag, errorMsg);
                        obj.focus();
                        return false;
                    }
                    clearError(tblIPAddrId)
                    return true;
                }
            }
            else { //No double colons '::'
                if (ipv4Addrcount == 1) {
                    // If ipv4 component exists then max number of
                    // components should not greater than 7.
                    if (numComponents != 7) {
                        errorMsg += 'Please check number of octets';
                        printError(tblIPAddrId, alertFlag, errorMsg);
                        obj.focus();
                        return false;
                    }
                    clearError(tblIPAddrId)
                    return true;
                }
                else {
                    if (numComponents != 8) {
                        errorMsg += 'Please check number of octets';
                        printError(tblIPAddrId, alertFlag, errorMsg);
                        obj.focus();
                        return false;
                    }
                    clearError(tblIPAddrId)
                    return true;
                }
            }
}

function printError(tblIPAddrId, alertFlag, errorMsg){
    if (alertFlag) {
        if (document.getElementById(tblIPAddrId + "Err")) 
            document.getElementById(tblIPAddrId + "Err").innerHTML = errorMsg;
        else 
            alert(errorMsg);
    }
}

function clearError(tblIPAddrId){
    if (document.getElementById(tblIPAddrId + "Err")) 
        document.getElementById(tblIPAddrId + "Err").innerHTML = "";
}

function ipv6AddrValidate(Obj, optFlag, alertFlag, prefixStr){
    if (!Obj) 
        return;
    return ipv6Validate(Obj.id, optFlag, alertFlag, prefixStr)
}

function ipAddrValidate(Obj, optFlag, alertFlag, prefixStr, suffixStr, octetShowFlag){
    if (!Obj) 
        return;
    if ((ipv4Validate(Obj.id, 'IP', optFlag, false, '', '', false) == false) && (ipv6Validate(Obj.id, optFlag, false, '') == false)) {
        var errorMsg = ""
        if (prefixStr) 
            errorMsg += prefixStr + ": ";
        errorMsg += "Please enter valid ipv4 or ipv6 address";
        printError(Obj.id, alertFlag, errorMsg);
        Obj.focus();
        return false;
    }
    clearError(Obj.id)
    return true;
}

function ipAddressValidate(tblIPAddrId, optFlag, alertFlag, prefixStr, suffixStr, octetShowFlag){
    if (!tblIPAddrId) 
        return;
    var Obj = document.getElementById(tblIPAddrId);
    if (!Obj) 
        return false;
    return ipAddrValidate(Obj, optFlag, alertFlag, prefixStr, suffixStr, octetShowFlag)
}

function ipv6Convert(tblIPAddrId){

    var ip = tblIPAddrId;
    var maxlen = 7;
    var v6Components = ip.split(":");
    var stanform = new Array();
    for (i = 0; i < maxlen; i++) 
        stanform[i] = 0;
    var len = v6Components.length;
    for (i = 0; i < len; i++) {
        if (v6Components[i]) 
            stanform[i] = v6Components[i];
        if (!(v6Components[i]) && (i == 0)) {
            var s = (len - 1);
            while (v6Components[s]) {
                if (v6Components[s].length > 4) {
                    maxlen = 6;
                    stanform[maxlen] = v6Components[s];
                    maxlen--;
                    s--;
                }
                else {
                    stanform[maxlen] = v6Components[s];
                    maxlen--;
                    s--;
                }
            }
            for (j = maxlen; j == 0; j--) 
                stanform[j] = 0;
            return (stanform.join(":"));
        }
        if (!(v6Components[i]) && (v6Components[i + 1])) {
            var s = (len - 1);
            while (v6Components[s]) {
                if (v6Components[s].length > 4) {
                    maxlen = 6;
                    stanform[maxlen] = v6Components[s];
                    maxlen--;
                    s--;
                }
                else {
                    stanform[maxlen] = v6Components[s];
                    maxlen--;
                    s--;
                }
            }
            for (j = maxlen; j >= i; j--) 
                stanform[j] = 0;
            return stanform.join(":");
        }
        if (!(v6Components[i]) && (!v6Components[i + 1])) {
            for (j = i; j < 8; j++) 
                stanform[j] = 0;
            return (stanform.join(":"));
        }
    }
    return stanform.join(":");
}

function addrCompare(string1, string2){
    string1parts = string1.split(":");
    string2parts = string2.split(":");
    flag = 1;
    for (i = 0; i < 8; i++) {
        if (string1parts[i].length > 4 && string2parts[i].length <= 4) {
            ipv4parts = string1parts[6].split(".");
            val1 = (parseInt(ipv4parts[0], 10)) * (parseInt(ipv4parts[1], 10));
            v6val1 = parseInt(string2parts[6], 16);
            if (val1 > v6val1) {
                comstr = 1;
                return comstr;
            }
            if (val1 < v6val1) {
                comstr = 2;
                return comstr;
            }
            val2 = (parseInt(ipv4parts[2], 10)) * (parseInt(ipv4parts[3], 10));
            v6val2 = parseInt(string2parts[7], 16);
            if (val2 > v6val2) {
                comstr = 1;
                return comstr;
            }
            if (val2 < v6val2) {
                comstr = 2;
                return comstr;
            }
        }
        else 
            if (string2parts[i].length > 4 && string1parts[i].length <= 4) {
                ipv4parts = string2parts[6].split(".");
                val1 = (parseInt(ipv4parts[0], 10)) * (parseInt(ipv4parts[1], 10));
                v6val1 = parseInt(string1parts[6], 16);
                if (val1 < v6val1) {
                    comstr = 1;
                    return comstr;
                }
                if (val1 > v6val1) {
                    comstr = 2;
                    return comstr;
                }
                val2 = (parseInt(ipv4parts[2], 10)) * (parseInt(ipv4parts[3], 10));
                v6val2 = parseInt(string1parts[7], 16);
                if (val2 < v6val2) {
                    comstr = 1;
                    return comstr;
                }
                if (val2 > v6val2) {
                    comstr = 2;
                    return comstr;
                }
            }
            else 
                if (string1parts[i].length > 4 && string2parts[i].length > 4) {
                    v4parts1 = string1parts[6].split(".");
                    v4parts2 = string2parts[6].split(".");
                    for (k = 0; k < 4; k++) {
                        if (v4parts1[k] < v4parts2[k]) {
                            comstr = 2;
                            return comstr;
                        }
                        else 
                            if (v4parts1[k] > v4parts2[k]) {
                                comstr = 1;
                                return comstr;
                            }
                        if (v4parts1[k] != v4parts2[k]) 
                            flag = 0;
                    }
                    
                    if (flag == 1) {
                        comstr = 3;
                        return comstr;
                    }
                }
                else 
                    if (string2parts[i].length > string1parts[i].length) {
                        comstr = 2;
                        return comstr;
                    }
                    else 
                        if (string2parts[i].length < string1parts[i].length) {
                            comstr = 1;
                            return comstr;
                        }
        for (j = 0; j < string1parts[i].length; j++) {
            par1 = parseInt(string1parts[i].charAt(j), 16);
            par2 = parseInt(string2parts[i].charAt(j), 16);
            if (par2 > par1) {
                comstr = 2;
                return comstr;
            }
            if (par2 < par1) {
                comstr = 1;
                return comstr;
            }
            if (par1 != par2) {
                flag = 0;
            }
        }
    }
    if (flag == 1) {
        comstr = 3;
        return comstr;
    }
    comstr = 1;
    return comstr;
}

function subnetForm(string){
    parts = string.split(":");
    parts1 = new Array();
    for (i = 0; i < parts.length; i++) {
        parts1[i] = new Array(4);
        for (k = 0; k < 4; k++) 
            parts1[i][k] = 0;
    }
    for (i = 0; i < parts.length; i++) {
        if ((parts[i].length) < 4) {
            j = parts[i].length;
            k = 0;
            while (parts[i].charAt(k)) {
                parts1[i][4 - j] = parts[i].charAt(k);
                j--;
                k++;
            }
            
        }
        else 
            parts1[i] = parts[i];
    }
    return (parts1.join(":"))
}

function toBin(subarray){
    var binstr1 = "";
    part = subarray.split(":");
    len = part.length;
    if (len == 8) 
        return stanToBin(subarray);
    if (len == 7) {
        for (t = 0; t < 6; t++) {
            temp = "";
            temp = stanToBin(part[t]);
            binstr1 += temp;
        }
    }
    v4parts = part[6].split(".");
    for (l = 0; l < 4; l++) {
        octet = parseInt(v4parts[l], 10);
        var hit = "";
        while (octet >= 1) {
            var m = (octet * 10) / 4;
            while (m > 1) {
                m = m - 5;
            }
            if (m < 0) {
                octet = (octet - 1) / 2;
                hit += "1";
            }
            else {
                octet = octet / 2;
                hit += "0";
            }
        }
        var b = "";
        var bin = hit.length;
        for (a = hit.length; a >= 0; a--) 
            b += hit.substring(a - 1, a);
        if ((b.length) != 8) {
            for (o = (b.length); o < 8; o++) 
                b = "0" + b;
        }
        binstr1 += b
    }
    return binstr1
}

function stanToBin(subarr){
    var binstr = "";
    for (i = 0; i < subarr.length; i++) {
        ax = subarr.charAt(i);
        a = ax.toLowerCase();
        if (a != "," && a != ":") {
            switch (a) {
                case '0':
                    binstr += "0000";
                    break;
                case '1':
                    binstr += "0001";
                    break;
                case '2':
                    binstr += "0010";
                    break;
                case '3':
                    binstr += "0011";
                    break;
                case '4':
                    binstr += "0100";
                    break;
                case '5':
                    binstr += "0101";
                    break;
                case '6':
                    binstr += "0110";
                    break;
                case '7':
                    binstr += "0111";
                    break;
                case '8':
                    binstr += "1000";
                    break;
                case '9':
                    binstr += "1001";
                    break;
                case 'a':
                    binstr += "1010";
                    break;
                case 'b':
                    binstr += "1011";
                    break;
                case 'c':
                    binstr += "1100";
                    break;
                case 'd':
                    binstr += "1101";
                    break;
                case 'e':
                    binstr += "1110";
                    break;
                case 'f':
                    binstr += "1111"
                    break;
                default:
                    break;
            }
        }
    }
    return binstr;
}

function subnetCalc(binstring, prefixid){

    var pre = prefixid;
    subbin = "";
    for (i = 0; i < pre; i++) 
        subbin += binstring.charAt(i);
    for (i = pre; i < 128; i++) 
        subbin += "0";
    return subbin
}

function subnetFromBin(subnetbin){

    var subnet = "";
    var subnetpart = "";
    for (i = 1; i < (subnetbin.length + 1); i = i + 4) {
        subnetpart = "";
        subnetpart = subnetbin.charAt(i - 1) + subnetbin.charAt(i) + subnetbin.charAt(i + 1) + subnetbin.charAt(i + 2);
        switch (subnetpart) {
            case '0000':
                subnet += "0";
                break;
            case '0001':
                subnet += "1";
                break;
            case '0010':
                subnet += "2";
                break;
            case '0011':
                subnet += "3";
                break;
            case '0100':
                subnet += "4";
                break;
            case '0101':
                subnet += "5";
                break;
            case '0110':
                subnet += "6";
                break;
            case '0111':
                subnet += "7";
                break;
            case '1000':
                subnet += "8";
                break;
            case '1001':
                subnet += "9";
                break;
            case '1010':
                subnet += "a";
                break;
            case '1011':
                subnet += "b";
                break;
            case '1100':
                subnet += "c";
                break;
            case '1101':
                subnet += "d";
                break;
            case '1110':
                subnet += "e";
                break;
            case '1111':
                subnet += "f";
                break;
            default:
                break;
        }
    }
    return subnet;
}

function startEndIp(subnetbin, point, prefixid, ipv4flag){


    var pre = prefixid;
    if (point == 1) {
        subbin = "";
        for (i = 0; i < pre; i++) 
            subbin += subnetbin.charAt(i);
        for (i = pre; i < 127; i++) 
            subbin += "0";
        subbin += "1";
        return (subnetPrefix(subbin, ipv4flag))
    }
    else {
        subbin = "";
        for (i = 0; i < pre; i++) 
            subbin += subnetbin.charAt(i);
        for (i = pre; i < 128; i++) 
            subbin += "1";
        return (subnetPrefix(subbin, ipv4flag))
    }
}

function stringForm(stringinput){
    var strresult = "";
    var i = 0;
    while (stringinput.charAt(i)) {
        if (stringinput.charAt(i) != "," && stringinput.charAt(i) != ":") 
            strresult += stringinput.charAt(i);
        i++;
    }
    return strresult
}

function stanToStanForm(stringin, ipv4flag){
    var subnetstr = "";
    var subnetfinal = "";
    if (ipv4flag == 0) {
        for (i = 1; i < 33; i = i + 4) 
            subnetstr += ((stringin.charAt(i - 1) + stringin.charAt(i) + stringin.charAt(i + 1) + stringin.charAt(i + 2)) + ":");
        for (i = 0; i < 39; i++) 
            subnetfinal += (subnetstr.charAt(i));
        return subnetfinal;
    }
    if (ipv4flag == 1) {
        for (i = 1; i < 24; i = i + 4) 
            subnetstr += ((stringin.charAt(i - 1) + stringin.charAt(i) + stringin.charAt(i + 1) + stringin.charAt(i + 2)) + ":");
        for (a = 24; a < (stringin.length); a++) 
            subnetstr += stringin.charAt(a)
        return subnetstr;
    }
}

function checkV4(string){
    part = string.split(":");
    if ((part.length) == 7) 
        return 1
    return 0
}

function subnetPrefix(subnetbin1, ipv4flag){
    var str = "";
    var subnetstr = "";
    var subnetfinal = "";
    var subform = ""
    if (ipv4flag == 0) {
        subform = subnetFromBin(subnetbin1);
        for (i = 1; i < 33; i = i + 4) 
            subnetstr += ((subform.charAt(i - 1) + subform.charAt(i) + subform.charAt(i + 1) + subform.charAt(i + 2)) + ":");
        for (i = 0; i < 39; i++) 
            subnetfinal += (subnetstr.charAt(i));
        return subnetfinal;
    }
    else {
        for (a = 0; a < 96; a++) 
            str += subnetbin1.charAt(a);
        str1 = subnetFromBin(str)
        for (i = 1; i < 25; i = i + 4) 
            subnetstr += ((str1.charAt(i - 1) + str1.charAt(i) + str1.charAt(i + 1) + str1.charAt(i + 2)) + ":");
        for (a = 96; a < 128; a = a + 8) {
            str = "";
            str = subnetbin1.charAt(a) + subnetbin1.charAt(a + 1) + subnetbin1.charAt(a + 2) + subnetbin1.charAt(a + 3) + subnetbin1.charAt(a + 4) + subnetbin1.charAt(a + 5) + subnetbin1.charAt(a + 6) + subnetbin1.charAt(a + 7);
            subnetstr += (parseInt(str, 2)) + "."
        }
        for (i = 0; i < subnetstr.length - 1; i++) 
            subnetfinal += subnetstr.charAt(i);
        return subnetfinal
    }
}

function ipv6SubnetValidation(setIpId, prefixId, checkIpId){


    var errorMsg = " Enter IP within Same Subnet";
    var setipObj = document.getElementById(setIpId);
    
    var prefixObj = document.getElementById(prefixId);
    var checkipObj = document.getElementById(checkIpId);
    var setip = setipObj.value;
    alert(setip)
    var prefix = prefixObj.value;//alert(prefix)
    checkip = checkipObj.value;//alert(checkip)
    var str = ipv6Convert(setip);
    v4flag = checkV4(str);
    str1 = subnetForm(str);
    str2 = toBin(str1);
    str3 = subnetCalc(str2, prefix);
    str4 = subnetPrefix(str3, v4flag);
    
    str5 = startEndIp(str3, true, prefix, v4flag);
    
    checkstring = ipv6Convert(checkip);
    v4checkflag = checkV4(checkstring);
    str6 = startEndIp(str3, 0, prefix, v4flag);
    
    str8 = subnetForm(checkstring);
    str9 = (stringForm(str8));
    str10 = stanToStanForm(str9, v4checkflag);
    
    startflag = addrCompare(str5, str10)
    endflag = addrCompare(str6, str10)
    if ((startflag == 2 || startflag == 3) && (endflag == 1 || endflag == 3)) {
        return true
    }
    else {
        document.getElementById(checkIpId + "Err").innerHTML = errorMsg + " between " + str5 + " to " + str6;
        checkipObj.focus();
        return false;
    }
}

function startEndCompare(startId, endId){
    if (!startId || !endId) 
        return true;
    var errorMsg = " End IP smaller than Start IP ";
    startObj = document.getElementById(startId);
    endObj = document.getElementById(endId);
    if (startObj.disabled || endObj.disabled) 
        return true;
    start = startObj.value;
    end = endObj.value;
    startStan = ipv6Convert(start);
    endStan = ipv6Convert(end);
    compareFlag = addrCompare(startStan, endStan)
    if (compareFlag == 1) {
        alert(errorMsg);
        endObj.focus();
        return false
    }
    /*
     if ( compareFlag == 3)
     {
     document.getElementById(endId+"Err").innerHTML = "Invalid. Both IPs are same";
     endObj.focus();
     return false;
     }
     */
    return true
}

function ipv6SubnetValidation1(setIpId, prefixId, checkIpId){


    var errorMsg = " Enter IP within Same Subnet";
    var setipObj = document.getElementById(setIpId);
    
    var prefixObj = document.getElementById(prefixId);
    var checkipObj = document.getElementById(checkIpId);
    var setip = setipObj.value;
    var prefix = prefixObj.value;
    checkip = checkipObj.value;
    var str = ipv6Convert(setip);
    v4flag = checkV4(str);
    str1 = subnetForm(str);
    str2 = toBin(str1);
    str3 = subnetCalc(str2, prefix);
    str4 = subnetPrefix(str3, v4flag);
    
    str5 = startEndIp(str3, true, prefix, v4flag);
    
    checkstring = ipv6Convert(checkip);
    v4checkflag = checkV4(checkstring);
    str6 = startEndIp(str3, 0, prefix, v4flag);
    
    str8 = subnetForm(checkstring);
    str9 = (stringForm(str8));
    str10 = stanToStanForm(str9, v4checkflag);
    
    startflag = addrCompare(str5, str10)
    endflag = addrCompare(str6, str10)
    if ((startflag == 2 || startflag == 3) && (endflag == 1 || endflag == 3)) 
        return true
    else {
        return false;
    }
}
