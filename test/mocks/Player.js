const DEFAULT_VIDEO_BUFFER_SIZE = 30;

class Player {
    constructor(manifest) {
        this.man = manifest;

        this.adas = {
            audio: manifest.adaptations.audio[0],
            video: manifest.adaptations.video[0],
        };
        this.reps = {
            audio: manifest.adaptations.audio[0].representations[0],
            video: manifest.adaptations.video[0].representations[0],
        };

        this._videoBufferSize = DEFAULT_VIDEO_BUFFER_SIZE;

        this._eventHandlers = {};
    }

    getVideoBufferSize() {
        return this._videoBufferSize;
    }

    getAudioBufferSize() {
        return this._audioBufferSize;
    }

    setVideoBufferSize(value) {
        this._videoBufferSize = value;
    }

    setAudioBufferSize(value) {
        this._audioBufferSize = value;
    }

    addEventListener(type, handler) {
        this._eventHandlers[type] = handler;
    }

    removeEventListener() {
    }

    triggerEvent(type) {
        this._eventHandlers[type]();
    }
}

export default Player;
