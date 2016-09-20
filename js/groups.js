/*
 * File: groups.js
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

});
function enableDisableFieldsByImageClick(data, thisObj) { 
    onImageToggle(data);
    var imgId=thisObj.id;
    
    switch(imgId){
       	case 'tf1_enableAdmin':       		
       		adminObj=$("#tf1_enableAdmin").attr( "src" );
			adminObjVal = adminObj.substring (adminObj.lastIndexOf ('/') + 1);
      		if(adminObjVal == "button_on.png"){      			
      			$("#tf1_enableGuest").attr( "src", "images/button_off.png" );
				$("#tf1_enablePortal").attr( "src", "images/button_off.png" );
      		}
       	break;
       	case 'tf1_enableGuest':       		
       		guestObj=$("#tf1_enableGuest").attr( "src" );
			guestObjVal = guestObj.substring (guestObj.lastIndexOf ('/') + 1);
      		if(guestObjVal == "button_on.png"){      			
      			$("#tf1_enableAdmin").attr( "src", "images/button_off.png" );
				$("#tf1_enablePortal").attr( "src", "images/button_off.png" );
      		}
       	break;
		case 'tf1_enablePortal':       		
       		portalObj=$("#tf1_enablePortal").attr( "src" );
			portalObjVal = portalObj.substring (portalObj.lastIndexOf ('/') + 1);
      		if(guestObjVal == "button_on.png"){      			
      			$("#tf1_enableGuest").attr( "src", "images/button_off.png" );
				$("#tf1_enableAdmin").attr( "src", "images/button_off.png" );
      		}
       	break;
	}
}

function groupsPageValidate(frmId){
	var txtFieldIdArr = new Array();
	
	txtFieldIdArr[0] = "tf1_groupName, Please enter a valid Group Name";
 	txtFieldIdArr[1] = "tf1_groupDesc, Please enter a valid Group Description";    	 
		
    if (txtFieldArrayCheck(txtFieldIdArr) == false)
	    return false;   

	setHiddenChks(frmId);
	return true;
	
}
