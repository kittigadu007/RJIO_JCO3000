/*
 Copyright (c) 2009 - 2012 TeamF1, Inc. (www.TeamF1.com)
 All rights reserved.
 */
var timerId = null;
function deleteOptions(selObj){
    while (selObj.options.length != 0) 
        selObj.options[0] = null;
}

function updateChannel(){
    var cntIdx = getCountryIndex();
    
    var selectedOpFrq = comboSelectedValueGet('selOpFrq');
    if (!selectedOpFrq) 
        return;
    var opFrqValue = selectedOpFrq;
/*    
    var selectedChSpacing = comboSelectedValueGet('selChannelWidth');
    if (!selectedChSpacing) 
        return;
    var chSpValue = parseInt(selectedChSpacing, 10);
*/
    var    chSpValue = 20
    var sideBandValue = ""
    if (chSpValue == 20) {
        fieldStateChangeWr('selSideBand', '', '', '');
        vidualDisplay('tf1_selSideBand', 'hide');
        vidualDisplay('break_selSideBand', 'hide');
    }
    else {
        fieldStateChangeWr('', '', 'selSideBand', '');
        vidualDisplay('tf1_selSideBand', 'configRow');
        vidualDisplay('break_selSideBand', 'break');
        sideBandValue = comboSelectedValueGet('selSideBand');
        if (!sideBandValue) 
            return;
    }
    
    var chStIdx = 0;
    var chEndIdx = 0;
    var chLst1 = null;
    if (chSpValue == 20) {
        if (opFrqValue == "b") 
            chLst1 = wlNwObjLst[cntIdx].chSp20NgChLst;
        else 
            if (opFrqValue == "a") 
                chLst1 = wlNwObjLst[cntIdx].chSp20NaChLst;
    }
    else 
        if (chSpValue == 40 || chSpValue == 2040) {
            if (opFrqValue == "b" && sideBandValue == "Upper") 
                chLst1 = wlNwObjLst[cntIdx].chSp40LowNgChLst;
            else 
                if (opFrqValue == "b" && sideBandValue == "Lower") 
                    chLst1 = wlNwObjLst[cntIdx].chSp40UpNgChLst;
                else 
                    if (opFrqValue == "a" && sideBandValue == "Upper") 
                        chLst1 = wlNwObjLst[cntIdx].chSp40LowNaChLst;
                    else 
                        if (opFrqValue == "a" && sideBandValue == "Lower") 
                            chLst1 = wlNwObjLst[cntIdx].chSp40UpNaChLst;
        }
    
    var chObj = document.getElementById('selChannels');
    deleteOptions(chObj);
    
    /* updating channels */
    chObj.options[0] = new Option(chLst[0], 0, false, false);
    if (chLst1 != null) {
        for (var opIdx = 1, chIdx = 0; chIdx < chLst1.length; chIdx++) {
            if (chLst1[chIdx] < chLst.length) {
                chObj.options[opIdx] = new Option(chLst[chLst1[chIdx]], chLst1[chIdx], false, false);
                opIdx++;
            }
        }
    }
}

function updateChannelSpacing(){
    cntIdx = getCountryIndex();
    
    var selectedMode = comboSelectedValueGet('selMode');
    if (!selectedMode) 
        return;
    modeVal = parseInt(selectedMode, 10);
    
    var chSpIdx = wlNwObjLst[cntIdx].chSpSt;
    var chSpEndIdx = wlNwObjLst[cntIdx].chSpEnd;
    if (modeVal == 212992 || modeVal == 196608 || modeVal == 65536 || modeVal == 475136 || modeVal == 131072 || modeVal == 393216) {
        chSpIdx = 1;
        chSpEndIdx = 1;
    }
    
    if (chSpIdx == 1 && chSpEndIdx == 1) {
    }
    else {
        var selOpFrq = comboSelectedValueGet('selOpFrq');
        var lowNg40ChLst = wlNwObjLst[cntIdx].chSp40LowNgChLst;
        var upNg40ChLst = wlNwObjLst[cntIdx].chSp40UpNgChLst;
        var lowNa40ChLst = wlNwObjLst[cntIdx].chSp40LowNaChLst;
        var upNa40ChLst = wlNwObjLst[cntIdx].chSp40UpNaChLst;
        
        if (selOpFrq == "b" && lowNg40ChLst.length == 0 && upNg40ChLst.length == 0) {
            //alert ("2GHz - " + lowNg40ChLst.length + " - " + upNg40ChLst.length);
            chSpIdx = 1;
            chSpEndIdx = 1;
        }
        else 
            if (selOpFrq == "a" && lowNa40ChLst.length == 0 && upNa40ChLst.length == 0) {
                //alert ("5GHz - " + lowNa40ChLst.length + " - " + upNa40ChLst.length);
                chSpIdx = 1;
                chSpEndIdx = 1;
            }
    }
    /* removing 40Mhz option in n modes */
    chSpEndIdx = 1;
    var chSpObj = document.getElementById('selChannelWidth');
    deleteOptions(chSpObj);
    var opIdx = 0;
    
    while (chSpIdx <= chSpEndIdx) {
        var mdStr = chSpLst[chSpIdx];
        var mdText = mdStr.substring(mdStr.indexOf(",") + 1);
        var mdValue = mdStr.substring(0, mdStr.indexOf(","));
        chSpObj.options[opIdx] = new Option(mdText, mdValue, false, false);
        opIdx++;
        chSpIdx++;
    }
    updateChannel();
}

