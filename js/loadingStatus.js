var timer;

function startPageLoadTimer () {   
    timer = setTimeout ('checkPageLoad ()', 2000);
}

function checkPageLoad () {    
    startProgressBar ();
	clearTimeout(timer);  
}

function startProgressBar () {
    displayProgressBar ();    
}

function displayProgressBar () {
    var overlayObj = document.getElementById ('tf1_pageLoadingOverLay');
    overlayObj.style.display = "block";
    var windowDimension = getWindowSize ();                
    var popupPosX = (windowDimension.x/2) - 120;
    var popupPosY = (windowDimension.y/2) - 30;
    var maskObj = document.getElementById ('tf1_pageLoadingMask');
    maskObj.style.display = "block";
    maskObj.style.left = popupPosX.toString ()+"px";
    maskObj.style.top = popupPosY.toString ()+"px";
}

function hideProgressBar () {
    var overlayObj = document.getElementById ('tf1_pageLoadingOverLay');
    var maskObj = document.getElementById ('tf1_pageLoadingMask');
    overlayObj.style.display = "none";
    maskObj.style.display = "none";
}


function getWindowSize () {
    var x = 0;
    var y = 0;
    if (self.innerHeight) {
        x = self.innerWidth;
        y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        x = document.documentElement.clientWidth;
        y = document.documentElement.clientHeight;
    }
    else if (document.body) {
        x = document.body.clientWidth;
        y = document.body.clientHeight;
    }
    return { "x":x, "y":y };
}

function getCookie(c_name)
{
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)
	  {
	  c_start = c_value.indexOf(c_name + "=");
	  }
	if (c_start == -1)
	  {
	  c_value = null;
	  }
	else
	  {
	  c_start = c_value.indexOf("=", c_start) + 1;
	  var c_end = c_value.indexOf(";", c_start);
	  if (c_end == -1)
	  {
	c_end = c_value.length;
	}
	c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

/*Bind the unload event */
    $(document).ready(function(){
				$(window).bind("beforeunload",function(){														
						startPageLoadTimer();
					    var cookieTimer = setInterval(function(){											
											 if (getCookie('TeamF1Download') =="started") {
												hideProgressBar();
												clearInterval(cookieTimer);
												document.cookie ="TeamF1Download=;expires=Thu, 01-Jan-70 00:00:00 GMT;";
											 }
											},2000);														
				});											
	});
/* Clear the cookie if it exists */
document.cookie ="TeamF1Download=;expires=Thu, 01-Jan-70 00:00:00 GMT;";         
