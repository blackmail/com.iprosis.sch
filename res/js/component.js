sap.designstudio.sdk.Component.subclass("com.iprosis.sch.iGauge", function() {

	var that = this;
	var saveDataResultCell = null, minV = null, maxV = null, gValue = null, gaugeType = null;
	this._alive = false;

	function creatjGauge(chartType){
				
		if (chartType == "donut"){
			var angleValue = 0.35;
			var lineWidthValue = 0.15;
			var cOpts = setOpts(angleValue, lineWidthValue);
			return cOpts;
		} else {
			angleValue = 0.15;
			lineWidthValue = 0.44;
			cOpts = setOpts(angleValue, lineWidthValue);
			return cOpts;
		}
	}
		
	function setOpts(angleValue, lineWidthValue){	
		var gOpts = {
			  lines: 0.12,
			  angle: angleValue,
			  lineWidth: lineWidthValue,
			  fontSize: 0.14,
			  pointer: {
			    length: 0.9,
			    strokeWidth: 0.035,
			    color: '#000000'
			  },
			  limitMax: 'true',
			  colorStart: '#8FC0DA',
			  colorStop: '#6FADCF',
			  strokeColor: '#E0E0E0',
			  generateGradient: true
			};
		return gOpts;
	}	
		
	this.init = function() {					  
		this.$().click(function() {
			that.fireEvent("onclick");
		});
	};
	
	this.afterUpdate = function() {
		 
			var data = null;
			this.$().empty();										
			
			if (this._alive){ //29052014
				return; //29052014
			} else { //29052014
				if (saveDataResultCell){			
					if (sap && sap.zen && sap.zen.designmode){
						this.$().html('Data was selected, object will appear in running time.');
					}
					
					gValue = parseInt(saveDataResultCell.data);			
					gValueLocale = gValue.toLocaleString("he-IL");
					
					var currentDiv = this.$().attr("id"); //29052014
					
					switch(gaugeType){				
						case "Donut":																		
							this.$().html(
									'<div id="' + currentDiv + '">' + //29052014 
									'<canvas id="canvas-donut"></canvas>' +
									'<div id="donut-textfield">' + gValueLocale + '</div>'
							);
							var target = document.getElementById('canvas-donut');				
							var Opts = creatjGauge("donut");			
							var gauge = new Donut(target).setOptions(Opts);
							break;
						case "Gauge":
							this.$().html(
									'<div id="' + currentDiv + '">' + //29052014
									'<canvas id="canvas-gauge"></canvas>' +
									'<div id="gauge-textfield">' + gValueLocale + '</div>'
							);			
							var target = $('#canvas-gauge')[0];				
							var Opts = creatjGauge("gauge");				
							var gauge = new Gauge(target).setOptions(Opts);
							break;						
					}	
					gauge.minValue = minV;
					gauge.maxValue = maxV;				
					gauge.set(gValue);				
				} else {
					this.$().html('No Data was selected!<br>Please choose Data Source and ResultCell.');
				};
			 };
	};
	this.dataResultCell = function(value) {
		if (value === undefined) {
			return saveDataResultCell;
		} else {
			saveDataResultCell = value;
			return this;
		}
	};
		
	this.minValue = function(value) {
		if (value === undefined) {
			return minV;
		} else {
			minV = value;
			return this;
		}
	};

	this.maxValue = function(value) {
		if (value === undefined) {
			return maxV;
		} else {
			maxV = value;
			return this;
		}
	};		
						
	this.gType = function(value) {
		if (value === undefined) {
			return gaugeType;
		} else {
			gaugeType = value;
			return this;
		}						
	};
	
});

