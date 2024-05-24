(function ($) {
    $.fn.textEditor = function (options) {
        const settings = $.extend({
            toolbarSelector: '.editor-toolbar',
            contentSelector: '.editor-content',
            fullScreen: false,
        }, options);

        const editor = this;

        if (settings.fullScreen) {
            editor.addClass('fullscreen');
        }

        const toolbarHtml = `<button data-command="bold"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 4V20M9.5 4H15.5C17.7091 4 19.5 5.79086 19.5 8C19.5 10.2091 17.7091 12 15.5 12H9.5H16.5C18.7091 12 20.5 13.7909 20.5 16C20.5 18.2091 18.7091 20 16.5 20H9.5M9.5 4V20M9.5 4H4M9.5 20H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>
        <button data-command="italic"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.25 4L7.25 20M16.75 4L10.75 20M19.5 4L9.5 4M14.5 20H4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>
        <button data-command="underline"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 4V10C19 13.866 15.866 17 12 17C8.13401 17 5 13.866 5 10V4M8.5 4V10C8.5 13.2218 10.6766 15.9352 13.6395 16.7501M4 21H20M3 4L10.5 4M17 4L21 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>
        <button data-command="strikeThrough"><s>S</s></button>
        <button data-command="overline" class="overline">O</button>
        <input type="color" id="textColor" title="Text Color" />
        <select id="alignment">
          <option value="">Align</option>
          <option value="justifyLeft">Left</option>
          <option value="justifyCenter">Center</option>
          <option value="justifyRight">Right</option>
          <option value="justifyFull">Justify</option>
        </select>
        <button data-command="insertOrderedList"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>
        <button data-command="insertUnorderedList"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>
        <select id="fontSize">
          <option value="">Font</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="h5">H5</option>
          <option value="h6">H6</option>
          <option value="p">P</option>
        </select>
        <select id="fontFamily">
          <option value="">Font Family</option>
          <option value="serif">Serif</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="sans-serif">Sans-serif</option>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="monospace">Monospace</option>
          <option value="Courier New">Courier New</option>
        </select>
        <button id="imageUrl"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.27209 20.7279L10.8686 14.1314C11.2646 13.7354 11.4627 13.5373 11.691 13.4632C11.8918 13.3979 12.1082 13.3979 12.309 13.4632C12.5373 13.5373 12.7354 13.7354 13.1314 14.1314L19.6839 20.6839M14 15L16.8686 12.1314C17.2646 11.7354 17.4627 11.5373 17.691 11.4632C17.8918 11.3979 18.1082 11.3979 18.309 11.4632C18.5373 11.5373 18.7354 11.7354 19.1314 12.1314L22 15M10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9ZM21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>
        <button class="fullscreen-toggler"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16L3 21M3 21H8M3 21L3 16M16 8L21 3M21 3L16 3M21 3V8M8 8L3 3M3 3V8M3 3H8M16 16L21 21M21 21L21 16M21 21H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>`;

        const toolbar = $(`<div class="editor-toolbar">${toolbarHtml}</div>`);
        const content = $('<div class="editor-content" contenteditable="true"></div>');

        editor.append(toolbar);
        editor.append(content);

        toolbar.find('button').on('click', function () {
            const command = $(this).data('command');
            if (command) {
                document.execCommand(command, false, null);
            }
        });

        toolbar.find('.overline').on('click', function () {
            document.execCommand('underline', false, null);
            const selection = window.getSelection();
            if (selection.rangeCount) {
                const range = selection.getRangeAt(0).cloneRange();
                const span = document.createElement('span');
                span.style.textDecoration = 'overline';
                range.surroundContents(span);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        });

        toolbar.find('.fullscreen-toggler').on('click', function() {
            settings.fullScreen = !settings.fullScreen;
            editor.toggleClass('fullscreen', settings.fullScreen);
            const icon = settings.fullScreen ? 
                `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 14H10M10 14V20M10 14L3 21M20 10H14M14 10V4M14 10L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>` : 
                `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8L21 3M21 3H16M21 3V8M8 8L3 3M3 3L3 8M3 3L8 3M8 16L3 21M3 21H8M3 21L3 16M16 16L21 21M21 21V16M21 21H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
            $(this).html(icon);
        });

        editor.find('#textColor').on('input', function () {
            document.execCommand('foreColor', false, $(this).val());
        });

        editor.find('#alignment').on('change', function () {
            const alignCommand = $(this).val();
            if (alignCommand) {
                document.execCommand(alignCommand, false, null);
            }
        });

        editor.find('#fontSize').on('change', function () {
            const fontSizeCommand = $(this).val();
            document.execCommand('formatBlock', false, fontSizeCommand);
        });

        editor.find('#fontFamily').on('change', function () {
            const fontFamily = $(this).val();
            document.execCommand('fontName', false, fontFamily);
        });

        editor.find('#imageUrl').on('click', function () {
            const url = prompt('Enter the image URL');
            if (url) {
                const img = $('<img>').attr('src', url).css({
                    maxWidth: '100%'
                });
                content.append(img);
                img.wrap('<div class="resizable"></div>');
                setTimeout(function () {
                    img.parent().resizable({
                        aspectRatio: true,
                        handles: 'n, e, s, w, ne, nw, se, sw'
                    }).draggable({
                        containment: content,
                        stop: function () {
                            content.focus();
                        }
                    });
                }, 100);
            }
        });

        editor.setContent = function (html) {
            content.html(html);
        };

        editor.getContent = function () {
            return content.html();
        };

        content.on('paste', function (e) {
            e.preventDefault();
            const clipboardData = e.originalEvent.clipboardData;
            const text = clipboardData.getData('text/plain');
            const html = clipboardData.getData('text/html');

            if (html) {
                document.execCommand('insertHTML', false, html);
            } else if (text) {
                if (text.startsWith('http://') || text.startsWith('https://')) {
                    document.execCommand('createLink', false, text);
                } else {
                    document.execCommand('insertText', false, text);
                }
            }
        });

        content.on('click', '.resizable', function () {
            $(this).resizable({
                aspectRatio: true,
                handles: 'n, e, s, w, ne, nw, se, sw'
            }).draggable({
                containment: content,
                stop: function () {
                    content.focus();
                }
            });
        });

        return this;
    };
})(jQuery);
