import TrackView from '../lib/integration/TrackView';

const ADAPTATION_1 = 'video_1';
const ADAPTATION_2 = 'video_2';

describe('TrackView',() => {
    describe('isEqual', () => {
        it('should be equal', () => {
            let trackView1 = new TrackView({ adaptationId: ADAPTATION_1, representationId: 0 });
            let trackView2 = new TrackView({ adaptationId: ADAPTATION_1, representationId: 0 });
            trackView1.isEqual(trackView2).should.be.true();
        });
        it('should not be equal if representationId is different', () => {
            let trackView1 = new TrackView({ adaptationId: ADAPTATION_2, representationId: 0 });
            let trackView2 = new TrackView({ adaptationId: ADAPTATION_2, representationId: 1 });
            trackView1.isEqual(trackView2).should.be.false();
        });
        it('should not be equal if adaptationId is different', () => {
            let trackView1 = new TrackView({ adaptationId: ADAPTATION_2, representationId: 0 });
            let trackView2 = new TrackView({ adaptationId: ADAPTATION_1, representationId: 0 });
            trackView1.isEqual(trackView2).should.be.false();
        });
    });

    describe('viewToString', () => {
        it('same tracks should have the same string output', () => {
            let trackView1 = new TrackView({ adaptationId: ADAPTATION_2, representationId: 0 });
            let trackView2 = new TrackView({ adaptationId: ADAPTATION_2, representationId: 0 });
            trackView1.viewToString().should.eql(trackView2.viewToString());
        });
        it('different track should have different output (representationId)', () => {
            let trackView1 = new TrackView({ adaptationId: ADAPTATION_2, representationId: 0 });
            let trackView2 = new TrackView({ adaptationId: ADAPTATION_2, representationId: 1 });
            trackView1.viewToString().should.not.eql(trackView2.viewToString());
        });
        it('different track should have different output (adaptationId)', () => {
            let trackView1 = new TrackView({ adaptationId: ADAPTATION_1, representationId: 0 });
            let trackView2 = new TrackView({ adaptationId: ADAPTATION_2, representationId: 0 });
            trackView1.viewToString().should.not.eql(trackView2.viewToString());
        });
    });
});