sap.designstudio.sdk.Component.subclass("com.iprosis.sch.dateOffset", function() {
	
	var that = this;
	var daysOff = null;	
	var fixedDateText = null;
	this._alive = false;
	
	function oDays(daysOff){
		var date = new Date();
		date.setDate(date.getDate() + daysOff);
		var cDate = date.getDate();
		var cMonth = date.getMonth() + 1;
		var cYear = date.getFullYear();
		var fDate = cDate + "/" + cMonth + "/" + cYear;
				
		return fDate;		
	}
	
	this.init = function() {					  
		this.$().click(function() {
			that.fireEvent("onclick");
		});
	};
		
	this.afterUpdate = function() {		
		if (this._alive) {
	    	return; 
	    } else {
	    	fixedDateText = oDays(daysOff);
	    	this.$().html('<div id="dateOff">' + fixedDateText + '</div>');	    	
			that.firePropertiesChanged(["fixedDate"]);	    	
	    	this._alive = true;
	    }
	};
	
	this.offDays = function(value) {
		if (value === undefined) {
			return daysOff = 0;
		} else {
			daysOff = value;
			return this;
		}						
	};
		
	this.fixedDate = function(value) {
		if (value === undefined) {			
			return fixedDateText;			
		} else {			
			return this;
		}
	};
	
});

sap.designstudio.sdk.Component.subclass("com.iprosis.sch.totemTicker", function() {

	var that = this, totem1 = null, totem2 = null, totem3 = null, totem4 = null, totem5 = null, totem6 = null, 
		totem7 = null, totem8 = null, totem9 = null, totem10 = null, jHeight = null, jWidth = null;
	
	this.afterUpdate = function() {
		var tTicker = '<ul id="vertical-ticker" style="height:100%;width:100%">' + '<meta charset="utf-8">';

		for (var i = 1; i < 11; i++){
			var textLine = eval("totem" + i);
			var lineElement = "#totemLine" + i; 
			if (textLine == ""){
				continue;
			}
			
			var liLine = '<li id="totemLine' + i + '">' + textLine + '</li>';
			tTicker = tTicker + liLine;						
		}
		
		tTicker = tTicker + '</ul>';
		this.$().append(tTicker);
						
		$('#vertical-ticker').totemticker({
			row_height	:	'26px',
			next		:	'#ticker-next',
			previous	:	'#ticker-previous',
			stop		:	'#stop',
			start		:	'#start',
			mousestop	:	true,
		});
					
		for (var i = 1;  i < 11; i++){		
			$("#totemLine" + i).click(createCallback(i));
		}
		
		function createCallback(i){
			return function(){
				that.fireEvent("onclick" + i);
			};
		}
	};
	
	this.link1 = function(value) {totem1 = value;return this;};
	this.link2 = function(value) {totem2 = value;return this;};
	this.link3 = function(value) {totem3 = value;return this;};
	this.link4 = function(value) {totem4 = value;return this;};
	this.link5 = function(value) {totem5 = value;return this;};
	this.link6 = function(value) {totem6 = value;return this;};
	this.link7 = function(value) {totem7 = value;return this;};
	this.link8 = function(value) {totem8 = value;return this;};
	this.link9 = function(value) {totem9 = value;return this;};
	this.link10 = function(value) {totem10 = value;return this;};		
});

