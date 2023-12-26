const Connect = require("./Connect");

class Websocket extends Duplex {

	constructor(options) {
		this._socket = null;
	}

	address() {
		return this._socket.address();
	}
	get bytesRead() {
		return this._socket.bytesRead;
	}
	get bytesWritten() {
		return this._socket.bytesWritten;
	}
	connect(options) {
		let handle;

		handle = Connect(options).then(({response, socket, head}) => {
			this._socket = handle.socket;
			this._head = handle.head;
			this._response = handle.response;
		});
		return (this);
	}
	get connecting() {
		return this._socket.connecting;
	}
	destroy(error) {
		this._socket.destroy(error);
	}
	end(data, encoding, callback) {
	
	}
	get localAddress() {
		return this._socket.localAddress;
	}

	get localPort() {
		return this._socket.localPort;
	}

	get localFamily() {
		return this._socket.localFamily;
	}

	pause() {
		this._socket.pause();
	}

	get pending() {
		return this._socket.pending();
	}

	write(data, encoding, callback) {
		this._writer.write(data, callback);
	}



	write()
	pipe()
}


const socket = new Websocket({
	protocol: "https",
	method: "GET",
	host: "app.io",
	port: 9943,
	path: "/ws",
	headers: {}
})

socket.write()
socket.close()
