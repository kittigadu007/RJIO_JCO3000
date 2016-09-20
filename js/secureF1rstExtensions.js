/*
 * File: secureF1rstExtensions.js
 * Created on 13th Sep 2013 - Bala Krishna G
 * Copyright (c) 2013 TeamF1, Inc.
 * All rights reserved.
 */
/**
 * Form Validation
 * @method pageValidate
 */
function pageValidate(){
    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_url,Please enter valid Repository URL";
    
    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
        return false;
    return true
}