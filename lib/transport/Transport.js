import DefaultTransport from '../oneplayer/net/index';

class Transport {
    constructor() {
    }

    patchTransport(options) {
        let patchedTransport = DefaultTransport[options.transport]();
        options.transport = patchedTransport;

        return options;
    }
}

export default Transport;