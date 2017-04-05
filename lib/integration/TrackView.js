class TrackView {

    constructor({ periodId, adaptationId, representationId, type }) {
        this.periodId = periodId || 0;
        this.adaptationId = adaptationId;
        this.representationId = representationId;
        this.type = type;
    }

    static makeIDString(periodId, adaptationId, representationId) {
        return `P${periodId}A${adaptationId}R${representationId}`;
    }

    /**
      * @returns {String}
      */
    viewToString() {
        return TrackView.makeIDString(this.periodId, this.adaptationId, this.representationId);
    }

    /**
      * @param trackView {TrackView}
      * @returns {boolean}
      */
    isEqual(trackView) {
        return !!trackView &&
            this.periodId === trackView.periodId &&
            this.adaptationId === trackView.adaptationId &&
            this.representationId === trackView.representationId;
    }
}

export default TrackView;
