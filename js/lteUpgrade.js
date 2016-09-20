/*
 * File: upgradeViaNetwork.html
 * Created on March 2013 - Saikumar
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
 
var ie = (navigator.appName.indexOf ('Microsoft') != -1);
var ns = (navigator.appName.indexOf ('Netscape') != -1);
var nCells = 0;
var cellIdx = 0;
var tblObj = null;
var tdObjs = null;
var probableImageUploadTime = 1;	/* minutes */
var delay = 0;
var upgradeStarted = false;
var progressBgColor = "#00529B";
var timerId = null;

/* Showing the progress bar */

function percentValuesShow ()
	{
	var tblProgressObj = document.getElementById ('tblProgress');
	tblProgressObj.className = "tblAnim";
  	tblObj = document.getElementById ('tblProgress');
  	tblObj.border = "1";
	if (ie)
		{
		nCells = (tblObj.cells).length;
		tblObj.cells[0].innerHTML = "1%";
		}
	else if (ns)
		{
		tdObjs = document.getElementsByName ('tblTdProgress');
		nCells = tdObjs.length;
		tdObjs[0].innerHTML = "1%";
		}
	var prcVal = 0;
	for (var i = 0; i < nCells; ++i)
		{
		if ((i+1)%5 == 0)
			{
			prcVal += 10;
			if (ie)
				tblObj.cells[i].innerHTML = (prcVal + "%");
			else if (ns)
				tdObjs [i].innerHTML = (prcVal + "%");
			}
		}
	return;
	}

function upgradeProgressShow (animationDelay)
	{
	if (navigator.appName.indexOf ('Opera') != -1)
		{
		document.getElementById('divPBar').innerHTML = "<span class=\"secError1\"><b>Process is going on. Please wait...</b></span>";
		return;
		}
	probableImageUploadTime = animationDelay;
  	tblObj = document.getElementById ('tblProgress');
  	tblObj.bgColor = "#76a8bf"
	if (ie)
		{
		nCells = (tblObj.cells).length;
		tblObj.cells[0].bgColor = progressBgColor;
		tblObj.cells[26].innerHTML = "0%";
		}
	else if (ns)
		{
		
		tdObjs = document.getElementsByName ('tblTdProgress');
		nCells = tdObjs.length;
		tdObjs [0].bgColor = progressBgColor;
		tdObjs [26].innerHTML = "0%";
		}
	delay = (probableImageUploadTime * 1000) / nCells;
	++cellIdx;
	animationStart = true;
	timerId = setTimeout ("animationDisplay ()", delay);
	return;
	}
function animationDisplay ()
	{
	if (timerId)
		clearTimeout(timerId)
	if (cellIdx >= nCells) return;
	if (upgradeStarted == false) return;
	if (ie)
		{
		tblObj.cells[cellIdx].bgColor = progressBgColor;
		tblObj.cells[26].innerHTML = cellIdx*2 + "%";
		}
	else if (ns)
		{
		tdObjs [cellIdx].bgColor = progressBgColor;
		tdObjs [26].innerHTML = cellIdx*2 + "%";
		}
	++cellIdx;
	timerId = setTimeout ("animationDisplay ()", delay);
	}
function uploadImage (animationDelay, fileId, errMsg)
	{
	if (accessLevelCheck () == false)
		return false;
		
	if (upgradeStarted) return false;
	var fileObj = document.getElementById (fileId);
	if (!fileObj.value)
		{
		if (errMsg)
			alert (errMsg);
		return false;
		}
		
	var proceed = confirm ('Preparing to upgrade LTE firmware image. The upgrade process may take a few minutes. Are you sure you want to proceed?\n' +
						   'WARNING: Interrupting the upload or powering off the system during the upload may damage the device.', '');
	if (proceed)
		{
		menuDisable ();
		document.getElementById ('lblWarning').innerHTML = "WARNING: The upgrade process takes a few minutes.<br>" +
        	                   "Interrupting the upload or powering off the system during the upload may damage the device.<br>" +
        	                   "Please wait until the upgrade process finishes before browsing any sites from your browser.";
		$(".midBg div.msgError").show();
		upgradeStarted = true;
		upgradeProgressShow (animationDelay);
		return true;
		}
	return false;
	}

