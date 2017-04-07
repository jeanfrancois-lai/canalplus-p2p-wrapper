import { Observable } from 'rxjs/Observable';
import DefaultTransport from '../oneplayer/net/index';
import TrackView from '../integration/TrackView';
import SegmentView from '../integration/SegmentView';

class Transport {
    patchTransport(options) {
        let patchedTransport = DefaultTransport[options.transport]();

        this._patchVideoLoader(patchedTransport.video);

        options.transport = patchedTransport;

        return options;
    }

    setPeerAgent(peerAgent) {
        this._peerAgent = peerAgent;
    }

    _patchVideoLoader(video) {
        this._originalVideoLoader = video.loader;

        video.loader = ({ segment }) => {
            if (segment.init || !this._peerAgent) {
                return this._originalVideoLoader({ segment });
            }

            const wrapGetSegment = (segmentUrl, segmentView) => {
                return Observable.create((observer) => {
                    const onSuccess = (segmentData, stats) => {
                        const toReturn = {
                            responseData: segmentData,
                            size: segmentData.byteLength,
                            duration: (stats.p2pDuration || 0) + (stats.cdnDuration || 0),
                        };
                        observer.next(toReturn);
                        observer.complete();
                    };

                    const onError = () => {
                        observer.error(new Error("Error in getSegment"));
                    };

                    this._peerAgent.getSegment({ url: segmentUrl } , { onSuccess: onSuccess, onError: onError }, segmentView);
                });
            };

            const trackView = new TrackView({
                adaptationId: segment.ada.id,
                representationId: segment.rep.id,
                type: segment.ada.type
            });

            const segmentView = new SegmentView({
                timeStamp: segment.time,
                trackView
            });

            const segmentUrl = segment.getResolvedURL()
                .replace(/\{bitrate\}/g, segment.rep.bitrate)
                .replace(/\{start time\}/g, segment.time);

            try {
                return wrapGetSegment(segmentUrl, segmentView)
                        .catch(error => {
                            console.error(error);
                            return this._originalVideoLoader({ segment });
                        });
            } catch (error) {
                console.error(error);
                return this._originalVideoLoader({ segment });
            }
        };
    }
}

export default Transport;