sap.designstudio.sdk.Component.subclass("com.iprosis.sch.horizontalScroller", function() {  
	var that = this;  
    var hsValue = null, hsMin = null, hsMax = null, returnedValue = null;  
    this._alive = false;  
    this._sl = null;
    this._defaultSet = false;
    
    this.init = function() {  
	    if (this._alive) {  
	    	this._sl.placeAt(this.$());  
	    	return;  
	    } else {  
	    	var oSlider = new sap.ui.commons.Slider({  
	    		id : 'Slider',  
	    		tooltip: 'Slider',  
	    		width: '90%',  	    		  
	    		totalUnits: 5,  
	    		smallStepWidth: 5,  
	    		stepLabels : true,  
	    		change : function() {  
		        			returnedValue = oSlider.getValue();  
		        			that.firePropertiesChanged(["sdValue"]);  
		        			that.fireEvent("onChange");  
	        			}  
	    	});
	    	
	    	oSlider.placeAt(this.$());  
	    	this._sl = oSlider;
	    	this._alive = true;  	        
	    };
    };
    
    this.afterUpdate = function() {   	
    	if (!this._defaultSet) {  
    		this._sl.setValue(hsValue);  
    		this._defaultSet = true;  
    		
        	returnedValue = this._sl.getValue();
        	that.firePropertiesChanged(["sdValue"]);  
    		that.fireEvent("onChange");     		
    	}  
    	
    	this._sl.setMax(hsMax);
    	this._sl.setMin(hsMin);
    };
    
    this.sValue = function(value) {  
    	if (value === undefined) {  
    		return hsValue = 70;  
    	} else {  
    		hsValue = value;  
    		return this;  
    	}       
    };
    
    this.sMin = function(value) {  
    	if (value === undefined) {  
    		return hsMin = 0;  
    	} else {  
    		hsMin = value;  
    		return this;  
    	}       
    };
    
    this.sMax = function(value) {  
    	if (value === undefined) {  
    		return hsMax = 100;  
    	} else {  
    		hsMax = value;  
    		return this;  
    	}       
    };
    
    this.sdValue = function(value){        
		if(value===undefined) {    
			return returnedValue;   
		} else {    
			return this;   
		}   
    };   
});

sap.designstudio.sdk.Component.subclass("com.iprosis.sch.countUp", function() {  
	var that = this;
	var cStart = null, cEnd = null, cDuration = null, divName = null;
	var pngImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaQAAAAoCAIAAAA+Kxl1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1QkNCMTZBQTBBMjA2ODExODdDNEFENzFGNjVCRjYwNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMDUwRjMwQzhDNzgxMUUwQjYwMThEQUE5MzA2MTQ4NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMDUwRjMwQjhDNzgxMUUwQjYwMThEQUE5MzA2MTQ4NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA4ODAxMTc0MDcyMDY4MTFBNUQwQjE1OUUxRUYwQzM0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVCQ0IxNkFBMEEyMDY4MTE4N0M0QUQ3MUY2NUJGNjA2Ii8+IDwvcmRmOkRlc2NyaXB0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";
	this._alive = false;
	this._sl = null;
		
	this.init = function() {
		 if (this._alive) {   
			 return;  
		 } else {		
			divName = "CU" + this.$().attr('id');			
			this.$().html('<div id="' + divName + '"><input type="hidden" name="counter-value" value="100" /></div>');
			$("#"+divName).flipCounter(
					{
						number				: 0,						
						digitClass			: "counter-digit", // class of the counter digits
						counterFieldName	: "counter-value", // name of the hidden field
						digitHeight			: 40,
						digitWidth			: 30,
						//imagePath			: "img/flipCounter-medium.png"
						imagePath			: pngImage
					}				
				);
			this._alive = true;		
		}
	};
	
	this.afterUpdate = function() {
		
		var endValue = parseInt(cEnd.data);
		
		$("#"+divName).flipCounter(
				"startAnimation",
				{
					number				: cStart,
					end_number			: endValue,
					duration			: cDuration,            
					formatNumberOptions	:{format:"#,000",locale:"il"}					
				}
			);				
	};
	
	this.CStart = function(value) {  
		if (value === undefined) {  
			return cStart = 0;  
	    } else {  
	    	cStart = value;  
	    	return this;  
	    }       
	};
	
	this.CEnd = function(value) {  
		if (value === undefined) {  
			return cEnd;  
	    } else {  
	    	cEnd = value;  
	    	return this;  
	    }       
	};
	
	this.CDuration = function(value) {  
		if (value === undefined) {  
			return cDuration;  
	    } else {  
	    	cDuration = value;  
	    	return this;  
	    }
	};
});

