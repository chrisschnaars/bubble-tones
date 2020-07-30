import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../Overlay';
import ContentBlock from '../ContentBlock';
import Header from '../Header';
import Text from '../Text';

export default function InfoPanel(props) {
	const { isVisible, toggleVisibility } = props;

	return (
		<Overlay isVisible={isVisible} toggleVisibility={toggleVisibility}>
			<ContentBlock>
				<Header level={1}>Bubble Tones</Header>

				<Header level={2}>How To Play</Header>
				<Text>
					Click or tap the screen to add a Bubble. You can have up to
					six Bubbles at a time.
				</Text>
				<Text>
					In Bubble Tones, sounds are made when a Bubble collides with
					a wall or a Roadblock (the larger, more stationary bubbles).
				</Text>
				<Header level={2}>Keyboard Shortcuts</Header>
				<Text>
					Q: Add a Bubble
					<br />
					P: Remove a Bubble
					<br />
					Spacebar: Play/Pause Bubble Tones
				</Text>
				<Header level={2}>About Bubble Tones</Header>
				<Text>
					Bubble Tones is a generative sound tool that produces a
					unique musical creation with each use.
				</Text>
				<Text>
					The tones that play when Bubbles collide with the wall are
					selected from the root tone’s major and minor scales. The
					selection of the scale and tone has some randomness built
					in, which is intended to create even more unexpected variety
					in each composition.
				</Text>
				<Text>
					Bubble Tones was created by{' '}
					<a href="https://chrisschnaars.com/">Chris Schnaars</a>.
					Please{' '}
					<a href="mailto:hello@chrisschnaars.com">get in touch</a>{' '}
					with any questions, problems, or feedback. You can find more
					info on Bubble Tones at{' '}
					<a href="https://github.com/chrisschnaars/bubble-tones">
						Github
					</a>{' '}
					and{' '}
					<a href="https://schnaars.xyz/">
						more generative sound toys here
					</a>
					.
				</Text>
			</ContentBlock>
		</Overlay>
	);
}

InfoPanel.propTypes = {
	isVisible: PropTypes.bool,
	toggleVisibility: PropTypes.func,
};

InfoPanel.defaultProps = {
	isVisible: false,
	toggleVisibility: null,
};
