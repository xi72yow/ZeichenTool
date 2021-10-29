function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function downloadSavegameAsJson(exportObj, exportName) {
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

let saveSlots = new Array;

async function load(id) {
  let placeholderEvent;//lel

  let actualSavegame = saveSlots.find(saveGame => saveGame.name === id);
  console.log(actualSavegame);

  //background
  setBackground(actualSavegame.background)

  //handwritten
  context.clearRect(0, 0, canvas.width, canvas.height);

  var image = new Image();
  image.onload = function () {
    context.drawImage(image, 0, 0);
  };

  image.src = actualSavegame.layer;
  setTimeout(function () {
    context.stroke();
    stage.draw();
  }, 800)

  //konva shapes
  let groups = textlayer.find('Group');
  groups.forEach(group => {
    console.log(group)
    if (group.getAttr("name") === "line-save") {
      group.destroy();
    }
    if (group.getAttr("name") === "text-save") {
      group.destroy();
    }
  });

  actualSavegame.line.forEach((set) => {
    createLine(placeholderEvent, set[0], set[1]);
  });

  actualSavegame.textarea.forEach((set, i) => {
    createTextfeld(placeholderEvent, set.pos, set.rot, set.height, set.width, set.value);
  });

}

function downloadSavegame() {

}

function findArrows() {

}

function getTables() {

}

function getCSV() { }

function save() {
  //hier eventuell spamschutz?!
  document.body.classList.add("waiting");
  setTimeout(() => {
    document.body.classList.remove("waiting");
    document.querySelector("body > div.container-fluid > div.d-flex.justify-content-center.my-1 > div:nth-child(4) > div > button:nth-child(2)").classList.add("blink");
  }, 2000);

  setTimeout(() => {
    document.querySelector("body > div.container-fluid > div.d-flex.justify-content-center.my-1 > div:nth-child(4) > div > button:nth-child(2)").classList.remove("blink");
  }, 5000);
  console.log("save")
  let image = stage.toDataURL();
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
        onclick="load('${id}')"
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

  let lines = new Array();
  let textareas = new Array();

  let groups = textlayer.find('Group');

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    let line = new Array();
    if (group.getAttr("name") === "line-save") {
      let points = group.getChildren(function (node) {
        return node.getClassName() === 'Circle';
      });
      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        line.push(point.absolutePosition())
      }
      lines.push(line);
    }


    if (group.getAttr("name") === "text-save") {
      let texts = group.getChildren(function (node) {
        return node.getClassName() === 'Text';
      });
      let trs = group.getChildren(function (node) {
        return node.getClassName() === 'Transformer';
      });
      let text = texts[0].getAttrs();
      console.log(text)
      let tr = trs[0].getAttrs();

      let slice = {
        pos: {
          x: text.x,
          y: text.y
        },
        rot: text.rotation,
        width: tr.scaleX,
        height: tr.scaleY,
        value: text.text
      }
      textareas.push(slice);


    }
  }

  let saveGame = {
    name: id,
    prview_img: image,
    layer: layer.toDataURL(),
    background: document.getElementById(
      "hintergrund").selectedIndex,
    textarea: textareas,
    arrows: [],
    line: lines,
    csvData: [],
    tables: []
  }

  saveSlots.push(saveGame);
  console.log("Speicherstände")
  console.log(saveSlots)
}