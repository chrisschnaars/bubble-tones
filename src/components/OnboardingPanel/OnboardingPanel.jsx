import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './OnboardingPanel.css';
import ContentBlock from '../ContentBlock';
import Text from '../Text';

const OnboardingPanel = (props) => {
	return (
		<div
			className={classNames('onboarding-panel', {
				visible: props.isVisible,
			})}
		>
			<ContentBlock>
				<Text align="center">
					This is Bubble Tones, a fun tone generator.
					<br />
					Bubbles make tones when they collide with things.
				</Text>
				<Text align="center">
					Click, tap or press Q to create bubbles.
				</Text>
			</ContentBlock>
		</div>
	);
};

OnboardingPanel.propTypes = {
	isVisible: PropTypes.bool,
};

OnboardingPanel.defaultProps = {
	isVisible: false,
};

export default OnboardingPanel;