function restoreSettingsFromFile (animationDelay, fileId, errMsg)
	{
	if (accessLevelCheck () == false)
		return false;
		
	if (upgradeStarted) return false;
	var fileObj = document.getElementById (fileId);
	if (!fileObj.value)
		{
		if (errMsg)
			alert (errMsg);
		return false;
		}
		
	var proceed = confirm ('Preparing to restore saved settings from user-provided file. Are you sure you want to proceed?\n' + 
						   'WARNING: Current configuration will be erased.', '');
	if (proceed)
		{
		menuDisable ();
	    document.getElementById ('lblWarning').innerHTML = "";		
		upgradeStarted = true;
		upgradeProgressShow (animationDelay);
		return true;
		}
	return false;
	}
function pageDisable ()
	{
	var obj = document.getElementById ('btBackup');
	if (obj) {obj.onclick = function () {return false;}; obj.className = "submitDis"; }
	obj = document.getElementById ('btImgRestore');
	if (obj) {obj.onclick = function () {return false;}; obj.className = "submitDis"; }
	obj = document.getElementById ('btImgDefault');
	if (obj) {obj.onclick = function () {return false;}; obj.className = "submitDis"; }
	obj = document.getElementById ('imgUpload');
	if (obj) {obj.onclick = function () {return false;}; obj.className = "submitDis"; }
	obj = document.getElementById ('imgUploadReset');
	if (obj) {obj.onclick = function () {return false;}; obj.className = "submitDis"; }
	obj = document.getElementById ('btReboot');
	if (obj) {obj.onclick = function () {return false;}; obj.className = "submitDis"; }
	}	
function menuDisable ()
	{
	var obj = document.getElementById ('divTopMenu');
	if(obj)
	    {
	    var anchorObjs = divTopMenu.getElementsByTagName ("a");
	    var len = anchorObjs.length;
	    for (i = 0; i < len; ++i)
	    anchorObjs [i].onclick = function () {return false;};
	    }
	var obj1 = document.getElementById ('divTopMenu');
	if(obj1)
	    {
	    anchorObjs = tdLeftMenu.getElementsByTagName ("a");
	    len = anchorObjs.length;
	    for (i = 0; i < len; ++i)
        anchorObjs [i].onclick = function () {return false;};
        }
    pageDisable ();
	}	
	
function revertToDefaults (animationDelay)
	{
	if (accessLevelCheck () == false)
		return false;
		
	var proceed = confirm ('Preparing to restore factory default settings. Are you sure you want to proceed?\n'+
						   'WARNING: Current configuration will be erased.', '');
	if (proceed)
		{
		menuDisable ();
	    document.getElementById ('lblWarning').innerHTML = "";		
		upgradeStarted = true;
		upgradeProgressShow (animationDelay);
		return true;
		}
	return false;
	}
	
function check(objId,exten,flag)
	{
	if (accessLevelCheck () == false)
		return false;
	var ext = document.getElementById(objId).value;
        if (ext == "") {
            alert ("Please enter the full path and file name");
            return false;
        }
	ext = ext.substring(ext.lastIndexOf('.')+1,ext.length);
	ext = ext.toLowerCase();
	if (ext.length > 4)
		{
		alert('please select a .'+exten+' file');
		return false;
		}
	else if(ext != exten)
		{
		alert('You selected a .'+ext+' file; please select a .'+exten+' file instead!');
		return false;
		}
	else
		{
		if(flag == 1)
			return restoreSettingsFromFile (10, 'txtRestoreFile', 'Please enter the full path and file name containing settings to be restored');
		else if(flag == 2)
			return uploadImage (115, 'txtUploadFile', 'Please enter the full path and file name of the image to be uploaded');
		else if(flag == 3)
			return restoreSettingsFromFile (10, 'RestoreFileObjects', 'Please enter the full path and file name containing settings to be restored');
        else
			return uploadImage (115, 'txtUploadFile', 'Please enter the full path and file name of the image to be uploaded');
		}
	}


