/*
 * Code-samples JavaScript
 */

var ttsInput, txtPhone, textMsgNum, textMsg, txtFilename, txtContents, txtRead, txtDelete;

function init() {

	// Create Expandable regions
	x$(".group").addClass("closed");
	x$(".group .title").on("click", function() {
		var el = x$(this.parentNode);
		if (el.hasClass("closed"))
			el.removeClass("closed");
		else
			el.addClass("closed");
	});
	
	// BUTTON AND INPUT WIDGETS
	
	var phoneBtn = new gm.widgets.Button({
		callBack: startRecognition,
		label:"Record",
        parentElement: document.getElementById('speech-start')
	});
	phoneBtn.render(); 
	
	var saveBtn = new gm.widgets.Button({
		callBack: saveText,
		label:"Save",
        parentElement: document.getElementById('speech-save')
	});
	saveBtn.render(); 
    
}


var saveText = function() {

	$.post("http://127.0.0.1:9000/create_note", { 'text': $('#speech-page-content').val() } );

};

var pause = function(e) {
	gm.media.pause(audioHandle);
};

var stop = function() {
	gm.media.stop(audioHandle);
};

var seek = function() {
	gm.media.seek(audioHandle, 30000);
};

var startTTS = function(args) {
	gm.voice.startTTS(function(){}, function(){}, ttsInput.getValue());
};

var callPhone = function(args) {
	gm.phone.dialPhoneNumber(function(){}, function(){}, { 
		phone: txtPhone.getValue(),  
		callParameters: { 
			"noiseSuppression": "Standard", 
			"phoneSource": "OnStar", 
			"deviceHandle": 123455
		} 
	});
};

var getRadio = function(args) {
	gm.info.getRadioInfo(function(data) {
		x$("#radio-output").inner(JSON.stringify(data));
	});
};

var getPosition = function() {
	gm.info.getCurrentPosition(function(pos){
		console.log('success');
		x$("#gps-output").html(pos.coords.latitude + "'" + pos.coords.longitude + "\"");
	}, function(args) {
		console.log('fail');
		x$("#gps-output").html("no gps data - load a route");
	}, {});
};

var watchPosition = function() {
	gm.info.watchPosition(function(pos){
		console.log('success');
		x$("#watch-gps-output").html(pos.coords.latitude + "'" + pos.coords.longitude + "\"");
	}, function(args) {
		console.log('fail');
		x$("#watch-gps-output").html("no gps data - load a route");
	}, {});
};

var sendText = function(args) {
	gm.phone.sendTextMessage(
			function(){console.log('text success');}, 
			function(){console.log('text error');}, 
			{ 
				phone : textMsgNum.getValue(),
				message : textMsg.getValue()
			});
};

var writeFile = function(args) {
	var result = gm.io.writeFile(txtFilename.getValue(), txtContents.getValue());
	if (result == 11) {
		console.log('Successfully wrote to file');
	}
	else {
		console.log('Failed to write to file');
	}
};

var readFile = function(args) {
	var result = gm.io.readFile(txtRead.getValue());
	if(typeof result === 'number') {
		console.log('Failed to read file');
	} else {
		alert('File contents: ' + result);
	}

};

var deleteFile = function(args) {
	var result = gm.io.deleteFile(txtDelete.getValue());
	if (result == 11) {
		console.log('Successfully deleted file');
	}
	else {
		console.log('Failed to delete file');
	}
};

var watchProx = function() {
	gm.info.watchProximity(function(isOn) {
		x$("#prox-output").inner(isOn == true ? 
				"Proximity triggered (user's hand is near)" :
				"Proximity off (user's hand not detected)"
		);
	});
};

var playVid = function() {
	gm.media.play("http://static.clipcanvas.com/sample/clipcanvas_14348_H264_640x360.mp4", "video");
};

var watchSpeed = function() {
	gm.system.watchSpeed(function(spd) {
		switch (spd) {
			case 0:
				x$("#watch-speed-output").inner("PARK"); break;
			case 1:
				x$("#watch-speed-output").inner("LOWSPEED"); break;
			case 2: 
				x$("#watch-speed-output").inner("HIGHSPEED"); break;
		}
	});
};

