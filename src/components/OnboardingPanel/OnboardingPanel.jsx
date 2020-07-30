import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './OnboardingPanel.css';
import ContentBlock from '../ContentBlock';
import Text from '../Text';

export default function OnboardingPanel(props) {
	const { isVisible } = props;

	const overlayClasses = classNames('onboarding-panel', {
		visible: isVisible,
	});

	return (
		<div className={overlayClasses}>
			<ContentBlock>
				<Text align="center">
					This is Bubble Tones, a fun tone generator.
					<br />
					Bubbles make tones when they collide with things.
				</Text>
				<Text align="center">Click or tap to create bubbles.</Text>
			</ContentBlock>
		</div>
	);
}

OnboardingPanel.propTypes = {
	isVisible: PropTypes.bool,
};

OnboardingPanel.defaultProps = {
	isVisible: false,
};
