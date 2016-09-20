/*
 * File: userAccessPortalSetup.js
 * Created on 2nd July 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */

/**
 * This function calls Page loads
 * Onload validation
 * @method onloadCall
 */ 
$(document).ready(function(){

	onloadCall (enableDisableFieldsByImageClick, {imageId:'', disableIndividual:'', disableGrp:'', enableIndividual:'', enableGrp:'', hideClass:'hide', showClass:'configRow', breakDivs:'', breakClass:'break', imagesInfo:{disableImages:'', enableImages:'', disableClass:'', enableClass:''}});

	enableTextFieldByImageClick ('tf1_enableUserAccess', 'tf1_authServer tf1_redirectionType tf1_authType tf1_UAProfile', 'break_authServer break_authType break_UAProfile break_redirectionType', 'tf1_authServer_div tf1_redirectionType_div');
    
    authServerChange('tf1_localUserDB');

   $(".fileUploadHd").live("click",function(event){					
				
				event.preventDefault();
				$(".upFile").html('');
				

			var hdFileUploadHtml ='<div class="configRow" id="tf1_fileUploadHd_div" style="display:none"><label>Header Logo Upload <span id="tf1_uploadFileIndexHd"></span></label><input name="file.upload" id="tf1_fileUploadHd_file" size="30" type="file" /></div><div class="break" id="break_fileUploadHd_div" style="display:none">&nbsp;</div><div class="submitRow"><input type="button" id="tf1_fileUploadHd" value="Upload" class="btnSubmit"></div><div class="break" id="break_fileUploadHd_div">&nbsp;</div>';
	                   
				 $("#tf1_uploadHd_div").html(hdFileUploadHtml);
				$("#tf1_uploadFileIndexHd").html($(this).attr("upload-index"));
				 $("#tf1_fileUploadHd_div").show();
				 $("#break_fileUploadHd_div").show();
				 
                               
	});




});

// for popup onload
function onloadNetworkprofilesFn() {
	
	 if($("#tf1_headerBackgroundImage").val() == "1") {	  	
	  	$("#tf1_pageBgColor option[value='1']").remove();
	}
	enableTextFieldByImageClick ('tf1_enableAdvt', 'tf1_advtPlace tf1_advtContent tf1_advtFont tf1_advtFontSize tf1_advtFontColor', 'break_advtPlace break_advtContent break_advtFont break_advtFontSize break_advtFontColor', '');
	enableTextFieldByImageClick ('tf1_enablefooter', 'tf1_footerContent tf1_footerFontColor', 'break_footerContent break_footerFontColor', '');
	pageBackgroundColorChange('tf1_pageBgColor');

	$("#tf1_fileUploadHd").live("click",function() {

	 

	var fileName = $("#tf1_fileUploadHd_file").val();

	 if((/\.(gif|jpg|jpeg|png)$/i).test(fileName) == false) {
		alert("Please select valid image type");
		return false;
	}
	
	var hdIndex = $("#tf1_uploadFileIndexHd").html();

	var fileFields = '<input type="hidden" name="button.fileuploadHd.userAccessPortalSetup" id="tf1_buttonupload" value="headerImage" class="delete-filefield"><input type="hidden" name="imageIndex" id="tf1_imageIndex" value="'+hdIndex+'" class="delete-filefield">';
	
	$("#tf1_frmUserAccessPortalSetup").append(fileFields);
	$("#tf1_frmUserAccessPortalSetup").attr("target","uploader_iframe");	 
        $("#tf1_frmUserAccessPortalSetup").submit();
	 

	// Submits the form on change event,
             $("#uploader_iframe").unbind().load(function() {

		 
		$(".delete-filefield").each(function(){$(this).remove()});

		$("#tf1_frmUserAccessPortalSetup").removeAttr("target");
             		// This block of code will execute when the response is sent from the server.
                	responseText = $(this).contents().text();
	
			
			if (responseText.search("error:") != -1)
			{	
				alert(responseText);
				
			} else {
			  	$(".upFile").html('');
				$(".divHdImage").each(function(index){
					
					if ($(this).attr("header-bg-id") == hdIndex) {
					  
						$(this).html('<img style="width:45px; height:45px" src="images/capPort/'+responseText+'">');
						$(this).attr("image","true");
					}
				});

				$(".fileUploadHd").each(function(index){
					
					if ($(this).attr("upload-index") == hdIndex) {
					  
						$(this).html('Change');
					}
				});
			}
			
                 });
         
  
  });
	
}


