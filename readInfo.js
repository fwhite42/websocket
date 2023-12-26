function readInfo(socket, frame) {

	module.exports = readInfo
        let     bytes;

        let     fin;
        let     op;
        let     rsv;
        let     isMasked;
        let     lengthInfo;

        bytes = socket.read(2);
        if (bytes === null)
                return (0);
        op = bytes[0] & 0b00001111;
        fin = bytes[0] >> 7;
        rsv = (bytes[0] << 1) >> 5;
        isMasked = bytes[1] >> 7;
        lengthInfo = bytes[1] & 0b01111111;
        Object.assign(frame, {op, fin, isMasked, lengthInfo});
        return (1);
}

module.exports = readInfo
