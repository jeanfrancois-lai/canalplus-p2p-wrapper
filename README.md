# canalplus-p2p-wrapper

This module integrates [the Streamroot P2P module](http://streamroot.io) with CANAL+ video player -- `one-player-core`. Supported versions of the player are v2.0.9 & v2.0.10.

## Build

1. Install the dependencies with `npm install`.
1. Build the wrapper `npm run build`.
1. This will create `canalplus-p2p-wrapper.js` in the `dist/` folder.

## Usage

The wrapper is available as a npm package `streamroot-canalplus-p2p-wrapper`.

Include `one-player-core` and wrapper builds to your app:
```
<script type="text/javascript" src="one-player-core.js"></script>
<script type="text/javascript" src="canalplus-p2p-wrapper.js"></script>
```

Instantiate `one-player-core player`, instantiate the wrapper passing player instance and `p2pConfig` as constructor params. Use player as usual. Specify your `streamrootKey` in the `p2pConfig` object. If you don't have a `streamrootKey`, go to [Streamroot's dashboard](http://dashboard.streamroot.io/) and request a trial account. It's free. You can check other `p2pConfig` options in the [documentation](https://streamroot.readme.io/docs/p2p-config).

```html
<script>
    var videoElement = document.getElementById("videoPlayer");
    var playerOptions = {
        videoElement: videoElement,
    };
    var player = new RxPlayer(playerOptions);

    var p2pConfig = {
        streamrootKey: YOUR_STREAMROOT_KEY_HERE,
        // additional parameters if needed
    };
    var wrapper = new CanalPlusWrapper(player, p2pConfig);

    var loadVideoOptions = {
        url: MANIFEST_URL,
        transport: "smooth",
        autoPlay: true,
    };

    player.loadVideo(loadVideoOptions);
</script>
```

To enable p2p stats graphs add this to page source code:
```html
<div id="streamroot-graphs"></div>
<script src="https://tools.streamroot.io/usage-graphs/latest/graphs.js"></script>
```

Example page:
```html
<html>
    <head>
    <title>Streamroot P2P wrapper for Canal+ player demo</title>

    <script type="text/javascript" src="one-player-core.js"></script>
    <script type="text/javascript" src="../dist/canalplus-p2p-wrapper.js"></script>
    </head>

    <body>
        <div id="videoContainer">
            <video id="videoPlayer" width="480" height="360" controls muted></video>
        </div>

        <script>
            var videoElement = document.getElementById("videoPlayer");
            videoElement.addEventListener('error', function(event) {
                console.log(event);
                console.log(videoElement.error);
            });

            var playerOptions = {
                videoElement: videoElement,
            };
            var player = new RxPlayer(playerOptions);

            var p2pConfig = {
                streamrootKey: YOUR_STREAMROOT_KEY_HERE,
            };
            var wrapper = new CanalPlusWrapper(player, p2pConfig);

            var loadVideoOptions = {
                url: MANIFEST_URL,
                transport: "smooth",
                autoPlay: true,
            };

            player.loadVideo(loadVideoOptions);
        </script>

        <div id="streamroot-graphs"></div>
        <script src="https://tools.streamroot.io/usage-graphs/latest/graphs.js"></script>
    </body>
</html>
```

You can also check `example/index.html` for usage example.

## Development

1. Use `npm run lint` to lint-check the code.
1. Use `npm run test_unit` to run unit tests.
1. You can run all prebuild checks with one command `npm run prebuild_check`, it will check linting and run unit tests.
1. `npm run build_dev` will make non-compressed non-uglified build at `dist/canalplus-p2p-wrapper.js`.
1. `npm run watch` produces same output as `npm run build_dev` and triggers rebuild each time the source code is changed.

## Demo

1. `npm run demo` will start Webpack dev server at [http://localhost:8080/](http://localhost:8080/).
1. Open [the example page](http://localhost:8080/example).

## Known issues and limitations

1. Works only with `smooth` transport at the moment.
1. Wrapper was tested with `one-player-core` v2.0.9 & v2.0.10 only, compatibility with other versions in not guaranteed.
1. Wrapper was tested only on one provided live stream. Need more streams (Live, VOD, multiple language, subtitles) to test.
1. P2P performance on live streams depends on latency from the live edge, so we need to adjust it.
1. Using same player instance for playing multiple manifests/streams is not supported in the moment. It can be implemented if support of such use case in necessary.
