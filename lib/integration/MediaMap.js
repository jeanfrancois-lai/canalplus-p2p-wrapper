import TrackView from './TrackView';

class MediaMap {
    constructor(manifest) {
        this._manifest = manifest;
    }

    getSegmentTime(segmentView) {
        return segmentView.timeStamp;
    }

    getSegmentList(trackView, beginTime, duration) {
        return [];
    }

    getTrackList() {
        const tracks = [];

        for (const adaptationType of ['audio', 'video']) {
            for (const adaptation of this._manifest.adaptations[adaptationType]) {
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