import CanalPlusWrapperPrivate from './CanalPlusWrapperPrivate';
import Transport from './transport/Transport';

let wrapper;
class CanalPlusWrapper {
    constructor(player) {
        console.info('CanalPlusWrapper:: initialized, version', this.version);

        wrapper = new CanalPlusWrapperPrivate(player);
    }

    patchTransport(options) {
        return wrapper.patchTransport(options);
    }

    get version() {
        return _VERSION_;
    }

    static get version() {
        return _VERSION_;
    }
}

export default CanalPlusWrapper;