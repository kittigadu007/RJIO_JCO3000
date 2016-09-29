/* menuSearch.js - API for creating and using search list */

/*
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/*
 * Modifications History
 * ------------------------
 */
/* Global Objects */
var divObj;
var indexVal = 0;

document.onkeyup = setKeyFunction;

/***************************************************************************
 * convertToLowerCase - Converts a value to lower case
 *
 * This routine converts the given value to lower case.
 *
 * @param: fldObjVal - Value to be converted to lower case
 * @return: value
 */
function convertToLowerCase(fldObjVal){
    return fldObjVal.toLowerCase();
}

/***************************************************************************
 * searchEnteredValue - Creates search list based on the entered string
 *
 * This routine appends objects created, based on the string provided,
 * to the div object.
 *
 * @param: fldValue - String entered to search for
 *           fldObj - Object that consists of an array of objects
 * @return: NONE
 */
function searchEnteredValue(fldValue, fldObj){
    var groupObj = new Array();
    var selectedKeys = [];
    var splitValues = fldValue.split(" ");
	hgwModelName = document.getElementById('tf1_hidden_hgwModelName').value;
  gopnStatus =  document.getElementById('tf1_hidden_gponStatus').value;
    for (var key in fldObj) {
        var keyName = convertToLowerCase(fldObj[key].secondLevelMenu);
    var keyName1 = convertToLowerCase(fldObj[key].mainMenu);
        /* Ignore pages which are not direct links */
        if ((key != 'menu51' && key != 'menu52')) {
/* remove wan port type in menu search for JCO & JCE starts */       
		if( hgwModelName == 0){
			delete menuSearchList["menu92"];
		}
/* remove wan port type in menu search for JCO & JCE ends */
/* remove 5Ghz pages in menu search for JCO110 & HG260ES starts*/       
		if( (hgwModelName == 2) || (hgwModelName == 3)){
			delete menuSearchList["menu105"];
			delete menuSearchList["menu106"];
		}
/* remove 5Ghz pages in menu search for JCO110 & HG260ES ends*/       
/* remove Wan Port pages in menu search for HG260ES starts*/
		if( hgwModelName == 3){
			delete menuSearchList["menu92"];
        }
/* remove Wan Port pages in menu search for HG260ES ends*/
/* changes for 51744 starts */   
if( gopnStatus == "1"){
  delete menuSearchList["menu74"];
    }    
/* changes for 51744 ends */   
          for (spIndex = 0; spIndex < splitValues.length; spIndex++) {

            if (jQuery.inArray(key,selectedKeys) == -1) {             

              if (keyName.indexOf(splitValues[spIndex]) != -1 || keyName1.indexOf(splitValues[spIndex]) != -1) {
            
               selectedKeys.push(key);
                var liObj = createListObject(fldObj[key]);
                divObj.appendChild(liObj);
              }
            } 
         }
        }
    }
    if (divObj.hasChildNodes()) {
        setFirstAnchorClass();
        var lastNodeObj = divObj.lastChild;
        setClassName(lastNodeObj, 'menuLastChild');
    }
}

/***************************************************************************
 * setClassName - Sets the class name of an object
 *
 * This routine sets the class name of a given object to a given class name.
 *
 * @param: fldObj - Object whose class has to be set
 *           styleValue - Class name to be set
 * @return: NONE
 */
function setClassName(fldObj, styleValue){
    fldObj.className = styleValue;
}

/***************************************************************************
 * createListObject - Creates a list object
 *
 * This routine created a list object with an anchor object as its child.
 *
 * @param: fldObj - Object to be referenced to
 * @return: Object
 */
function createListObject(fldObj){
    var listObj = document.createElement("li");
    listObj.setAttribute("id", 'menuLi' + indexVal);
    indexVal++;
    var anchorObj = document.createElement("a");
    anchorObj.setAttribute("href", fldObj.hrefAttrLink);
    anchorObj.innerHTML = fldObj.mainMenu + ' <span class="menuSpanArrow">&#187;</span> ' + fldObj.secondLevelMenu;
    anchorObj.onclick = function(){
        return clickOnLink(fldObj.secondLevelMenu);
    };
    anchorObj.onmouseover = onMouseOverFunc;
    anchorObj.onmouseout = onMouseOutFunc;
    listObj.appendChild(anchorObj);
    return listObj;
}

/***************************************************************************
 * clickOnLink - Set the value in the search field
 *
 * This routine sets the selected link's text as value in the Search field.
 *
 * @param: setValue - Value to be set for an object
 * @return: TRUE
 */
function clickOnLink(setValue){
    var fldObj = document.getElementById('menu1');
    fldObj.value = setValue;
    return true;
}

/***************************************************************************
 * clearSearchList - Clears the search list
 *
 * This routine clears the search list existing in the div object.
 *
 * @param: NONE
 * @return: NONE
 */
function clearSearchList(){
    divObj.innerHTML = "";
    divObj.className = "hide";
}

/***************************************************************************
 * autoCompleteSearch - Searches for the list of menus
 *
 * This routine searches for the menu list matching the entered values.
 *
 * @param: NONE
 * @return: NONE
 */
