window.onload = function() {
	(function() {
	    var canvas = document.getElementById('canvas'),
	            context = canvas.getContext('2d');

	    // resize the canvas to fill browser window dynamically
	    window.addEventListener('resize', resizeCanvas, false);

	    function resizeCanvas() {
	            canvas.width = window.innerWidth;
	            canvas.height = window.innerHeight;
	            checkCurrentDisplay();
	            /**
	             * Your drawings need to be inside this function otherwise they will be reset when 
	             * you resize the browser window and the canvas goes will be cleared.
	             */

	            drawStuff(); 
	    }
	    resizeCanvas();

	    var cursor = { x: 400, y: 400 };
	    var colors = ["#aa0000", "#00aa00", "#0000aa", "#aaaa00", "#aa00aa", "#00aaaa"]

	    function drawPointer(x, y, color) {
	    	context.save();
		    context.beginPath();
	    	context.moveTo(x, y);
	    	context.lineTo(x, y + 19);
	    	context.lineTo(x + 4, y + 16);
	    	context.lineTo(x + 7, y + 23);
	    	context.lineTo(x + 10, y + 21);
	    	context.lineTo(x + 7, y + 15);
	    	context.lineTo(x + 13, y + 15);
	    	context.lineTo(x, y);
		    context.closePath();
	    	context.fillStyle = color;
			context.strokeStyle = "#ffffff";
		    context.stroke();
	    	context.fill();
	    	context.restore();
	    }

	    function verifyPosition(mouse) {
	    	if (mouse.x < 0)
	    		mouse.x = 0;
	    	else if (mouse.x > canvas.width) {
	    		mouse.x = canvas.width;
	    	}
	    	if (mouse.y < 0)
	    		mouse.y = 0;
	    	else if (mouse.y > canvas.height) {
	    		mouse.y = canvas.height;
	    	}
	    }

	    function drawInfo() {
	    	context.save();
	    	context.font = "15px Arial";
	    	if (!pointing.pointingIsAvailable) {
	    		var text = "pointingserver is not running. First run 'pointingserver start' in a terminal and refresh this page."
	    		context.fillText(text, 15, 27);
	    	} else {

		    	output.ready(function () {
			    	var text = "Display Device: " + output.bounds.size.width + " x " + output.bounds.size.height + " pixels, ";
			    	text += output.size.width.toFixed(2) + " x " + output.size.height.toFixed(2) + " mm, ";
			    	text += output.resolution.hppi.toFixed(2) + " x " + output.resolution.vppi.toFixed(2) + " PPI, ";
			    	text += output.refreshRate + " Hz";
			    	context.fillText(text, 15, 27);
		    	});
		    	var i;
		    	for (i = 0; i < mice.length; i++) {
		    		var input = mice[i].pointingDevice;
		    		context.fillStyle = colors[i];
		    		var y = 37 + 20*i;
					context.fillText(input.vendor + " - " + input.product, 65, y + 12);
		    		context.fillRect(15, y, 40, 15);
		    	}
		    	context.fillStyle = "#8A5E00"
		    	context.fillText("Press [Enter] to switch transfer functions", 15, 75 + 20 *i++);
		    	context.fillText("Press [Space] to reset pointers", 15, 75 + 20 *i++)
		    }
	    	context.restore();
	    }

	    function drawFuncs(name, uri, x, y) {
	    	context.save();
	    	context.font = "14px Arial";
			context.fillText(name, x, y + 38);
			context.fillStyle = "#008888";
			context.fillText(uri, x, y + 53);
	    	context.restore();
	    }

	    function drawStuff() {
    		context.clearRect(0, 0, canvas.width, canvas.height);
    		output.ready(function () {
    			context.strokeRect(200, 200, output.resolution.hppi*3.370, output.resolution.vppi*2.125);
    			context.font = "14px Arial";
    			context.fillText("The dimensions of this rectangle should be exactly the size of a credit card", 210, 300)
    		});
		    drawInfo();
		    for (var i = 0; i < mice.length; i++) {
		    	verifyPosition(mice[i]);
	    		drawPointer(mice[i].x, mice[i].y, colors[i]);
	    		var fInd = (funcIndex + i) % tFuncs.length;
	    		drawFuncs(tFuncs[fInd].name, tFuncs[fInd].uri, mice[i].x, mice[i].y);
		    }
		    requestAnimationFrame(drawStuff);
	    }

	    function onMouseMove(ev) {
	    	cursor.x = ev.pageX;
	    	cursor.y = ev.pageY;
	    }

	    function onKeyDown(ev) {
	    	if (ev.keyCode == 32) {
			    for (var i = 0; i < mice.length; i++) {
		    		mice[i].x = cursor.x;
		    		mice[i].y = cursor.y;
			    }
	    	}
	    	else if (ev.keyCode == 13) {
	    		funcIndex += mice.length;
			    for (var i = 0; i < mice.length; i++) {
	    			var fInd = (funcIndex + i) % tFuncs.length;
	    			var tFunc = new pointing.TransferFunction(tFuncs[fInd].uri, mice[i].pointingDevice, output);
	    			mice[i].pointingDevice.applyTransferFunction(tFunc);
			    }
	    	}
	    }

		document.addEventListener('mousemove', onMouseMove, false);
	    document.addEventListener("keydown", onKeyDown, false);
	})();
}


