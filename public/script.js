window.onload = function () {

    const converter = new showdown.Converter();
    const pad = document.getElementById("pad");
    const markdown = document.getElementById("markdown");

    pad.addEventListener('keydown',function(e) {
        if(e.keyCode === 9) { // tab was pressed
            // get caret position/selection
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var target = e.target;
            var value = target.value;

            // set textarea value to: text before caret + tab + text after caret
            target.value = value.substring(0, start)
                            + "\t"
                            + value.substring(end);

            // put caret at right position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            e.preventDefault();
        }
    });
    var perviosMarkDownValue; 

    const converterTextAreaToHtml = function () {
        var markdownValue = pad.value;
        html = converter.makeHtml(markdownValue);
        console.log(html);
        markdown.innerHTML = html;
    };

    pad.addEventListener("input",converterTextAreaToHtml);


    var didChangeOccur = function(){
        if(perviosMarkDownValue != pad.value){
            return true;
        }
        
        return false;

    };

    setInterval(() => {
        if(didChangeOccur){
            converterTextAreaToHtml();
        }
    }, 1000);

    if(document.location.pathname.length >1){
        var documentName = document.location.pathname.substring(1);
        sharejs.open(document.location.pathname,'text',function(error,doc){
            doc.attach_textarea(pad);
            converterTextAreaToHtml();
       });
    }

    converterTextAreaToHtml();

};