sap.designstudio.sdk.Component.subclass("com.iprosis.sch.sGauge", function() {

	var that = this;
	var dataResultCell = null, dataResultCell1 = null, actualValue = null, actualValue1 = null, minValue = null, maxValue = null, currentDiv = null;  gaugeDiv = null; arcDiv = null, maxDiv = null, MinDiv = null, arcElement = null, lineWidth = null,
	lowColor = null, mediumColor = null, highColor = null, pointerColor = null, pointerColor1 = null, lowEndPerc = null, mediumEndPerc = null,
	backlash = null, showScaling = null, noOfNeedles = null;
	var nearZero = 0.00000001;
	this._alive = false;
	
	this.gaugeDiv = null;
	this.gaugeDiv1 = null;
	this.arcDiv = null;

	function createArc(startingPoints, aRadius, sPoint, ePoint, aColor){
//	function createArc(startingPoints, aRadius, sPoint, ePoint, aColor, bColor){// Eitan Rabinovich, Aug 14, 2014 - 11:17:53 AM

		var context = that.arcDiv.getContext('2d');
		context.beginPath();		
		context.arc(startingPoints, startingPoints, aRadius, sPoint, ePoint);
		context.lineWidth = lineWidth;
		
		// Eitan Rabinovich, Aug 14, 2014 - 11:01:55 AM
		/*var grd=context.createLinearGradient(0,0,170,0);
		grd.addColorStop(0,aColor);
		grd.addColorStop(1,bColor); 
		context.strokeStyle = grd;*/
		// Eitan Rabinovich, Aug 14, 2014 - 11:02:18 AM

		
		context.strokeStyle = aColor;
		context.stroke();
	}
	
	this.init = function() {					  
		this.$().click(function() {
			that.fireEvent("onclick");
		});
		
		if (this._alive){
			return;
		} else {
			currentDiv = this.$().attr('id');
			currentTable = currentDiv + "table";
			this.gaugeDiv = document.createElement("canvas");
			this.gaugeDiv1 = document.createElement("canvas");
			this.arcDiv = document.createElement("canvas");

			this.gaugeDiv.className = "sGauge";
			this.gaugeDiv1.className = "sGauge";
			this.arcDiv.className = "sGaugeArc";
				
			this.$().append($(this.gaugeDiv));
			this.$().append($(this.gaugeDiv1));
			this.$().append($(this.arcDiv));
		
			this._alive = true;
		}
	};
	
	this.afterUpdate = function() {
		
		var optsa = {
					  lines: 12,
					  angle: 0.0,
					  lineWidth: 0.0001,
					  pointer: {
					    length: 1,
					    strokeWidth: 0.035,
					    color: pointerColor
					  },
					  limitMax: 'false', 
					  strokeColor: '#E0E0E0'
					};

		var mainDiv = document.getElementById(currentDiv);

		var divW = this.$().width();
		var divH = this.$().height();
		
		if (divH > divW/2 || divH == divW/2) {
			divH = divW/2;
		} else {
			divW = divH * 2;
		}
		
		this.arcDiv.width = divW;
		this.arcDiv.height = divH - (divH/100) * 8;
		this.gaugeDiv.width = divW;
		this.gaugeDiv.height = divH;
		this.gaugeDiv1.width = divW;
		this.gaugeDiv1.height = divH;
		var startingPoints = divH;
		var sRadius = startingPoints-lineWidth/2;	

		var gauge = new Gauge(this.gaugeDiv).setOptions(optsa);
		gauge.minValue = 0;
		gauge.maxValue = maxValue;
		gauge.animationSpeed = 32;
		
		if (dataResultCell == null || dataResultCell == "" || dataResultCell.data[0] == null){
			actualValue = nearZero;
		} else {
			if (dataResultCell.data[0] > maxValue || dataResultCell.data[0] == maxValue){
				actualValue = maxValue;
			} else if (dataResultCell.data[0] < minValue || dataResultCell.data[0] == minValue){
				actualValue = nearZero;
			} else {
				actualValue = (dataResultCell.data[0]-minValue)/(maxValue-minValue)*maxValue;
			}
		}
		
		actualValue = 100;//
		gauge.set(actualValue);

	if (noOfNeedles > 1){
			var opts1 = {
					  lines: 12,
					  angle: 0.0,
					  lineWidth: 0.0001,
					  pointer: {
					    length: 1,
					    strokeWidth: 0.035,
					    color: pointerColor1
					  },
					  limitMax: 'false', 
					  strokeColor: '#E0E0E0'
					};
			
			var gauge1 = new Gauge(this.gaugeDiv1).setOptions(opts1);
			gauge1.minValue = 0;
			gauge1.maxValue = maxValue;
			gauge1.animationSpeed = 32;
			
			if (dataResultCell1 == null || dataResultCell1 == "" || dataResultCell1.data[0] == null){
				actualValue1 = nearZero;
			} else {
				if (dataResultCell1.data[0] > maxValue || dataResultCell1.data[0] == maxValue){
					actualValue1 = maxValue;
				} else if (dataResultCell1.data[0] < minValue || dataResultCell1.data[0] == minValue){
					actualValue1 = nearZero;
				} else {
					actualValue1 = (dataResultCell1.data[0]-minValue)/(maxValue-minValue)*maxValue;
				}
				
			}
			
			actualValue1 = 120;//
			gauge1.set(actualValue1);
	}
	
	if (showScaling){		
		this.valueTables = document.createElement("table");
		this.valueTables.setAttribute("id", currentTable);
		
		this.valueTables.width = divW;
		
		this.tdMaxValue = document.createElement("td");
		this.tdMinValue = document.createElement("td");
		this.textMax = document.createTextNode(maxValue);
		this.textMin = document.createTextNode(minValue);

		this.valueTables.appendChild(this.tdMinValue);
		this.valueTables.appendChild(this.tdMaxValue);
		this.tdMaxValue.appendChild(this.textMax);
		this.tdMinValue.appendChild(this.textMin);
		this.$().append($(this.valueTables));
		
		this.valueTables.className = "valueTables";
		this.tdMaxValue.className = "divMaxValue";
		this.tdMinValue.className = "divMinValue";
	}
	
		var lPerc = 1 + (1 - ((maxValue - lowEndPerc) * 1/(maxValue-minValue))) - backlash/100; 	
		var mPerc = 1 + (1 - ((maxValue - mediumEndPerc) * 1/(maxValue-minValue))) - backlash/100; 
		
		createArc(startingPoints, sRadius, Math.PI, lPerc*Math.PI, lowColor);
		createArc(startingPoints, sRadius, lPerc*Math.PI, mPerc*Math.PI, mediumColor);
		createArc(startingPoints, sRadius, mPerc*Math.PI, 0, highColor);	
		
		// Eitan Rabinovich, Aug 14, 2014 - 11:19:15 AM -{
		/*createArc(startingPoints, sRadius, Math.PI, lPerc*Math.PI, lowColor, mediumColor);
		createArc(startingPoints, sRadius, lPerc*Math.PI, mPerc*Math.PI, mediumColor, highColor);
		createArc(startingPoints, sRadius, mPerc*Math.PI, 0, highColor, highColor);*/
		// Eitan Rabinovich, Aug 14, 2014 - 11:19:18 AM }-
		
	};
	
	this.MinValue = function(value) {
		if (value === undefined) {
			return minValue;
		} else {
			minValue = value;
			return this;
		}
	};
	this.MaxValue = function(value) {
		if (value === undefined) {
			return maxValue;
		} else {
			maxValue = value;
			return this;
		}
	};
	this.DataResultCell = function(value) {
		if (value === undefined) {
			return dataResultCell;
		} else {
			dataResultCell = value;
			return this;
		}
	};
	this.DataResultCell1 = function(value) {
		if (value === undefined) {
			return dataResultCell1;
		} else {
			dataResultCell1 = value;
			return this;
		}
	};
	this.LineWidth = function(value) {
		if (value === undefined) {
			return lineWidth;
		} else {
			lineWidth = value;
			return this;
		}
	};
	this.LowColor = function(value) {
		if (value === undefined) {
			return lowColor;
		} else {
			lowColor = value;
			return this;
		}
	};	
	this.MediumColor = function(value) {
		if (value === undefined) {
			return mediumColor;
		} else {
			mediumColor = value;
			return this;
		}
	};
	this.HighColor = function(value) {
		if (value === undefined) {
			return highColor;
		} else {
			highColor = value;
			return this;
		}
	};
	this.ShowScaling = function(value) {
		if (value === undefined) {
			return showScaling;
		} else {
			showScaling = value;
			return this;
		}
	};
	this.NoOfNeedles = function(value) {
		if (value === undefined) {
			return noOfNeedles;
		} else {
			noOfNeedles = value;
			return this;
		}
	};
	this.PointerColor = function(value) {
		if (value === undefined) {
			return pointerColor;
		} else {
			pointerColor = value;
			return this;
		}
	};
	this.PointerColor1 = function(value) {
		if (value === undefined) {
			return pointerColor1;
		} else {
			pointerColor1 = value;
			return this;
		}
	};
	this.LowEndPerc = function(value) {
		if (value === undefined) {
			return lowEndPerc;
		} else {
			lowEndPerc = value;
			return this;
		}
	};
	this.MediumEndPerc = function(value) {
		if (value === undefined) {
			return mediumEndPerc;
		} else {
			mediumEndPerc = value;
			return this;
		}
	};	
	this.Backlash = function(value) {
		if (value === undefined) {
			return backlash;
		} else {
			backlash = value;
			return this;
		}
	};	
});	

