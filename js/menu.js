/*
 * File: menu.js
 * Created on 21st Jan 2013 - Sai Kumar
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
(function($){
    $.fn.hoverIntent = function(f, g){
        var cfg = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        cfg = $.extend(cfg, g ? {
            over: f,
            out: g
        } : f);
        var cX, cY, pX, pY;
        var track = function(ev){
            cX = ev.pageX;
            cY = ev.pageY
        };
        var compare = function(ev, ob){
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
                $(ob).unbind("mousemove", track);
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob, [ev])
            }
            else {
                pX = cX;
                pY = cY;
                ob.hoverIntent_t = setTimeout(function(){
                    compare(ev, ob)
                }, cfg.interval)
            }
        };
        var delay = function(ev, ob){
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob, [ev])
        };
        var handleHover = function(e){
            var ev = jQuery.extend({}, e);
            var ob = this;
            if (ob.hoverIntent_t) {
                ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t)
            }
            if (e.type == "mouseenter") {
                pX = ev.pageX;
                pY = ev.pageY;
                $(ob).bind("mousemove", track);
                if (ob.hoverIntent_s != 1) {
                    ob.hoverIntent_t = setTimeout(function(){
                        compare(ev, ob)
                    }, cfg.interval)
                }
            }
            else {
                $(ob).unbind("mousemove", track);
                if (ob.hoverIntent_s == 1) {
                    ob.hoverIntent_t = setTimeout(function(){
                        delay(ev, ob)
                    }, cfg.timeout)
                }
            }
        };
        return this.bind('mouseenter', handleHover).bind('mouseleave', handleHover)
    }
})(jQuery);

function watermark(inputId, text){
    var inputBox = document.getElementById(inputId);
    if (inputBox.value.length > 0) {
        if (inputBox.value == text) 
            inputBox.value = '';
    }
    else 
        inputBox.value = text;
}

function getBreadCrumb(listId){

    var bSringArray = eval("menuSearchList.menu" + listId + ".breadCrumb").split("@@");
    
    var bString = bSringArray[0] + "<span>&#187;</span>" + bSringArray[1];
    
    if (bSringArray.length == 3) {
        bString = bString + "<span>&#187;</span>" + bSringArray[2];
    }
    /* added below condition for showing bread crumb 4th level separated by @@ starts*/
    if (bSringArray.length == 4) {
        bString = bString + "<span>&#187;</span>" + bSringArray[2]+ "<span>&#187;</span>" + bSringArray[3];
    }
     /* added below condition for showing bread crumb 4th level separated by @@ ends*/
    document.getElementById("breadCrumb").innerHTML = bString;
    
}

function menuLoading() { 

    	/* Onload common events added by jquery */

	/* Activate the click event for help Button */
	
	$(".helpButton").live("click", function(e){
			
		/*Prevent the anchor action or donot append the # to URL */						
						e.preventDefault();
						
						/*Open the help file */
						helpPop (helpSection,helpConfigFile);
	
	});

$(".helpButton1").live("click", function(e){
    
  /*Prevent the anchor action or donot append the # to URL */						
          e.preventDefault();
          
          /*Open the help file */
          helpPopOne (helpSection,helpConfigFile);

});
	
	/* Onload hide the status message if content is empty */	

	if ($(".midBg div.msgInfo p").length > 0 && $(".midBg div.msgInfo p").html() == '')
                    {
                        $(".midBg div.msgInfo").hide();
                    }
	if ($(".midBg div.msgError p").length > 0 && $(".midBg div.msgError p").html() == '')
                    {
                        $(".midBg div.msgError").hide();
                    }
	if ($(".midBg div.msgSuccess p").length > 0 && $(".midBg div.msgSuccess p").html() == '')
                    {
                        $(".midBg div.msgSuccess").hide();
                    }
    $(".nolink").click(function(event){
        event.preventDefault();
    });

$('html').click(function() {
   
        document.getElementById('menuList').innerHTML ='';
        document.getElementById('menu1').value='Menu Search...';
   });
  
   $('.rilSearch').click(function(event){
            event.stopPropagation();
    });

    /* cache nav */
    var nav = $("#topNav");
    
    /* add indicator and hovers to submenu parents */
    
    nav.find("li.main").each(function(){
    
    
        if ($(this).find("ul.menuone").length > 0) {
        
        
            /*show subnav on hover */
            var idObject = $(this);
            var config = {
                over: function(){
                    idObject.find("ul.menuone").stop(true, true).slideDown('slow');
                },
                timeout: 300, /* number = milliseconds delay before onMouseOut */   
                out: function(){
                    idObject.find("ul.menuone").stop(true, true).slideUp('slow');
                }
            };
            
            $(this).hoverIntent(config)
        }
    });
    /*  add indicator and hovers to submenu parents */  
    nav.find("li.submain").each(function(){
        if ($(this).find("ul.two").length > 0) {
            var idObject = $(this);
            var config = {
                over: function(){
                    idObject.find("ul.two").stop(true, true).show('slow');
                },
                timeout: 300, /* number = milliseconds delay before onMouseOut   */   
                out: function(){
                    idObject.find("ul.two").stop(true, true).slideUp('slow');
                }
            };
            $(this).hoverIntent(config)
        }
    });	

}
