document.addEventListener("DOMContentLoaded", function () {
    const initiallyHiddenItems = document.querySelectorAll('.hidden-items');
    let hiddenItems = [];
    initiallyHiddenItems.forEach(item => hiddenItems.push(item.id));

    // Function to toggle visibility of the item
    function toggleVisibility(itemId) {
        const item = document.getElementById(itemId);
        item.classList.add('hidden-items');
        if (!hiddenItems.includes(itemId)) {
            hiddenItems.push(itemId); // Add to hiddenItems if it wasn't hidden initially
        }
    }

    function updateHiddenItemsList() {
        const hiddenItemsList = document.getElementById('hidden-items-list');
        hiddenItemsList.innerHTML = '';
        hiddenItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                ${item.title_name}
                <span class="eye-label avoid-print" onclick="toggleVisibility('${item.id}')">
                    <i class="fa fa-eye"></i>
                </span>
            `;
            hiddenItemsList.appendChild(listItem);
        });
    }

    // Expose the toggleVisibility function to the global scope
    window.toggleVisibility = toggleVisibility;

    $('#visible').on('shown.bs.modal', function () {
        updateHiddenItemsList();
    });

    $(document).on("dblclick", ".editible-input", function(){
        var identifier = $(this);
        var new_identifier_id = 'new-' + this.id;
        var current = $(this).text();
        $(this).html('<input id="' + new_identifier_id + '" value="' + current + '"></input>');
        new_identifier = $('#' + new_identifier_id)
        new_identifier.focus();
      
        new_identifier.focus().blur(function() {
          var newcont = $(new_identifier).val();
          $(identifier).text(newcont);
        });
    });

    $(document).on("dblclick", ".editible-textarea", function(){
        var identifier = $(this);
        var new_identifier_id = 'new-' + this.id;
        var current = $(this).text();
        $(this).html('<textarea id="' + new_identifier_id + '" rows="4" cols="100">' + current + '</textarea>');
        new_identifier = $('#' + new_identifier_id)
        new_identifier.focus();
      
        new_identifier.focus().blur(function() {
          var newcont = $(new_identifier).val();
          $(identifier).text(newcont);
        });
    });
});

function ExportToDoc(elementId, filename = '') {
    var element = document.getElementById(elementId);
    var clonedElement = element.cloneNode(true);

    // Function to convert computed styles to inline styles
    function applyInlineStyles(element) {
        var nodes = element.getElementsByTagName('*');
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var computedStyle = window.getComputedStyle(node);
            var style = '';

            for (var j = 0; j < computedStyle.length; j++) {
                var key = computedStyle[j];
                var value = computedStyle.getPropertyValue(key);
                style += key + ':' + value + ';';
            }

            node.setAttribute('style', style);
        }
    }

    applyInlineStyles(clonedElement);

    var header = "<html \
    xmlns:v='urn:schemas-microsoft-com:vml' \
    xmlns:o='urn:schemas-microsoft-com:office:office' \
    xmlns:w='urn:schemas-microsoft-com:office:word' \
    xmlns:m='http://schemas.microsoft.com/office/2004/12/omml' \
    xmlns='http://www.w3.org/TR/REC-html40'>\
    <head>\
    <meta http-equiv=Content-Type content='text/html; charset=utf-8'>\
    <title></title>\
    <style>\
    /* Add any additional styles here if necessary */\
    </style>\
    <xml>\
    <w:WordDocument>\
    <w:View>Print</w:View>\
    <w:Zoom>100</w:Zoom>\
    <w:DoNotOptimizeForBrowser/>\
    </w:WordDocument>\
    </xml>\
    </head>\
    <body>";

    var footer = "</body></html>";

    var sourceHTML = header + clonedElement.innerHTML + footer;
    var blob = new Blob(['\ufeff', sourceHTML], {
        type: 'application/msword'
    });

    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename ? filename + '.doc' : 'document.doc';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
