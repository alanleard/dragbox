var args = arguments[0] || {};

if(args.size){
	$.container.applyProperties(args.size);
}

$.centerPoint.applyProperties({
	data_type:args.data_type,
	text: args.title || "Crop & OCR",
	transform:Ti.UI.create2DMatrix().rotate(90)
});

var parent = args.parent;
parent.add($.container);
var width = parent.size.width;
var height = parent.size.height;
var crop = {};
setCrop();

function moveTopRight(evt){
	var point = evt.source.convertPointToView({x:evt.x, y:evt.y},parent);
	$.container.setTop(parseInt(height - (height-point.y)));
	$.container.setRight(parseInt(width-point.x));
	setCrop();
}

function moveTopLeft(evt){
	var point = evt.source.convertPointToView({x:evt.x, y:evt.y},parent);
	$.container.setTop(parseInt(height - (height-point.y)));
	$.container.setLeft(parseInt(point.x));
	setCrop();
}

function moveBottomRight(evt){
	var point = evt.source.convertPointToView({x:evt.x, y:evt.y},parent);
	$.container.setBottom(parseInt(height - (point.y)));
	$.container.setRight(parseInt(width-point.x));
	setCrop();
}

function moveBottomLeft(evt){
	var point = evt.source.convertPointToView({x:evt.x, y:evt.y},parent);
	$.container.applyProperties({
		bottom:((parseInt(height - (point.y)))),
		left:((parseInt(point.x)))
	});
	setCrop();
}

function moveBottom(evt){
	var point = evt.source.convertPointToView({x:evt.x, y:evt.y},parent);
	$.container.setBottom(parseInt(height - (point.y)));
	setCrop();
}

function moveBox(evt){
	var point = evt.source.convertPointToView({x:evt.x, y:evt.y},parent);
	
	$.container.applyProperties({
		left:null,
		top:null,
		right:null,
		bottom:null,
		width:$.container.size.width,
		height:$.container.size.height,
		center:point
	});
	
}

function setCrop(){
	var point = $.box.convertPointToView({x:0, y:0},parent);
	
	var multiplier = Ti.Platform.displayCaps.density=="high"?2:1;
	if(point && point.x){
		crop = {
			x:(point.x*multiplier),
			y:(point.y*multiplier),
			height:($.box.size.height*multiplier),
			width:($.box.size.width*multiplier)
		};
	}
	
}

function setActive(_event){
	_event.source.backgroundColor = Alloy.CFG.colors.green2;
}

function setInactive(_event){
	_event.source.backgroundColor = Alloy.CFG.colors.green1;
}

$.getCrop = function(){
	return crop;
};
