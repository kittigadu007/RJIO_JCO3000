/*
 * File: mediaSharing.js
 * Created on 03rd sep 2015 - Devaki N
 * Copyright (c) 2015 TeamF1, Inc.
 * All rights reserved.
 */  
$(document).ready(function(){
  var minIndexObj = document.getElementById('tf1_hid_minIndex');
  var childIndexObj = document.getElementById('tf1_hid_childCount');
  var maxIndexObj = document.getElementById('tf1_hid_maxIndex');
  if((minIndexObj && !minIndexObj.disabled) || (childIndexObj && !childIndexObj.disabled) || (maxIndexObj && !maxIndexObj.disabled)){
  minIndexObjVal = minIndexObj.value;
  childIndexObjVal = childIndexObj.value;
  maxIndexObjVal = maxIndexObj.value;
  var paginationDisplay = minIndexObjVal +" to "+ maxIndexObjVal +" of "+ childIndexObjVal+" items ";
    $("#tf1_pageCount_data").html(paginationDisplay);
    if(parseInt(minIndexObjVal, 10) <= 50){
     $("#tf1_minIndexClass").addClass("disabled");
    }
    if(parseInt(maxIndexObjVal, 10) == childIndexObjVal){
     $("#tf1_maxIndexClass").addClass("disabled");
    }
  }
});
function goToMinIndex() {
  var minIndexObj = document.getElementById('tf1_hid_minIndex');
  minIndexObjVal = minIndexObj.value;
  var folderIdObj = document.getElementById('tf1_hid_folderId');
  folderIdObjVal = folderIdObj.value;
  $("#tf1_minIndex").val(minIndexObjVal);
  $("#tf1_minfolderName").val(folderIdObjVal);
  $("#tf1_frmParentalGuidance_minIndex").submit();
}
function goToMaxIndex() {
  var maxIndexObj = document.getElementById('tf1_hid_maxIndex');
  maxIndexObjVal = maxIndexObj.value;
  var folderIdObj = document.getElementById('tf1_hid_folderId');
  folderIdObjVal = folderIdObj.value;
  $("#tf1_maxIndex").val(maxIndexObjVal);
  $("#tf1_maxfolderName").val(folderIdObjVal);
  $("#tf1_frmParentalGuidance_maxIndex").submit();
}
function folderClick(folderName) {
   $("#tf1_folderName").val(folderName);
   $("#tf1_frmParentalGuidance1").submit();

}
function goToRootClick() {
       $("#tf1_frmParentalGuidance_root").submit();
}
function goToPreviousClick() {
       $("#tf1_frmMediaSharing_previous").submit();
}
/* Reset function for form */
function parentalGuidanceOnReset(){
    $(".hide").hide();
    $('.superclass a').removeClass('minus').addClass("plus");
}

$(document).ready(function(){
/* click function of tree list */            
    $(".node").click(function(){
        $(this).toggleClass("plus minus");
        $(this).parent().siblings('ul').fadeToggle("fast", function () {
        });
    });
});
