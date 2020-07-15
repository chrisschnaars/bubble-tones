import React, { useState } from 'react';
import './App.css';
import Main from '../../components/Main';
import Canvas from '../../components/Canvas';
import ControlBar from '../../components/ControlBar';

function usePlayingStatus() {
	const [isPlaying, setIsPlaying] = useState(false);
	const togglePlaying = () => setIsPlaying(!isPlaying);

	return { isPlaying, togglePlaying };
}

function useRootTone() {
	const defaultRootTone = 220;

	const [rootTone, setRootTone] = useState(defaultRootTone);
	const updateRootTone = (value) => setRootTone(value);

	return { rootTone, updateRootTone };
}

function useTempo() {
	const defaultTempo = 3;

	const [tempo, setTempo] = useState(defaultTempo);
	const updateTempo = (value) => setTempo(value);

	return { tempo, updateTempo };
}

function App() {
	const { isPlaying, togglePlaying } = usePlayingStatus();
	const { rootTone, updateRootTone } = useRootTone();
	const { tempo, updateTempo } = useTempo();

	return (
		<div className="app">
			<Main>
				<Canvas />
			</Main>
			<ControlBar
				isPlaying={isPlaying}
				rootTone={rootTone}
				tempo={tempo}
				togglePlaying={togglePlaying}
				updateRootTone={updateRootTone}
				updateTempo={updateTempo}
			/>
		</div>
	);
}

export default App;
