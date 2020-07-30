import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

export default function Header(props) {
	const { children, level } = props;

	const headingLevel = level > 6 ? 6 : level;
	const Tag = `h${headingLevel}`;

	return <Tag>{children}</Tag>;
}

Header.propTypes = {
	children: PropTypes.node,
	level: PropTypes.number,
};

Header.defaultProps = {
	children: null,
	level: 1,
};
