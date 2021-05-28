import { sketchSettings } from '..';
import audio from '../../audio';
import { removeItemFromArray, getRandomInteger } from '../../utils';

class Bubble {
	constructor(id, xPosition, yPosition, xVelocity, yVelocity) {
		this.pos = sketchSettings.ctx.createVector(xPosition, yPosition);
		this.vel = sketchSettings.ctx.createVector(
			3 * xVelocity,
			3 * yVelocity
		);
		this.acc = sketchSettings.ctx.createVector(0, 0);
		this.diameter = sketchSettings.bubbleDiameter;
		this.offscreenX = id * this.diameter;
		this.offscreenY = 0;
	}

	render() {
		this.update();
		this.display();
		this.checkForEdgeCollision();
	}

	display() {
		sketchSettings.ctx.image(
			sketchSettings.offscreenCanvas,
			this.pos.x - this.diameter / 2,
			this.pos.y - this.diameter / 2,
			this.diameter,
			this.diameter,
			this.offscreenX,
			this.offscreenY,
			this.diameter,
			this.diameter
		);
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0); // don't let acceleration accumulate
		this.vel.limit(this.maxVelocity); // limit the velocity
	}

	checkForEdgeCollision() {
		const bubbleRadius = this.diameter / 2;
		const { borderSize } = sketchSettings;

		// Position is calculated from center of bubble
		// Factor in bubble radius to calculate it from bubble edge

		// Top edge
		if (this.pos.y - bubbleRadius < borderSize) {
			this.handleEdgeCollision(0);
		}

		// Right edge
		if (this.pos.x + bubbleRadius > sketchSettings.width - borderSize) {
			this.handleEdgeCollision(1);
		}

		// Bottom edge
		if (this.pos.y + bubbleRadius > sketchSettings.height - borderSize) {
			this.handleEdgeCollision(2);
		}

		// Left edge
		if (this.pos.x - bubbleRadius < borderSize) {
			this.handleEdgeCollision(3);
		}
	}

	// Take in parameter corresponding to edge
	// top: 0, right: 1, bottom: 2, left: 3
	handleEdgeCollision(edgeId) {
		// Reverse appropriate velocity to bounce bubble
		if (edgeId === 0 || edgeId === 2) {
			this.vel.y *= -1;
		} else {
			this.vel.x *= -1;
		}

		// Play tone
		audio.playTone(edgeId);

		// Update bubble appearance to match edge
		this.offscreenX = edgeId * this.diameter;
		this.id = edgeId;

		// Toggle roadblock and border behavior
		sketchSettings.roadblocks[edgeId].toggle(edgeId);
		sketchSettings.borders[edgeId].toggle();
	}

	// Check if bubble is colliding with roadblocks
	// Adjust bubble velocity and play tone if collision
	checkRoadblockCollision() {
		const minDistance =
			(this.diameter + sketchSettings.roadblockDiameter) / 2;

		sketchSettings.roadblocks.forEach((item, index) => {
			if (item.visible) {
				// Calculate distance to roadblock
				const x1 = item.pos.x;
				const y1 = item.pos.y;

				const x2 = this.pos.x;
				const y2 = this.pos.y;
				//
				// sketchSettings.ctx.stroke('#000');
				// sketchSettings.ctx.line(x1, y1, x2, y2);

				const xDistance = x1 - x2;
				const yDistance = y1 - y2;
				const distance = Math.sqrt(
					xDistance * xDistance + yDistance * yDistance
				);

				if (distance <= minDistance) {
					// Play tone
					audio.playTone(index, 0.5);
					// Calculate angle
					const angle = sketchSettings.ctx.atan2(
						yDistance,
						xDistance
					);
					const targetX = this.pos.x + Math.cos(angle) * minDistance;
					const targetY = this.pos.y + Math.sin(angle) * minDistance;
					const ax = targetX - item.pos.x;
					const ay = targetY - item.pos.y;

					// Adjust velocity of bubble
					this.vel.x -= ax;
					this.vel.y -= ay;
				}
			}
		});
	}
}

export const removeBubble = () => {
	sketchSettings.bubbles = removeItemFromArray(sketchSettings.bubbles, 0, 1);
};

// Generate a random directional velocity
const generateDirectionalVelocity = () => {
	const v = Math.random() < 0.5 ? -1 : 1;
	return v;
};

export const createBubble = (xPosition, yPosition) => {
	const numberOfBubbleTypes = 4;
	const maxNumberOfBubblesOnScreen = 6;

	if (sketchSettings.bubbles.length >= maxNumberOfBubblesOnScreen) {
		this.removeBubble();
	}

	// Generate a random type id for bubble
	const id = getRandomInteger(0, numberOfBubbleTypes - 1);

	// Generate random directional velocities
	const xVelocity = generateDirectionalVelocity();
	const yVelocity = generateDirectionalVelocity();

	sketchSettings.bubbles.push(
		new Bubble(id, xPosition, yPosition, xVelocity, yVelocity)
	);
};