var dManager = new pointing.DisplayDeviceManager();
var displays = [];
dManager.addDeviceUpdateCallback(function(deviceDescriptor, wasAdded) {
	displays.forEach(function(display) {
		display.dispose();
	});
	displays = [];
	dManager.deviceList.forEach(function(desc) {
		var displayDevice = new pointing.DisplayDevice(desc.devURI);

		
		displayDevice.ready(function() {
			displays.push(displayDevice);
			checkCurrentDisplay();
		});
	});
});


function dist(a, b) {
	var dx = a.x - b.x;
	var dy = a.y - b.y;

	return Math.sqrt(dx*dx+dy*dy);
}

 
var output = new pointing.DisplayDevice("any:?");

// Will set "output" to the proper display (the one rendering the webpage) in case of multiple monitors
function checkCurrentDisplay() {
	var screenWidth = window.screen.width;
	var screenHeight = window.screen.height;

	var currentDisplay = null;

	// Find the display used to render this page by matching screenSize with displaySize
	displays.forEach(function(display) {
		var displayWidth = display.bounds.size.width;
		var displayHeight = display.bounds.size.height;

		if (displayWidth == screenWidth && displayHeight == screenHeight) {
			if (currentDisplay != null) {
				// Two displays have the same resolution, we distinguish them by using their positions, if supported
				if (typeof window.screen.availLeft !== 'undefined' && typeof window.screen.availTop !== 'undefined') {
					var currDisplayPos = currentDisplay.bounds.origin;
					var displayPos = display.bounds.origin;
					var screenPos = {x: window.screen.availLeft, y: window.screen.availTop};

					if (dist(displayPos, screenPos) < dist(currDisplayPos, screenPos)) {
						currentDisplay = display;
					}
				}
			} else {
				currentDisplay = display;
			}
		}
	});

	if (currentDisplay != null) {
		output = currentDisplay;
	}
}


var mice = [];
var manager = new pointing.PointingDeviceManager();

var tFuncs = [
{name: "OS X with default slider setting",
 uri: "osx:?setting=0.6875"}
,{name: "OS X with slider at maximum",
 uri: "osx:?setting=3.00"}
,{name: "OS X with slider at minimum",
 uri: "osx:?setting=0"}
,{name: "Windows with default slider",
 uri: "windows:7?slider=0"}
,{name: "Windows with slider at maximum",
 uri: "windows:7?slider=5"}
,{name: "Windows with slider at minimum",
 uri: "windows:7?slider=-5"}
,{name: "Linux default transfer function",
 uri: "xorg:?"}
,{name: "Resolution-aware constant function",
 uri: "constant:?gain=1"}
,{name: "Naive constant function with gain 5",
 uri: "naive:?gain=5"}
,{name: "No transfer function",
 uri: "naive:?gain=1"}
,{name: "Sigmoid transfer function",
 uri: "sigmoid:?"}
];

var funcIndex = 0;

manager.addDeviceUpdateCallback(function(deviceDescriptor, wasAdded) {
	if (wasAdded) {
		var pointingDevice = new pointing.PointingDevice(deviceDescriptor.devURI);
		var mouse = {x: 400 + 20 * mice.length, y: 400, pointingDevice: pointingDevice};
		mice.push(mouse);
		var fInd = (funcIndex + mice.length - 1) % tFuncs.length;
		var tFunc = new pointing.TransferFunction(tFuncs[fInd].uri, mouse.pointingDevice, output);
		mouse.pointingDevice.applyTransferFunction(tFunc);
		pointingDevice.setPointingCallback(function(timestamp, dx, dy, buttons) {
			mouse.x += dx;
			mouse.y += dy;
		});
	}
	else {
    	for (var i = 0; i < mice.length; i++) {
    		if (mice[i].pointingDevice.uri == deviceDescriptor.devURI) {
    			mice[i].pointingDevice.dispose();
    			mice.splice(i, 1);
    			break;
    		}
    	}
	}
});