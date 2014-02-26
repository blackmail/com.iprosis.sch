sap.designstudio.sdk.Component.subclass("com.iprosis.sch.iGauge", function() {

	var that = this;
	var saveDataResultCell = null, minV = null, maxV = null, gValue = null, gaugeType = null;

	function creatjGauge(chartType){
				
		if ( chartType == "donut" ){
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
								
			if ( saveDataResultCell ){			
				if ( sap && sap.zen && sap.zen.designmode){
					this.$().html('Data was selected, object will appear in running time.');
				}
				
				gValue = parseInt(saveDataResultCell.data);			
				gValueLocale = gValue.toLocaleString("he-IL");
								
				switch(gaugeType){				
					case 1:																		
						this.$().html(					
								'<canvas id="canvas-donut"></canvas>' +
								'<div id="donut-textfield">' + gValueLocale + '</div>'
						);
						var target = document.getElementById('canvas-donut');				
						var Opts = creatjGauge("donut");			
						var gauge = new Donut(target).setOptions(Opts);
						break;
					case 2:
						this.$().html(
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
			return minV = 0;
		} else {
			minV = value;
			return this;
		}
	};

	this.maxValue = function(value) {
		if (value === undefined) {
			return maxV = 100;
		} else {
			maxV = value;
			return this;
		}
	};		
						
	this.gType = function(value) {
		if (value === undefined) {
			return gaugeType = 1;
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
		var qq = cDate + "/" + cMonth + "/" + cYear;
				
		return qq;		
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