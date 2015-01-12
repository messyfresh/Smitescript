# Smitescript
A node.js library for making calls to the HiRez Smite API.

# How to Use
	
	npm install smitescript

Simply include smitescript in your code and start making calls.

	var smite = require('smite');

	// Declare your smite developer credentials.
	smite.devId = 'XXXX';
	smite.authId = 'INSERT YOUR PRIVATE DEVELOPER KEY HERE';

	// Create a session (Good for 15 min)
	smite.createSession();

	// Example call to retrieve all gods in the game.
	smite.getGods();

	// This call will create a .json file in the local directory of the response.
	// At  this point a simple fs.createReadStream can be used to read the contents or
	// the contents of the file can be pushed into a mongoDB.

	- Currently implemented
		createSession
			- Generates a session with the Smite API Server
			  (Sessions last 15 min)
		getGods
			- List all current gods with info on each.
		getItems
			- List all current items with info for each.

# TODO
	- Create functions for all of the API calls.
	- Establish mechanism to check if a session is expired.
	- Be Awesome!