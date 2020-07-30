import React, { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import { sketch, toggleAnimation } from '../../animation';
import audio from '../../audio';
import { createBubble, removeBubble } from '../../animation/Bubble';
import Main from '../../components/Main';
import OnboardingPanel from '../../components/OnboardingPanel';
import ControlBar from '../../components/ControlBar';
import InfoPanel from '../../components/InfoPanel';
import { getRandomInteger } from '../../utils';

function useWindowSize() {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
			console.log('reset size');
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);
	return size;
}

function useOnboardingStatus() {
	const [onboardingIsVisible, setOnboardingVisibility] = useState(true);
	const toggleOnboarding = () => {
		setOnboardingVisibility(!onboardingIsVisible);
	};

	return { onboardingIsVisible, toggleOnboarding };
}

function usePlayingStatus() {
	const [isPlaying, setIsPlaying] = useState(false);
	const togglePlaying = () => {
		toggleAnimation();
		setIsPlaying(!isPlaying);
	};

	return { isPlaying, togglePlaying };
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

function useInfoPanelStatus() {
	const [infoPanelIsVisible, setInfoPanelVisibility] = useState(false);
	const toggleInfoPanel = () => {
		setInfoPanelVisibility(!infoPanelIsVisible);
	};

	return { infoPanelIsVisible, toggleInfoPanel };
}

function App() {
	const [width, height] = useWindowSize();
	const [numberOfBubbles, setNumberOfBubbles] = useState(0);

	const { onboardingIsVisible, toggleOnboarding } = useOnboardingStatus();
	const { isPlaying, togglePlaying } = usePlayingStatus();
	const { rootTone, updateRootTone } = useRootTone();
	const { infoPanelIsVisible, toggleInfoPanel } = useInfoPanelStatus();

	function addBubbleToCanvas(e) {
		if (numberOfBubbles < 6) {
			// Update bubble count state
			setNumberOfBubbles(numberOfBubbles + 1);

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
		}

		// Unpause animation if paused
		if (!isPlaying) {
			togglePlaying();
		}

		// If first bubble, toggle onboarding and initialize audio
		if (onboardingIsVisible) {
			toggleOnboarding();
			audio.init();
		}
	}

	function removeBubbleFromCanvas() {
		if (numberOfBubbles > 0) {
			// Update bubble count state
			setNumberOfBubbles(numberOfBubbles - 1);

			// Remove bubble object
			removeBubble();
		}
	}

	function handleKeyPress(e) {
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

	// Add event listeners
	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);

	return (
		<div className="app">
			<Main handleClick={addBubbleToCanvas}>
				<OnboardingPanel isVisible={onboardingIsVisible} />
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
				isVisible={infoPanelIsVisible}
				toggleVisibility={toggleInfoPanel}
			/>
		</div>
	);
}

export default App;
