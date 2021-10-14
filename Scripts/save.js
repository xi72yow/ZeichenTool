function uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

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
    
    <div class="vertical-center">
      <img
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
          id="export-savegame"
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="export"
        >
          <i class="bi bi-box-arrow-up"></i>
        </button>

        <button
          id="delete-savegame"
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
}