import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './OnboardingPanel.css';
import Button from '../Button';
import ContentBlock from '../ContentBlock';
import Text from '../Text';

const OnboardingPanel = (props) => {
	return (
		<div
			className={classNames('onboarding-panel', {
				visible: props.isVisible,
			})}
		>
			<ContentBlock align="center">
				<Text align="center">
					This is Bubble Tones, a fun tone generator.
					<br />
					Bubbles make tones when they collide with things.
				</Text>
				<Text align="center">
					Click, tap or press Q to create bubbles.
				</Text>
				<Button onClick={props.handleClick}>Add a Bubble</Button>
			</ContentBlock>
		</div>
	);
};

OnboardingPanel.propTypes = {
	handleClick: PropTypes.func,
	isVisible: PropTypes.bool,
};

OnboardingPanel.defaultProps = {
	handleClick: null,
	isVisible: false,
};

export default OnboardingPanel;
