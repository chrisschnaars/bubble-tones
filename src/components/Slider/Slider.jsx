import React from 'react';
import PropTypes from 'prop-types';
import './Slider.css';

export default function Slider(props) {
	const { label, handleChange, max, min, step, value } = props;
	return (
		<div className="slider-container">
			<p className="label">{label}</p>
			<input
				className="slider"
				type="range"
				onChange={(e) => {
					const updatedValue = Number(e.target.value);
					handleChange(updatedValue);
				}}
				min={min}
				max={max}
				defaultValue={value}
				step={step}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
			/>
			<p className="readout">{value}</p>
		</div>
	);
}

Slider.propTypes = {
	label: PropTypes.string,
	handleChange: PropTypes.func,
	max: PropTypes.number,
	min: PropTypes.number,
	step: PropTypes.number,
	value: PropTypes.number,
};

Slider.defaultProps = {
	label: null,
	handleChange: null,
	max: null,
	min: null,
	step: null,
	value: null,
};
