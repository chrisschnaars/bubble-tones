import React from 'react';
import './Canvas.css';

export default function Canvas() {
	const canvasRef = React.useRef(null);

	return <canvas ref={canvasRef} />;
}
