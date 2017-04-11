import TrackView from '../lib/integration/TrackView';
import SegmentView from '../lib/integration/SegmentView';
import MediaMap from '../lib/integration/MediaMap';

import manifest from './mocks/Manifest';

const VIDEO_TRACK_1 = new TrackView({ adaptationId: 0, representationId: 0, type: 'video' });
const VIDEO_TRACK_2 = new TrackView({ adaptationId: 0, representationId: 1, type: 'video' });
const AUDIO_TRACK_1 = new TrackView({ adaptationId: 1, representationId: 0, type: 'audio' });
const AUDIO_TRACK_2 = new TrackView({ adaptationId: 1, representationId: 1, type: 'audio' });

describe('MediaMap', () => {
    describe('getSegmentTime', () => {
        it('should return time stamp of a given segment', () => {
            const timeStamp = 123456789.0987654321;
            const segmentView = new SegmentView({ timeStamp, trackView: VIDEO_TRACK_1 });
            const mediaMap = new MediaMap({});
            mediaMap.getSegmentTime(segmentView).should.be.equal(timeStamp);
        });
    });

    describe('getSegmentList', () => {
        let player;
        let mediaMap;

        beforeEach(() => {
            player = {
                man: manifest,
            };

            mediaMap = new MediaMap(player);
        });

        it('Should return empty list for an unkown track(video)', () => {
            const segmentList = mediaMap.getSegmentList(VIDEO_TRACK_2, 0, 100);
            segmentList.should.have.lengthOf(0);
        });
        it('Should return empty list for an unkown track(audio)', () => {
            const segmentList = mediaMap.getSegmentList(AUDIO_TRACK_2, 0, 100);
            segmentList.should.have.lengthOf(0);
        });
        it('Should return empty list if time interval is out of manifest range', () => {
            const segmentList = mediaMap.getSegmentList(VIDEO_TRACK_1, 1000, 100);
            segmentList.should.have.lengthOf(0);
        });
        it('Should return segments for valid video track and time', () => {
            const segmentList = mediaMap.getSegmentList(VIDEO_TRACK_1, 0, 100);
            segmentList.length.should.be.greaterThan(0);
        });
        it('Should return segments for valid audio track and time', () => {
            const segmentList = mediaMap.getSegmentList(AUDIO_TRACK_1, 0, 100);
            segmentList.length.should.be.greaterThan(0);
        });
        it('First segment time stamp should be >= to requested start time', () => {
            const segmentList = mediaMap.getSegmentList(VIDEO_TRACK_1, 50, 70);
            mediaMap.getSegmentTime(segmentList[0]).should.be.equal(50);
        });
        it('Last segment time stamp should be < (requested start time + duration)', () => {
            const segmentList = mediaMap.getSegmentList(VIDEO_TRACK_1, 50, 70);
            mediaMap.getSegmentTime(segmentList[segmentList.length - 1]).should.be.equal(118);
        });
    });

    describe('getTrackList', () => {
        it('should return list of all available tracks', () => {
            const player = {
                man: manifest,
            };
            const mediaMap = new MediaMap(player);
            const tracks = mediaMap.getTrackList();

            tracks.should.have.lengthOf(2);
            tracks[0].isEqual(AUDIO_TRACK_1).should.be.true();
            tracks[1].isEqual(VIDEO_TRACK_1).should.be.true();
        });
    });
});
