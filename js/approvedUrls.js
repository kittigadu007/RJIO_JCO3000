/*
 * File: blockedKeywords.js
 * Created on 17th Jan 2013 - Lakshmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Form Validation
 * @method keywordValidate
 */
function keywordValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_txtKeyword,Please enter valid URL";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;

	if (isProblemCharArrayCheck(txtFieldIdArr, "'\" ", NOT_SUPPORTED) == false) 
        return false;

    return true
}

/**
 * This function Uploads the file
 * OnClick validation
 * @method checkImageFile
 */
function checkImageFile(){
    var txtObjVal = document.getElementById('tf1_txtUploadFile').value;
    if (txtObjVal == "") {
        alert('Please enter the full path and file name of the URLs to be uploaded');
        return false;
    }
    txtObjVal = txtObjVal.substring(txtObjVal.lastIndexOf('.') + 1, txtObjVal.length);
    txtObjVal = txtObjVal.toLowerCase();
    if (txtObjVal.length > 4) {
        alert('please select a .csv file');
        return false;
    }
    else 
        if (txtObjVal != 'csv') {
            alert('You selected a .' + txtObjVal + ' file; please select a .csv file instead!');
            return false;
        }
    return true;
}
