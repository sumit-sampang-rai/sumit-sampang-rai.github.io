document.addEventListener("DOMContentLoaded",function(){$(document).on("dblclick",".editible-input",function(){var identifier=$(this);var new_identifier_id='new-'+this.id;var current=$(this).text();$(this).html('<input id="'+new_identifier_id+'" value="'+current+'"></input>');new_identifier=$('#'+new_identifier_id)
new_identifier.focus();new_identifier.focus().blur(function(){var newcont=$(new_identifier).val();$(identifier).text(newcont);});});$(document).on("dblclick",".editible-textarea",function(){var identifier=$(this);var new_identifier_id='new-'+this.id;var current=$(this).text();$(this).html('<textarea id="'+new_identifier_id+'" rows="4" cols="100">'+current+'</textarea>');new_identifier=$('#'+new_identifier_id)
new_identifier.focus();new_identifier.focus().blur(function(){var newcont=$(new_identifier).val();$(identifier).text(newcont);});});});function ExportToDoc(elementId,filename=''){var element=document.getElementById(elementId);var clonedElement=element.cloneNode(true);function applyInlineStyles(element){var nodes=element.getElementsByTagName('*');for(var i=0;i<nodes.length;i++){var node=nodes[i];var computedStyle=window.getComputedStyle(node);var style='';for(var j=0;j<computedStyle.length;j++){var key=computedStyle[j];var value=computedStyle.getPropertyValue(key);style+=key+':'+value+';';}
node.setAttribute('style',style);}}
applyInlineStyles(clonedElement);var header="<html \
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
    <body>";var footer="</body></html>";var sourceHTML=header+clonedElement.innerHTML+footer;var blob=new Blob(['\ufeff',sourceHTML],{type:'application/msword'});var link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=filename?filename+'.doc':'document.doc';document.body.appendChild(link);link.click();document.body.removeChild(link);}