import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';

export default function Main(props) {
	const { children } = props;
	return <main className="main">{children}</main>;
}

Main.propTypes = {
	children: PropTypes.node,
};

Main.defaultProps = {
	children: null,
};
