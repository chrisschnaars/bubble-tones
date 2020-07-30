import { sketchSettings } from '..';
import { bubbleColors } from '../Bubble';

// Time that border will be illuminated after being struck
const borderDisplayTime = 8;

class Border {
	constructor(x, y, w, h, color, id) {
		this.xPosition = x;
		this.yPosition = y;
		this.width = w;
		this.height = h;
		this.color = color;
		this.active = false;
		this.activeTime = 0;
		this.id = id;
	}

	toggle() {
		this.active = true;
		this.activeTime = borderDisplayTime;
	}

	display() {
		if (this.activeTime > 0) {
			sketchSettings.ctx.noStroke();
			sketchSettings.ctx.fill(this.color);
			sketchSettings.ctx.rect(
				this.xPosition,
				this.yPosition,
				this.width,
				this.height
			);
			this.activeTime -= 1;
		} else {
			this.active = false;
		}
	}
}

function createBorders() {
	const { height, width, borderSize } = sketchSettings;

	// Position and sizing values
	const xPositions = [0, width - borderSize, 0, 0];
	const yPositions = [0, 0, height - borderSize, 0];
	const wValues = [width, borderSize, width, borderSize];
	const hValues = [borderSize, height, borderSize, height];

	for (let i = 0; i < sketchSettings.numberOfUniqueElements; i += 1) {
		sketchSettings.borders[i] = new Border(
			xPositions[i],
			yPositions[i],
			wValues[i],
			hValues[i],
			bubbleColors[i].fillColor,
			i
		);
	}
}

export default createBorders;
