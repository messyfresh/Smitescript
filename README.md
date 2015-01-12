# Smitescript
A node.js library for making calls to the HiRez Smite API.

# How to Use
Simply include smitescript in your code and start making calls.
	var smite = require('smite')

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