sap.designstudio.sdk.PropertyPage.subclass("com.iprosis.sch.iGaugePropertyPage",  function() {

	var that = this;

	this.init = function() {
		$("#form").submit(function() {
			that.firePropertiesChanged(["gType"]);
			return false;
		});
	};

	this.gType = function(value) {
		if (value === undefined) {			
			return $("#gaugeType").val();			
		} else {
			$("#gaugeType").val(value);			
			return this;
		}
	};
});