function checkUSB(objId,exten,flag, fieldId)
	{
	if (accessLevelCheck () == false)
		return false;
	if (labelEmptyCheck (fieldId, 'Please enter a label for the firmware') == false) {
	    return false;
	}
/*
	var ext = document.getElementById(objId).value;
	ext = ext.substring(ext.lastIndexOf('.')+1,ext.length);
	ext = ext.toLowerCase();
	if (ext.length > 4)
		{
		alert('please select a .'+exten+' file');
		return false;
		}
	else if(ext != exten)
		{
		alert('You selected a .'+ext+' file; please select a .'+exten+' file instead!');
		return false;
		}
	else
		{ */
		if(flag == 1)
			return restoreSettingsFromFile (5, objId, 'Please enter the full path and file name containing settings to be restored');
		else if(flag == 2)
			return uploadImage (230, objId, 'Please select the file name of the image to be uploaded.');
        else
			return uploadImage (230, objId, 'Please select the file name of the image to be uploaded.');
//		}
	}


function accessLevelCheck ()
	{
	var accessLevel = document.getElementById ('hdUserPriv').value;
	if (!accessLevel || isNaN (accessLevel)) return true;
	if (parseInt (accessLevel, 10) != 0)
		{
		if ((document.getElementById('lblWarning')) != null) 
			document.getElementById ('lblWarning').innerHTML = "Administrator privilages required"
		else
			alert ("Administrator privilages required");
		return false;
		}
	return true;
	}
var timerFlag = null;	
function firmwareVersionCheck()
	{
		var request = null;
		if (timerFlag) clearTimeout(timerFlag);
		var stAvailObj = document.getElementById ('hdStatusAvailable');				
		var regLinkObj = document.getElementById ('hdregLink');
		if(parseInt(document.getElementById('hdAutorefreshFlag').value,10) == 1)
		{			
			try
			{ // Firefox, Opera 8.0+, Safari
				request=new XMLHttpRequest();
			}
			catch (e)
			{ // Internet Explorer
				try
				{
					request=new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e)
				{
					try
					{
						request=new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch (e)
					{
						window.status = "Your browser does not support AJAX!";
						return false;
					}
				}
			}
			request.onreadystatechange=function()	
			{				
				if(request.readyState==4)				
				{	
					var str;
					var splitStr;
					str=request.responseText;
					splitStr=str.split("||");
					var tdObj = document.getElementById ('lblStatus');
					if (tdObj) tdObj.innerHTML = splitStr[0];						
					if(stAvailObj) stAvailObj.value = splitStr[1];
					if(regLinkObj) regLinkObj.value = splitStr[2]						
					if(parseInt(stAvailObj.value,10) == 1)
						timerFlag = setTimeout("firmwareVersionCheck()",5000);			
					else
						{
										
						var tdObj = document.getElementById ('lblStatus');				 
						if(parseInt(stAvailObj.value,10) == 2)
							{   					
							var msg = tdObj.innerHTML + "<br/>You can download a newer firmware file at " + " <a href ='" + regLinkObj.value + "' target='_blank' style='color:blue'>" + "TeamF1 Router Support" + "</a>" + " Website.";
							tdObj.innerHTML = msg; 
							}
						else if(parseInt(stAvailObj.value,10) == 3)
							{					
							var msg = tdObj.innerHTML + "<br/>You must register your device at the " + " <a href ='" + regLinkObj.value + "' target='_blank' style='color:blue'>" + "TeamF1 Router" + "</a>" + " Website before checking firmware status.";
							tdObj.innerHTML = msg; 
							}		
				
						}

				}
			}
			request.open("GET","?page=getFirmwareStatus.html&time=" + new Date(),true);
			request.send(null);
		}
	}


/******************************************************************** 
* showCounterMsg - pops up confirm message.
*   
* This routine pops up a confirm message.
* 
* 
* RETURNS: TRUE or FALSE
*/

function showCounterMsg (id, prefixMsg, suffixMsg)
    {
    var idObj = document.getElementById (id);
    var idObjVal = idObj.value;
    return confirm (prefixMsg + " " + idObjVal + " " + suffixMsg);
    }

function upgradeEmptyCheck ()
	{
	var txtFieldIdArr = new Array ();    
    txtFieldIdArr[0] = "tf1_txtFirmwareLabel, Please enter a Label for the firmware";
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;
	return true;
	}

function labelEmptyCheck (fieldId, msg) {
    var txtFieldIdArr = new Array ();
    txtFieldIdArr[0] = fieldId + "," + msg;
    if (txtFieldArrayCheck (txtFieldIdArr) == false) {
         return false;
    }
    return true;
}
