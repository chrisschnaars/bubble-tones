import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './Overlay.css';
import Button from '../Button';
import { ReactComponent as CloseIcon } from '../../assets/icons/Close.svg';

const Overlay = (props) => {
	const { children, toggleVisibility, isVisible } = props;

	return (
		<div className={classNames('overlay', { visible: isVisible })}>
			{children}
			<div className="close-btn">
				<Button handleClick={toggleVisibility} shape="round">
					<CloseIcon className="icon icon-only" />
				</Button>
			</div>
		</div>
	);
};

Overlay.propTypes = {
	children: PropTypes.node,
	toggleVisibility: PropTypes.func,
	isVisible: PropTypes.bool,
};

Overlay.defaultProps = {
	children: null,
	toggleVisibility: null,
	isVisible: false,
};

export default Overlay;