function autoCompleteSearch(){
    var fldObj = document.getElementById('menu1');
    clearSearchList();
    var fldObjVal = convertToLowerCase(fldObj.value);
    indexVal = 0;
    if (fldObjVal.length > 1) {
        searchEnteredValue(fldObjVal, menuSearchList);
    }
}

/***************************************************************************
 * setKeyFunction - Calls functions beased on the key stroke
 *
 * This routine gets the char code of the key stroke and calls its
 * respective funcion.
 *
 * @param: NONE
 * @return: NONE
 */
function setKeyFunction(e){
    var key;
    divObj = document.getElementById('menuList');
    if (!divObj) {
     return false;
    }
    if (!e) 
        var e = window.event;
    (e.keyCode) ? key = e.keyCode : key = e.which;
    if (key == 40) {
        if (divObj != null || divObj.innerHTML != "") {
            setClassOnKeyDown();
        }
    }
    if (key == 38) {
        if (divObj != null || divObj.innerHTML != "") {
            setClassOnKeyUp();
        }
    }
    if (key == 13) {
        if (divObj != null || divObj.innerHTML != "") {
            setFuncOnKeyEnter();
        }
    }
    if ((key >= 97 && key <= 122) || (key >= 65 && key <= 90) || key == 8 || key == 46) {
        autoCompleteSearch();
    }
}

/***************************************************************************
 * getSelectedMenuIndex - Returns the index of the menu highlighted
 *
 * This routine returns the index of the menu highlighted in the search list.
 *
 * @param: NONE
 * @return: Index value
 */
function getSelectedMenuIndex(){
    var arrObj = divObj.getElementsByTagName('a');
    for (var i = 0; i < arrObj.length; i++) {
        if (arrObj[i].className == "menu-selected") {
            return i;
        }
    }
    return -1;
}

/***************************************************************************
 * getNoOfAnchorObjs - Returns the length of the object
 *
 * This routine returns the length of the array object.
 *
 * @param: NONE
 * @return: Integer value
 */
function getNoOfAnchorObjs(){
    var arrObj = divObj.getElementsByTagName('a');
    return arrObj.length;
}

/***************************************************************************
 * setAnchorObjClass - Sets class for an object
 *
 * This routine sets the class for an object.
 *
 * @param: cntNo - Index of the menu to be set
 *         anchorLength - Length of an object
 *         clsName - Class name to be set to
 * @return: NONE
 */
function setAnchorObjClass(cntNo, anchorLength, clsName){
    if (cntNo >= anchorLength) {
        cntNo = anchorLength - 1;
    }
    if (cntNo < 0) {
        cntNo = 0;
        clsName = "menu-unselected";
    }
    var prevLiObj = document.getElementById('menuLi' + cntNo);
    if (prevLiObj) {
        var anchObj = prevLiObj.firstChild;
        setClassName(anchObj, clsName);
    }
}

/***************************************************************************
 * setFirstAnchorClass - Sets class for the first anchor object
 *
 * This routine sets the class for the first anchor object.
 *
 * @param: NONE
 * @return: NONE
 */
function setFirstAnchorClass(){
    divObj.className = "menuSearchTf1";
    var countNo = getSelectedMenuIndex();
    if (countNo < 0) {
        var liObj = divObj.firstChild;
        var anchObj = liObj.firstChild;
        //setClassName (anchObj, "menu-selected");
    }
}

/***************************************************************************
 * setClassOnKeyUp - Action to be performed on key up stroke
 *
 * This routine sets the class names of the objects on key up stroke.
 *
 * @param: NONE
 * @return: NONE
 */
function setClassOnKeyUp(){
    var countNo = getSelectedMenuIndex();
    if (countNo < 0) {
        clearSearchList();
    }
    else {
        var noOfAnchors = getNoOfAnchorObjs();
        setAnchorObjClass(countNo, noOfAnchors, "menu-unselected");
        setAnchorObjClass((countNo - 1), noOfAnchors, "menu-selected");
    }
}

/***************************************************************************
 * setClassOnKeyDown - Action to be performed on key down stroke
 *
 * This routine sets the class names of the objects on key down stroke.
 *
 * @param: NONE
 * @return: NONE
 */
function setClassOnKeyDown(){
    var countNo = getSelectedMenuIndex();
    var noOfAnchors = getNoOfAnchorObjs();
    setAnchorObjClass(countNo, noOfAnchors, "menu-unselected");
    setAnchorObjClass((countNo + 1), noOfAnchors, "menu-selected");
}

/***************************************************************************
 * setFuncOnKeyEnter - Action to be performed on key enter stroke
 *
 * This routine leads to the respective page based on the link of the
 * highlighted object on key enter stroke.
 *
 * @param: NONE
 * @return: NONE
 */
function setFuncOnKeyEnter(){
    var countNo = getSelectedMenuIndex();
    var liObj = document.getElementById('menuLi' + countNo);
    if (liObj) {
        var anchObj = liObj.firstChild;
        location.href = anchObj.href;
    }
}

var onMouseOverFunc = function(){
    setClassName(this, 'menu-selected');
};
var onMouseOutFunc = function(){
    setClassName(this, 'menu-unselected');
};
