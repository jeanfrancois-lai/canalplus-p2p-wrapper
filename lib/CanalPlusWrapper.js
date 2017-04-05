import CanalPlusWrapperPrivate from './CanalPlusWrapperPrivate';

class CanalPlusWrapper {
    constructor(player, p2pConfig) {
        console.info('CanalPlusWrapper:: initialized, version', this.version);

        const wrapper = new CanalPlusWrapperPrivate(player, p2pConfig);

        this.dispose = () => {
            wrapper.dispose();
        };
    }

    get version() {
        return _VERSION_;
    }

    static get version() {
        return _VERSION_;
    }
}

export default CanalPlusWrapper;
