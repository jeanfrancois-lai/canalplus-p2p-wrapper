import PeerAgent from 'streamroot-p2p';
import Transport from './transport/Transport';
import PlayerInterface from './integration/PlayerInterface';
import MediaMap from './integration/MediaMap';
import SegmentView from './integration/SegmentView';

const INTEGRATION_VERSION = 'v1.0';
const LOADED = 'LOADED';

class CanalPlusWrapperPrivate {
    constructor(player, p2pConfig) {
        this._player = player;
        this._p2pConfig = p2pConfig;

        this._transport = new Transport();
        this._patchLoadVideo(player);

        let playerErrorHandler = this._onPlayerError.bind(this);
        player.addEventListener('error', playerErrorHandler);

        let playerStateChangeHandler = this._onPlayerStateChanged.bind(this);
        player.addEventListener('playerStateChange', playerStateChangeHandler);

        this.dispose = () => {
            player.removeEventListener('playerStateChange', playerStateChangeHandler);
            player.removeEventListener('error', playerErrorHandler);

            this._player = null;
        };
    }

    _patchLoadVideo(player) {
        this._originalLoadVideo = player.loadVideo;

        player.loadVideo = (...params) => {
            const options = params[0];

            if (!options.transportOptions || !options.transportOptions.segmentLoader) {
                options.transportOptions = options.transportOptions || {};
                options.transportOptions.segmentLoader = this._transport.getSegmentLoader();
            }

            return this._originalLoadVideo.apply(player, params);
        };
    }

    _onPlayerError(error) {
        console.info('CanalPlusWrapperPrivate::_onPlayerError():', error.message || error.reason.message);
    }

    _onPlayerStateChanged(state) {
        if (state === LOADED) {
            this._initPeerAgent();
        }
    }

    _initPeerAgent() {
        const playerInterface = new PlayerInterface(this._player);
        const mediaMap = new MediaMap(this._player);
        this.peerAgentModule = new PeerAgent(
            playerInterface,
            this._player.getUrl(),
            mediaMap,
            this._p2pConfig,
            SegmentView,
            PeerAgent.StreamTypes.SMOOTH,
            INTEGRATION_VERSION
        );

        this.peerAgentModule.setMediaElement(this._player.getVideoElement());
        this._transport.setPeerAgent(this.peerAgentModule);
    }
}

export default CanalPlusWrapperPrivate;
