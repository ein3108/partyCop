var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var WebSocket = require('ws');
var http = require('http');

var app = express();

var eyetribeClient = require('eyetribe-client');
var eye = new eyetribeClient();

eye.activate({
  host: 'localhost',
  port: 6555,
  mode: 'push',
  version: 1
});

eye.on('connected', function () {
  console.log('Eyetribe Connected');
});

/* Quadrants Directions
 * 0: TL
 * 1: TR
 * 2: BL
 * 3: BR 
 * 4: N/A
 */
var quadrant = NA;
var TL = 0;
var TR = 1;
var BL = 2;
var BR = 3;
var NA = 4

eye.on('gazeUpdate', function (gazeData) {
	var x = parseFloat(JSON.stringify(gazeData.avg.x));
	var y = parseFloat(JSON.stringify(gazeData.avg.y));
	if (quadrant != NA) {
		if (x < 700 && y < 300) {
			/* Top Lefthand corner */
			if (quadrant != TL) {
				/* Only if it changed the direction */
				goStraight();
				quadrant = TL;
			}
		} else if (x >= 700 && y < 300) {
			/* Top Righthand corner */
			if (quadrant != TR) {
				goBack();
				quadrant = TR;
			}
		} else if (x < 700 && y >= 300) {
			/* Bottom Lefthand corner */
			if (quadrant != BL) {
				turnLeft();
				quadrant = BL;
			}
		} else if (x >= 700 && y >= 300) {
			/* Bottom Righthand corner */
			if (quadrant != BR) {
				turnRight();
				quadrant = BR;
			}
		}
	}

	console.log('data x: ' + x);
	console.log('data.y: ' + y);
});

eye.on('disconnected', function (err) {
  console.log('Goodbye from Eyetribe');
});

eye.activate(function (err) {

  if (err) { 
    console.error('Connection failed.'); 
    return ;
  }

  eye.getScreen(function (err, screen) {
    if (err) { console.error(err); return ; }

    console.log(screen.index);
    console.log(screen.resolution.width);
    console.log(screen.resolution.height);
    console.log(screen.physical.width);
    console.log(screen.physical.height);
  });
});


/* For iRobot connection */
var host = 'ws://192.168.0.23:';
var port = 2223;
var options = {
  host: '192.168.0.23',
  port: 2222,
  method: 'POST',
  path: '/'
};

//turnLeft();
goStraight();

function goStraight() {
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var data = "";
    res.on('data', function(d) {
      console.log('body: ' + d);
    });

    res.on('end', function() {
      console.log(data);
    });
  });

  req.write('irobot:goStraight');

  req.on('error', function(e) {
    console.log('request failed: ' + e.message);
  });

  req.end();
};

function goBack() {
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var data = "";
    res.on('data', function(d) {
      console.log('body: ' + d);
    });

    res.on('end', function() {
      console.log(data);
    });
  });

  req.write('irobot:goBack');

  req.on('error', function(e) {
    console.log('request failed: ' + e.message);
  });

  req.end();
};

function turnLeft() {
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var data = "";
    res.on('data', function(d) {
      console.log('body: ' + d);
    });

    res.on('end', function() {
      console.log(data);
    });
  });

  req.write('irobot:turnLeft');

  req.on('error', function(e) {
    console.log('request failed: ' + e.message);
  });

  req.end();
};


function turnRight() {
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var data = "";
    res.on('data', function(d) {
      console.log('body: ' + d);
    });

    res.on('end', function() {
      console.log(data);
    });
  });

  req.write('irobot:turnRight');

  req.on('error', function(e) {
    console.log('request failed: ' + e.message);
  });

  req.end();
};
    

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

