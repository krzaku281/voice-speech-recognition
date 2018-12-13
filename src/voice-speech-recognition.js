"use strict";

function isSupportForSpeechRecognition() {
	if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
		return true;
	}
	
	console.error("No support for speech recognition in this browser.");
	return false;
};

function createVoiceSpeechRecognition(config) {
	if (typeof config === 'undefined') {
		config = {};
	}
	if(!isSupportForSpeechRecognition()) {
		return null;
	}	
	var SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

	// initialization
	var recognizer = new SpeechRecognition();
	recognizer.continuous = config.continuous || true;
    recognizer.interimResults = config.interimResults || true;
	recognizer.maxAlternatives = config.maxAlternatives || 1;
    recognizer.lang = config.lang || 'en-US';
	recognizer.serviceURI = config.serviceURI;
	if(config.grammars) {
		recognizer.grammars = config.grammars;
	}
	
	// getters
	recognizer.isRecognizing = false;
	recognizer.finalRecognizing = '';
	recognizer.interimRecognizing = '';
	recognizer.lastRecognizing = '';
	
	// control methods
	recognizer.startRecognition = startRecognition;
	recognizer.stopRecognition = stopRecognition;
	recognizer.abortRecognition = abortRecognition;
	recognizer.resetRecognition = resetRecognition;
	
	// event handlers
	recognizer.addEventListener('start', function() {
		this.isRecognizing = true;
	});
	
	recognizer.addEventListener('result', function(event) {
		var resultLength = event.results.length;
		
		for (var i = event.resultIndex; i < resultLength; ++i) {
			if (event.results[i].isFinal) {
				this.finalRecognizing += event.results[i][0].transcript;
			} else {
				this.interimRecognizing += event.results[i][0].transcript;
			}
		}
		
		this.lastRecognizing = event.results[resultLength-1][0].transcript;
	});

	recognizer.addEventListener('error', function(event) {
		this.isRecognizing = false;
	});

	recognizer.addEventListener('end', function() {
		this.isRecognizing = false;
	});
	
	return recognizer;
};

function resetRecognition() {
	this.finalRecognizing = this.interimRecognizing = this.lastRecognizing = '';
};

function startRecognition() {
	if(!this.isRecognizing) {
		try {
			this.resetRecognition();
			this.start();
		} catch (err) {
			console.error(err.message);
		}
	}
};

function stopRecognition() {
	this.stop();
};

function abortRecognition() {
	this.abort();
};

module.exports = {
	voiceSpeechRecognition: createVoiceSpeechRecognition,
};

