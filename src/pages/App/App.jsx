import React, { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import { sketch, toggleAnimation } from '../../animation';
import audio from '../../audio';
import { createBubble, removeBubble } from '../../animation/Bubble';
import Main from '../../components/Main/Main';
import OnboardingPanel from '../../components/OnboardingPanel/OnboardingPanel';
import ControlBar from '../../components/ControlBar/ControlBar';
import InfoPanel from '../../components/InfoPanel/InfoPanel';
import { getRandomInteger } from '../../utils';

function useWindowSize() {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);
	return size;
}

function useRootTone() {
	const defaultRootTone = 220;

	const [rootTone, setRootTone] = useState(defaultRootTone);
	const updateRootTone = (value) => {
		setRootTone(value);
		audio.setRootTone(value);
	};

	return { rootTone, updateRootTone };
}

const App = () => {
	const [width, height] = useWindowSize();
	const [isOnboarding, setIsOnboarding] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showInfoPanel, setShowInfoPanel] = useState(false);
	const [numberOfBubbles, setNumberOfBubbles] = useState(0);

	const { rootTone, updateRootTone } = useRootTone();

	const togglePlaying = () => {
		setIsPlaying((prevIsPlaying) => !prevIsPlaying);
		toggleAnimation();
	};

	const toggleInfoPanel = () => {
		setShowInfoPanel(!showInfoPanel);
	};

	const toggleOnboarding = () => {
		if (isOnboarding) {
			setIsOnboarding((prevState) => false);
			audio.init();
		}
	};

	const addBubbleToCanvas = (e) => {
		if (isOnboarding) {
			toggleOnboarding();
		}

		if (numberOfBubbles < 6) {
			// Update bubble count state
			setNumberOfBubbles((prevCount) => {
				return prevCount + 1;
			});

			// Create new bubble
			const xPosition =
				e !== null
					? e.clientX
					: getRandomInteger(90, window.innerWidth - 90);
			const yPosition =
				e !== null
					? e.clientY
					: getRandomInteger(90, window.innerHeight - 90);
			createBubble(xPosition, yPosition);

			// Unpause animation if paused
			if (!isPlaying) {
				togglePlaying();
			}
		}
	};

	const removeBubbleFromCanvas = () => {
		if (numberOfBubbles > 0) {
			// Update bubble count state
			setNumberOfBubbles((prevCount) => prevCount - 1);

			// Remove bubble object
			removeBubble();
		}
	};

	// Add event listeners
	useEffect(() => {
		function handleKeyDown(e) {
			const keyPressed = e.key.toString().toLowerCase();

			if (keyPressed === 'q') {
				addBubbleToCanvas(null);
			}

			if (keyPressed === 'p') {
				removeBubbleFromCanvas();
			}

			if (keyPressed === ' ') {
				togglePlaying();
			}
		}
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	return (
		<div className="app">
			<Main handleClick={addBubbleToCanvas}>
				<OnboardingPanel isVisible={isOnboarding} />
				<P5Wrapper
					sketch={sketch}
					height={height - 81}
					width={width}
					isPlaying={isPlaying}
				/>
			</Main>
			<ControlBar
				isPlaying={isPlaying}
				rootTone={rootTone}
				toggleInfoPanel={toggleInfoPanel}
				togglePlaying={togglePlaying}
				updateRootTone={updateRootTone}
			/>
			<InfoPanel
				isVisible={showInfoPanel}
				toggleVisibility={toggleInfoPanel}
			/>
		</div>
	);
};

export default App;
