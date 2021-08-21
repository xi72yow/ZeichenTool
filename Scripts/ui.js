//boosttrap tooltips enable all
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})


//binding basic drawing tools with backend
document.getElementById('basic-tool-bigger').addEventListener('click', function () {
    if (basicToolStrokeWidth < 24) {
        basicToolStrokeWidth += 2;
    }
    context.lineWidth = basicToolStrokeWidth;
    circle.radius(basicToolStrokeWidth * 0.5); //faktor damit es einigermaßen stimmt pix und konva größe
    stage.draw();

});

document.getElementById('basic-tool-smaller').addEventListener('click', function () {
    if (basicToolStrokeWidth > 0) {
        basicToolStrokeWidth -= 2;
    }
    context.lineWidth = basicToolStrokeWidth;
    circle.radius(basicToolStrokeWidth * 0.5); //faktor damit es einigermaßen stimmt pix und konva größe
    stage.draw();

});

var Mousemode = document.getElementById('container');
Mousemode.classList.add('pencil');

var select = document.getElementById('basic-tool');
select.addEventListener('click', function () {
    var icon = document.getElementById('tool-icon');
    icon.classList.toggle('bi-pencil');
    icon.classList.toggle('bi-eraser');

    if (icon.classList.contains("bi-pencil")) {
        mode = "brush";
        Mousemode.classList.remove('pencil');
        Mousemode.classList.remove('eraser');
        Mousemode.classList.remove('grabbable');
        Mousemode.classList.add('pencil');
    }
    else {
        mode = "eraser";
        Mousemode.classList.remove('pencil');
        Mousemode.classList.remove('eraser');
        Mousemode.classList.remove('grabbable');
        Mousemode.classList.add('eraser');
    }

});

document.getElementById("clear-context").addEventListener('click', clearContext, false);
document.getElementById("BasicToolColorInput").addEventListener('change', updateColor, false);

//binding basic creation tools with backend
document.getElementById("create-textfield").addEventListener('click', createTextfeld, false);
document.getElementById("create-vektor").addEventListener('click', newArrow, false);
document.getElementById("create-line").addEventListener('click', createLine, false);

//binding advanced creation tools with backend
document.getElementById("hintergrund").addEventListener('change', changeToolBackground, false);
document.getElementById("exportInput").addEventListener('keypress', handleInputKeydown, false);
document.getElementById("exportButton").addEventListener('click', downloadPic, false);

const csvFileInputCH1 = document.getElementById("csv-file-input-1");
const csvFileInputCH2 = document.getElementById("csv-file-input-2");

csvFileInputCH1.addEventListener('change', handleSelectedFiles, false);
csvFileInputCH2.addEventListener('change', handleSelectedFiles, false);

document.getElementById("plusRow").addEventListener('click', addRow('dataTable'), false);
document.getElementById("minusRow").addEventListener('click', deleteRow('dataTable'), false);
document.getElementById("showGraph").addEventListener('click', readpoints('dataTable', 'dGraph', 'showGraph', 'Graph1'), false);