function enableDisableFieldsByImageClick(data, thisObj) { 
    onImageToggle(data);
    var imgId=thisObj.id;	
    
    switch(imgId){
       	case 'tf1_enableUserAccess':       		
       		enableTextFieldByImageClick ('tf1_enableUserAccess', 'tf1_authServer tf1_redirectionType tf1_authType tf1_UAProfile', 'break_authServer break_authType break_UAProfile break_redirectionType', 'tf1_authServer_div tf1_redirectionType_div');
			authServerChange('tf1_localUserDB');
       	break;
	// popup
		case 'tf1_enableAdvt':       		
       		enableTextFieldByImageClick ('tf1_enableAdvt', 'tf1_advtPlace tf1_advtContent tf1_advtFont tf1_advtFontSize tf1_advtFontColor', 'break_advtPlace break_advtContent break_advtFont break_advtFontSize break_advtFontColor', '');
       	break;
		case 'tf1_enablefooter':       		
       		enableTextFieldByImageClick ('tf1_enablefooter', 'tf1_footerContent tf1_footerFontColor', 'break_footerContent break_footerFontColor', '');
       	break;
       	
	}
}

/**
 * This function for enable or disable fields while clicking on on off image
 * Onclick event
 * @method enableTextFieldByAnchorClick
 * @param imgId - image Id
 * @param fieldIds - space separated field names
 * @param brk - space separated break names
 */
function enableTextFieldByImageClick(imgId,fieldIds,brk,blocks){
	var imgObj = document.getElementById(imgId);
    if (imgObj) {
		var currentsrc=$(imgObj).attr("src");	
		currentsrcVal = currentsrc.substring (currentsrc.lastIndexOf ('/') + 1);
	     if(currentsrcVal == "button_on.png"){
			fieldStateChangeWr ('', '', fieldIds, blocks);
       		vidualDisplay(fieldIds,'configRow');	   
       		vidualDisplay (brk,'break');
       		vidualDisplay(blocks,'configRow');
	     }else{
			fieldStateChangeWr (fieldIds, blocks, '', '');
	   	    vidualDisplay(fieldIds,'hide');
	   	    vidualDisplay (brk,'hide');
	   	    vidualDisplay(blocks,'hide');
	     }
    }
}




function authServerChange(radioId){
	var selValue = radioCheckedValueGet(radioId);
	if (!selValue) return;	
	switch (parseInt(selValue, 10)){
		case 1: /* Radius server */					
			fieldStateChangeWr ('','','tf1_authType','');
			vidualDisplay ('tf1_authType', 'configRow');
			vidualDisplay ('break_authType', 'break')
			break;	
		case 0: /* Local User Database */
			fieldStateChangeWr ('tf1_authType','','','');
			vidualDisplay ('tf1_authType', 'hide');
			vidualDisplay ('break_authType', 'hide')
			break;	
	}				
}
//popup


function pageBackgroundColorChange(selId){
	var selValue = comboSelectedValueGet(selId);
	if (!selValue) return;	
	switch (parseInt(selValue, 10)){
		case 1:
		case 2:
		case 3:
		case 4:				
			fieldStateChangeWr ('tf1_pageBgCustomColor','','','');
			vidualDisplay ('tf1_pageBgCustomColor', 'hide');
			vidualDisplay ('break_pageBgCustomColor', 'hide')
			break;	
		case 5: /* custom */
			fieldStateChangeWr ('','','tf1_pageBgCustomColor','');
			vidualDisplay ('tf1_pageBgCustomColor', 'configRow');
			vidualDisplay ('break_pageBgCustomColor', 'break')
			break;	
	}				
}

 

