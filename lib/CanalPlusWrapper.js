import CanalPlusWrapperPrivate from './CanalPlusWrapperPrivate';
import PeerAgentAPI from './integration/PeerAgentAPI';

class CanalPlusWrapper {
    constructor(player, p2pConfig) {
        console.info('CanalPlusWrapper:: initialized, version', this.version);

        const wrapper = new CanalPlusWrapperPrivate(player, p2pConfig);
        const peerAgentAPI = PeerAgentAPI.get(wrapper);
        Object.defineProperty(this, 'peerAgent', {
            get() {
                return wrapper.peerAgentModule ? peerAgentAPI : null;
            }
        });

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
