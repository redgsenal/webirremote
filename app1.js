//var TESTCODE = 0x41C7C03F; //0x41A2;
var TESTCODE = 0x41A2;
var WAIT_TIME = 9; // wait time in microsecs; compensated for the LED operating time
var BIT_TIME = 562; // length of carrier bit in microseconds
var TOGGLE_BIT_MASK = 0xFFFF; //0x800000000; //3FF;
var BIT_SIZE = 16;

var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
	var IR_LED = new five.Led("P1-13");
	IR_LED.off();
	this.on("exit", function() {
		// clean up on board exit
		IR_LED.off();
	});	
	//ledTest(IR_LED);
	//carrier(IR_LED, 9);
	testCode(IR_LED);
	
	this.repl.inject({
		send: function(){
			testCode(IR_LED);
		}
	});	
});

function testCode(led){
	sendCode(led, TESTCODE);
	console.log("code sent...");
}

function ledTest(led){
	led.off();
	led.blink();
}

// send the carrier code
// mstime - time in ms
function carrier(led, mstime){
	for(var i = 0; i < (mstime / 26); i++){
		// write to pin
		led.on();
		//delay
		delay();
		led.off();
		delay();
	}
}

function delay(){
	delayMicroSeconds(WAIT_TIME);
}

function sendCode(led, code){
	carrier(led, 9000);
	delayMicroSeconds(4500);
	for(i = 0; i < BIT_SIZE; i++){
		carrier(led, BIT_TIME);
		var b = code & TOGGLE_BIT_MASK;
		if(b){
			// bit HIGH
			delayMicroSeconds(3 * BIT_TIME);
		}else{
			// bit LOW
			delayMicroSeconds(BIT_TIME);
		}
		code<<=1;		
	}
	// stop bit
	carrier(led, BIT_TIME);
};

function delayMicroSeconds(v){
	var mms = v * 0.00001;
	var start = new Date().getTime();
	var end = start;
	while(end < start + mms) {
		end = new Date().getTime();
	};
}
