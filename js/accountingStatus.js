/*
 * File: dashboard.js
 * Created on 18th jan 2013 - Saikumar D
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
 
function getScaleValues4Grid (maxValue) {

	var scaleObject = new Object();
	scaleObject.step = 1;
	scaleObject.maxValue = 1;

	if (maxValue >= 0 && maxValue <=8) {

		scaleObject.maxValue = 8;
		scaleObject.step = 2;

	}else if (maxValue > 8 && maxValue <=20) {
		scaleObject.maxValue = 20;
		scaleObject.step = 5;
	}else if (maxValue > 20 && maxValue <=100) {
		scaleObject.maxValue = 100;
		scaleObject.step = 25;
	}else if (maxValue > 100 && maxValue <=1000) {
		scaleObject.maxValue = 1000;
		scaleObject.step = 250;
	}else if (maxValue > 1000 && maxValue <=10000) {
		scaleObject.maxValue = 10000;
		scaleObject.step = 2500;
	}else if (maxValue > 10000 && maxValue <=50000) {
		scaleObject.maxValue = 50000;
		scaleObject.step = 12500;
	}else if (maxValue > 50000 && maxValue <=100000) {
		scaleObject.maxValue = 100000;
		scaleObject.step = 25000;
	}else if (maxValue > 100000 && maxValue <=1000000) {
		scaleObject.maxValue = 1000000;
		scaleObject.step = 250000;
	}else if (maxValue > 1000000 && maxValue <=10000000) {
		scaleObject.maxValue = 10000000;
		scaleObject.step = 1000000;
	}else if (maxValue > 100000000) {
		scaleObject.maxValue = 1000000000;
		scaleObject.step = 100000000;
	}
	
	return scaleObject;

}

/* Global values to display in html page */

htmlArrayDisplay = new Array();
htmlArrayDisplay[0] = {label:"HTTP",val:"",units:""}
htmlArrayDisplay[1] = {label:"HTTPS",val:"",units:""}
htmlArrayDisplay[2] = {label:"DNS",val:"",units:""}
htmlArrayDisplay[3] = {label:"FTP",val:"",units:""}
htmlArrayDisplay[4] = {label:"OTHER",val:"",units:""}

checkList = "1000,1000000,1000000000,1000000000000,1000000000000000,1000000000000000000";
checkListArr = checkList.split(",");
checkListUnit = "MB,GB,TB,PB,EB,ZB";
checkListUnitArr = checkListUnit.split(",");

