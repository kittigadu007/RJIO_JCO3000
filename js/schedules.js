/*
 * File: schedules.js
 * Created on 13th june 2013 - Bala Krishna G
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
 function onclickCallSchedulesFn(){  
//	onloadCall();  
    daySelectCheck('tf1_daySelect1');
    timeSelectCheck('tf1_timeSelect1');
		selectTime();
		selectDay()
    
    // date Time picker
				var curr = new Date().getFullYear();
				var opt = {}
				opt.time = {preset : 'time'};
				// start Time
				$('#tf1_dateTimePickerStart').val($('#tf1_dateTimePickerStartValue').val());
				$('#tf1_dateTimePickerStart').scroller('destroy').scroller(
					$.extend(
						opt["time"], { 					
							mode: "scroller", 
							display: "inline" 
						}
					)			
				);		
				// End Time
				$('#tf1_dateTimePickerEnd').val($('#tf1_dateTimePickerEndValue').val());
				$('#tf1_dateTimePickerEnd').scroller('destroy').scroller(
					$.extend(
						opt["time"], { 					
							mode: "scroller", 
							display: "inline" 
						}
					)			
				);
}


function onchangeValueStart(){
				$('#tf1_dateTimePickerStartValue').val($('#tf1_dateTimePickerStart').val());
			}
			function onchangeValueEnd(){
				$('#tf1_dateTimePickerEndValue').val($('#tf1_dateTimePickerEnd').val());
			}
/**
 * function for validate form when user clicks on submit button
 * OnSubmit event
 * @method schedulesConfigValidate
 */
function schedulesConfigValidate(frmId){

    var txtFieldIdArr = new Array();
    txtFieldIdArr[0] = "tf1_scheduleName,Please enter valid Schedule Name";
    txtFieldIdArr[1] = "tf1_dateTimePickerStartValue,Please enter valid Start Time ";
    txtFieldIdArr[2] = "tf1_dateTimePickerEndValue,Please enter valid End Time ";

    if (txtFieldArrayCheck(txtFieldIdArr) == false) 
			return false;

     /* added check for not allowing space as first character starts */
    var scheduleObj = document.getElementById('tf1_scheduleName');
    if ( scheduleObj.value.charAt(0) == ' ' )
    {
         alert("Schedule Name cannot start with space character");
         scheduleObj.focus();
         return false;
    }
    /* added check for not allowing space as first character ends */

    var usrObj = document.getElementById('tf1_scheduleName');
    if ( validScheduleName(usrObj.value) == false ) {
			alert("Schedule Name cannot have special characters");
			usrObj.focus();
			return false;
    }

    if(compareTimes("tf1_dateTimePickerStartValue", "tf1_dateTimePickerEndValue") == false)
		return false;
		
    setHiddenChks(frmId);   
    return true;
}


/**
 * function for compare two times
 * @method compareTimes
 * @param start - start Time
 * @param end - end Time
 */
function compareTimes(start, end){
	var timef1 = document.getElementById(start);
	var timef2 = document.getElementById(end);	
	
	if ((timef1 && timef1.disabled) || (timef2 && timef2.disabled))
		return;
	
	var Todaydate = new Date();
	var Formatteddate = Todaydate.getDate() +"/" + Todaydate.getMonth() +"/" + Todaydate.getYear();	
	var time1 = Formatteddate + " " + timef1.value;
	var time2 = Formatteddate + " " + timef2.value;
	var StartTime = new Date(time1);
	var EndTime = new Date(time2);
	var TimeDiff = EndTime.getTime() - StartTime.getTime();
	if(TimeDiff <= 0){
		alert("End time must be greater than start time");
		document.getElementById(end).focus();
		return false;
	}else{
		return true;
	}
}

/**
 * function for changing the Date settings of radio buttons
 * Onclick event
 * @method daySelectCheck
 * @param radioName - Radio button name
 */