function updateMode(){
    var cntIdx = getCountryIndex();
    var ElevenNDisabled = wlNwObjLst[cntIdx].ElevenNDisabled
    var selectedOpFrq = comboSelectedValueGet('selOpFrq');
    if (!selectedOpFrq) 
        return;
    var opFrq = selectedOpFrq;
    
    var mdLst = null;
    if (opFrq == "b") 
        mdLst = modeLst2GHz;
    else 
        mdLst = modeLst5GHz;
    
    var modeObj = document.getElementById('selMode');
    deleteOptions(modeObj);
    for (opIdx = 0; opIdx < mdLst.length; opIdx++) {
        var mdStr = modeLst[mdLst[opIdx]];
        var mdText = mdStr.substring(mdStr.indexOf(",") + 1);
        var mdValue = mdStr.substring(0, mdStr.indexOf(","));
        if (ElevenNDisabled == 1 && (mdValue == 475136 || mdValue == 393216 || mdValue == 131072)) {
        }
        else 
            modeObj.options[opIdx] = new Option(mdText, mdValue, false, false);
    }
    updateChannelSpacing();
}

function getCountryIndex(){
    var selectedCnt = comboSelectedValueGet('selCountry');
    if (!selectedCnt) 
        return 0;
    var cntIdx = 0;
    for (var i = 0; i < wlNwObjLst.length; i++) {
        if (wlNwObjLst[i].countryCode == selectedCnt) {
            cntIdx = i;
            break;
        }
    }
    return cntIdx;
}

function updateOperationFrequency(){
    var cntIdx = getCountryIndex();
    var opFrqObj = document.getElementById('selOpFrq');
    deleteOptions(opFrqObj);
    var model = '';
    var model2 = '';
    var opIdx = 0, opFrqLstIdx = wlNwObjLst[cntIdx].opFrqSt;
    var opFrqEndId = wlNwObjLst[cntIdx].opFrqEnd;
    var modelIdObj = document.getElementById('hdmodelId');
    if (modelIdObj) {
        modelIdObjVal = modelIdObj.value;
        if (modelIdObjVal == model || modelIdObjVal == model2) 
            opFrqEndId = opFrqLstIdx;
    }
    while (opFrqLstIdx <= opFrqEndId) {
        var mdStr = opFrqLst[opFrqLstIdx];
        var mdText = mdStr.substring(mdStr.indexOf(",") + 1);
        var mdValue = mdStr.substring(0, mdStr.indexOf(","));
        opFrqObj.options[opIdx] = new Option(mdText, mdValue, false, false);
        opIdx++;
        opFrqLstIdx++;
    }
    updateMode();
}

function updateCountries(){
    var selectedRegion = comboSelectedValueGet('selRegions');
    if (!selectedRegion) 
        return;
    lstIdx = parseInt(selectedRegion, 10);
    if (lstIdx < 0 || lstIdx > 6) 
        return;
    cntStIdx = parseInt(cntStLst[lstIdx], 10);
    cntEndIdx = parseInt(cntEndLst[lstIdx], 10);
    var cntObj = document.getElementById('selCountry');
    deleteOptions(cntObj);
    //cntObj.options [0] = new Option (wlNwObjLst[0].country,0,false, false);
    for (var opIdx = 0, cntLstIdx = cntStIdx; cntLstIdx <= cntEndIdx; cntLstIdx++) {
        if (wlNwObjLst[cntLstIdx].opFrqSt == 0) //country must support 2.4GHz
            cntObj.options[opIdx++] = new Option(wlNwObjLst[cntLstIdx].country, wlNwObjLst[cntLstIdx].countryCode, false, false);
    }
    updateOperationFrequency();
}

