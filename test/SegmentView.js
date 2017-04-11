import SegmentView from '../lib/integration/SegmentView';
import TrackView from '../lib/integration/TrackView';

const VIDEO_TRACK_1 = new TrackView({ adaptationId: 0, representationId: 0 });
const VIDEO_TRACK_2 = new TrackView({ adaptationId: 0, representationId: 1 });
const AUDIO_TRACK_1 = new TrackView({ adaptationId: 1, representationId: 0 });
const AUDIO_TRACK_2 = new TrackView({ adaptationId: 1, representationId: 1 });

describe('SegmentView', () => {
    describe('fromArrayBuffer & toArrayBuffer', () => {
        it('Should be equal to its duplicate if timeStamp < 2^32', () => {
            const segmentView = new SegmentView({ timeStamp: 123455, trackView: VIDEO_TRACK_1 });
            const arrayBuffer = segmentView.toArrayBuffer();
            SegmentView.fromArrayBuffer(arrayBuffer).isEqual(segmentView).should.be.true();
        });

        it('Should be equal to its duplicate if timeStamp >= 2^32', () => {
            const segmentView = new SegmentView({ timeStamp: 14609737460, trackView: VIDEO_TRACK_1 });
            const arrayBuffer = segmentView.toArrayBuffer();
            SegmentView.fromArrayBuffer(arrayBuffer).isEqual(segmentView).should.be.true();
        });
    });

    describe('isEqual', () => {
        it('Should be equal for same timeStamp and TrackView', () => {
            const segmentView1 = new SegmentView({ timeStamp: 18609737460.56, trackView: VIDEO_TRACK_1 });
            const segmentView2 = new SegmentView({ timeStamp: 18609737460.56, trackView: VIDEO_TRACK_1 });
            segmentView1.isEqual(segmentView2).should.be.true();
        });

        it('Should NOT be equal for same timeStamp and DIFFERENT TrackView', () => {
            const segmentView1 = new SegmentView({ timeStamp: 3.14159, trackView: VIDEO_TRACK_1 });
            const segmentView2 = new SegmentView({ timeStamp: 3.14159, trackView: AUDIO_TRACK_1 });
            segmentView1.isEqual(segmentView2).should.be.false();
        });

        it('Should NOT be equal for DIFFERENT timeStamp and same TrackView', () => {
            const segmentView1 = new SegmentView({ timeStamp: 0, trackView: VIDEO_TRACK_2 });
            const segmentView2 = new SegmentView({ timeStamp: 18609737460.56, trackView: VIDEO_TRACK_2 });
            segmentView1.isEqual(segmentView2).should.be.false();
        });

        it('Should NOT be equal for DIFFERENT timeStamp and DIFFERENT TrackView', () => {
            const segmentView1 = new SegmentView({ timeStamp: 3.14159, trackView: AUDIO_TRACK_1 });
            const segmentView2 = new SegmentView({ timeStamp: 2.71828, trackView: AUDIO_TRACK_2 });
            segmentView1.isEqual(segmentView2).should.be.false();
        });
    });

    describe('isInTrack', () => {
        it('Should be in track', () => {
            const segmentView = new SegmentView({ timeStamp: 1.61803, trackView: VIDEO_TRACK_1 });

            segmentView.isInTrack(VIDEO_TRACK_1).should.be.true();
        });

        it('Should NOT be in track if adaptationId is DIFFERENT', () => {
            const trackView = AUDIO_TRACK_1;
            const segmentView = new SegmentView({ timeStamp: 1.61803, trackView: VIDEO_TRACK_1 });

            segmentView.isInTrack(trackView).should.be.false();
        });

        it('Should NOT be in track if representationId is DIFFERENT', () => {
            const trackView = AUDIO_TRACK_1;
            const segmentView = new SegmentView({ timeStamp: 1.61803, trackView: AUDIO_TRACK_2 });

            segmentView.isInTrack(trackView).should.be.false();
        });
    });

    describe('viewToString', () => {
        it('Same segments should have the same string output', () => {
            const segmentView1 = new SegmentView({ timeStamp: 1.61803, trackView: AUDIO_TRACK_2 });
            const segmentView2 = new SegmentView({ timeStamp: 1.61803, trackView: AUDIO_TRACK_2 });
            segmentView1.viewToString().should.be.equal(segmentView2.viewToString());
        });
        it('Segments from time tracks should have different string representation', () => {
            const segmentView1 = new SegmentView({ timeStamp: 1.61803, trackView: VIDEO_TRACK_2 });
            const segmentView2 = new SegmentView({ timeStamp: 234234, trackView: VIDEO_TRACK_2 });
            segmentView1.viewToString().should.not.be.equal(segmentView2.viewToString());
        });
        it('Segments from different tracks should have different string representation', () => {
            const segmentView1 = new SegmentView({ timeStamp: 1.61803, trackView: AUDIO_TRACK_1 });
            const segmentView2 = new SegmentView({ timeStamp: 1.61803, trackView: AUDIO_TRACK_2 });
            segmentView1.viewToString().should.not.be.equal(segmentView2.viewToString());
        });
    });

    describe('getId', () => {
        it('should return timeStamp as id', () => {
            const timeStamp = 234234453456345623451;
            const segmentView = new SegmentView({ timeStamp, trackView: VIDEO_TRACK_1 });
            segmentView.getId().should.be.equal(timeStamp);
        });
    });

    describe('toJSON', () => {
        it('The segmentView can be transfered through serialisation', function() {
            const segmentView = new SegmentView({ timestamp: 252323423423.3453, trackView: VIDEO_TRACK_1 });
            const transferedSegmentView = new SegmentView(JSON.parse(JSON.stringify(segmentView)));
            transferedSegmentView.isEqual(segmentView).should.be.true();
        });
    });
});
