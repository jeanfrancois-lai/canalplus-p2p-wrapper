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
        const adaptations = this._player.man.adaptations[trackView.type];
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
        const result = [];

        const maxTimeStamp = beginTime + duration * representation.index.timescale;
        for (const timelineObject of representation.index.timeline) {
            for (let i = 0; i <= timelineObject.r; i++) {
                const timeStamp = timelineObject.ts + i * timelineObject.d;
                if (timeStamp < beginTime) {
                    continue;
                }

                const segmentView = new SegmentView({ timeStamp, trackView });
                if (segmentView.timeStamp < maxTimeStamp) {
                    result.push(segmentView);
                } else {
                    return result;
                }
            }
        }

        return result;
    }

    getTrackList() {
        const tracks = [];

        const manifest = this._player.man;
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