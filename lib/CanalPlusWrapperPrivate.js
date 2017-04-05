import Transport from './transport/Transport';
import PlayerInterface from './integration/PlayerInterface';
import MediaMap from './integration/MediaMap';

const LOADED = 'LOADED';

class CanalPlusWrapperPrivate {
    constructor(player) {
        this._player = player;

        this._transport = new Transport();
        this._patchLoadVideo(player);

        player.addEventListener('error', this._onPlayerError, this);

        let playerStateChangeHandler = this._onPlayerStateChanged.bind(this);
        player.addEventListener('playerStateChange', playerStateChangeHandler);
    }

    _patchLoadVideo(player) {
        this._originalLoadVideo = player.loadVideo;

        player.loadVideo = (...params) => {
            params[0] = this._transport.patchTransport(params[0]);

            return this._originalLoadVideo.apply(player, params);
        }
    }

    _onPlayerError(error) {
        console.info('CanalPlusWrapperPrivate::_onPlayerError():', error);
    }

    _onPlayerStateChanged(state) {
        if (state === LOADED) {
            this._initPeerAgent();
        }
    }

    _initPeerAgent() {
        const playerInterface = new PlayerInterface();
        const mediaMap = new MediaMap(this._player.man);
    }
}

export default CanalPlusWrapperPrivate;
