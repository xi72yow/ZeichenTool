function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function downloadSavegameAsJson(exportObj, exportName) {
  let dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(exportObj)
  )}`;
  let downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `${exportName}.json`);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

async function load(id) {
  let placeholderEvent; //lel

  let actualSavegame = JSON.parse(window.localStorage.getItem(id));
  //console.log(actualSavegame);

  //background
  setBackground(actualSavegame.background);

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
  }, 800);

  //konva shapes
  let groups = textlayer.find("Group");
  groups.forEach((group) => {
    //console.log(group);
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
    createTextfeld(
      placeholderEvent,
      set.pos,
      set.rot,
      set.scalex,
      set.width,
      set.value
    );
  });

  actualSavegame.arrow.forEach((set, i) => {
    newArrow(
      placeholderEvent,
      set.posArrow,
      set.arrowPoints,
      set.posP,
      set.posToolTip,
      set.labelText
    );
  });

  document.querySelector("#tableTable").innerHTML = actualSavegame.tables;

  document
    .querySelector("#tableTable")
    .querySelectorAll(".showGraphAfterSave")
    .forEach((btn, i) => {
      btn.click();
    });
}

function downloadSavegame(id) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8, " +
      encodeURIComponent(window.localStorage.getItem(id))
  );
  element.setAttribute("download", id + ".json");
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function findArrows() {}

function getTables() {}

function getCSV() {}

function remove(id) {
  showModal(
    "Sicher?",
    "Wollen Sie diesen Speicherstand wirklich löschen?",
    "Ja",
    "Nein",
    () => {
      window.localStorage.removeItem(id);
      renderSaveGames();
    }
  );
}

function renderSaveGames(params) {
  let saveGamesObj = { ...localStorage };

  let saveGames = [];
  Object.keys(saveGamesObj).forEach((key) => {
    if (!key.includes("client")) {
      saveGames.push(JSON.parse(saveGamesObj[key]));
    }
  });

  let slots = document.getElementById("savegames");
  slots.innerHTML = "";

  saveGames.forEach((saveGame) => {
    slots.insertAdjacentHTML(
      "beforeend",
      `             
    <div id="${saveGame.name}" class="d-flex justify-content-center mb-3">
    <div class="vertical-center">
    <div><strong>${saveGame.date}</strong></div>
    </div>
    
    <div class="vertical-center savegame">
      <img
        id="${saveGame.name}-img"
        src="data:${saveGame.prview_img}"
        alt="..."
        style="height: 85px"
        onclick="load('${saveGame.name}')"
      />
    </div>
    <div class="vertical-center">
      <div>${saveGame.name}</div>
    </div>
    <div class="vertical-center">
      <!-- Create Stuff -->
      <div class="input-group">
        <button
          id="${saveGame.name}-export-savegame"
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="export"
          onclick="downloadSavegame('${saveGame.name}')"
        >
          <i class="bi bi-box-arrow-up"></i>
        </button>

        <button
          id="${saveGame.name}-delete-savegame"
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="löschen"
          onclick="remove('${saveGame.name}')"

        >
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div>
  </div>`
    );
  });
}

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

  //console.log("save");
  let image = stage.toDataURL();
  let lines = new Array();
  let textareas = new Array();
  let arrows = new Array();
  const id = uid();

  let groups = textlayer.find("Group");

  for (const group of groups) {
    //save linetool
    let line = new Array();
    if (group.getAttr("name") === "line-save") {
      let points = group.getChildren(
        (node) => node.getClassName() === "Circle"
      );
      for (const point of points) {
        line.push(point.absolutePosition());
      }
      lines.push(line);
    }

    //save textareas
    if (group.getAttr("name") === "text-save") {
      let texts = group.getChildren((node) => node.getClassName() === "Text");
      let trs = group.getChildren(
        (node) => node.getClassName() === "Transformer"
      );
      let text = texts[0].getAttrs();
      //console.log(text);
      let tr = trs[0].getAttrs();

      let slice = {
        pos: {
          x: text.x,
          y: text.y,
        },
        rot: text.rotation,
        scalex: text.scaleX,
        width: text.width,
        height: tr.scaleY,
        value: text.text,
      };
      textareas.push(slice);
    }

    //save vektor
    if (group.getAttr("name") === "arrow-save") {
      let arrow = group.getChildren((node) => node.getClassName() === "Arrow");
      let point = group.getChildren((node) => node.getClassName() === "Circle");
      let tooltip = group.getChildren(
        (node) => node.getClassName() === "Label"
      );

      let slice = {
        posArrow: { x: arrow[0].getAttrs().x, y: arrow[0].getAttrs().y },
        arrowPoints: arrow[0].getAttrs().points,
        posP: {
          x: point[0].getAttrs().x,
          y: point[0].getAttrs().y,
        },
        posToolTip: {
          x: tooltip[0].getAttrs().x,
          y: tooltip[0].getAttrs().y,
        },
        labelText: arrow[0].getAttrs().id,
      };
      arrows.push(slice);
    }
  }

  //save custom tables
  let dataTables = document.querySelector("#tableTable").innerHTML;

  let saveGame = {
    name: id,
    prview_img: image,
    layer: layer.toDataURL(),
    background: document.getElementById("hintergrund").selectedIndex,
    textarea: textareas,
    arrow: arrows,
    line: lines,
    csvData: [],
    tables: dataTables,
    date: new Date(),
  };

  window.localStorage.setItem(id, JSON.stringify(saveGame));
  renderSaveGames();
}

renderSaveGames();