function getAccountLabels (downLoadVal) {
	var downLoadObject = {val:downLoadVal,units:"KB"};
	var cVal;
	
	for (v = 0 ; v <= checkListArr.length; v++) {
			cVal = downLoadVal/parseInt(checkListArr[v],10);			
			if ( cVal < 1) {		
				break;
			}			
	downLoadObject = {val:(downLoadVal/parseInt(checkListArr[v],10)).toFixed(2),units: checkListUnitArr[v]}; 		
	}	 
	return downLoadObject;
}

 /* 
 * Bar charts  
 *	For Lines with dotted  display 	
 */
 
  if (window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype.lineTo){
			CanvasRenderingContext2D.prototype.dashedLine = function(x, y, x2, y2, da) {
        if (!da) da = [10,5];
        this.save();
        var dx = (x2-x), dy = (y2-y);
        var len = Math.sqrt(dx*dx + dy*dy);
        var rot = Math.atan2(dy, dx);
        this.translate(x, y);
        this.moveTo(0, 0);
        this.rotate(rot);       
        var dc = da.length;
        var di = 0, draw = true;
        x = 0;
        while (len > x) {
            x += da[di++ % dc];
            if (x > len) x = len;
            draw ? this.lineTo(x, 0): this.moveTo(x, 0);
            draw = !draw;
        }       
        this.restore();
   	 }
    
	}
            /*
             * Vertical BarChart constructor
             */
            function BarChart(config){
                // user defined properties
                
                
                this.canvas = document.getElementById(config.canvasId);
                var el = document.createElement('canvas');

                this.data = config.data;
                this.color = config.color;
                this.barWidth = config.barWidth;
                this.gridLineIncrement = config.gridLineIncrement;
				this.bottomColor = config.bottomColor;
                /*
                 * adjust max value to highest possible value divisible
                 * by the grid line increment value and less than
                 * the requested max value
                 */
                this.maxValue = config.maxValue - Math.floor(config.maxValue % this.gridLineIncrement);
                this.minValue = config.minValue;
                
                // constants
                this.font = "11px Trebuchet MS";
                this.axisColor = "#d8d8d8";
                this.gridColor = "#d8d8d8";
				this.textAlign = "center";   
                this.padding = 10;
                
                // relationships
                this.context = this.canvas.getContext("2d");
                this.range = this.maxValue - this.minValue;
                this.numGridLines =  Math.round(this.range / this.gridLineIncrement);  
				this.longestValueWidth = this.getLongestValueWidth();
                this.x = this.padding + this.longestValueWidth + 10 ;
                this.y = this.padding * 2;
                this.width = this.canvas.width - (this.longestValueWidth + this.padding * 2);
                this.height = this.canvas.height - (this.getLabelAreaHeight() + this.padding * 4);
                
                // draw bar chart
                this.drawGridlines();
                this.drawYAxis();
                this.drawXAxis();
                this.drawBars();
                this.drawYVAlues();
                this.drawXLabels();
                
                this.graphAreaHeight = this.height;
                
                if (config.lefttext != ''){
                	this.context.fillStyle = "#333";
					this.context.font = "11px Trebuchet MS"
					this.context.textAlign = "center";    
				    this.context.fillText(config.lefttext,22,this.canvas.height-25);
                }
            }
            
            /*
             * gets the label height by finding the max label width and
             * using trig to figure out the projected height since
             * the text will be rotated by 45 degrees
             */
            BarChart.prototype.getLabelAreaHeight = function(){
                this.context.font = this.font;
                var maxLabelWidth = 0;
                /*
                 * loop through all labels and determine which
                 * label is the longest.  Use this informatoin
                 * to determine the label width
                 */
                for (var n = 0; n < this.data.length; n++) {
                    var label = this.data[n].label;
                    maxLabelWidth = Math.max(maxLabelWidth, this.context.measureText(label).width);
                }
                
                /*
                 * return y component of the labelWidth which
                 * is at a 45 degree angle:
                 *
                 * a^2 + b^2 = c^2
                 * a = b
                 * c = labelWidth
                 * a = height component of right triangle
                 * solve for a
                 */
                return Math.round(maxLabelWidth / Math.sqrt(2));
            };
            
            BarChart.prototype.getLongestValueWidth = function(){
                this.context.font = this.font;
                var longestValueWidth = 0;
                for (var n = 0; n <= this.numGridLines; n++) {
                    var value = this.maxValue - (n * this.gridLineIncrement);
                    longestValueWidth = Math.max(longestValueWidth, this.context.measureText(value).width);
                }
                return longestValueWidth;
            };
			
            BarChart.prototype.drawXLabels = function(){
                var context = this.context;
                context.save();
                var data = this.data;
                var barSpacing = this.width / data.length ;
                
                for (var n = 0; n < data.length; n++) {
                    var label = data[n].label;
                    context.save();
                    context.translate(this.x + ((n + 1 / 2) * barSpacing), this.y + this.height + 10);
                    //context.rotate(-1 * Math.PI / 4); // rotate 45 degrees
                    context.font = this.font;
                    context.fillStyle = this.bottomColor;
                    context.textAlign = "center";
                    context.textBaseline = "middle";
                    context.fillText(label, 0, 2);
                    context.restore();
                }
                context.restore();
            };
            
            BarChart.prototype.drawYVAlues = function(){
                var context = this.context;
                context.save();
                context.font = this.font;
                context.fillStyle = "#666666";
                context.textAlign = "right";
                context.textBaseline = "middle";
                
                for (var n = 0; n <= this.numGridLines; n++) {
                    var value = this.maxValue - (n * this.gridLineIncrement);
                    var thisY = (n * this.height / this.numGridLines) + this.y;
                    context.fillText(value, this.x -7, thisY);
                }
                context.restore();
            };
            
            BarChart.prototype.drawBars = function(){
                var context = this.context;
                context.save();
                var data = this.data;
                var barSpacing = this.width / data.length;
                var unitHeight = this.height / this.range;
                
                for (var n = 0; n < data.length; n++) {
                    var bar = data[n];
                    var barHeight = (data[n].value - this.minValue) * unitHeight;
                  
                     // Create fill gradient
					var gradient = context.createLinearGradient(0, 0, 0, barHeight);
					gradient.addColorStop(0, "#ffc821");
					gradient.addColorStop(1, "#faf100");
                    
                    /*
                     * if bar height is less than zero, this means that its
                     * value is less than the min value.  Since we don't want to draw
                     * bars below the x-axis, only draw bars whose height is greater
                     * than zero
                     */
                    if (barHeight > 0) {
                        context.save();
                        context.translate(Math.round(this.x + ((n + 1 / 2) * barSpacing)), Math.round(this.y + this.height));
                        /*
                         * for convenience, we can draw the bars upsidedown
                         * starting at the x-axis and then flip
                         * them back into the correct orientation using
                         * scale(1, -1).  This is a great example of how
                         * transformations can help reduce computations
                         */
                        context.scale(1, -1);
                        
                        context.beginPath();
                        context.rect(-this.barWidth / 2, 0, this.barWidth, barHeight);
                        context.fillStyle = data[n].background;
                        context.fill();
                        context.restore();

                        context.lineWidth = 2;						
						context.strokeStyle = "#FFFFFF";
						context.stroke();
						context.restore();

						context.lineWidth = 1;					
						context.strokeStyle = data[n].borderouter;
						context.stroke();
						
						context.restore();

						if (data[n].toplabel != ''){
						
							context.fillStyle = "#4485bb";
						    context.font = this.font;
						    context.textAlign = "center";
                            var xPos = (n * this.width / this.data.length) + this.x;
						    //context.fillText(data[n].toplabel, xPos+30,this.height - barHeight + 10);
					   }
                        context.restore();
                    }
                }
                context.restore();
            };
            
            BarChart.prototype.drawGridlines = function(){
                var context = this.context;
                context.save();
                context.strokeStyle = this.gridColor;
                context.lineWidth = 1;

                // draw y axis grid lines
                for (var n = 0; n < this.numGridLines; n++) {
                    var y = (n * this.height / this.numGridLines) + this.y;
                    context.beginPath();                   
                    //context.moveTo(this.x, y);
                   // context.lineTo(this.x + this.width, y);
                    
                    context.dashedLine(this.x, y,this.x + this.width, y,[2,1]);
                   	 context.stroke();
                }
                
                 // draw x axis grid lines
                for (var n = 0; n <= this.data.length; n++) {
                    var x = (n * this.width / this.data.length) + this.x;
                    context.beginPath();                   
                    //context.moveTo(x, this.y);
                    //context.lineTo(x, this.y+this.height);
                    
                    context.dashedLine(x, this.y, x,this.y+this.height,[2,1]);
                    context.stroke();
                }
                context.restore();
            };
            
            BarChart.prototype.drawXAxis = function(){
                var context = this.context;
                context.save();
                context.beginPath();
                //context.moveTo(this.x, this.y + this.height);
                //context.lineTo(this.x + this.width, this.y + this.height);
                
                context.dashedLine(this.x, this.y + this.height,this.x + this.width, this.y + this.height,[2,1]);
				
                context.strokeStyle = this.gridColor;
                context.lineWidth = 2;
                context.stroke();
                context.restore();
            };
            
            BarChart.prototype.drawYAxis = function(){
                var context = this.context;
                context.save();
                context.beginPath();
              	//context.moveTo(this.x, this.y);
              	//context.lineTo(this.x, this.height + this.y);
                       
              	context.dashedLine(this.x, this.y, this.x, this.height + this.y, [2,1]);
                context.strokeStyle = this.gridColor;
                context.lineWidth = 2;
                context.stroke();
                context.restore();
            };
            
   
		    function getVerticalBarData(){		     
		    	
				var selAccountStatusValue = selAccountStatusTypeObj.options[selAccountStatusTypeObj.selectedIndex].value;                     
				
				
				 
				
				if ( onloadDataFlag == false ) {				
					
					
					$.ajax({ 
                        type: 'POST', url: 'platform.cgi?page=accountingStatus.html', data: { 'accountName': selAccountStatusValue,'button.accountChart.accountingStatus':'chart','thispage':'accountingStatus.html'}, dataType: 'json',
						success: function (data1) {
							
							data = data1;
							loadGraph();
					   }
					});				
				} else {
					onloadDataFlag = false;
					loadGraph();					
				}
		    }
			
	function loadGraph() {
		
		var valuesArray = new Array();
                        var graphMeasure = 'in KB';
					   	var res ='';
					   	res ='[';
				    	for(i=0; i<data.data.length;i++){
				    		res = res +"{";
				    		lableObj = '"label":"' + data.data[i].label + '",';
				    		valueObj = '"value":"' + parseInt(data.data[i].value,10) + '",';
							valuesArray[valuesArray.length] = data.data[i].value;
				    		backgroundObj = '"background":"' + data.data[i].background + '",';
							borderouterObj = '"borderouter":"' + data.data[i].borderouter + '",';
							borderinnerObj  = '"borderinner":"' + data.data[i].borderinner + '",';						
							toplabelObj = '"toplabel":"' + parseInt(data.data[i].toplabel,10) + '"';					 
				    		res = res + lableObj + valueObj + backgroundObj + borderouterObj + borderinnerObj  + toplabelObj +"},";
				    		totalCount = parseInt(totalCount)+ parseInt(data.data[i].value);
				    	}
				    	
						var maxValue = Math.max.apply(Math,valuesArray);
						/* Adding additional bigger values from MB to ZB*/
                        if(maxValue > 1000 && maxValue <= 1000000 ){
                          var graphMeasure = 'in MB';
                            res ='[';
                        for(i=0; i<data.data.length;i++){
                            res = res +"{";
                            lableObj = '"label":"' + data.data[i].label + '",';
                            valueObj = '"value":"' + (parseInt(data.data[i].value,10))/1000 + '",';
                            valuesArray[valuesArray.length] = data.data[i].value;
                            backgroundObj = '"background":"' + data.data[i].background + '",';
                            borderouterObj = '"borderouter":"' + data.data[i].borderouter + '",';
                            borderinnerObj  = '"borderinner":"' + data.data[i].borderinner + '",';                      
                            toplabelObj = '"toplabel":"' + (parseFloat(data.data[i].toplabel,10)/1000) + '"';
                            res = res + lableObj + valueObj + backgroundObj + borderouterObj + borderinnerObj  + toplabelObj +"},";
                            totalCount = parseInt(totalCount)+ parseInt(data.data[i].value);
                        }                        
                        var maxValue = (Math.max.apply(Math,valuesArray))/1000;
                        }else if(maxValue > 1000000 && maxValue <= 1000000000){
                            graphMeasure = 'in GB';
                                 res ='[';
                        for(i=0; i<data.data.length;i++){
                            res = res +"{";
                            lableObj = '"label":"' + data.data[i].label + '",';
                            valueObj = '"value":"' + (parseInt(data.data[i].value,10))/1000000 + '",';                      
                            valuesArray[valuesArray.length] = data.data[i].value;
                            backgroundObj = '"background":"' + data.data[i].background + '",';
                            borderouterObj = '"borderouter":"' + data.data[i].borderouter + '",';
                            borderinnerObj  = '"borderinner":"' + data.data[i].borderinner + '",';                      
                            toplabelObj = '"toplabel":"' + (parseFloat(data.data[i].toplabel,10)/1000000) + '"';                                           
                            res = res + lableObj + valueObj + backgroundObj + borderouterObj + borderinnerObj  + toplabelObj +"},";
                            totalCount = parseInt(totalCount)+ parseInt(data.data[i].value);
                        }                        
                        var maxValue = (Math.max.apply(Math,valuesArray))/1000000;
                        }else if(maxValue > 1000000000 && maxValue <= 1000000000000){
                              graphMeasure = 'in TB';
                                 res ='[';
                        for(i=0; i<data.data.length;i++){
                            res = res +"{";
                            lableObj = '"label":"' + data.data[i].label + '",';
                            valueObj = '"value":"' + (parseInt(data.data[i].value,10))/1000000000 + '",';                      
                            valuesArray[valuesArray.length] = data.data[i].value;
                            backgroundObj = '"background":"' + data.data[i].background + '",';
                            borderouterObj = '"borderouter":"' + data.data[i].borderouter + '",';
                            borderinnerObj  = '"borderinner":"' + data.data[i].borderinner + '",';                      
                            toplabelObj = '"toplabel":"' + (parseFloat(data.data[i].toplabel,10)/1000000000) + '"';                                           
                            res = res + lableObj + valueObj + backgroundObj + borderouterObj + borderinnerObj  + toplabelObj +"},";
                            totalCount = parseInt(totalCount)+ parseInt(data.data[i].value);
                        }                        
                        var maxValue = (Math.max.apply(Math,valuesArray))/1000000000;
                        }else if(maxValue > 1000000000000 && maxValue <= 1000000000000000){
                              graphMeasure = 'in PB';
                                 res ='[';
                        for(i=0; i<data.data.length;i++){
                            res = res +"{";
                            lableObj = '"label":"' + data.data[i].label + '",';
                            valueObj = '"value":"' + (parseInt(data.data[i].value,10))/1000000000000 + '",';                      
                            valuesArray[valuesArray.length] = data.data[i].value;
                            backgroundObj = '"background":"' + data.data[i].background + '",';
                            borderouterObj = '"borderouter":"' + data.data[i].borderouter + '",';
                            borderinnerObj  = '"borderinner":"' + data.data[i].borderinner + '",';                      
                            toplabelObj = '"toplabel":"' + (parseFloat(data.data[i].toplabel,10)/1000000000000) + '"';                                           
                            res = res + lableObj + valueObj + backgroundObj + borderouterObj + borderinnerObj  + toplabelObj +"},";
                            totalCount = parseInt(totalCount)+ parseInt(data.data[i].value);
                        }                        
                        var maxValue = (Math.max.apply(Math,valuesArray))/1000000000000;
                        }else if(maxValue > 1000000000000000 && maxValue <= 1000000000000000000){ 
                              graphMeasure = 'in EB';
                                 res ='[';
                        for(i=0; i<data.data.length;i++){
                            res = res +"{";
                            lableObj = '"label":"' + data.data[i].label + '",';
                            valueObj = '"value":"' + (parseInt(data.data[i].value,10))/1000000000000000 + '",';                      
                            valuesArray[valuesArray.length] = data.data[i].value;
                            backgroundObj = '"background":"' + data.data[i].background + '",';
                            borderouterObj = '"borderouter":"' + data.data[i].borderouter + '",';
                            borderinnerObj  = '"borderinner":"' + data.data[i].borderinner + '",';                      
                            toplabelObj = '"toplabel":"' + (parseFloat(data.data[i].toplabel,10)/1000000000000000) + '"';                                           
                            res = res + lableObj + valueObj + backgroundObj + borderouterObj + borderinnerObj  + toplabelObj +"},";
                            totalCount = parseInt(totalCount)+ parseInt(data.data[i].value);
                        }                        
                        var maxValue = (Math.max.apply(Math,valuesArray))/1000000000000000;
                        } else if(maxValue > 1000000000000000000){
                              graphMeasure = 'in ZB';
                                 res ='[';
                        for(i=0; i<data.data.length;i++){
                            res = res +"{";
                            lableObj = '"label":"' + data.data[i].label + '",';
                            valueObj = '"value":"' + (parseInt(data.data[i].value,10))/1000000000000000000 + '",';                      
                            valuesArray[valuesArray.length] = data.data[i].value;
                            backgroundObj = '"background":"' + data.data[i].background + '",';
                            borderouterObj = '"borderouter":"' + data.data[i].borderouter + '",';
                            borderinnerObj  = '"borderinner":"' + data.data[i].borderinner + '",';                      
                            toplabelObj = '"toplabel":"' + (parseFloat(data.data[i].toplabel,10)/1000000000000000000) + '"';                                           
                            res = res + lableObj + valueObj + backgroundObj + borderouterObj + borderinnerObj  + toplabelObj +"},";
                            totalCount = parseInt(totalCount)+ parseInt(data.data[i].value);
                        }                        
                        var maxValue = (Math.max.apply(Math,valuesArray))/1000000000000000000;
                        }    	

				    	var minValue = 0;
							
				    	finalData=res.substring(0, res.length - 1);
				    	finalData = finalData + ']';

				    	var finalData1=jQuery.parseJSON(finalData);								
							
				     
						
						var retLabel;
				    	/* Set the global value */
						for(i=0; i<data.data.length;i++){
							
							if (i == 0 ) {
								htmlArrayDisplay[i].label = "HTTP";
							} else if (i == 1 ) {								
								htmlArrayDisplay[i].label = "HTTPS";							
							} else if (i == 2 ) {
								htmlArrayDisplay[i].label = "DNS";
							} else if (i == 3 ) {
								htmlArrayDisplay[i].label = "FTP";
							} else if (i == 4 ) {
								htmlArrayDisplay[i].label = "OTHER";
							}
							
							retLabel = getAccountLabels(parseInt(data.data[i].value,10));
							htmlArrayDisplay[i].val = retLabel.val;
							htmlArrayDisplay[i].units = retLabel.units;
						}
						 
						/* make the html complate */
						
						$("#tf1_http span").html(htmlArrayDisplay[0].val);
						$("#tf1_http strong").html("["+htmlArrayDisplay[0].units+"]");
						
						$("#tf1_https span").html(htmlArrayDisplay[1].val);
						$("#tf1_https strong").html("["+htmlArrayDisplay[1].units+"]");
						
						$("#tf1_dns span").html(htmlArrayDisplay[2].val);
						$("#tf1_dns strong").html("["+htmlArrayDisplay[2].units+"]");
						
						$("#tf1_ftp span").html(htmlArrayDisplay[3].val);
						$("#tf1_ftp strong").html("["+htmlArrayDisplay[3].units+"]");
						
						$("#tf1_other span").html(htmlArrayDisplay[4].val);
						$("#tf1_other strong").html("["+htmlArrayDisplay[4].units+"]");
						 
						 

							var scaleObject = getScaleValues4Grid(maxValue);
							maxValue = scaleObject.maxValue;
							step = scaleObject.step;

							$("#tf1_loadingaccountStatusDiv").hide();
							$("#tf1_accountStatusSec").show();
							 
							
              var bwCtx = document.getElementById('accountStatusChart').getContext('2d');
              bwCtx.clearRect(0,0,250,200);
							var graph2 = new BarChart({
								canvasId : "accountStatusChart",
								data : finalData1,
								color : "blue",
								barWidth : 20,
								minValue : 0,
								maxValue : maxValue,
								gridLineIncrement : step,
								lefttext : graphMeasure,
								bottomColor : '#6a6a6a'
							});
							$("#accountStatusUsageTotalCount").html("Total accountStatus Usage: "+totalCount); 
						 
	}
