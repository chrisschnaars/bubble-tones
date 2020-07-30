import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './Button.css';

export default function Button(props) {
	const { children, handleClick, shape, size, variant } = props;

	const buttonClasses = classNames({
		primary: variant === 'primary',
		uncontained: variant === 'uncontained',
		small: size === 'small',
		large: size === 'large',
		round: shape === 'round',
		'round-large': shape === 'round' && size === 'large',
	});

	return (
		<button type="button" className={buttonClasses} onClick={handleClick}>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node,
	handleClick: PropTypes.func,
	shape: PropTypes.string,
	size: PropTypes.string,
	variant: PropTypes.string,
};

Button.defaultProps = {
	children: null,
	handleClick: null,
	shape: null,
	size: null,
	variant: null,
};
