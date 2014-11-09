sap.designstudio.sdk.PropertyPage.subclass("com.iprosis.sch.sGaugePropertyPage",  function() {


	var that = this;

	/*function toggleFields(precedent, dependent, precedentType) {
		
		var toShow = null;
		
		switch (precedentType){
		case "ddl":
			toShow = ($(precedent).val() == 1) ? false : true;
			break;			
		case "cbox":
			toShow = $(precedent).is(':checked');
			break;
		}
		
		if (toShow){
			$(dependent).show();
			
		} else {
			$(dependent).hide();
			$(dependent).val(0);
		}
		
	}*/
	
	this.init = function() {
		$("#form").submit(function() {
			
		
			that.firePropertiesChanged(["NoOfNeedles"]);			
			/*that.firePropertiesChanged(["HardCodedValue"]);
			that.firePropertiesChanged(["HardCodedValue2"]);*/
					
			
			return false;
		});
				
		/*$("#NoOfNeedles").change(function(){
			toggleFields("#NoOfNeedles", "#trHardCodedValue2", "ddl");
		});
		$("#chkHardCodedValue").change(function(){
			toggleFields("#chkHardCodedValue", "#HardCodedValue", "cbox");
		});
		$("#chkHardCodedValue2").change(function(){
			toggleFields("#chkHardCodedValue2", "#HardCodedValue2", "cbox");
		});*/
	
	/*$("#NoOfNeedles").mousedown(function(){
		toggleFields("#NoOfNeedles", "#trHardCodedValue2", "ddl");
	});
	$("#chkHardCodedValue").mousedown(function(){
		toggleFields("#chkHardCodedValue", "#HardCodedValue", "cbox");
	});
	$("#chkHardCodedValue2").mousedown(function(){
		toggleFields("#chkHardCodedValue2", "#HardCodedValue2", "cbox");
	});*/


	};


	/*this.UseHardCodedValue = function(value) {
		if (value === undefined) {			
			return $("#chkHardCodedValue").is(':checked');			
		} else {
			$("#chkHardCodedValue").val(value);			
			return this;
		}
	};
	this.HardCodedValue = function(value) {
		if (value === undefined) {			
			return $("#HardCodedValue").val();			
		} else {
			$("#HardCodedValue").val(value);			
			return this;
		}
	};*/
	this.NoOfNeedles = function(value) {
		if (value === undefined) {			
			return $("#NoOfNeedles").val();			
		} else {
			$("#NoOfNeedles").val(value);			
			return this;
		}
	};
});