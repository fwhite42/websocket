const {
	Readable
} = require("stream");

const parse = [
	require("./readInfo"),
	require("./readLength"),
	require("./readPayload")
]

function init(socket, buffer, hook) {
	let phase;

	phase = 0;
	socket.on("readable", function() {
		let success;

		do {
			success = parse[phase](socket, buffer)
			success ? phase++ : null;
			phase == 3 ? hook(buffer) : null;
			phase %= 3;
		} while (success)
	})
}

class Reader extends Readable {
	constructor(socket) {
		super({objectMode: true});

		this._socket = socket;
		this._phase = 0;
		this._frame = new Object();

		let hook = (x) => this.push(x);
		init(this._socket, this._frame, hook);

	}

	_read() {
		this._socket.paused ? this._socket.resume() : null;
	}
}

module.exports = Reader
