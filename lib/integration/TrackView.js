class TrackView {

    constructor({ adaptationId, representationId, type }) {
        this.adaptationId = adaptationId;
        this.representationId = representationId;
        this.type = type;
    }

    static makeIDString(periodId, adaptationId, representationId) {
        return `A${adaptationId}R${representationId}`;
    }

    /**
      * @returns {String}
      */
    viewToString() {
        return TrackView.makeIDString(this.adaptationId, this.representationId);
    }

    /**
      * @param trackView {TrackView}
      * @returns {boolean}
      */
    isEqual(trackView) {
        return !!trackView &&
            this.adaptationId === trackView.adaptationId &&
            this.representationId === trackView.representationId;
    }
}

export default TrackView;
