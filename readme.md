# Bubble Tones
Bubble Tones is a generative sound tool that produces a unique musical creation with each use.

## How To Play
In Bubble Tones, sounds are made when a Bubble hits a wall or the larger bubbles (aka Roadblocks). To add a Bubble, just click or tap anywhere on the screen. You can add up to six Bubbles at a time.

## Keyboard Shortcuts
Q: Add a Bubble  
P: Remove a Bubble  
Spacebar: Play/Pause Bubble Tones

## Audio Interactions
The tones that play when Bubbles collide with the wall are selected from the root tone’s major and minor scales. The selection of the scale and tone has some randomness built in, which is intended to create even more unexpected variety in each composition.

Here is a breakdown of how that works:
The root frequency, which determines all other tones, is set at the start to 220 Hz, which is the A3 note in the equal-tempered scale. Users can adjust this frequency using the "Tone" slider. The lowest frequency is set to 110 Hz (A2), and the highest frequency is 330 Hz (A4).

One of the ways tones are generated is when a Bubble collides with a wall. Each wall is set to play a note within the major or minor scale of the root frequency. Each wall has two note options (one with a higher probability of playing) that is selected randomly with each collision. The options are:
Top wall: Root note or octave
Right wall: Major third or minor third
Bottom wall: Perfect fourth or minor seventh
Left wall: Perfect fifth or sixth

The other way tones are generated is when a Bubble collides with a Roadblock (the larger, more stationary bubbles). There is one Roadblock for each wall, but Roadblocks are visible after a Bubble collides with each of the walls for the first time. Roadblocks will play the same note that their wall is set to, but at an octave lower (half the frequency).

The tone selection for each wall and Roadblock happens with each collision, meaning that the sound will be in a constant state of flux. Hopefully this makes it enjoyable.

## Thanks
This project couldn't have been done without:
* [p5js](https://p5js.org/)
* [Daniel Shiffman](http://shiffman.net/)
* [This bouncing ball example by Keith Peters](https://processing.org/examples/bouncybubbles.html)
