import TrackView from '../integration/TrackView';
import SegmentView from '../integration/SegmentView';

class Transport {

    setPeerAgent(peerAgent) {
        this._peerAgent = peerAgent;
    }

    getSegmentLoader() {
        return ({ representation, adaptation, segment, url }, { resolve, fallback }) => {
            if (segment.isInit || !this._peerAgent) {
                fallback();
                return;
            }

            const trackView = new TrackView({
                adaptationId: adaptation.id,
                representationId: representation.id,
                type: adaptation.type,
            });

            const segmentView = new SegmentView({
                timeStamp: segment.time / segment.timescale,
                trackView
            });

            const onSuccess = (segmentData, stats) => {
                resolve({
                    data: segmentData,
                    size: segmentData.byteLength,
                    duration: (stats.p2pDuration || 0) + (stats.cdnDuration || 0),
                });
            };

            const onError = () => {
                console.log(new Error('Error in getSegment'));
                fallback();
            };

            this._peerAgent.getSegment(
                { url } ,
                { onSuccess, onError },
                segmentView
            );
        };
    };
}

export default Transport;
