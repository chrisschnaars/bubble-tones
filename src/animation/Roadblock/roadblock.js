import { sketchSettings } from '..';
import { getRandomInteger } from '../../utils';

class Roadblock {
	constructor(id) {
		this.id = id;
		this.pos = sketchSettings.ctx.createVector(id * 100, 0);
		this.diameter = sketchSettings.roadblockDiameter;
		this.offscreenX = 144 + id * this.diameter;
		this.offscreenY = 0;
		this.hitCount = 0;
		this.visible = false;
	}

	render() {
		this.display();
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

	checkRoadblockOverlap(x, y) {
		for (let i = 0; i < sketchSettings.roadblocks.length; i += 1) {
			if (this.id !== i) {
				// Calculate distance between roadblocks
				const x1 = x + this.diameter / 2;
				const y1 = y + this.diameter / 2;
				const x2 =
					sketchSettings.roadblocks[i].pos.x + this.diameter / 2;
				const y2 =
					sketchSettings.roadblocks[i].pos.y + this.diameter / 2;
				const distance = sketchSettings.ctx.dist(x1, y1, x2, y2);
				const minDistance = this.diameter + 8;

				// Return true if roadblocks will overlap
				if (distance <= minDistance) {
					return true;
				}
			}
		}

		return false;
	}

	updatePosition(id) {
		// Set minimum distance between border and roadblock
		const borderSpacer = 100;

		const minX = borderSpacer;
		const maxX = sketchSettings.width - borderSpacer;
		const minY = borderSpacer;
		const maxY = sketchSettings.height - borderSpacer;

		// Generate random coordinates
		const x = getRandomInteger(minX, maxX);
		const y = getRandomInteger(minY, maxY);

		// Check if roadblocks are being placed where other roadblocks are
		const overlapping = this.checkRoadblockOverlap(x, y);
		if (overlapping) {
			this.updatePosition(id);
		} else {
			this.pos.x = x;
			this.pos.y = y;
		}
	}

	toggle(edgeId) {
		const maxHitCount = 8;
		this.hitCount += 1;

		if (!this.visible || this.hitCount > maxHitCount) {
			this.visible = true;
			this.hitCount = 0;
			this.updatePosition(edgeId);
		}
	}
}

function createRoadblocks() {
	for (let i = 0; i < sketchSettings.numberOfUniqueElements; i += 1) {
		sketchSettings.roadblocks[i] = new Roadblock(i);
	}
}

export { Roadblock, createRoadblocks };