function wlNwInit(){
    var regObj = document.getElementById('selRegions');
    for (var opIdx = 0; opIdx < regLst.length; ++opIdx) 
        regObj.options[opIdx] = new Option(regLst[opIdx], opIdx, false, false);
    selectRegion();
    updateCountries();
    optionValueSelect('selCountry', 'hdWlanCountry');
    updateOperationFrequency();
    optionValueSelect('selOpFrq', 'hdWlanOpFrq');
    updateMode();
    optionValueSelect('selMode', 'hdWlanMode');
    updateChannelSpacing()
    optionValueSelect('selChannelWidth', 'hdWlanChannelWidth');
    updateChannel()
    optionValueSelect('selChannels', 'hdWlanChannel');
    //    resetChannelAndMode ();
}

function selectRegion(){
    var cntCode = document.getElementById('hdWlanCountry').value;
    if (!cntCode || cntCode == "") 
        return;
    for (var i = 0; i < wlNwObjLst.length; i++) {
        if (wlNwObjLst[i].countryCode == cntCode) 
            break;
    }
    if (i == wlNwObjLst.length) 
        return;
    for (var j = 0; j < cntStLst.length; j++) {
        var lstSt = parseInt(cntStLst[j], 10)
        var lstEnd = parseInt(cntEndLst[j], 10)
        if (i >= lstSt && i <= lstEnd) {
            var regObj = document.getElementById('selRegions');
            regObj.selectedIndex = j;
            return;
        }
    }
}

function resetChannelAndMode(){
    var hdCurrentChnObj = document.getElementById('hdWlanAutoChannel');
    var tdCurChanObj = document.getElementById('tdCurChan');
    var unitName = document.getElementById('hdmodelId');
    if (hdCurrentChnObj && !isNaN(hdCurrentChnObj.value, 10)) {
        var freq = parseInt(hdCurrentChnObj.value, 10);
        if (freq >= 2412) {
            if (freq == 2484) {
                var channelNum = 14;
                tdCurChanObj.innerHTML = chLst[channelNum];
            }
            else 
                if (freq < 2484) {
                    var channelNum = (freq - 2407) / 5;
                    tdCurChanObj.innerHTML = chLst[channelNum];
                }
                else 
                    if (freq < 5000) {
                        var channelNum = 15 + ((freq - 2512) / 20);
                        tdCurChanObj.innerHTML = chLst[channelNum];
                    }
                    else {
                        var channelNum = (freq - 5000) / 5;
                        tdCurChanObj.innerHTML = chLst[channelNum];
                    }
        }
    }
    getCurrentChannel();
    getCurrChannel();
}

function getCurrentChannel(){
    var request;
    var tdCurChanObj = document.getElementById('tdCurChan');
    try { // Firefox, Opera 8.0+, Safari
        request = new XMLHttpRequest();
    } 
    catch (e) { // Internet Explorer
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (e) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } 
            catch (e) {
                window.status = "Your browser does not support AJAX!";
                return false;
            }
        }
    }
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            var hdCurrentChnObj = document.getElementById('hdWlanAutoChannel');
            hdCurrentChnObj.value = request.responseText;
            //var channelNum = 0;
            var freq = parseInt(hdCurrentChnObj.value, 10);
            var unitName = document.getElementById('hdmodelId');
            if (freq >= 2412) {
                if (freq == 2484) {
                    var channelNum = 14;
                    tdCurChanObj.innerHTML = chLst[channelNum];
                }
                else 
                    if (freq < 2484) {
                        var channelNum = (freq - 2407) / 5;
                        tdCurChanObj.innerHTML = chLst[channelNum];
                    }
                    else 
                        if (freq < 5000) {
                            var channelNum = 15 + ((freq - 2512) / 20);
                            tdCurChanObj.innerHTML = chLst[channelNum];
                        }
                        else {
                            var channelNum = (freq - 5000) / 5;
                            tdCurChanObj.innerHTML = chLst[channelNum];
                        }
            }
        }
    }
    request.open("GET", "?page=getCurrentChannel.htm&time=" + new Date(), true);
    request.send(null);
}

function getCurrChannel(){
    if (timerId) {
        clearTimeout(timerId)
    }
    timerId = setTimeout("resetChannelAndMode()", 2000);
}

function setWlInfo(){
    var countryValObj = document.getElementById('hdWlanCountry');
    var countryObj = document.getElementById('tdCountry');
    if (countryValObj && countryObj) {
        if (countryValObj.value != "") {
            for (var i = 0; i < wlNwObjLst.length; i++) 
                if (wlNwObjLst[i].countryCode == countryValObj.value) {
                    countryObj.innerHTML = wlNwObjLst[i].country
                    break;
                }
        }
    }
    var modeValObj = document.getElementById('hdWlanMode');
    var modeObj = document.getElementById('tdMode');
    if (modeValObj && modeObj) {
        if (modeValObj.value.indexOf("na") != -1) 
            modeObj.innerHTML = "na"
        if (modeValObj.value.indexOf("ng") != -1) 
            modeObj.innerHTML = "ng"
    }
    resetChannelAndMode();
}