function daySelectCheck(radioName){
    var selValue = radioCheckedValueGet(radioName);
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1: /* All Days */
            fieldStateChangeWr('tf1_monday tf1_tuesday tf1_wednesday tf1_thursday tf1_friday tf1_saturday tf1_sunday', '', '', '');
            vidualDisplay('tf1_monday tf1_tuesday tf1_wednesday tf1_thursday tf1_friday tf1_saturday tf1_sunday', 'hide');
            vidualDisplay('break1 break2 break3 break4 break5 break6 break7', 'hide');
            break;
            
        case 2: /* Specific Days */
            fieldStateChangeWr('', '', 'tf1_monday tf1_tuesday tf1_wednesday tf1_thursday tf1_friday tf1_saturday tf1_sunday', '');
            vidualDisplay('tf1_monday tf1_tuesday tf1_wednesday tf1_thursday tf1_friday tf1_saturday tf1_sunday', 'configRow');
            vidualDisplay('break1 break2 break3 break4 break5 break6 break7', 'break');
            break;
    }
}

/**
 * function for changing the time settings of radio buttons
 * Onclick event
 * @method timeSelectCheck
 * @param radioName - Radio button name
 */
function timeSelectCheck(radioName){
    var selValue = radioCheckedValueGet(radioName);
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1: /* All Day */
            fieldStateChangeWr('tf1_dateTimePickerStartValue tf1_dateTimePickerEndValue', '', '', '');
            vidualDisplay('tf1_dateTimePickerStartValue tf1_dateTimePickerEndValue startTime endTime', 'hide');
            vidualDisplay('', 'hide');
            break;
            
        case 2: /* Specific Times */
            fieldStateChangeWr('', '', 'tf1_dateTimePickerStartValue tf1_dateTimePickerEndValue');
            vidualDisplay('tf1_dateTimePickerStartValue tf1_dateTimePickerEndValue startTime endTime', 'configRow');
            vidualDisplay('', 'break');
            break;
    }
}


/**
 * Manage input fields when select an option from Destination Hosts
 * @method destinationHostSelect
 */
function selectTime(){
    var selValue = comboSelectedValueGet('tf1_timeSelect');
 
    if (!selValue) 
        return;
    switch (selValue) {
         case '1':
				case "2":
				case "3":
				case "4":
				case "5":
            fieldStateChangeWr('tf1_dateTimePickerEndValue tf1_dateTimePickerStartValue', 'tf1_startTime_div tf1_endTime_div', '', '');
            vidualDisplay('tf1_startTime tf1_endTime', 'hide');
            vidualDisplay('tf1_startTime tf1_endTime', 'hide');
            break;
        case '6':
            fieldStateChangeWr('', '', 'tf1_dateTimePickerEndValue tf1_dateTimePickerStartValue', '');
            vidualDisplay('tf1_startTime tf1_endTime', 'configRow');
            vidualDisplay('break12 break13', 'break');
            
            break;
      
    }
}

/**
 * Manage input fields when select an option from Destination Hosts
 * @method destinationHostSelect
 */
function selectDay(){
    var selValue = comboSelectedValueGet('tf1_daySelect');
 
    if (!selValue) 
        return;
    switch (selValue) {
         case '1':
				case "2":
				case "3":
            fieldStateChangeWr('', 'tf1_monday_div tf1_wednesday_div tf1_friday_div tf1_sunday_div', '', '');
            vidualDisplay('tf1_monday tf1_tuesday tf1_wednesday tf1_thursday tf1_friday tf1_saturday tf1_sunday', 'hide');
            vidualDisplay('tf1_monday tf1_tuesday tf1_wednesday tf1_thursday tf1_friday tf1_saturday tf1_sunday', 'hide');
            break;
        case '4':
            fieldStateChangeWr('', '', 'tf1_monday tf1_tuesday tf1_wednesday tf1_thursday tf1_friday tf1_saturday tf1_sunday', '');
            vidualDisplay('tf1_monday tf1_tuesday tf1_wednesday tf1_thursday tf1_friday tf1_saturday tf1_sunday', 'configRow');
            vidualDisplay('break3 break5 break7 break8', 'break');
            
            break;
      
    }
}

 /****
 * This function will check for valid schedule Name characters
 * OnClick validation
 * @method validScheduleName
 */
function validScheduleName(scheduleName) {
	var strUname = scheduleName.toString();	
    /* changed regex pattern to allow space */
	return /^[a-z\d\s]+$/i.test(strUname);
}
