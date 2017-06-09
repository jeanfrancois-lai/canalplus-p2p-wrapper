function createGetSegments(timeline, timescale) {
    return (beginTime, duration) => {
        const segments = [];
        const endTime = beginTime + duration;

        for (const timeSegment of timeline) {
            for (let i = 0; i <= timeSegment.r; i++) {
                let segmentTime = timeSegment.ts + i * timeSegment.d;
                let scaledTime = segmentTime / timescale;
                if (scaledTime >= beginTime && scaledTime < endTime) {
                    segments.push({
                        time: segmentTime,
                        timescale,
                    });
                }
            }
        }

        return segments;
    };
}

const TIME_SCALE = 1;

const VIDEO_TIMELINE = [
    // first segment starts at 0 seconds, 100 segments 2 seconds each, 200 seconds total
    {
        ts: 0,
        r: 99,
        d: 2,
    },
];

const AUDIO_TIMELINE = [
    // first segment starts at 0 seconds, 4 segments 1.5 seconds each, 6 seconds total
    {
        ts: 0,
        r: 3,
        d: 1.5,
    },
    // first segment starts at 6 seconds, 9 segments 6 seconds each, 54 seconds total,
    // total audio track duration at this point -- 60 seconds.
    {
        ts: 6,
        r: 8,
        d: 6,
    },
    // first segment starts at 60 seconds, 70 segments 2 seconds each, 140 seconds total,
    // total audio track duration at this point -- 200 seconds.
    {
        ts: 60,
        r: 69,
        d: 2,
    },
];

export default {
    isLive: false,
    adaptations: {
        video: [
            {
                id: 0,
                representations: [
                    {
                        id: 0,
                        index: {
                            timescale: TIME_SCALE,
                            timeline: VIDEO_TIMELINE,
                            getSegments: createGetSegments(VIDEO_TIMELINE, TIME_SCALE),
                        }
                    }
                ],
            },
        ],
        audio: [
            {
                id: 1,
                representations: [
                    {
                        id: 0,
                        index: {
                            timescale: TIME_SCALE,
                            timeline: AUDIO_TIMELINE,
                            getSegments: createGetSegments(AUDIO_TIMELINE, TIME_SCALE),
                        }
                    }
                ],
            },
        ],
    }
};
