/*
 * File: osgiApplication.js
 * Created on 14th August  2013 - Bala krishna G
 * Copyright (c) 2013 TeamF1, Inc.
 * All rights reserved.
 */
 
 /**
 * uploading the file
 * @method fileUploadCheck
 * @param fileId - File field ID
 * @param errMsg - error message
 */
function fileUploadCheck(fileId, errMsg) {
	var obj = document.getElementById(fileId);

	if (!obj || obj.disabled)
		return;

	if (obj.value.length > 0) {		
		
		var browsedFileName = $("#tf1_applicationJarFile").val().replace(/.+[\\\/]/, "");
		dataString = "thispage=osgiApplication.html&button.checkFile.osgiApplication=check&appFileName="+browsedFileName;		
		$.ajax({
    	type: "POST",
		url: "platform.cgi",
		data: dataString,
		success: function(dataHTML){
			if (dataHTML.search("users.username") != -1)			{
				$("#"+dialogId).hide();
				$("#"+dialogId).html(dataHTML);
				if ($(".midBg div.msgInfo p").length > 0 && $(".midBg div.msgInfo p").html() != '') 
				{
					window.location="platform.cgi?page=index.html&redirectStatusMessage="+$(".midBg div.msgInfo p").html();
				} else {
					window.location="platform.cgi?page=index.html";
				}
			} else {
				if ( $.trim(dataHTML) == "exists" ) {

					alert("Uploaded OSGi Application already exists in the system.\r\nPlease upload another application.");

				} else {
					
					//alert("Form will be submitted");
					document.tf1_frmOsgiApplication.submit();		 
				}
				 
			}
        },
        dataType:'html'
    });


		

		
	}else {
		alert(errMsg);
	}	 
}
