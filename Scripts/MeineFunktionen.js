function setCursorByID(id, cursorStyle) {
  var elem;
  if (document.getElementById && (elem = document.getElementById(id))) {
    if (elem.style) elem.style.cursor = cursorStyle;
  }
}

function handlerfunktion(event) {
  window.alert("Es ist ein Ereignis vom Typ " + event.type + " passiert.");
}

function getPointerOnElement(element) {
  var pos = element.getPointerPosition();
  return pos;
}

function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  for (var src in sources) {
    numImages++;
  }
  for (var src in sources) {
    images[src] = new Image();
    images[src].onload = function () {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

function toggleText(button_id) {
  var text = document.getElementById(button_id).firstChild;
  text.data = text.data == "Mode1" ? "Mode2" : "Mode1";
}

function clear(id) {
  document.getElementById(id).innerHTML = "";
}

function flipbits(v, digits) {
  return ~v & (Math.pow(2, digits) - 1);
}

function loadImageURL(cx, url) {
  var image = document.createElement("img");
  image.addEventListener("load", function () {
    var color = cx.fillStyle,
      size = cx.lineWidth;
    cx.canvas.width = image.width;
    cx.canvas.height = image.height;
    cx.drawImage(image, 0, 0);
    cx.fillStyle = color;
    cx.strokeStyle = color;
    cx.lineWidth = size;
  });
  image.src = url;

  cx.drawImage(image, 0, 0);
  cx.stroke();
}

function toggleDialog() {
  var dialog = document.querySelector("dialog"),
    closeButton = document.getElementById("close-dialog");
  if (!dialog.hasAttribute("open")) {
    // show the dialog
    dialog.setAttribute("open", "open");
    // after displaying the dialog, focus the closeButton inside it
    closeButton.focus();
    closeButton.addEventListener("click", toggleDialog);
    // EventListener für ESC-Taste
    document.addEventListener(
      "keydown",
      function (event) {
        if (event.keyCode == 27) {
          toggleDialog();
        }
      },
      true
    );
    // only hide the background *after* you've moved focus out of the content that will be "hidden"
    var div = document.createElement("div");
    div.id = "backdrop";
    document.body.appendChild(div);
  } else {
    dialog.removeAttribute("open");
    var div = document.querySelector("#backdrop");
    div.parentNode.removeChild(div);
    lastFocus.focus();
  }
}

function simulate(element, eventName) {
  var options = extend(defaultOptions, arguments[2] || {});
  var oEvent,
    eventType = null;

  for (var name in eventMatchers) {
    if (eventMatchers[name].test(eventName)) {
      eventType = name;
      break;
    }
  }

  if (!eventType)
    throw new SyntaxError(
      "Only HTMLEvents and MouseEvents interfaces are supported"
    );

  if (document.createEvent) {
    oEvent = document.createEvent(eventType);
    if (eventType == "HTMLEvents") {
      oEvent.initEvent(eventName, options.bubbles, options.cancelable);
    } else {
      oEvent.initMouseEvent(
        eventName,
        options.bubbles,
        options.cancelable,
        document.defaultView,
        options.button,
        options.pointerX,
        options.pointerY,
        options.pointerX,
        options.pointerY,
        options.ctrlKey,
        options.altKey,
        options.shiftKey,
        options.metaKey,
        options.button,
        element
      );
    }
    element.dispatchEvent(oEvent);
  } else {
    options.clientX = options.pointerX;
    options.clientY = options.pointerY;
    var evt = document.createEventObject();
    oEvent = extend(evt, options);
    element.fireEvent("on" + eventName, oEvent);
  }
  return element;
}

function extend(destination, source) {
  for (var property in source) destination[property] = source[property];
  return destination;
}

var eventMatchers = {
  HTMLEvents:
    /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
  MouseEvents: /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/,
};

var defaultOptions = {
  pointerX: 0,
  pointerY: 0,
  button: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  bubbles: true,
  cancelable: true,
};

var mylatesttap = new Date().getTime();

function doubletap() {
  //  console.log("dlbetap check");
  var now = new Date().getTime();
  var timesince = now - mylatesttap;
  mylatesttap = now;
  // console.log(timesince);

  if (timesince < 600 && timesince > 0) {
    // console.log("dlbetap fired");
    return true;
  } else {
    return false;
  }
}

function is_touch_device() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

if (debugging) {
  console.log("Touchdevice: " + is_touch_device());
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function playerJumpToSec(id, timestamp) {
  document.getElementById(id).currentTime = timestamp;
}

Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

Array.prototype.min = function () {
  return Math.min.apply(null, this);
};

// hinweis check single input kontrolliert ein input auf zahlenwert und auf einheit.
// die einheit wird nicht bewertet, wenn einheit zwingend auf false gestellt wird.
// als default ist die einheit automatisch mit kontrolliert und 10% toleranz

function checkSingleInput(
  userInput,
  loesung,
  Basiseinheit,
  toleranzInFaktor,
  toleranzInAbsolut,
  EinheitZwingend
) {
  //default Eigenschaften bei unvollständiger verwendung
  EinheitZwingend =
    typeof EinheitZwingend !== "undefined" ? EinheitZwingend : true;
  toleranzInFaktor =
    typeof toleranzInFaktor !== "undefined" ? toleranzInFaktor : 0.1;
  toleranzInAbsolut =
    typeof toleranzInAbsolut !== "undefined" ? toleranzInAbsolut : 0.1;

  var auswertungAnswer = userInput.value.replace(/,/g, "."); //float kann gelesen werden
  auswertungAnswer = auswertungAnswer.replace(/ /g, ""); //alle leerzeichen weg
  //console.log(auswertungAnswer);
  var valueNumAnswer = parseFloat(auswertungAnswer, 10); //liest erste Floating Piont Num in dezimal

  var faktortestgiga = new RegExp(`G(?=${Basiseinheit})`, "g");
  var faktortestmega = new RegExp(`M(?=${Basiseinheit})`, "g");
  var faktortestkilo = new RegExp(`k(?=${Basiseinheit})`, "g");
  var faktortestmilli = new RegExp(`m(?=${Basiseinheit})`, "g");
  var faktortestmikro = new RegExp(`u(?=${Basiseinheit})`, "g");
  var faktortestnano = new RegExp(`n(?=${Basiseinheit})`, "g");

  var einheitFaktor = [
    faktortestnano.test(auswertungAnswer),
    faktortestmikro.test(auswertungAnswer),
    faktortestmilli.test(auswertungAnswer),
    faktortestkilo.test(auswertungAnswer),
    faktortestmega.test(auswertungAnswer),
    faktortestgiga.test(auswertungAnswer),
  ];

  /*console.log(einheitFaktor[0]);
  console.log(einheitFaktor[1]);
  console.log(einheitFaktor[2]);
  console.log(einheitFaktor[3]);*/

  var einheittest = new RegExp(`${Basiseinheit}`, "i");
  var faktor = 1.0;
  var Result = 0;

  var i;
  for (i = 0; i < einheitFaktor.length; i++) {
    if (einheitFaktor[i]) {
      if (i == 0) {
        faktor = 0.000000001;
      }
      if (i == 1) {
        faktor = 0.000001;
      }
      if (i == 2) {
        faktor = 0.001;
      }
      if (i == 3) {
        faktor = 1000;
      }
      if (i == 4) {
        faktor = 1000000;
      }
      if (i == 5) {
        faktor = 1000000000;
      }
    }
  }

  /*console.log("Faktor:" + faktor);
  console.log(valueNumAnswer);
  console.log(einheitResultAnswer);*/

  // Ruckgabewert wird etappenweise erhöt je höher die Zahl desto richtiger das ergebnis

  if (auswertungAnswer === "") {
    // console.log("keine zahl");
    userInput.style.backgroundColor = "#DDDDDD"; //grau
    return 0;
  }

  if (einheittest.test(auswertungAnswer) == false && EinheitZwingend == true) {
    // console.log("einheit falsch");
    userInput.style.backgroundColor = "#fffd7a"; //gelb
    return 1;
  }

  if (Number.isNaN(valueNumAnswer) && EinheitZwingend == true) {
    //console.log("Zahlenwert nicht vorhanden");
    userInput.style.backgroundColor = "#5dbcd2"; //türkies
    return 1.5;
  }

  if (loesung >= 0) {
    if (
      (valueNumAnswer * faktor <= loesung * (1 + toleranzInFaktor) &&
        valueNumAnswer * faktor >= loesung * (1 - toleranzInFaktor)) ||
      (valueNumAnswer * faktor <= loesung + toleranzInAbsolut &&
        valueNumAnswer * faktor >= loesung - toleranzInAbsolut)
    ) {
      userInput.style.backgroundColor = "#9cf772"; //loesung größer null und Zahlenwert richtig
      // console.log("loesung größer null und Zahlenwert richtig");
      return 3;
    } else {
      userInput.style.backgroundColor = "#ff4040"; //loesung größer null und Zahlenwert falsch
      //  console.log("loesung größer null und Zahlenwert falsch");
      return 2;
    }
  } else {
    //lösung<0

    if (
      (valueNumAnswer * faktor >= loesung * (1 + toleranzInFaktor) &&
        valueNumAnswer * faktor <= loesung * (1 - toleranzInFaktor)) ||
      (valueNumAnswer * faktor >= loesung + toleranzInAbsolut &&
        valueNumAnswer * faktor <= loesung - toleranzInAbsolut)
    ) {
      userInput.style.backgroundColor = "#9cf772"; //loesung kleiner null und Zahlenwert richtig
      // console.log("loesung kleiner null und Zahlenwert richtig");
      return 3;
    } else {
      userInput.style.backgroundColor = "#ff4040"; //loesung kleiner null und Zahlenwert falsch
      //  console.log("loesung kleiner null und Zahlenwert falsch");
      return 2;
    }
  }

  console.log(
    "Single unit Ergebnis unter diesen bedingungen nicht auswertbar!"
  );
}

// hinweis: mit dieser Funktion kann ein input auf verschiedene unterschiedkiche formen der schreibweise überprüft werden

function checkSingleInputWithMultipleUnit(
  userInput,
  loesung,
  multipeBasiseinheit,
  toleranzInFaktor,
  EinheitZwingend
) {
  var i;
  var result = new Array();
  for (i = 0; i < multipeBasiseinheit.length; i++) {
    result.push(
      checkSingleInput(
        userInput,
        loesung,
        multipeBasiseinheit[i],
        toleranzInFaktor,
        toleranzInAbsolut,
        EinheitZwingend
      )
    );
    //console.log(result);
  }
  //console.log(result.max);

  let ergebnis = result.max();
  if (ergebnis == 0) {
    userInput.style.backgroundColor = "#DDDDDD";
    return;
  }

  if (ergebnis == 1) {
    userInput.style.backgroundColor = "#fffd7a";
    return;
  }

  if (ergebnis == 1.5) {
    userInput.style.backgroundColor = "#5dbcd2";
    return;
  }

  if (ergebnis == 2) {
    userInput.style.backgroundColor = "#ff4040";
    return;
  }

  if (ergebnis == 3) {
    userInput.style.backgroundColor = "#9cf772";
    return;
  }

  console.error(
    "Multi unit Ergebnis unter diesen bedingungen nicht auswertbar!"
  );
}

function get(tableId) {
  //holt eigentlich ein string array
  // returns an array for the values of all input elements of given table
  var table = document.getElementById(tableId);
  var rowCount = table.rows.length;
  var row = table.rows[1];
  var inputs = row.getElementsByTagName("input");
  var result = new Array(inputs.length * (rowCount - 1));
  var resultCount = 0;

  for (var j = 0; j < rowCount; j++) {
    row = table.rows[j];
    inputs = row.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
      result[resultCount] = stringToFloat(inputs[i].value); //funktionsaufruf wegglassen um string array zu erhalten
      resultCount++;
    }
  }

  return result;
}

// table Action

function addRow(e, num) {
  // Get a reference to the table maybe add some auto row detection
  let selector, id;
  if (typeof num !== 'undefined') {
    selector = "#" + "dataTable" + num + " tbody";
    id = "dataTable" + num;
  } else {
    selector = "#" + "dataTable0" + " tbody";
    id = "dataTable0";

  }
  let tableRef = document.querySelector(selector);
  var table = document.getElementById(id);
  var tbodyRowCount = table.tBodies[0].rows.length;

  tableRef.insertAdjacentHTML('beforeend', `<tr>
  <td>
    <div class="input-group">
      <span class="input-group-text" id="basic-addon1">P${tbodyRowCount}</span>
      <input type="text" class="form-control" placeholder="0.00" aria-label="Punkt" aria-describedby="basic-addon1">
    </div>
  </td>
  <td>
    <div class="input-group">
      <span class="input-group-text" id="basic-addon1">P${tbodyRowCount}</span>
      <input type="text" class="form-control" placeholder="0.00" aria-label="Punkt" aria-describedby="basic-addon1">
    </div>
  </td>
</tr>`);

}

function deleteRow(e, num) {
  let id;
  if (typeof num !== 'undefined') {
    id = "dataTable" + num;
  } else {
    id = "dataTable0";
  }
  var table = document.getElementById(id);
  var rowCount = table.rows.length;

  if (rowCount > 2) {
    table.deleteRow(rowCount - 1);
  } else return;
}

var tablecount = 0;

function insertNewWertetabelle() {
  tablecount++;
  var table = document.getElementById("tableTable");
  table.insertAdjacentHTML('afterbegin', ` <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3" >
  <div class="input-group input-group-sm">
    <span class="input-group-text" id="basic-addon1"
      >Graph</span
    >
    <input
      id="graph-name${tablecount}"
      type="text"
      class="form-control"
      value="Resistor${tablecount}"
      placeholder="Resistor${tablecount}"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </div>
  <table id="dataTable${tablecount}" class="table table-hover">
    <thead>
      <tr>
        <td>
          <strong>Ordinate</strong>
        </td>
        <td>
          <strong>Abzisse</strong>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1"
              >P0</span
            >
            <input
              type="text"
              class="form-control"
              placeholder="0.00"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </td>
        <td>
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1"
              >P0</span
            >
            <input
              type="text"
              class="form-control"
              placeholder="0.00"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="d-flex justify-content-center">
    <div class="input-group d-flex justify-content-center">
      <button
        type="button"
        id="plusRow${tablecount}"
        onclick="addRow(event,'${tablecount}')"
        class="btn btn-secondary"
      >
        <i class="bi bi-file-plus"></i>
      </button>
      <button
        type="button"
        id="minusRow${tablecount}"
        onclick="deleteRow(event,'${tablecount}')"
        class="btn btn-secondary"
      >
        <i class="bi bi-file-minus"></i>
      </button>
    </div>

    <div class="input-group d-flex justify-content-center">
      <button
        type="button"
        id="showGraph${tablecount}"
        onclick="readpoints(event, '${tablecount}')"
        class="btn btn-secondary showGraphAfterSave"
      >
        <i class="bi bi-graph-up"></i>
      </button>
      <button
        type="button"
        id="dGraph${tablecount}"
        class="btn btn-secondary"
      >
        <i class="bi bi-trash2"></i>
      </button>
    </div>
  </div>
</div>`);
}

function tableCreate() {
  var body = document.getElementsByTagName("body")[0];
  var tbl = document.createElement("table");
  tbl.style.width = "100%";
  tbl.setAttribute("border", "1");
  var tbdy = document.createElement("tbody");
  for (var i = 0; i < 3; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < 2; j++) {
      if (i == 2 && j == 1) {
        break;
      } else {
        var td = document.createElement("td");
        td.appendChild(document.createTextNode("\u0020"));
        i == 1 && j == 1 ? td.setAttribute("rowSpan", "2") : null;
        tr.appendChild(td);
      }
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl);
}

function insertNewCell(tableID) {
  var table = document.getElementById(tableID);
  var firstRow = table.rows[0];
  var cell = firstRow.insertCell(1);
  cell.innerHTML = "The new cell";
}

function stringToFloat(array) {
  var auswertungAnswer = array.replace(/,/g, "."); //float kann gelesen werden
  auswertungAnswer = auswertungAnswer.replace(/ /g, ""); //alle leerzeichen weg
  //console.log(auswertungAnswer);
  var valueNumAnswer = parseFloat(auswertungAnswer, 10); //liest erste Floating Piont Num

  return valueNumAnswer;
}

//menue anpassung um das menüe intuitiv bedienen zu können

var countfirstClick1 = true;
var countfirstClick2 = true;

function toggleHideShow(myDIV, countClick) {
  if (countClick == 2 && countfirstClick2) {
    countfirstClick2 = false;
    return;
  }
  if (countClick == 1 && countfirstClick1) {
    countfirstClick1 = false;
    return;
  }
  if (
    (!countfirstClick1 && countClick == 1) ||
    (!countfirstClick2 && countClick == 2)
  ) {
    var x = document.getElementById(myDIV);
    console.log("World!");
    if (is_touch_device()) {
      if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
      }
    }
  }
}

function hideCross(myDIV) {
  var x = document.getElementById(myDIV);

  if (!is_touch_device()) {
    x.style.visibility = "hidden";
  }
}

function hideSomething(myDIV) {
  var x = document.getElementById(myDIV);

  if (is_touch_device()) {
    x.style.visibility = "hidden";
  }
}

function showSomething(myDIV) {
  var x = document.getElementById(myDIV);

  if (is_touch_device()) {
    x.style.visibility = "visible";
  }
}

function setVektorName(label, arrow, blockSnapSize) {
  let name = arrow.getId();
  let betrag =
    Math.round((getABS2DVektor(arrow, blockSnapSize) + Number.EPSILON) * 100) /
    100;
  let winkel =
    Math.round(
      (getAngleToKOSimStutzVektor(arrow, blockSnapSize) + Number.EPSILON) * 100
    ) / 100;

  label.setAttr("text", `${name} (${betrag} ; ${winkel}°)`);
}

function getABS2DVektor(arrow, blockSnapSize) {
  let punkte = arrow.getPoints();

  let vektor = {
    x: (punkte[2] - punkte[0]) / (2 * blockSnapSize),
    y: (punkte[3] - punkte[1]) / (2 * blockSnapSize),
  };

  let abs = Math.sqrt(vektor.x ** 2 + vektor.y ** 2);
  //console.log("abs: " + abs);
  return abs;
}

function getSkalar2DVektor(arrow1, arrow2, blockSnapSize) {
  let punkteV1 = arrow1.getPoints();
  let punkteV2 = arrow2.getPoints();

  let vektor1 = {
    x: (punkteV1[2] - punkteV1[0]) / (2 * blockSnapSize),
    y: (punkteV1[3] - punkteV1[1]) / (2 * blockSnapSize),
  };

  let vektor2 = {
    x: (punkteV2[2] - punkteV2[0]) / (2 * blockSnapSize),
    y: (punkteV2[3] - punkteV2[1]) / (2 * blockSnapSize),
  };

  //console.log(vektor2);

  let skalar = vektor1.x * vektor2.x + vektor1.y * vektor2.y;
  //console.log("skalr: " + skalar);
  return skalar;
}

function getAngle2DVektors(arrow1, arrow2, blockSnapSize) {
  console.log("Angle berrechnung");

  let punkteV1 = arrow1.getPoints();
  let punkteV2 = arrow2.getPoints();

  let vektor1 = {
    x: (punkteV1[2] - punkteV1[0]) / (2 * blockSnapSize),
    y: (punkteV1[3] - punkteV1[1]) / (2 * blockSnapSize),
  };

  let vektor2 = {
    x: (punkteV2[2] - punkteV2[0]) / (2 * blockSnapSize),
    y: (punkteV2[3] - punkteV2[1]) / (2 * blockSnapSize),
  };

  let absVektor1 = getABS2DVektor(arrow1, blockSnapSize);
  let absVektor2 = getABS2DVektor(arrow2, blockSnapSize);

  let angle = Math.acos(
    getSkalar2DVektor(arrow1, arrow2, blockSnapSize) / (absVektor1 * absVektor2)
  );
  //console.log("Angle in RAD: " + angle);

  return radTodeg(angle);
}

function radTodeg(x) {
  let deg = (x / Math.PI) * 180;

  //console.log("Angle in DEG: " + deg + "°");

  return deg;
}

function checkUnderUpper(arrow1, arrow2, blockSnapSize) {
  let punkteV1 = arrow1.getPoints();
  let punkteV2 = arrow2.getPoints();

  let vektor1 = {
    x: (punkteV1[2] - punkteV1[0]) / (2 * blockSnapSize),
    y: (punkteV1[3] - punkteV1[1]) / (2 * blockSnapSize),
  };

  let vektor2 = {
    x: (punkteV2[2] - punkteV2[0]) / (2 * blockSnapSize),
    y: (punkteV2[3] - punkteV2[1]) / (2 * blockSnapSize),
  };

  let anstiegArrow2 = vektor2.y / vektor2.x;

  let yAchsenabschnittArrow2 = punkteV2[1] - anstiegArrow2 * punkteV2[0];

  if (
    anstiegArrow2 * (punkteV1[2] / (2 * blockSnapSize)) +
    yAchsenabschnittArrow2 <
    punkteV1[3] / (2 * blockSnapSize)
  ) {
    //arrow1 ist über arrow2
    //console.log("Arrow1 ist unter Arrow2");
    return 2;
  } else {
    //console.log("Arrow1 ist über Arrow2");
    return 1;
  }
}

function getAngleToKOSimStutzVektor(arrow, blockSnapSize) {
  let p = arrow.getPoints();
  let x = p[0];
  let y = p[1];

  //anpassung an KOS im Ausgangspunkt

  let point = {
    x: 0,
    y: 0,
  };

  if (p[2] > x) {
    point.x = Math.abs(p[2] - x);
  } else {
    point.x = -1 * Math.abs(p[2] - x);
  }
  if (p[3] > y) {
    point.y = -1 * Math.abs(y - p[3]);
  } else {
    point.y = Math.abs(p[3] - y);
  }

  let angle = radTodeg(Math.atan2(point.y, point.x));
  //console.log(point.x);
  //console.log(point.y);
  //console.log("Imagine Angle: " + angle);
  return angle;
}

function ballerArcs(arrow, arrowTest, blockSnapSize, layer) {
  var arc = new Konva.Arc({
    outerRadius: 60,
    fill: "red",
    stroke: "black",
    strokeWidth: 2,
    draggable: true,
    angle: 60,
    rotation: -180,
  });
  layer.add(arc);
  arc.setPosition(arrow.position());
  if (checkUnderUpper(arrow, arrowTest, blockSnapSize) == 1) {
    let testangle = -getAngleToKOSimStutzVektor(arrow, blockSnapSize);
    console.log(`Test ANGLE: ${testangle}`);
    arc.setRotation(testangle);
    arc.setAngle(getAngle2DVektors(arrow, arrowTest, blockSnapSize));
  } else {
    let testangle1 = -getAngleToKOSimStutzVektor(arrow, blockSnapSize);
    console.log(`Test ANGLE 1: ${testangle1}`);
    arc.setRotation(testangle1);
    arc.setAngle(-getAngle2DVektors(arrow, arrowTest, blockSnapSize));
  }
}

function test() {
  var shapes = stage.find("Arrow");
  var tweens = [];
  // if there are currently any active tweens, destroy them
  // before creating new ones
  for (var n = 0; n < tweens.length; n++) {
    tweens[n].destroy();
  }

  // apply transition to all nodes in the array
  shapes.each(function (shape) {
    tweens.push(
      new Konva.Tween({
        node: shape,
        duration: 1,
        scaleX: Math.random() * 2,
        scaleY: Math.random() * 2,
        easing: Konva.Easings.ElasticEaseOut,
      }).play()
    );
  });
}

function showAsGrabbable(objekt) {
  objekt.on("mouseover", function () {
    Mousemode.classList.remove("pencil");
    Mousemode.classList.remove("eraser");
    Mousemode.classList.remove("pointer");
    Mousemode.classList.add("grabbable");
  });

  objekt.on("mouseout", function () {
    if (mode === "brush") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("pencil");
    }
    if (mode === "eraser") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("eraser");
    }
  });
}

