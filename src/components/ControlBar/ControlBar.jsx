import React from 'react';
import PropTypes from 'prop-types';
import './ControlBar.css';
import Container from '../Container';
import Button from '../Button';
import Slider from '../Slider';
import { ReactComponent as PlayIcon } from '../../assets/icons/Play.svg';
import { ReactComponent as PauseIcon } from '../../assets/icons/Pause.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/Info.svg';

export default function ControlBar(props) {
	const {
		isPlaying,
		rootTone,
		tempo,
		togglePlaying,
		updateRootTone,
		updateTempo,
	} = props;

	const handleRootToneChange = (value) => {
		updateRootTone(value);
	};

	const handleTempoChange = (value) => {
		updateTempo(value);
	};

	return (
		<div className="control-bar">
			<Container>
				<div className="inner-container">
					<Button
						handleClick={togglePlaying}
						shape="round"
						size="large"
						variant="primary"
					>
						{isPlaying ? (
							<PauseIcon className="icon icon-only icon-large" />
						) : (
							<PlayIcon className="icon icon-only icon-large" />
						)}
					</Button>

					<div className="controls-group">
						<Slider
							handleChange={(updatedRootTone) =>
								handleRootToneChange(updatedRootTone)
							}
							label="Tone"
							min={110}
							max={330}
							value={rootTone}
							step={1}
						/>

						<Slider
							handleChange={(updatedTempo) =>
								handleTempoChange(updatedTempo)
							}
							label="Tempo"
							min={1}
							max={12}
							value={tempo}
							step={1}
						/>
					</div>

					<div className="controls-group">
						<Button icon="path-to-icon" onClick="click handler">
							<InfoIcon className="icon" />
							Info
						</Button>
					</div>
				</div>
			</Container>
		</div>
	);
}

ControlBar.propTypes = {
	isPlaying: PropTypes.bool,
	rootTone: PropTypes.number,
	tempo: PropTypes.number,
	togglePlaying: PropTypes.func,
	updateRootTone: PropTypes.func,
	updateTempo: PropTypes.func,
};

ControlBar.defaultProps = {
	isPlaying: false,
	rootTone: 220,
	tempo: 3,
	togglePlaying: null,
	updateRootTone: null,
	updateTempo: null,
};
