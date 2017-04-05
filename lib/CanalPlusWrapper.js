import CanalPlusWrapperPrivate from './CanalPlusWrapperPrivate';
import Transport from './transport/Transport';

class CanalPlusWrapper {
    constructor(player, p2pConfig) {
        console.info('CanalPlusWrapper:: initialized, version', this.version);

        const wrapper = new CanalPlusWrapperPrivate(player, p2pConfig);
    }

    get version() {
        return _VERSION_;
    }

    static get version() {
        return _VERSION_;
    }
}

export default CanalPlusWrapper;
