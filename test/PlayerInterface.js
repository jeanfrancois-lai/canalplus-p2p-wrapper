import sinon from 'sinon';
import PlayerInterface from '../lib/integration/PlayerInterface';
import ExternalEvents from '../lib/integration/ExternalEvents';
import TrackView from '../lib/integration/TrackView';
import Player from './mocks/Player';
import manifest from './mocks/Manifest';

const VIDEO_TRACK_1 = new TrackView({ adaptationId: 0, representationId: 0, type: 'video' });
const AUDIO_TRACK_1 = new TrackView({ adaptationId: 1, representationId: 0, type: 'audio' });

describe('PlayerInterface', () => {
    describe('constructor', () => {
        it('should dispatch initial tracks to peer agent', () => {
            const originalEmitFunc = PlayerInterface.prototype.emit;

            const emitSpy = sinon.spy();
            PlayerInterface.prototype.emit = emitSpy;

            const player = new Player(manifest);
            new PlayerInterface(player);

            emitSpy.calledOnce.should.be.true();
            emitSpy.firstCall.args[0].should.be.equal(ExternalEvents.TRACK_CHANGE_EVENT);

            const initTracks = emitSpy.firstCall.args[1];
            initTracks.video.isEqual(VIDEO_TRACK_1).should.be.true();
            initTracks.audio.isEqual(AUDIO_TRACK_1).should.be.true();

            PlayerInterface.prototype.emit = originalEmitFunc;
        });
    });

    describe('getBufferLevelMax', () => {
        it('should return player buffer level', () => {
            const player = new Player(manifest);
            const playerInterface = new PlayerInterface(player);

            playerInterface.getBufferLevelMax().should.be.equal(player.getVideoBufferSize());
        });
    });

    describe('isLive', () => {
        it('should return value defined in manifest', () => {
            const player = new Player(manifest);
            const playerInterface = new PlayerInterface(player);

            playerInterface.isLive().should.be.equal(manifest.isLive);
        });
    });

    describe('setBufferMarginLive', () => {
        it('should change player buffer level to given value', () => {
            const player = new Player(manifest);
            const playerInterface = new PlayerInterface(player);

            playerInterface.getBufferLevelMax().should.be.equal(player.getVideoBufferSize());

            const newBufferLevel = 21.234234;
            playerInterface.setBufferMarginLive(newBufferLevel);

            player.getVideoBufferSize().should.be.equal(newBufferLevel);
            player.getAudioBufferSize().should.be.equal(newBufferLevel);
        });
    });

    describe('addEventListener', () => {
        it('should subscribe to supported events', () => {
            const player = new Player(manifest);
            const playerInterface = new PlayerInterface(player);

            const supportedEvent = ExternalEvents.TRACK_CHANGE_EVENT;
            playerInterface.addEventListener(supportedEvent, () => {});
            playerInterface.listeners(supportedEvent).should.have.lengthOf(1);
        });
        it('should ignore unsupported events', () => {
            const player = new Player(manifest);
            const playerInterface = new PlayerInterface(player);

            const unsupportedEvent = 'unsupportedEvent';
            playerInterface.addEventListener(unsupportedEvent, () => {});
            playerInterface.listeners(unsupportedEvent).should.have.lengthOf(0);
        });
        it('should handle video track switch event', () => {
            const player = new Player(manifest);
            const playerInterface = new PlayerInterface(player);

            const trackSwitchListener = sinon.spy();
            playerInterface.addEventListener(ExternalEvents.TRACK_CHANGE_EVENT, trackSwitchListener);

            player.triggerEvent('videoBitrateChange');
            trackSwitchListener.calledOnce.should.be.true();
            trackSwitchListener.firstCall.args[0].video.isEqual(VIDEO_TRACK_1).should.be.true();
        });
        it('should handle audio track switch event', () => {
            const player = new Player(manifest);
            const playerInterface = new PlayerInterface(player);

            const trackSwitchListener = sinon.spy();
            playerInterface.addEventListener(ExternalEvents.TRACK_CHANGE_EVENT, trackSwitchListener);

            player.triggerEvent('audioBitrateChange');
            trackSwitchListener.calledOnce.should.be.true();
            trackSwitchListener.firstCall.args[0].audio.isEqual(AUDIO_TRACK_1).should.be.true();
        });
    });

    describe('removeEventListener', () => {
        it('should unsubscribe from event', () => {
            const player = new Player(manifest);
            const playerInterface = new PlayerInterface(player);

            const supportedEvent = ExternalEvents.TRACK_CHANGE_EVENT;
            const eventCallback = () => {};

            playerInterface.addEventListener(supportedEvent, eventCallback);
            playerInterface.listeners(supportedEvent).should.have.lengthOf(1);

            playerInterface.removeEventListener(supportedEvent, eventCallback);
            playerInterface.listeners(supportedEvent).should.have.lengthOf(0);
        });
    });
});
