function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function downloadSavegameAsJson(exportObj, exportName) {
  let dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`;
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `${exportName}.json`);
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

  let image = new Image();
  image.onload = () => {
    context.drawImage(image, 0, 0);
  };

  image.src = actualSavegame.layer;
  setTimeout(() => {
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
    if (group.getAttr("name") === "arrow-save") {
      group.destroy();
    }
  });

  actualSavegame.line.forEach((set) => {
    createLine(placeholderEvent, set[0], set[1]);
  });

  actualSavegame.textarea.forEach((set, i) => {
    createTextfeld(placeholderEvent, set.pos, set.rot, set.height, set.width, set.value);
  });

  actualSavegame.arrow.forEach((set, i) => {
    newArrow(placeholderEvent, set.posArrow, set.arrowPoints, set.posP, set.posToolTip, set.labelText);
  });

  document.querySelector("#tableTable").innerHTML = actualSavegame.tables;

  document.querySelector("#tableTable").querySelectorAll(".showGraphAfterSave").forEach((btn, i) => {
    btn.click();
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
    document.querySelector("#save-state").classList.add("blink");
  }, 2000);

  setTimeout(() => {
    document.querySelector("#save-state").classList.remove("blink");
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
  let arrows = new Array();

  let groups = textlayer.find('Group');

  for (const group of groups) {
    //save linetool
    let line = new Array();
    if (group.getAttr("name") === "line-save") {
      let points = group.getChildren((node) => node.getClassName() === 'Circle');
      for (const point of points) {
        line.push(point.absolutePosition())
      }
      lines.push(line);
    }

    //save textareas
    if (group.getAttr("name") === "text-save") {
      let texts = group.getChildren((node) => node.getClassName() === 'Text');
      let trs = group.getChildren((node) => node.getClassName() === 'Transformer');
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

    //save vektor
    if (group.getAttr("name") === "arrow-save") {
      let arrow = group.getChildren((node) => node.getClassName() === 'Arrow');
      let point = group.getChildren((node) => node.getClassName() === 'Circle');
      let tooltip = group.getChildren((node) => node.getClassName() === 'Label');
      let tooltipText = tooltip[0].getChildren((node) => node.getClassName() === 'Text');

      let slice = {
        posArrow: { x: arrow[0].getAttrs().x, y: arrow[0].getAttrs().y },
        arrowPoints: arrow[0].getAttrs().points,
        posP: {
          x: point[0].getAttrs().x,
          y: point[0].getAttrs().y
        },
        posToolTip: {
          x: tooltip[0].getAttrs().x,
          y: tooltip[0].getAttrs().y
        },
        labelText: tooltipText[0].getAttrs().text,
      }
      arrows.push(slice);
    }
  }


  //save custom tables
  let dataTables = document.querySelector("#tableTable").innerHTML;

  let saveGame = {
    name: id,
    prview_img: image,
    layer: layer.toDataURL(),
    background: document.getElementById(
      "hintergrund").selectedIndex,
    textarea: textareas,
    arrow: arrows,
    line: lines,
    csvData: [],
    tables: dataTables
  }

  saveSlots.push(saveGame);
  console.log("Speicherstände")
  console.log(saveSlots)
}