const connect = require("./Connect")
const Reader = require("./Reader")

connect({
	protocol: "https",
	host: "stream.binance.com",
	path: "/ws/btcusdt@aggTrade"
}).then(handle => {
	let reader = new Reader(handle.socket);
	console.log(Object.keys(handle.socket._handle.fd))
	console.log(handle.socket._handle.fd)
	console.log(handle.socket._handle.owner)
	reader
		.map(x => x.payload)
		.map(JSON.parse)
		.map(x => x.p)
		.map(x => [Number(x), require("process").memoryUsage()])
		.forEach(console.log);

})
