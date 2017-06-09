import { stringToUint8Array, uint8ArrayToString } from '../utils/StringByteArrayUtils';
import TrackView from './TrackView';

class SegmentView {

    /**
    * @param arrayBuffer {ArrayBuffer}
    * @returns {SegmentView}
    */
    static fromArrayBuffer(arrayBuffer) {
        let u8data = new Uint8Array(arrayBuffer);

        // timestamp
        let f64buffer = u8data.slice(0, 8).buffer;
        let f64data = new Float64Array(f64buffer);
        let timeStamp = f64data[0];

        // trackview representationId
        let u32buffer = u8data.slice(8, 12).buffer;
        let u32data = new Uint32Array(u32buffer);
        let representationId = u32data[0];

        // trackview adaptationId (string)
        let adaptationId = uint8ArrayToString(u8data.slice(12));

        let trackView = { adaptationId, representationId };

        return new SegmentView({timeStamp, trackView});
    }

    /**
      * @param {Object} object
      */
    constructor({ timeStamp, trackView }) {
        this.timeStamp = timeStamp;
        this.trackView = new TrackView(trackView);
    }

    /**
      * Determines if a segment represent the same media chunk than another segment
      * @param segmentView {SegmentView}
      * @returns {boolean}
      */
    isEqual(segmentView) {
        if (!segmentView) {
            return false;
        }
        let {timeStamp, trackView} = segmentView;
        return this.timeStamp === timeStamp && this.trackView.isEqual(trackView);
    }

    /**
      * @param trackView {TrackView}
      * @returns {boolean}
      */
    isInTrack(trackView) {
        return this.trackView.isEqual(trackView);
    }

    /**
      * @returns {String}
      */
    viewToString() {
        return `${this.trackView.viewToString()}S${this.timeStamp}`;
    }

    /**
      * @returns {ArrayBuffer}
      */
    toArrayBuffer() {
        let f64data = new Float64Array([this.timeStamp]);
        let u32data = new Uint32Array([this.trackView.representationId]);
        let u8data = stringToUint8Array(this.trackView.adaptationId);

        let array = new Uint8Array(f64data.byteLength + u32data.byteLength + u8data.byteLength);
        array.set(new Uint8Array(f64data.buffer), 0);
        array.set(new Uint8Array(u32data.buffer), 8);
        array.set(new Uint8Array(u8data.buffer), 12);

        return array.buffer;
    }

    getId() {
        return this.timeStamp;
    }
}

export default SegmentView;
