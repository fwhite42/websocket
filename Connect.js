const websocketMandatoryHeaders = {
	"connection" : "upgrade",
        "upgrade" : "websocket",
        "sec-websocket-version" : 13
}

function generateWebsocketKey()
{
	return require("crypto").randomBytes(16).toString("base64");
}

function connect(options)
{
	let dispatchRequest;
	let request;
	let connection;

	if (options.protocol == "https" || options.protocol == "http")
	{
		dispatchRequest = require(options.protocol).request;
		delete options.protocol;
	}
	if (!options.headers)
		options.headers = new Object();
	if (!options.headers["sec-websocket-key"])
		options.headers["sec-websocket-key"] = generateWebsocketKey();
	Object.assign(options.headers, websocketMandatoryHeaders);
	request = dispatchRequest(options).end();
	connection = cb => request
		.on("upgrade", (response, socket, head) => cb({
			response,
			socket,
			head
	}))
	return (new Promise(connection));
}

module.exports = connect;
