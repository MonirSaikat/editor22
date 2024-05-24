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

        const toolbarHtml = '...';
        

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
            execCommand('foreColor', $(this).val());
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