function userAccessPortalValidation(frmId){
	var txtFieldIdArr = new Array();
	txtFieldIdArr[0] = "tf1_profileName, Please enter a valid Profile Name";
	txtFieldIdArr[1] = "tf1_browserTitle, Please enter a valid Browser Title";
 	txtFieldIdArr[2] = "tf1_pageBgCustomColor, Please enter a valid Page Background Custom Color";	
 	txtFieldIdArr[3] = "tf1_headerBgCaption, Please enter a valid Header Caption";
	txtFieldIdArr[4] = "tf1_advtContent, Please enter a valid Ad Content";
 	txtFieldIdArr[5] = "tf1_footerContent, Please enter a valid Footer Content";    	 
		
  	if (txtFieldArrayCheck(txtFieldIdArr) == false)
	    return false;

	/* added check for not allowing space as first character starts */
    var profileNameObj = document.getElementById('tf1_profileName');
    if ( profileNameObj.value.charAt(0) == ' ' )
    {
         alert("Profile Name cannot start with space character");
         profileNameObj.focus();
         return false;
    }
    /* added check for not allowing space as first character ends */
    var txtFieldIdArrProfileName = new Array();
    txtFieldIdArrProfileName[0] = "tf1_profileName,Please enter a valid Profile name";
     /* added to condition to prevent semicolon & pipe characters */
    if (isProblemCharArrayCheck(txtFieldIdArrProfileName, "'\";|", "Following characters are not supported for this field:\r\ndouble quote( \" ), single quote( \' ), Pipe ( | ), Semi-Colon ( ; )") == false) 
        return false;
    /* added below condition to allow space for host name for the SPR-48304 additional comments */


	var txtFieldIdArr1 = new Array();
	txtFieldIdArr1[0] = "tf1_pageBgCustomColor, Please enter a valid Page Background Custom Color";	

	if (isProblemCharArrayCheck(txtFieldIdArr1, "'\" ", NOT_SUPPORTED) == false) 
        return false;

	if(isCustomColor('tf1_pageBgCustomColor') == false)
		return false;	 

	setHiddenChks(frmId);
	return true;
	
}


/**
 * Validates hexadecimal value
 * @method localOuiDatabaseValidations
*/
function isCustomColor(fldId){
	var obj = document.getElementById(fldId);		
	if(obj.disabled){
		return true;
	}
	var fldVal = document.getElementById(fldId).value;
	var reg = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
	
	if(!fldVal.match(reg)){
		alert("Invalid Color Code.");
		document.getElementById(fldId).focus();	
		return false;	
	}
}

function userAccessPortalSetupOnReset(frmId){
	resetImgOnOff(frmId);
	enableTextFieldByImageClick ('tf1_enableUserAccess', 'tf1_authServer tf1_redirectionType tf1_authType tf1_UAProfile', 'break_authServer break_authType break_UAProfile break_redirectionType', 'tf1_authServer_div tf1_redirectionType_div');
}



/*target="uploader_iframe" */

     $("#tf1_fileUploadBg").live("click",function() {

	var fileName = $("#tf1_fileUploadBg_file").val();

	 if((/\.(gif|jpg|jpeg|png)$/i).test(fileName) == false) {
		alert("Please select valid image type");
		return false;
	}
	
	var bgIndex = $("#tf1_uploadFileIndex").html();

	var fileFields = '<input type="hidden" name="button.fileuploadBg.loginProfiles" id="tf1_buttonupload" value="backGroundImage" class="delete-filefield"><input type="hidden" name="imageIndex" id="tf1_imageIndex" value="'+bgIndex+'" class="delete-filefield">';
	
	$("#tf1_frmUserAccessPortalSetup").append(fileFields);
	$("#tf1_frmUserAccessPortalSetup").attr("target","uploader_iframe");
        $("#tf1_frmUserAccessPortalSetup").submit(); 
         // Submits the form on change event,
             $("#uploader_iframe").unbind().load(function() {
		$(".delete-filefield").remove();
		$("#tf1_frmUserAccessPortalSetup").removeAttr("target");
             		// This block of code will execute when the response is sent from the server.
                	responseText = $(this).contents().text();
	
			
			if (responseText.search("Error:") != -1)
			{	
				alert(responseText);
				
			} else {
			  	$(".upFile").html('');
				$(".divBgImage").each(function(index){
					
					if ($(this).attr("page-bg-id") == bgIndex) {
					  
						$(this).html('<img style="width:45px; height:45px" src="images/capPort/'+responseText+'?'+(new Date).getTime()+'">');
						$(this).attr("image","true");
					}
				});

				$(".fileUploadBg").each(function(index){
					
					if ($(this).attr("upload-index") == bgIndex) {
					  
						$(this).html('Change');
					}
				});
			}
			
                 });
  
  });

function headerBackGroundSelect(e){

	if ( $(e).attr("image") == "false" )
	{
		alert("Please upload the image first");
		return;
	}

        if($(e).attr("header-bg-id") == "1") {	  	
	  	$("#tf1_pageBgColor option[value='1']").remove();
	} else {
		if ($("#tf1_pageBgColor option[value='1']").length == 0	) {
			$("#tf1_pageBgColor").append('<option value="1">White</option>');
		}
	}

	$(".headerloginProfileHide").each(function(){
		$(this).removeClass("headerloginProfileHideActive");
	});
	$(e).addClass("headerloginProfileHideActive");
	$("#tf1_headerBackgroundImage").val($(e).attr("header-bg-id"));
}


