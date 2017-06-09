import TrackView from './TrackView';
import SegmentView from './SegmentView';

class MediaMap {
    constructor(player) {
        this._player = player;
    }

    getSegmentTime(segmentView) {
        return segmentView.timeStamp;
    }

    getSegmentList(trackView, beginTime, duration) {
        const adaptations = this._player.getManifest().adaptations[trackView.type];
        for (const adaptation of adaptations) {
            if (adaptation.id === trackView.adaptationId) {
                for (const representation of adaptation.representations) {
                    if (representation.id === trackView.representationId) {
                        return this._getSegmentsFromRepresentation(representation, trackView, beginTime, duration);
                    }
                }

                break;
            }
        }

        return [];
    }

    _getSegmentsFromRepresentation(representation, trackView, beginTime, duration) {
        const segments = representation.index.getSegments(beginTime, duration);
        const result = segments.map(segment => new SegmentView({
            trackView,
            timeStamp: segment.time / segment.timescale
        }));

        return result;
    }

    getTrackList() {
        const tracks = [];

        const manifest = this._player.getManifest();
        for (const adaptationType of ['audio', 'video']) {
            for (const adaptation of manifest.adaptations[adaptationType]) {
                for (const representation of adaptation.representations) {
                    tracks.push(new TrackView({
                        adaptationId: adaptation.id,
                        representationId: representation.id,
                        type: adaptationType,
                    }));
                }
            }
        }

        return tracks;
    }
}

export default MediaMap;