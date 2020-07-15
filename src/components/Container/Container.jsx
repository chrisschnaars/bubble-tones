import React from 'react';
import PropTypes from 'prop-types';
import './Container.css';

export default function Container(props) {
	const { children } = props;
	return <div className="container">{children}</div>;
}

Container.propTypes = {
	children: PropTypes.node,
};

Container.defaultProps = {
	children: null,
};
