import React from 'react';
import PropTypes from 'prop-types';
import './ContentBlock.css';

export default function ContentBlock(props) {
	const { align, children } = props;

	return <div className={`${align} content-block`}>{children}</div>;
}

ContentBlock.propTypes = {
	align: PropTypes.string,
	children: PropTypes.node,
};

ContentBlock.defaultProps = {
	align: 'left',
	children: null,
};
