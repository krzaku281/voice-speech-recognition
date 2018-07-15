"use strict";

module.exports = {
	voiceSpeechRecognition: createVoiceSpeechRecognition,
};

function checkSupportForBrowsers() {
	if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
	  throw new Error("No support for speech recognition in this browser.");
	}
}

function createVoiceSpeechRecognition(config = {}) {
	checkSupportForBrowsers();	
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
	recognizer.recognizing = false;
	recognizer.finalRecognized = '';
	recognizer.interimRecognized = '';
	recognizer.lastRecognized = '';
	
	// control methods
	recognizer.begin = begin;
	recognizer.end = end;
	recognizer.interrupt = interrupt;
	
	// event handlers
	recognizer.addEventListener('start', function() {
		this.recognizing = true;
	});
	
	recognizer.addEventListener('result', function(event) {
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				this.finalRecognized += event.results[i][0].transcript;
			} else {
				this.interimRecognized += event.results[i][0].transcript;
			}
		}
		
		this.lastRecognized = event.results[event.results.length][0].transcript;
	});

	recognizer.addEventListener('error', function(event) {
		this.recognizing = false;
	});

	recognizer.addEventListener('end', function onEnd() {
		this.recognizing = false;
	});
	
	return recognizer;
};

function begin() {
	this.finalRecognized = this.interimRecognized = this.lastRecognized = '';
	this.start();
};

function end {
	this.stop();
};

function interrupt() {
	this.abort();
};