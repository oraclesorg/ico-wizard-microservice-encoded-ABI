let express = require("express");
let bodyParser = require("body-parser");
let getABIencoded = require("./helpers/get-abi-encoded.js");
let app = express();

let port = (process.env.PORT || 5000);
app.set('port', port);

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

app.post("/", function(request, response) {
	console.log("Call of getABIencoded() function triggered");
	console.log(request.body);
	let body = request.body;
	let types = body?body.types?(typeof body.types === 'string')?[body.types]:body.types:[]:[];
	let vals = body?body.vals?(typeof body.vals === 'string')?[body.vals]:body.vals:[]:[];

	getABIencoded(types, vals, function(encoded) {
		let out = {
			code: 200,
			title: "Success",
			body: {"ABIencoded": encoded}
		}
		response.send(out);
	});
});

app.listen(app.get('port'), function () {
	console.log('get-abi-encoded micro service is running on port', app.get('port'));
});