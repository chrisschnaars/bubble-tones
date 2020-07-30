import { bubbleColors } from '../Bubble';

function drawOffscreenElements(
	offCanvas,
	strokeSize,
	bubbleFillSize,
	bubbleDiameter,
	roadblockFillSize,
	roadblockDiameter
) {
	bubbleColors.forEach((item, index) => {
		// Set color for each set of elements
		const { strokeColor, fillColor } = item;
		offCanvas.fill(fillColor);
		offCanvas.stroke(strokeColor);
		offCanvas.strokeWeight(strokeSize);

		// Draw bubble
		const bX = bubbleDiameter / 2 + index * bubbleDiameter;
		const bY = bubbleDiameter / 2;
		offCanvas.ellipse(bX, bY, bubbleFillSize, bubbleFillSize);

		// Draw roadblock
		const roadblockOffset = bubbleDiameter * bubbleColors.length;
		const rX =
			roadblockOffset +
			(roadblockDiameter / 2 + index * roadblockDiameter);
		const rY = roadblockDiameter / 2;
		offCanvas.ellipse(rX, rY, roadblockFillSize, roadblockFillSize);
	});
}

function createOffscreenCanvas(
	ctx,
	strokeSize,
	bubbleFillSize,
	bubbleDiameter,
	roadblockFillSize,
	roadblockDiameter
) {
	// Calculate offscreen canvas size
	const offCanvasWidth =
		(bubbleDiameter + roadblockDiameter) * bubbleColors.length;
	const offCanvasHeight =
		roadblockDiameter > bubbleDiameter ? roadblockDiameter : bubbleDiameter;

	// Create offscreen canvas
	const offCanvas = ctx.createGraphics(offCanvasWidth, offCanvasHeight);

	// Draw bubble and roadblocks of each color to offscreen canvas
	drawOffscreenElements(
		offCanvas,
		strokeSize,
		bubbleFillSize,
		bubbleDiameter,
		roadblockFillSize,
		roadblockDiameter
	);

	return offCanvas;
}

export default createOffscreenCanvas;
