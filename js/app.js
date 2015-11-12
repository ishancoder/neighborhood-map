var ViewModel = function(){
	this.imgAddress = ko.observable("");
	this.imgSrc = ko.computed(function(){
		return "https://maps.googleapis.com/maps/api/streetview?size=1024x768&location="+this.imgAddress()
	},this);
}

ko.applyBindings(new ViewModel());

