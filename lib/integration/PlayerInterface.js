import EventEmitter from 'eventemitter3';
import TrackView from './TrackView';
import ExternalEvents from './ExternalEvents';

class PlayerInterface extends EventEmitter {
    constructor(player) {
        super();

        this._player = player;

        const audioBitrateChangeHandler = this._onAudioBitrateChanged.bind(this);
        this._player.addEventListener('audioBitrateChange', audioBitrateChangeHandler);
        const videoBitrateChangeHandler = this._onVideoBitrateChanged.bind(this);
        this._player.addEventListener('videoBitrateChange', videoBitrateChangeHandler);

        this.dispose = () => {
            this._player.removeEventListener('audioBitrateChange', audioBitrateChangeHandler);
            this._player.removeEventListener('videoBitrateChange', videoBitrateChangeHandler);

            this._player = null;
        };

        this._dispatchInitialTracks();
    }

    getBufferLevelMax() {
        return this._player.getVideoBufferSize();
    }

    isLive() {
        return this._player.isLive();
    }

    setBufferMarginLive(bufferLevel) {
        this._player.setAudioBufferSize(bufferLevel);
        this._player.setVideoBufferSize(bufferLevel);
    }

    addEventListener (eventName, listener) {
        if (ExternalEvents.isSupported(eventName)) {
            this.on(eventName, listener);
        } else {
            console.warn('Trying to add an unsupported event listener. eventName=', eventName);
        }
    }

    removeEventListener(eventName, listener) {
        if (ExternalEvents.isSupported(eventName)) {
            this.removeListener(eventName, listener);
        } else {
            console.warn('Trying to remove an unsupported event listener. eventName=', eventName);
        }
    }

    _getCurrentTrackViewFor(type) {
        const adaptation = this._player.adas[type];
        const representation = this._player.reps[type];

        return new TrackView({
            adaptationId: adaptation.id,
            representationId: representation.id,
            type,
        });
    }

    _dispatchInitialTracks() {
        const tracks = {
            audio: this._getCurrentTrackViewFor('audio'),
            video: this._getCurrentTrackViewFor('video'),
        };

        this.emit(ExternalEvents.TRACK_CHANGE_EVENT, tracks);
    }

    _onAudioBitrateChanged() {
        const tracks = {
            audio: this._getCurrentTrackViewFor('audio'),
        };

        this.emit(ExternalEvents.TRACK_CHANGE_EVENT, tracks);
    }

    _onVideoBitrateChanged() {
        const tracks = {
            video: this._getCurrentTrackViewFor('video'),
        };

        this.emit(ExternalEvents.TRACK_CHANGE_EVENT, tracks);
    }
}

export default PlayerInterface;
