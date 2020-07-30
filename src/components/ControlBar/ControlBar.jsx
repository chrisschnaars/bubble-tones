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
		toggleInfoPanel,
		togglePlaying,
		updateRootTone,
	} = props;

	const handleRootToneChange = (value) => {
		updateRootTone(value);
	};

	return (
		<div className="control-bar">
			<Container>
				<div className="inner-container">
					<div className="controls-group">
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
					</div>

					<div className="controls-group controls-group-flex1">
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
					</div>

					<div className="controls-group">
						<Button handleClick={toggleInfoPanel}>
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
	toggleInfoPanel: PropTypes.func,
	togglePlaying: PropTypes.func,
	updateRootTone: PropTypes.func,
};

ControlBar.defaultProps = {
	isPlaying: false,
	rootTone: 220,
	toggleInfoPanel: null,
	togglePlaying: null,
	updateRootTone: null,
};
