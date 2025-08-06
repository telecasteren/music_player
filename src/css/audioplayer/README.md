# react-h5-audio-player

[react-h5-audio-player](https://www.npmjs.com/package/react-h5-audio-player)

## Styling

Since the audio player is an imported react component, we can skip importing the default styles and add custom styles to it with a little tweak. The way I've done it is basically giving the outer wrapper div a class to target it and make sure I target the correct child element in the audio player. I also added the full list of the child elements classes, so it'd be easier to style in the future.<br/>
**Example usage:**

```js
.audio_wrapper .rhap_progress-filled {
  background-color: var(--accent-light);
}

.audio_wrapper .rhap_main-controls-button {
  font-size: 1.25rem;
}
```

### Full list of all the rhap.\* classes

| Class Name                | Description                                                |
| ------------------------- | ---------------------------------------------------------- |
| rhap_container            | Main outer container of the player                         |
| rhap_header               | Optional header (used for titles or custom header content) |
| rhap_footer               | Optional footer (you can add custom elements)              |
| rhap_main                 | Main wrapper around controls                               |
| rhap_stacked              | Layout when controls stack vertically (responsive)         |
| rhap_horizontal           | Layout when controls are inline (default)                  |
| rhap_main-controls        | Section for main controls (play, pause, skip)              |
| rhap_main-controls-button | Buttons like play/pause/skip                               |
| rhap_additional-controls  | Extra controls (like repeat button)                        |
| rhap_repeat-button        | Repeat toggle button                                       |
| rhap_volume-controls      | Section for volume slider                                  |
| rhap_volume-button        | Mute/unmute button                                         |
| rhap_volume-bar-area      | Volume bar wrapper                                         |
| rhap_volume-bar           | Volume bar itself                                          |
| rhap_volume-indicator     | Draggable volume handle                                    |
| rhap_progress-section     | Section containing progress bar and time                   |
| rhap_progress-container   | Progress bar container                                     |
| rhap_progress-bar         | Background of the progress bar                             |
| rhap_progress-filled      | Filled portion of progress bar (elapsed)                   |
| rhap_progress-indicator   | Draggable circle on progress bar                           |
| rhap_time                 | Time display (current / total duration)                    |
| rhap_current-time         | Current playback time                                      |
| rhap_total-time           | Total duration                                             |
| rhap_download-progress    | Shows buffered/downloaded portion                          |
| rhap_loop--on             | Modifier class when repeat is active                       |
| rhap_play-status--paused  | Modifier when playback is paused                           |
| rhap_play-status--playing | Modifier when playback is active                           |
