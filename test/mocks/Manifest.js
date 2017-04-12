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
                            timescale: 1,
                            timeline: [
                                // first segment starts at 0 seconds, 100 segments 2 seconds each, 200 seconds total
                                {
                                    ts: 0,
                                    r: 99,
                                    d: 2,
                                },
                            ],
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
                            timescale: 1,
                            timeline: [
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
                            ],
                        }
                    }
                ],
            },
        ],
    }
};