var getConfig = function() {
	gm.info.getVehicleConfiguration(function(args) {
		x$("#vehicle-config-output").inner(JSON.stringify(args));
	});
};

var getVehicleData = function() {
	gm.info.getVehicleData(function(args) {
		x$("#vehicle-data-output").inner(JSON.stringify(args));
	});
};

var setFave = function() {
	gm.ui.setFavorite(function(faveId) {
		x$("#fave-output").inner("success, favorite Id: " + faveId);
	}, function() {
		x$("#fave-output").inner("failed");
	}, {
		title: "Nitobi Software",
		URL: "http://www.nitobi.com"
	});
};

var showAlert = function() {
	var alertOptions = {
			alertTitle : 'The Alert Title', 
			alertDetail : 'Some details about the alert.',
			primaryAction : function(){
				x$("#show-alert-output").inner("primary action clicked");
			},
			secondaryAction : function() {
				x$("#show-alert-output").inner("secondary action clicked");
			},
			primaryButtonText : 'OK',
			secondaryButtonText : 'Cancel' 
	};

	gm.ui.showAlert(function(){}, function(){}, alertOptions);
};

var setMenu = function() {
	gm.ui.setInteractionSelector(function() {
		console.log('error');
	}, menuOpts);
};

var menuOpts = {
	button1_type:"text",
	button1_text:"BUTTON ONE",
	button1_action: function(arg) { ok(true, "button 1 should get clicked once"); },
	button2_type:"icon",
	button2_text:"Icon.png",
	button2_action: function(arg) { console.log('button 2!' + arg);},
	button3_type:"text",
	button3_text:"BUTTON THREE",
	button3_action: function(arg) { console.log('button 3!' + arg);},
	button4_type:"text",
	button4_text:"BUTTON FOUR",
	button4_action: function(arg) { console.log('button 4!' + arg);},
	button5_type:"text",
	button5_text:"BUTTON FIVE",
	button5_action: function(arg) { console.log('button 5!' + arg);},
	button6_type:"text",
	button6_text:"BUTTON SIX",
	button6_action: function(arg) { console.log('button 6!' + arg);},
	button7_type:"text",
	button7_text:"BUTTON SEVEN",
	button7_action: function(arg) { console.log('button 7!' + arg);}
};

var showKeyboard = function() {
	var onDoneCallBack = function (data) {
		console.log('onDone called with -> ' + data.value);
	};

	var onCancelCallBack = function () {
		console.log('Canceled!');
	};

	var keyboard = new gm.widgets.Keyboard({sender: null, language: "en-US", kbType: 1, feedbackMode: 0, Theme:'gmc', placeholder:'Placeholder', onDone: onDoneCallBack, onCancel:onCancelCallBack});
};

var showKeyboardEmail = function() {
	var onDoneCallBack = function (data) {
		console.log('onDone called with -> ' + data.value);
	};

	var onCancelCallBack = function () {
		console.log('Canceled!');
	};
	var keyboardEmail = new gm.widgets.Keyboard({sender: null, language: "en-US", kbType: 2, feedbackMode: 0, Theme:'gmc', placeholder:'Placeholder', onDone: onDoneCallBack, onCancel:onCancelCallBack});
};

var showNumpad = function() {
	var onDoneCallBack = function (data) {
		console.log('onDone called with -> ' + data);
	};

	var onCancelCallBack = function () {
		console.log('Canceled!');
	};
	var numberpad = new gm.widgets.Numberpad({sender: null, language: "en-US",placeholder: "Placeholder", onDone: onDoneCallBack, onCancel:onCancelCallBack});
};

var showNumpadMult = function() {
	var numberpadMult = new gm.widgets.Numberpad({sender: 'numpadDiv', language: "en-US"});
};

var showKeyboardMult = function() {
	var keyboardMult = new gm.widgets.Keyboard({sender: 'keyboardDiv', language: "en-US", kbType:1, feedbackMode: 0, Theme: 'gmc'});
};

var watchDest = function () {
	gm.nav.watchDestination(function (dest) {
		console.log("Watch Destination Success -> "+ dest);
	}, function () {
		console.log("Watch Destination Failed");
	});
};

var clearDest = function () {
	gm.nav.clearDestination();
};

