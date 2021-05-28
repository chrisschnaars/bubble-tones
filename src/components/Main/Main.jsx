import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';

const Main = (props) => {
	const { children, handleClick } = props;

	return (
		<main className="main" onClick={(e) => handleClick(e)}>
			{children}
		</main>
	);
};

Main.propTypes = {
	children: PropTypes.node,
	handleClick: PropTypes.func,
	handleKeyDown: PropTypes.func,
};

Main.defaultProps = {
	children: null,
	handleClick: null,
	handleKeyDown: null,
};

export default Main;
