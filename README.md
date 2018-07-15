# Voice Speech Recognition
Simple wrapper extended functionalities of Speech Recognition embedded in browsers.

[![npm version](https://badge.fury.io/js/voice-speech-recognition.svg)](https://badge.fury.io/js/voice-speech-recognition) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Installation
```sh
$ npm install voice-speech-recognition
```

# Quick start
```sh
var VSR = require('voice-speech-recognition');
    
var recognizer = VSR.voiceSpeechRecognition();
recognizer.begin();
});
```
# Configuration
```sh
var config = {
	continuous: true, // default: true, interval: {true, false}
	interimResults: true, // default: true, interval: {true, false}
	maxAlternatives: 1 // default: 1, interval {1, 2, 3, 4, ...}
	lang: 'en-US', // default: 'en-US', one of language localisation
	grammars: undefined, // default: new SpeechGrammarList()
	serviceURI: undefined, // default: undefined
};

var recognizer = VSR.voiceSpeechRecognition(config);
```
> - continuous - results are returned for each recognition, or only a single result
> - interimResults - interim results will be returned
> - maxAlternatives - maximum number of alternatives
> - lang - sets the language of speech recognition
> - grammars - represent the grammars for current speech recognition
> - serviceURI - specifies the location of the speech recognition service

# Getters
> - recognizing - is recognizing in progress,
> - finalRecognized - final recognized speech,
> - interimRecognized - processed speech till this time,
> - lastRecognized - last processed part of speech
```sh
var text = recognizer.finalRecognized;
```

# Controls
> - begin() - start recognizing of audio stream, speech etc.,
> - end() - stop working,
> - interrupt() - force stop working without last result handling

# Events 
You can add event listeners for these events:
> - onstart
> - onresult
> - onerror
> - onnomatch
> - onend

> - onaudiostart
> - onaudioend
> - onsoundstart
> - onsoundend
> - onspeechstart
> - onspeechend

# Licence
MIT