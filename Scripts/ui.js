//boosttrap tooltips enable all
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})



var select = document.getElementById('basic-tool');
select.addEventListener('click', function () {
    var icon = document.getElementById('tool-icon');
    icon.classList.toggle('bi-pencil');
    icon.classList.toggle('bi-eraser');

    /*
        if (mode === 'brush') {
            Mousemode.classList.remove('pencil');
            Mousemode.classList.remove('eraser');
            Mousemode.classList.remove('grabbable');
            Mousemode.classList.add('pencil');
        }
        if (mode === 'eraser') {
            Mousemode.classList.remove('pencil');
            Mousemode.classList.remove('eraser');
            Mousemode.classList.remove('grabbable');
            Mousemode.classList.add('eraser');
        }*/

});