const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const PORT = 3000;

const exec = require('child_process').exec;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use('/static', express.static('public'));

app.engine('.hbs', exphbs({  
	defaultLayout: 'main',
	extname: '.hbs',
	layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', '.hbs');  
app.set('views', path.join(__dirname, 'views')) ;

app.get('/', function (request, response){  
	response.render('home',{
		name: 'Reggie'
	});
});

app.post('/operate', function (request, response){
	var ops = request.body.operation;
	var device = request.body.device;
	console.log('** OPERATE ', device);
	console.log('device ', device);
	console.log('ops ', ops);
	execOps(device, ops);
	response.end();
});

app.listen(PORT, function (err){  
	if (err) {
		return console.log('something bad happened', err);
	}
	console.log('server is listening on ', PORT);
});

function execOps(device, ops){
	if (device && ops){
		exec("sudo irsend SEND_ONCE " + device.toUpperCase() + " " + ops.toUpperCase(), function (error, stdout, stderr) {
			console.log("IR SEND " + device.toUpperCase() + " => " + ops.toUpperCase());
			if (error) {
				console.error('exec error: ' , error);
				return;
			}
			console.log('stdout: ', stdout);
			console.log('stderr: ', stderr);
		});
	}
}