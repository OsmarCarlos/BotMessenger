var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

const APP_TOKEN = 'EAAD3YLLfKb8BAJZAyAiD9h2R6xjCjE4uZA55aoQ6OwK1S5gjrGUKdGZC3KsYj43Bo814ZAYbInwpmMOhvHVIBMq3tnPZCYhSXCgwEK8yeuRZB9fLlCdLNMcUKeEWRTA4epmffXAqBy81ISgifP4kJM1PBjJ6CfVgnJcw0szCmgVwZDZD'

var app = express();
app.use(bodyParser.json());

app.listen(3000, function(){
	console.log("El servidor es chido en el puerto 3000");
});

app.get('/', function(req, res){
	res.send('Bienvenido al Himalaya PUTOS');
});

app.get('/webhook', function(req, res){
	if(req.query['hub.verify_token'] == 'osmar'){
		res.status(200).send(req.query['hub.challenge']);
	}else{
		res.send('Saquese perro!');
	}
});

app.post('/webhook', function(req, res){
	var data = req.body;

	if(data.object == 'page'){

		
		data.entry.forEach(function(pageEntry) {

			pageEntry.messaging.forEach(function(messagingEvent){

				if(messagingEvent.message){
					receiveMessage(messagingEvent);
				}
			});
		});
		res.sendStatus(200);
	}
});

function receiveMessage(event){

	var senderID = event.sender.id;
	var messageText = event.message.text;

	console.log("Sender Id %s and de messageText "+messageText,senderID);
	evaluateMessage(senderID, messageText);
}

function evaluateMessage(recipientId,message){

	var finalMessage = ''

	if (isContain(message, 'ayuda')){
		finalMessage = 'No te puedo ayudar'
	}else{
		finalMessage = message
	}

	sendMessageText(recipientId, finalMessage)
}

function isContain(sentence, word){
	return sentence.indexOf(word) > -1;
}

function sendMessageText(recipientId, message){
	var messageData = {
		recipient : {
			id : recipientId
		},
		message: {
			text : message
		}
	};

	callSendAPI(messageData);
	console.log(recipientId); 
}
	
function callSendAPI(messageData){

	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs : { access_token : APP_TOKEN },
		method: 'POST',
		json: messageData
	}, function(error, response, data){

		if(error){
			console.log("No se puedo enviar el mensaje")
		}else {
			console.log("El mensaje fue enviado")
		}
	});
}


 


















