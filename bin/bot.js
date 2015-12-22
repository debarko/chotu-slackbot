#!/usr/bin/env node

'use strict';

var Bot = require('slackbots'),
	elizaBot = require('../lib/elizabot'),
	elizaData = require('../lib/elizadata'),
    token = require('../token'),
	elizaInstance = new elizaBot(false, elizaData),
	params = {
        icon_url: 'http://i.picresize.com/images/2015/12/21/m0Puj.jpg'
    },
	token = process.env.BOT_API_KEY || 'xoxb-17093932528-SCnCcJyR7kiA5sfytZ3Llqyj',
	name = 'Chotu Ram',
	reply, elizaInitials, elizaFinals, elizaQuits,
	elizaPres = [], elizaPosts, elizaSynons, elizaKeywords = [], elizaPostTransforms;

// create a bot 
var bot = new Bot({
    token: token, // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: name
});

console.log("Booting up Chotu...");
 
bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage 
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
    //bot.postMessageToChannel('general', 'meow!', params);
    
    // define existing username instead of 'user_name' 
    bot.postMessageToUser('debarko', 'I am up.', params); 
    
    // define private group instead of 'private_group', where bot exist 
    //bot.postMessageToGroup('private_group', 'meow!', params); 
});

bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm 
	// { type: 'message',
	// channel: 'C024PSVLM',
	// user: 'U060DQYE6',
	// text: '<@U0H2RTEFJ> wassup',
	// ts: '1450752157.000549',
	// team: 'T024PSVLF' }

	// initial = elizaInstance.getInitial();

    if ((isChatMessage(data) || isChannelConversation(data))
    	&& !isFromBot(data)) {
    	if (isMentioningMe(data) && isChannelConversation(data)) {
    		// reply = elizaInstance.transform(data.text);
    		// bot.postMessageToChannel(data.channel, reply, params);
    	} else if (isChatMessage(data)) {
			reply = elizaInstance.transform(data.text);
			bot.postMessage(data.channel, reply, params);
    	}
    }
});

function isChatMessage (message) {
    return message.type === 'message' && Boolean(message.text);
};

function isChannelConversation (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C'
        ;
};

function isMentioningMe (message) {
    return message.text.toLowerCase().indexOf('chotu') > -1 ||
        message.text.toLowerCase().indexOf(name) > -1;
};

function isFromBot (message) {
	return message.subtype === 'bot_message';
};

// var chotu = new NorrisBot({
//     token: token,
//     name: name,
//     eliza: ElizaBot
// });
// chotu.run();
