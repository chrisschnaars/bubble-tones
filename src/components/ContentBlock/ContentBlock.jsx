import React from 'react';
import PropTypes from 'prop-types';
import './ContentBlock.css';

export default function ContentBlock(props) {
	const { children } = props;

	return <div className="content-block">{children}</div>;
}

ContentBlock.propTypes = {
	children: PropTypes.node,
};

ContentBlock.defaultProps = {
	children: null,
};
