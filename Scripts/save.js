function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function load() {

}

function downloadSavegame() {

}

function findArrows() {

}

function findTextareas() {

}

function findLines() {

}

function getTables() {

}

function getCSV() { }

function save() {

  console.log("save")
  let image = stage.toDataURL().replace("image/png", "image/octet-stream");
  let slots = document.getElementById("savegames");
  let id = uid();
  let date = new Date().toLocaleDateString();

  slots.insertAdjacentHTML('beforeend', `             
    <div id="${id}" class="d-flex justify-content-center mb-3">
    <div class="vertical-center">
    <div><strong>${date}</strong></div>
    </div>
    
    <div class="vertical-center savegame">
      <img
        id="${id}-img"
        src="data:${image}"
        alt="..."
        style="height: 85px"
      />
    </div>
    <div class="vertical-center">
      <div>${id}</div>
    </div>
    <div class="vertical-center">
      <!-- Create Stuff -->
      <div class="input-group">
        <button
          id="${id}-export-savegame"
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="export"
        >
          <i class="bi bi-box-arrow-up"></i>
        </button>

        <button
          id="${id}-delete-savegame"
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="löschen"
        >
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div>
  </div>`);


  let saveGame = {
    prview_img: image,
    layer: layer.toDataURL().replace("image/png", "image/octet-stream"),
    background: document.getElementById(
      "hintergrund").selectedIndex,
    textareas: [],
    arrows: [],
    line: [],
    csvData: [],
    tables: []
  }

  console.log(saveGame)
}