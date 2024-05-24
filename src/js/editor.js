(function($) {
    $.fn.textEditor = function(options) {
        const settings = $.extend({
            toolbarSelector: '.editor-toolbar',
            contentSelector: '.editor-content'
        }, options);

        const editor = this;
        const toolbar = editor.find(settings.toolbarSelector);
        const content = editor.find(settings.contentSelector);

        toolbar.find('button').on('click', function() {
            const command = $(this).data('command');
            document.execCommand(command, false, null);
        });

        toolbar.find('.overline').on('click', function() {
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

        $('#textColor').on('input', function() {
            document.execCommand('foreColor', false, $(this).val());
        });

        $('#alignment').on('change', function() {
            const alignCommand = $(this).val();
            if (alignCommand) {
                document.execCommand(alignCommand, false, null);
            }
        });

        $('#fontSize').on('change', function() {
            const fontSizeCommand = $(this).val();
            document.execCommand('formatBlock', false, fontSizeCommand);
        });

        $('#fontFamily').on('change', function() {
            const fontFamily = $(this).val();
            document.execCommand('fontName', false, fontFamily);
        });

        $('#imageUrl').on('click', function() {
            const url = prompt('Enter the image URL');
            if (url) {
                const img = $('<img>').attr('src', url).css({ maxWidth: '100%' });
                content.append(img);
                img.wrap('<div class="resizable"></div>');
                setTimeout(function() {
                    img.parent().resizable({
                        aspectRatio: true,
                        handles: 'n, e, s, w, ne, nw, se, sw'
                    }).draggable({
                        containment: content,
                        stop: function() {
                            content.focus();
                        }
                    });
                }, 100);
            }
        });

        $.fn.textEditor.setContent = function(html) {
            content.html(html);
        };

        $.fn.textEditor.getContent = function() {
            return content.html();
        };

        content.on('paste', function(e) {
            e.preventDefault();
            const clipboardData = e.originalEvent.clipboardData;
            if (clipboardData && clipboardData.items) {
                for (let i = 0; i < clipboardData.items.length; i++) {
                    const item = clipboardData.items[i];
                    if (item.type.indexOf("image") !== -1) {
                        const file = item.getAsFile();
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            const img = $('<img>').attr('src', event.target.result).css({ maxWidth: '100%' });
                            content.append(img);
                            img.wrap('<div class="resizable"></div>');
                            setTimeout(function() {
                                img.parent().resizable({
                                    aspectRatio: true,
                                    handles: 'n, e, s, w, ne, nw, se, sw'
                                }).draggable({
                                    containment: content,
                                    stop: function() {
                                        content.focus();
                                    }
                                });
                            }, 100);
                        };
                        reader.readAsDataURL(file);
                    } else if (item.type === 'text/html') {
                        const html = clipboardData.getData('text/html');
                        content.append(html);
                    } else if (item.type === 'text/plain') {
                        const text = clipboardData.getData('text/plain');
                        document.execCommand('insertText', false, text);
                    }
                }
            }
        });

        content.on('click', '.resizable', function() {
            $(this).resizable({
                aspectRatio: true,
                handles: 'n, e, s, w, ne, nw, se, sw'
            }).draggable({
                containment: content,
                stop: function() {
                    content.focus();
                }
            });
        });

        return this;
    };
})(jQuery);

$(document).ready(function() {
    $('.editor').textEditor();
});
