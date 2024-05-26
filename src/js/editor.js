(function ($) {
    $.fn.textEditor = function (options) {
        const settings = $.extend({
            toolbarSelector: '.editor-toolbar',
            contentSelector: '.editor-content',
            fullScreen: false,
            options: null,
        }, options);

        const editor = this;

        if (settings.fullScreen) {
            editor.addClass('fullscreen');
        }

        let toolbarHtml = '';
        let toolBarOptions = {};

        toolBarOptions.bold = `<button data-command="bold">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4V20M9.5 4H15.5C17.7091 4 19.5 5.79086 19.5 8C19.5 10.2091 17.7091 12 15.5 12H9.5H16.5C18.7091 12 20.5 13.7909 20.5 16C20.5 18.2091 18.7091 20 16.5 20H9.5M9.5 4V20M9.5 4H4M9.5 20H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>`;

        toolBarOptions.italic = `<button data-command="italic">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.25 4L7.25 20M16.75 4L10.75 20M19.5 4L9.5 4M14.5 20H4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>`;

        toolBarOptions.underline = `<button data-command="underline">
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 4V10C19 13.866 15.866 17 12 17C8.13401 17 5 13.866 5 10V4M8.5 4V10C8.5 13.2218 10.6766 15.9352 13.6395 16.7501M4 21H20M3 4L10.5 4M17 4L21 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </button>`;


        toolBarOptions.strikeThrough = `<button data-command="strikeThrough"><s>S</s></button>`;

        toolBarOptions.overline = `<button data-command="overline" class="overline">O</button>`

        toolBarOptions.color = `<input type="color" id="textColor" title="Text Color" />`;


        toolBarOptions.alignment = `<select id="alignment">
          <option value="">Align</option>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>`;


        toolBarOptions.orderList = `<button data-command="insertOrderedList">
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>`;


        toolBarOptions.unorderList = `<button data-command="insertUnorderedList"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>`;


        toolBarOptions.fontSize = `<select id="fontSize">
          <option value="">Font</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="h5">H5</option>
          <option value="h6">H6</option>
          <option value="p">P</option>
          <option value="pre">Pre</option>
        </select>`;

        toolBarOptions.fontFamily = `<select id="fontFamily">
          <option value="">Font Family</option>
          <option value="serif">Serif</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="sans-serif">Sans-serif</option>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="monospace">Monospace</option>
          <option value="Courier New">Courier New</option>
        </select>`;


        toolBarOptions.image = `<button id="imageUrl">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.27209 20.7279L10.8686 14.1314C11.2646 13.7354 11.4627 13.5373 11.691 13.4632C11.8918 13.3979 12.1082 13.3979 12.309 13.4632C12.5373 13.5373 12.7354 13.7354 13.1314 14.1314L19.6839 20.6839M14 15L16.8686 12.1314C17.2646 11.7354 17.4627 11.5373 17.691 11.4632C17.8918 11.3979 18.1082 11.3979 18.309 11.4632C18.5373 11.5373 18.7354 11.7354 19.1314 12.1314L22 15M10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9ZM21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>`;

        // Added Link Button
        toolBarOptions.link = `<button id="insertLink">
         <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 7C12 6.44772 12.4477 6 13 6H17C18.6569 6 20 7.34315 20 9V15C20 16.6569 18.6569 18 17 18H13C12.4477 18 12 17.5523 12 17M10 17C10 17.5523 9.55228 18 9 18H5C3.34315 18 2 16.6569 2 15V9C2 7.34315 3.34315 6 5 6H9C9.55228 6 10 6.44772 10 7M16 12H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
     </button>`;


        // toolBarOptions.magic = `<button id="magic">
        //     <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        //        <path d="M13.0001 14L10.0001 11M15.0104 3.5V2M18.9498 5.06066L20.0104 4M18.9498 13L20.0104 14.0607M11.0104 5.06066L9.94979 4M20.5104 9H22.0104M6.13146 20.8686L15.3687 11.6314C15.7647 11.2354 15.9627 11.0373 16.0369 10.809C16.1022 10.6082 16.1022 10.3918 16.0369 10.191C15.9627 9.96265 15.7647 9.76465 15.3687 9.36863L14.6315 8.63137C14.2354 8.23535 14.0374 8.03735 13.8091 7.96316C13.6083 7.8979 13.3919 7.8979 13.1911 7.96316C12.9627 8.03735 12.7647 8.23535 12.3687 8.63137L3.13146 17.8686C2.73545 18.2646 2.53744 18.4627 2.46325 18.691C2.39799 18.8918 2.39799 19.1082 2.46325 19.309C2.53744 19.5373 2.73545 19.7354 3.13146 20.1314L3.86872 20.8686C4.26474 21.2646 4.46275 21.4627 4.69108 21.5368C4.89192 21.6021 5.10827 21.6021 5.30911 21.5368C5.53744 21.4627 5.73545 21.2646 6.13146 20.8686Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        //     </svg>
        // </button>`;

        toolBarOptions.fullScreen = `<button class="fullscreen-toggler"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16L3 21M3 21H8M3 21L3 16M16 8L21 3M21 3L16 3M21 3V8M8 8L3 3M3 3V8M3 3H8M16 16L21 21M21 21L21 16M21 21H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>`;

        if (settings.options && typeof settings.options == 'object' && Array.isArray(settings.options)) {
            settings.options.forEach(key => {
                if (key in toolBarOptions) {
                    toolbarHtml += toolBarOptions[key]
                }
            });
        } else {
            Object.values(toolBarOptions).forEach(value => {
                toolbarHtml += value
            });
        }

        const toolbar = $(`<div class="editor-toolbar">${toolbarHtml}</div>`);
        const content = $('<div class="editor-content" contenteditable="true"></div>');

        editor.append(toolbar);
        editor.append(content);

        function execCommand(command, value = null) {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;

            const range = selection.getRangeAt(0);
            if (command === 'bold') {
                document.execCommand('bold');
            } else if (command === 'italic') {
                document.execCommand('italic');
            } else if (command === 'underline') {
                document.execCommand('underline');
            } else if (command === 'strikeThrough') {
                document.execCommand('strikeThrough');
            } else if (command === 'createLink') {
                document.execCommand('createLink', false, value);
            } else if (command === 'foreColor') {
                document.execCommand('foreColor', false, value);
            } else if (command === 'formatBlock') {
                document.execCommand('formatBlock', false, value);
            } else if (command === 'fontName') {
                document.execCommand('fontName', false, value);
            } else if (command === 'justifyLeft') {
                document.execCommand('justifyLeft');
            } else if (command === 'justifyCenter') {
                document.execCommand('justifyCenter');
            } else if (command === 'justifyRight') {
                document.execCommand('justifyRight');
            } else if (command === 'justifyFull') {
                document.execCommand('justifyFull');
            } else if (command === 'insertOrderedList') {
                document.execCommand('insertOrderedList');
            } else if (command === 'insertUnorderedList') {
                document.execCommand('insertUnorderedList');
            } else if (command === 'fontSize') {
                document.execCommand('fontSize', false, value);
            }
        }

        toolbar.find('button').on('click', function () {
            const command = $(this).data('command');
            if (command) {
                execCommand(command);
            }
        });

        toolbar.find('.overline').on('click', function () {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;

            const range = selection.getRangeAt(0);
            const span = document.createElement('span');
            span.style.textDecoration = 'overline';
            range.surroundContents(span);
            selection.removeAllRanges();
            selection.addRange(range);
        });

        toolbar.find('.fullscreen-toggler').on('click', function () {
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
            execCommand('foreColor', $(this).val());
        });

        editor.find('#magic').on('click', function () {
            // todo: 
        });

        editor.find('#alignment').on('change', function () {
            const alignCommand = $(this).val();
            if (alignCommand === 'left') {
                execCommand('justifyLeft');
            } else if (alignCommand === 'center') {
                execCommand('justifyCenter');
            } else if (alignCommand === 'right') {
                execCommand('justifyRight');
            } else if (alignCommand === 'justify') {
                execCommand('justifyFull');
            }
        });

        editor.find('#fontSize').on('change', function () {
            execCommand('formatBlock', $(this).val());
        });

        editor.find('#fontFamily').on('change', function () {
            execCommand('fontName', $(this).val());
        });

        $(document).on('click', '#insertLink', function () {
            var url = prompt("Enter the link URL");
            if (url) {
                content.append(`<a href="${url}">${url}</a>`);
                document.execCommand('createLink', false, url);
            }
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
                    execCommand('createLink', text);
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