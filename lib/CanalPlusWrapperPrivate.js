import Transport from './transport/Transport';

class CanalPlusWrapperPrivate {
    constructor(player) {
        this._tranpsort = new Transport();

        player.addEventListener('error', this._onPlayerError, this);
    }

    patchTransport(options) {
        return this._tranpsort.patchTransport(options);
    }

    _onPlayerError(error) {
        console.info('CanalPlusWrapperPrivate::_onPlayerError():', error);
    }
}

export default CanalPlusWrapperPrivate;
