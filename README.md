
# Connect Airbrake

Connect Airbrake is a middleware module for quickly setting up automatic Airbrake app error reporting for your web application.

## Installation 

via npm

	npm install connect-airbrake

## Example

	var Airbrake = require('connect-airbrake');
	var server = connect.createServer(
		Airbrake({ api_key: "" }),
	);

That's it!  It should report any exceptions/errors to Airbrake.  You can pass in an additional option so that the errors are also logged to stdout:

	var Airbrake = require('connect-airbrake');
	var server = connect.createServer(
		Airbrake({ api_key: "", verbose: true}),
	);

## TODO:

* Unit tests