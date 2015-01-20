# Smitescript
# Updated 20 Jan 2015
	Added the following new calls
			- getPlayer
				List all info about a player
			- getFriends
				List all of a players friends
			- getGodRank
				List the rank of all of the gods for
				a player
			- getTopMatches
				Lists the 50 most watched / most recent
				recorded matches

A node.js library for making calls to the HiRez Smite API.

# How to Use
	
	npm install smitescript

Simply include smitescript in your code and start making calls.

	var smite = require('smite');

	// Declare your smite developer credentials.
	var devId = 'XXXX';
	var authId = 'INSERT YOUR PRIVATE DEVELOPER KEY HERE';

	// Create a session (Good for 15 min)
	smite.createSession(devId, authKey);

	// Example call to retrieve all gods in the game.
	smite.getGods(devId, authKey, sessionId);
	smite.getItems(devId, authKey, sessionId);

	// This call will create a .json file in the local directory of the response.
	// At  this point a simple fs.createReadStream can be used to read the contents or
	// the contents of the file can be pushed into a mongoDB.

Here is another example for creating a session:

	var sessionId;
	
	try {
		sessionId = fs.readFileSync("session.txt", "utf8");
	} catch (e) {
		if (e.code === "ENOENT") {
			sessionId = createSession(devId, authKey);
		}
	}

# Current Issues
	The first initial call to create a session has to be made
	by itself or setTimeout in order to ensure a valid sessionId
	has had time to make it back from the server. This shouldn't
	be a problem for webservers are you can just create a sessionID
	at the first page load, but this is not a very good way of
	achieving that since the API has call limits.

# Currently implemented
	- createSession
		Generates a session with the Smite API Server
		(Sessions last 15 min)
	- getGods
		List all current gods with info on each
	- getItems
		List all current items with info for each
	- getPlayer
		List all info about a player
	- getFriends
		List all of a players friends
	- getGodRank
		List the rank of all of the gods for
		a player
	- getTopMatches
		Lists the 50 most watched / most recent
		recorded matches

# TODO
	- Create functions for all of the API calls.
	- Establish mechanism to check if a session is expired.
	- Be Awesome!

# Be sure and check out the package and hack away at it!
# I'm writing this to learn and for my own personal use.
# Let me know what you come up with.