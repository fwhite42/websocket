function readPayload(socket, frame) {
        let payloadLength = frame.length + (frame.isMasked ? 4 : 0);
        let payload = socket.read(payloadLength)
        if (payload === null)
                return (0);
        frame.payload = payload.toString();
        return (1);
}

module.exports = readPayload
