//boosttrap tooltips enable all
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))


//binding basic drawing tools with backend
document.getElementById('basic-tool-bigger').addEventListener('click', () => {
    if (basicToolStrokeWidth < 24) {
        basicToolStrokeWidth += 2;
    }
    if (mode === "brush") {
        circle.radius(basicToolStrokeWidth * 0.5); //faktor damit es einigermaßen stimmt pix und konva größe
        context.lineWidth = basicToolStrokeWidth;
    } else {
        circle.radius(basicToolStrokeWidth + 10 * 0.5); //faktor damit es einigermaßen stimmt pix und konva größe
        context.lineWidth = basicToolStrokeWidth + 10;
    }
    stage.draw();

});

document.getElementById('basic-tool-smaller').addEventListener('click', () => {
    if (basicToolStrokeWidth > 2) {
        basicToolStrokeWidth -= 2;
    }
    if (mode === "brush") {
        circle.radius(basicToolStrokeWidth * 0.5); //faktor damit es einigermaßen stimmt pix und konva größe
        context.lineWidth = basicToolStrokeWidth;
    } else {
        circle.radius(basicToolStrokeWidth + 10 * 0.5); //faktor damit es einigermaßen stimmt pix und konva größe
        context.lineWidth = basicToolStrokeWidth + 10;
    }
    stage.draw();

});

const Mousemode = document.getElementById('container');
Mousemode.classList.add('pencil');

let select = document.getElementById('basic-tool');
select.addEventListener('click', () => {

    if (mode === "brush") {
        circle.radius(basicToolStrokeWidth + 10 * 0.5); //faktor damit es einigermaßen stimmt pix und konva größe
        context.lineWidth = basicToolStrokeWidth + 10;
    } else {
        circle.radius(basicToolStrokeWidth * 0.5); //faktor damit es einigermaßen stimmt pix und konva größe
        context.lineWidth = basicToolStrokeWidth;
    }
    stage.draw();

    let icon = document.getElementById('tool-icon');
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

document.getElementById("file-input-pic").addEventListener('change', preview_image, false);

document.getElementById("plusRow").addEventListener('click', addRow, false);
document.getElementById("minusRow").addEventListener('click', deleteRow, false);
document.getElementById("showGraph0").addEventListener('click', readpoints, false);
document.getElementById("newTable").addEventListener('click', insertNewWertetabelle, false);

document.getElementById("save").addEventListener('click', save, false);