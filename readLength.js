function readLength(socket, frame) {
        let bytes;

        if (frame.lengthInfo < 126)
        {
                frame.length = frame.lengthInfo;
        }
        else if (frame.lengthInfo == 126)
        {
                bytes = socket.read(2);
                if (bytes === null)
                        return 0;
                frame.length = bytes.readUInt16BE();
        }
        else if (frame.lengthInfo == 127 )
        {
                bytes = socket.read(8);
                if (bytes === null)
                        return 0;
                frame.length = bytes.readUBigInt64BE();
        }
        return (1);
}

module.exports = readLength;
