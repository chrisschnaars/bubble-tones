import createRoadblocks from './Roadblock';
import createBorders from './Border';
import createOffscreenCanvas from './OffscreenCanvas';

const sketchSettings = {
	ctx: undefined,
	backgroundCanvas: undefined,
	offscreenCanvas: undefined,
	height: undefined,
	width: undefined,
	strokeSize: 4,
	bubbleFillSize: 32,
	bubbleDiameter: 36,
	bubbles: [],
	roadblockFillSize: 80,
	roadblockDiameter: 84,
	roadblocks: [],
	borderSize: 20,
	borders: [],
	numberOfUniqueElements: 4,
	isPlaying: undefined,
};

function toggleAnimation() {
	if (sketchSettings.playing) {
		sketchSettings.ctx.noLoop();
	} else {
		sketchSettings.ctx.loop();
	}

	sketchSettings.playing = !sketchSettings.playing;
}

function sketch(p) {
	sketchSettings.ctx = p;

	sketchSettings.ctx.myCustomRedrawAccordingToNewPropsHandler = (props) => {
		if (
			props.width !== sketchSettings.width ||
			props.height !== sketchSettings.height
		) {
			sketchSettings.width = props.width;
			sketchSettings.height = props.height;
			sketchSettings.ctx.setup();
		}

		if (props.isPlaying) {
			sketchSettings.isPlaying = props.isPlaying;
		}
	};

	sketchSettings.ctx.setup = () => {
		sketchSettings.ctx.createCanvas(
			sketchSettings.width,
			sketchSettings.height
		);

		// Draw offscreen canvas with all bubbles and roadblocks
		sketchSettings.offscreenCanvas = createOffscreenCanvas(
			sketchSettings.ctx,
			sketchSettings.strokeSize,
			sketchSettings.bubbleFillSize,
			sketchSettings.bubbleDiameter,
			sketchSettings.roadblockFillSize,
			sketchSettings.roadblockDiameter
		);

		// Draw offscreen background canvas
		sketchSettings.backgroundCanvas = sketchSettings.ctx.createGraphics(
			sketchSettings.width,
			sketchSettings.height
		);

		sketchSettings.backgroundCanvas.background(
			sketchSettings.ctx.color('#f7f5f3')
		);

		createRoadblocks();
		createBorders();
	};

	sketchSettings.ctx.draw = () => {
		// Background canvas
		sketchSettings.ctx.image(sketchSettings.backgroundCanvas, 0, 0);

		if (sketchSettings.bubbles.length > 0) {
			sketchSettings.bubbles.forEach((item) => {
				item.render();
				item.checkRoadblockCollision();
			});
		}

		sketchSettings.roadblocks.forEach((item) => {
			if (item.visible) {
				item.render();
			}
		});

		sketchSettings.borders.forEach((item) => {
			if (item.active) {
				item.display();
			}
		});
	};
}

export { sketchSettings, toggleAnimation, sketch };
