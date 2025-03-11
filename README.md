# YouTube Shorts Metadata Hover & Opacity Toggle

This Tampermonkey script enhances the YouTube Shorts experience by adding interactive hover effects for metadata panels and a keyboard shortcut to toggle metadata visibility. It’s designed to make your viewing experience more focused and enjoyable by minimizing distractions.

## How It Works

### Hover Effects for Metadata Panels

When you hover over metadata panels, such as video information or like/dislike stats, the script automatically dims the video. This effect makes it easier to concentrate on the video content while still providing access to the metadata when needed. 

- **Brightness Dimming**: As you hover over metadata, the script reduces the brightness of the video, ensuring the metadata stands out without overpowering the video itself.
- **Smooth Transition**: The dimming effect occurs with a smooth transition for a better visual experience.

### Toggle Metadata Opacity

The script provides an easy way to toggle the visibility of metadata using a keyboard shortcut:

- **Press the 'H' Key**: When the 'H' key is pressed, the script toggles the opacity of metadata panels. This gives users the ability to quickly hide or show metadata without needing to interact with the UI elements manually.
- **Minimal Distraction**: This opacity toggle helps you focus more on the video by hiding metadata such as video info, likes, and comments when you don’t need it.

### Infinite Scroll and SPA Navigation Support

YouTube Shorts uses an infinite scroll feature, meaning new content loads dynamically as you scroll. The script is optimized to handle this:

- **Dynamic Content Updates**: As new Shorts videos load, the script automatically attaches the hover effects and opacity toggle functionality to the newly loaded metadata panels.
- **Single Page Application (SPA) Navigation**: YouTube Shorts is a Single Page Application (SPA), meaning content is loaded without reloading the page. The script listens for changes in the page, ensuring that hover effects and metadata opacity toggle continue to work seamlessly during navigation.

### Key Features

- **Hover Effects**: Dims the video when hovering over metadata panels (like video info, likes/dislikes).
- **Keyboard Shortcut**: Toggle metadata opacity by pressing the 'H' key.
- **Infinite Scroll Support**: Works with YouTube’s infinite scroll feature to apply effects to newly loaded content.
- **SPA Navigation**: Automatically adapts to YouTube’s SPA changes without breaking functionality.

## Installation

To use this script, follow these steps:

1. Install [Tampermonkey](https://www.tampermonkey.net/) or another userscript manager on your browser.
2. Create a new userscript within Tampermonkey.
3. Copy the entire contents of the `youtube-shorts-metadata-hover-opacity-toggle.user.js` file.
4. Paste the code into the new userscript in Tampermonkey.
5. Save and enable the script.

Once the script is enabled, it will run automatically when you visit YouTube Shorts.

## Usage

- **Hover over metadata panels** (e.g., video info, likes, or comments) to dim the video.
- **Press the 'H' key** to toggle metadata opacity, hiding or showing the metadata for a cleaner view.

## License

This script is open-source and available under the [GNU General Public License v3.0](LICENSE).