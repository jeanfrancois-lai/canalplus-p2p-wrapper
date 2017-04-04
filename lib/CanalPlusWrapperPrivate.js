import Transport from './transport/Transport';

class CanalPlusWrapperPrivate {
    constructor(player) {
        this._transport = new Transport();
        this._patchLoadVideo(player);

        player.addEventListener('error', this._onPlayerError, this);
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
}

export default CanalPlusWrapperPrivate;
