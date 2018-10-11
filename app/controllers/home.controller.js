const { getHelloMsg } = require('../services/home.service');

/**
 * 
 * Sends back a normal String
 */
function hello() {
  	return { message : "Hello"};
}

/**
 * Sends back a welcome message to the user with name in parameter
 * @param {String} name 
 */
function welcomeMsg(name){
	const helloMsg = getHelloMsg(name);
	return { message : helloMsg };
}

module.exports = {
	hello,
	welcomeMsg
};