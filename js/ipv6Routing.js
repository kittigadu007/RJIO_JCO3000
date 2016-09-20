/*
 * File: ipv6Routing.js
 * Created on 28th March 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
 

/**
 * function for validate form when user clicks on submit button
 * OnSubmit event
 * @method ipv6StaticRoutingValidate
 */
function ipv6StaticRoutingValidate(frmId){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtRouteName,Please enter valid Route Name";
    txtFieldIdArr[1] = "tf1_txtDestIpAddr,Please enter valid IPv6 Destination";
    txtFieldIdArr[2] = "tf1_txtPreLen,Please enter valid IPv6 Prefix Length";
    txtFieldIdArr[3] = "tf1_txtGwIpAddr,Please enter valid IPv6 Gateway ";
    txtFieldIdArr[4] = "tf1_txtMetric,Please enter valid Metric";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
     /* added check for not allowing space as first character starts */
    var routeObj = document.getElementById('tf1_txtRouteName');
    if ( routeObj.value.charAt(0) == ' ' )
    {
         alert("Route Name cannot start with space character");
         routeObj.focus();
         return false;
    }
    /* added check for not allowing space as first character ends */
    var txtFieldIdArrRoute = new Array();
    txtFieldIdArrRoute[0] = "tf1_txtRouteName,Please enter valid Route Name.";
     /* added to condition to prevent semicolon & pipe characters */
    if (isProblemCharArrayCheck(txtFieldIdArrRoute, "'\";|", "Following characters are not supported for this field:\r\ndouble quote( \" ), single quote( \' ), Pipe ( | ), Semi-Colon ( ; )") == false) 
        return false;
    /* added below condition to allow space for host name for the SPR-48304 additional comments */
   
    var txtFieldIdArripv6 = new Array();
    txtFieldIdArripv6[0] = "tf1_txtDestIpAddr,Please enter valid IPv6 Destination";
    txtFieldIdArripv6[1] = "tf1_txtPreLen,Please enter valid IPv6 Prefix Length";
    txtFieldIdArripv6[2] = "tf1_txtGwIpAddr,Please enter valid IPv6 Gateway ";
    txtFieldIdArripv6[3] = "tf1_txtMetric,Please enter valid Metric";
	if (isProblemCharArrayCheck(txtFieldIdArripv6, "'\" ", NOT_SUPPORTED) == false) 
        return false; 

    if (ipv6Validate('tf1_txtDestIpAddr', false, true, '') == false) 
        return false;
    
    var preLenObj = document.getElementById('tf1_txtPreLen');
    if (preLenObj && !preLenObj.disabled) {
        if (numericValueRangeCheck(preLenObj, '', '', 0, 128, true, 'Invalid IPv6 Prefix Length', '') == false) 
            return false;
    }
    
    if (ipv6Validate('tf1_txtGwIpAddr', true, true, '') == false) 
        return false;
    
    var metricObj = document.getElementById('tf1_txtMetric');
    if (metricObj && !metricObj.disabled) {
        if (numericValueRangeCheck(metricObj, '', '', 2, 15, true, 'Invalid Metric', ' ') == false) 
            return false;
    }

    setHiddenChks (frmId);
    var check="tf1_txtGwIpAddr"
    var setIp = "";
    var setPrefix = "";
	var selectedIntObj = document.getElementById ('tf1_interfaceName');
    var selectedInt = selectedIntObj.options[selectedIntObj.selectedIndex].value;
    if (selectedInt == "6to4")
        {
        return isGatewayInTunnelSubnet ('hdTunnelv6IPAddr', 'hdWanSnetAddr', check, 'Enter IP in the same subnet as the interface'); 
        }
    else if (selectedInt == "Local")
        {
        cnt="1";
        
        var str = "hdLanv6IPAddr";
        while(document.getElementById(str+cnt))
            {
            setIp="hdLanv6IPAddr"+cnt
            setPrefix="hdLanv6Prefix"+cnt
            if(ipv6SubnetValidation1(setIp,setPrefix,check) == true) return true
            cnt++;
            }
            
        alert("Enter IP in the same subnet as the interface");
        return false
        }
    else if (selectedInt == "Internet")
        {
        var str = "hdWanv6IPAddr";
        cnt=1;
        while(document.getElementById(str+cnt))
            {
            setIp = "hdWanv6IPAddr"+cnt;
            setPrefix = "hdWanv6Prefix"+cnt;
            if(ipv6SubnetValidation1(setIp,setPrefix,check) == true) return true
            cnt++
            }
        alert("Enter IP in the same subnet as the interface");
        return false
        }
  return true;
}

/**
 * function for GatewayValidation
 * OnSubmit event
 * @method ipv6isGatewayInTunnelSubnet
 */
function isGatewayInTunnelSubnet (ipAddrPrefix, subnetId, gatewayId, msg) {
    var cnt = 1;
    var gwAddrObj = document.getElementById (gatewayId);
    var gwAddrVal = gwAddrObj.value;
    var gwAddrArray = gwAddrVal.split ("::");
    var gwAddrObjVal;
    if (gwAddrArray.length != 2) {
        alert (msg);
        return false
    }
    else {
        gwAddrObjVal = gwAddrArray[1];
        if (gwAddrObjVal == "") {
            alert (msg);
            return false;
        }
        else {
            var gwIp = getIPInt2 (gwAddrObjVal);
            var intIpMask = getIPInt1 (subnetId);
            if (ipAddrValueFormatCheck (gwAddrObjVal) == false) {
                alert (msg);
                return false;
            }
            else {
                    var flag = 0;
                    while (document.getElementById (ipAddrPrefix + cnt)) {
                    var ipAddrObj = document.getElementById (ipAddrPrefix + cnt);
                    var ipAddrVal = ipAddrObj.value;
                    var ipAddrArray = ipAddrVal.split ("::");
                    var ipAddrObjVal = ipAddrArray[1];
                    if (ipAddrObjVal == "127.0.0.1" || ipAddrObjVal == "") {}
                    else {
                        var intIp = getIPInt2 (ipAddrObjVal);
                        if (isInSubnet (gwIp, intIp, intIpMask)) { flag = 1; break;}
                    }
                    cnt++;
                }
                if (flag == 0) {
                    alert (msg);
                    return false;
                }
            }
        }
    }
    return true;
}


 
