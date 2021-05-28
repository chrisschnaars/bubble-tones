import React from 'react';
import PropTypes from 'prop-types';
import './Text.css';

export default function Text(props) {
	const { align, children } = props;

	return (
		<p className={align === 'center' ? 'center' : undefined}>{children}</p>
	);
}

Text.propTypes = {
	align: PropTypes.string,
	children: PropTypes.node,
};

Text.defaultProps = {
	children: null,
};