sap.designstudio.sdk.Component.subclass("com.iprosis.sch.iKPI", function() {

	var that = this;
	var selectedValue1 = null, selectedValue2 = null, selectedValue3 = null, nBgCol = null, nFCol = null, pBgCol = null, 
	pFCol = null, value1FS = null, value2FS = null, value3FS = null;
	var currentDiv = null, currentTitle = null, currentPerc = null, currentValue= null, currentTitleDiv = null, currentPercDiv = null, currentValueDiv = null;
	this._alive = false;
	
	function pNDesign(bGColor, fColor){
		$("#" + currentDiv).css("background", bGColor);
		$("#" + currentTitle).css("color", fColor);
		$("#" + currentPerc).css("color", fColor);
		$("#" + currentValue).css("color", fColor);
		
		$("#" + currentPerc).css({"text-align":"center", "font-weight":"bold"}); 
		$("#" + currentTitle, "#" + currentValue).css("text-align", "center"); 
		$("#" + currentTitle).css("font-size", value1FS);
		$("#" + currentPerc).css("font-size", value2FS);
		$("#" + currentValue).css("font-size", value3FS);
	}
	
	this.init = function() {					  
		this.$().click(function() {
			that.fireEvent("onclick");
		});
		
		if (this._alive){
			return;
		} else {
			currentDiv = this.$().attr('id');
			currentTitle = currentDiv + "Title";
			currentPerc = currentDiv + "Perc";
			currentValue = currentDiv + "Value";
		
			this.$().html('<div id="' + currentDiv + '">' +
							'<div id="' + currentTitle + '">0</div>' +
							'<div id="' + currentPerc + '">0</div>' + 
							'<div id="' + currentValue + '">0</div>' +
						  '</div>');	
			this._alive = true;
		}
	};
	
	this.afterUpdate = function() {
		
		var actualPerc = selectedValue2.data[0];
		
		if (actualPerc > 0){			
			pNDesign(pBgCol, pFCol);
		} else {		
			pNDesign(nBgCol, nFCol);
		}
	
		document.getElementById(currentTitle).innerHTML = selectedValue1;
		document.getElementById(currentPerc).innerHTML = actualPerc;
		document.getElementById(currentValue).innerHTML = selectedValue3.data[0];
	};
	
	this.SelectedValue1 = function(value) {
		if (value === undefined) {
			return selectedValue1;
		} else {
			selectedValue1 = value;
			return this;
		}
	};
	
	this.SelectedValue2 = function(value) {
		if (value === undefined) {
			return selectedValue2;
		} else {
			selectedValue2 = value;
			return this;
		}
	};
	
	this.SelectedValue3 = function(value) {
		if (value === undefined) {
			return selectedValue3;
		} else {
			selectedValue3  = value;
			return this;
		}
	};
	
	this.NBgCol = function(value) {
		if (value === undefined) {
			return nBgCol;
		} else {
			nBgCol = value;
			return this;
		}
	};

	this.NFCol = function(value) {
		if (value === undefined) {
			return nFCol;
		} else {
			nFCol  = value;
			return this;
		}
	};
	
	this.PBgCol = function(value) {
		if (value === undefined) {
			return pBgCol;
		} else {
			pBgCol = value;
			return this;
		}
	};
		
	this.PFCol = function(value) {
		if (value === undefined) {
			return pFCol;
		} else {
			pFCol  = value;
			return this;
		}
	};
	
	this.Value1FS = function(value) {
		if (value === undefined) {
			return value1FS;
		} else {
			value1FS = value;
			return this;
		}
	};
	
	this.Value2FS = function(value) {
		if (value === undefined) {
			return value2FS;
		} else {
			value2FS = value;
			return this;
		}
	};
	
	this.Value3FS = function(value) {
		if (value === undefined) {
			return value3FS;
		} else {
			value3FS = value;
			return this;
		}
	};
});

