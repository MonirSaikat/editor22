# Editor22

Editor22 is a lightweight, modern, and feature-rich WYSIWYG text editor built with jQuery. 

![Editor22 Screenshot](![alt text](image.png))

## Features

- **Text Formatting**: Bold, italic, underline, and strike-through options.
- **Text Alignment**: Align text left, center, right, or justify.
- **Font Styling**: Change font size and font family.
- **Text Color**: Set text color using a color picker.
- **Lists**: Insert ordered and unordered lists.
- **Overline Text**: Unique overline text feature.
- **Image Insertion**: Insert and resize images with drag-and-drop functionality.
- **Full Screen Mode**: Toggle full screen mode for an enhanced editing experience.

## Installation

1. **Include jQuery**: Ensure you have jQuery included in your project. You can add it via CDN:

    ```html
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    ```

2. **Include Editor22 Plugin**: Add the `Editor22` script after jQuery:

    ```html
    <script src="path/to/editor22.js"></script>
    ```

3. **Initialize the Editor**: Use the following code to initialize the editor on your desired element:

    ```html
    <div id="editor"></div>
    <script>
        $('#editor').textEditor({
            toolbarSelector: '.editor-toolbar',
            contentSelector: '.editor-content',
            fullScreen: false,
        });
    </script>
    ```