function showAsClickable(objekt) {
  objekt.on("mouseover", function () {
    Mousemode.classList.remove("grabbable");
    Mousemode.classList.remove("eraser");
    Mousemode.classList.remove("pencil");
    Mousemode.classList.add("pointer");
  });

  objekt.on("mouseout", function () {
    if (mode === "brush") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("pencil");
    }
    if (mode === "eraser") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("eraser");
    }
  });
}

function makeItHover(objekt, stage) {
  let color = objekt.fill;

  objekt.on("mouseover touchstart", function () {
    objekt.setAttrs({
      fill: "lightgray",
    });
  });

  objekt.on("mouseout touchend", function () {
    // set multiple properties at once with setAttrs
    objekt.setAttrs({
      fill: color,
    });
  });
}

function roundDown(number, decimals) {
  decimals = decimals || 0;
  return Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

function getTxt(id) {
  var getTag = document.getElementById(id);
  var element = document.getElementById(id);
  var greetings = element.innerHTML;
  var breakDown = greetings.split("");
  clear(id);

  for (i = 0; i < breakDown.length; i++) {
    var injectSpans = document.createElement("span");
    var injectLetters = document.createTextNode(breakDown[i]);

    injectSpans.appendChild(injectLetters);
    getTag.appendChild(injectSpans);
  }
  return getTag;
}

function randomColor(id) {
  var getTag = getTxt(id);
  var keyFrameAnim = document.createElement("style");
  keyFrameAnim.type = "text/css";

  var browserPrefix = ["webkit", "moz", "o", "ms"];
  var colorCount = getTag.children.length;

  for (k = 0; k < browserPrefix.length; k++) {
    var tagParts1 = [
      `#${id} span{', '-' + ${browserPrefix[k]} + '-animation-duration:6s;-' + ${browserPrefix[k]} + '-animation-timing-function:ease;-' + ${browserPrefix[k]} + '-animation-iteration-count:infinite;', '}`,
    ];
    var partsTogether1;
    if (k == 0) {
      partsTogether1 = tagParts1[0] + "" + tagParts1[1];
    } else if (k == browserPrefix.length - 1) {
      partsTogether1 = tagParts1[1] + "" + tagParts1[2];
    } else {
      partsTogether1 = tagParts1[1];
    }
    var injectCSS = document.createTextNode(partsTogether1);
    keyFrameAnim.appendChild(injectCSS);
  }

  for (i = 0; i < colorCount; i++) {
    for (j = 0; j < browserPrefix.length; j++) {
      var tagParts2 = [
        `# ${id} span:nth-child(' + (i + 1) + '){', '-' + browserPrefix[j] + '-animation-name:anim' + (i + 1) + ';', '}`,
      ];
      var partsTogether2;
      if (j == 0) {
        partsTogether2 = tagParts2[0] + "" + tagParts2[1];
      } else if (j == browserPrefix.length - 1) {
        partsTogether2 = tagParts2[1] + "" + tagParts2[2];
      } else {
        partsTogether2 = tagParts2[1];
      }
      var injectCSS = document.createTextNode(partsTogether2);
      keyFrameAnim.appendChild(injectCSS);
    }
  }

  for (l = 0; l < colorCount; l++) {
    for (j = 0; j < browserPrefix.length; j++) {
      var allColors = [
        "364ACF",
        "eb3c3c",
        "e57201",
        "e530a3",
        "247d2f",
        "8f3eb5",
      ];
      var randomColor = [];
      for (r = 0; r < 6; r++) {
        var newColor = Math.floor(Math.random() * allColors.length);
        var getFromArray = allColors.splice(newColor, 1);
        randomColor.push(getFromArray);
      }

      var injectCSS = document.createTextNode(
        "@-" +
        browserPrefix[j] +
        "-keyframes anim" +
        (l + 1) +
        "{0%{color:#" +
        randomColor[0] +
        ";}16.6%{color:#" +
        randomColor[1] +
        ";}33.2%{color:#" +
        randomColor[2] +
        ";}49.8%{color:#" +
        randomColor[3] +
        ";}66.4%{color:#" +
        randomColor[4] +
        ";}83.1%{color:#" +
        randomColor[5] +
        ";}100%{color:#" +
        randomColor[0] +
        ";}}"
      );
      keyFrameAnim.appendChild(injectCSS);
    }
  }
  document.getElementsByTagName("head")[0].appendChild(keyFrameAnim);
}

function setContentVisabillity(id, bool) {
  var x = document.getElementById(id);
  if (bool) {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  }
}