sap.designstudio.sdk.Component.subclass("com.iprosis.sch.iDonut", function() {

	var that = this;
	var dataR = null; var meta_data = null;
	this.mDonut = null;
	
	this.init = function() {					  
		this.$().click(function() {
			that.fireEvent("onclick");
		});
		
		if (this._alive){
			return;
		} else {
			currentDiv = this.$().attr('id');
	
			/*this.$().html('<div id="' + currentDiv + '" style="width:100%;height:100%;margin:20px auto 0 auto;">' +
						  '</div>');
			*/
			this.mDonut = document.createElement("div");
			
			$(this.mDonut).css({
				width: '100%',
				height: '100%',
				margin: '20px auto 0 auto'
			});
						
			this.mDonut.setAttribute("id", currentDiv);
			this.$().append($(this.mDonut));
						
			this._alive = true;
		}
	};
	
	this.afterUpdate = function() {
		
		var arrayOfValues = [];
		var arrayOfLabels = [];
		
		var pp = new Array();
		
		if (meta_data != null){
			for (var i=0;i<meta_data.dimensions[0].members.length;i++){
				arrayOfLabels.push(meta_data.dimensions[0].members[i].text);
				arrayOfValues.push(dataR.data[i]);
				pp.push("value:" + dataR.data[i] + ", " + "label: " + meta_data.dimensions[0].members[i].text + "}");
				
				/*pp.push(new Array());
				pp[i].push("value:" + dataR.data[i]);
				pp[i].push("label:" + meta_data.dimensions[0].members[i].text);*/
			}
			var  tt = pp.split(",");
		} else {		
			Morris.Donut({
				element: currentDiv,
				  data: [
					{value: 70, label: 'foo'},
					{value: 15, label: 'bar'},
					{value: 10, label: 'baz'},
					{value: 5, label: 'A really really long label'}
				  ],
				  //data: pp,
				  formatter: function (x) { return x + "%"}
			});
		}
	};
	
	this.DataR = function(value) {
		if (value === undefined) {
			return dataR;
		} else {
			dataR = value;
			return this;
		}
	};
	this.metadata = function(value) {
		if (value === undefined) { 
			return meta_data; 
		} else { 
			meta_data = value; 
			return this; 
		}
	};
});