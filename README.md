# webirremote
Proof of concept for IR using raspberry pi.

2017-01-29
- initial codes and wiring
- IR code value does not match Sharp Aqua TV.
- Find appropriate IR code.

2017-01-31
- there is an issue of sending carrier signal.  It's not consistent and the cause might be that JS timing is not appropriate when it's in the microseconds difference.
- to resolve this problem, use lircd library to handle the ir send and record.  the library has a better handling of sending carrier signal and recording them. 
- references:
	> http://alexba.in/blog/2013/01/06/setting-up-lirc-on-the-raspberrypi/
	> http://www.lirc.org/
	> http://www.lirc.org/html/irrecord.html
	> http://alexba.in/blog/2013/03/09/raspberrypi-ir-schematic-for-lirc/ (particularly the IR reciever diagram)
	> https://learn.sparkfun.com/tutorials/ir-communication (just in case interested for Arduino setup)

		

