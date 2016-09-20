/*
 * File: serverSettings.js
 * Created on 27th Aug 2015 - Devaki N
 * Copyright (c) 2015 TeamF1, Inc.
 * All rights reserved.
 */  

/**
 * Form Validation
 * @method pageValidate
 */
function clientAccessValidate (frmId){
    var txtFieldIdArr = new Array ();
    txtFieldIdArr[0] = "tf1_txtalias,Please enter a valid Alias";
    txtFieldIdArr[1] = "tf1_description, Please enter valid Description";
    
    /*
    if (txtFieldArrayCheck (txtFieldIdArr) == false)
         return false;
         */

    if (alphaNumericValueCheck ("tf1_txtalias", ' -.', '') == false)    
       return false;
   	
   	if (alphaNumericValueCheck ("tf1_description", ' -.', '') == false)    
       return false;

    return true;
 
}
