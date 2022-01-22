if (debugging) {
  console.log(
    "Hello! ZT in Debugging. (deactivate in zeichentool.html script tag id: debugging state)"
  );
}
var basicToolStrokeWidth = 2;
var strokeWidth = 10; //rahmen um Zeichenebene
var scrollbarWidth = 20;
var width = window.innerWidth - scrollbarWidth;
var height = window.innerHeight - 50;
var scalex = 1;
var scaley = 1;
var osziFlash = new Array(); //eingelesene und verarbeitete csv datei
var csvGroupCache = new Array(); //speicherort für den render der Dateien

/*// hier ist das virtuelle Kos eingepflegt hierzu debugging anschalten und auslesen
max höhe und breite werden in console ausgegeben*/

//1. lineare Kalibrierung

var ursprungXoffset = width * 0.14; // virtueller ursprung in prozent von gesamtbreite
var ursprungYoffset = height * 0.12; // virtueller ursprung in prozent von gesamthöhe
var xDiffPerCent = 0.0614; // div schrittweite in Prozent von gesamtbreite
var yDiffPerCent = 0.0776; // div schrittweite in Prozent von gesamthöhe
var yDiffWeiteCH1 = 20; //schrittweite je div CH1 default Slot für alle KOS (also hier 20mA/div)
var yDiffWeiteCH2 = 20; //schrittweite je div CH2 (also hier 20mA/div)
var xDiffWeite = 1; //schrittweite je div (also hier 1V/div)

//2. log Kalibrierung
var lineStepOnLogLine = [
  0, 0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046,
]; //umwandlung linerarer abstand in log
var firstDekadeEndeLOG = 1; //Startwert x Achse
var ursprungXoffsetLOG = width * 0.04; // virtueller ursprung in prozent von gesamtbreite
var xDiffDekPerCentLOG = 0.3409; // dekaden schrittweite in Prozent von gesamtbreite

var ursprungYoffsetLOG = height * 0.9238; // virtueller ursprung in prozent von gesamthöhe
var yDiffPerCentLOG = 0.0859; // div schrittweite in Prozent von gesamthöhe
var yDiffWeiteLOG = 5; //schrittweite je div (also hier 1V/div)

var platzHalterKali = [
  ursprungXoffset,
  ursprungYoffset,
  xDiffPerCent,
  yDiffPerCent,
  xDiffWeite,
  yDiffWeiteCH1,
  yDiffWeiteCH2,
];

var backroundKalibrierungTab = [
  [width * 0.1373, height * 0.1432, 0.0577, 0.1019, 5, 1], //0
  [width * 0.1235, height * 0.0917, 0.0642, 0.0833, 20, 1, 1], //1
  [width * 0.1223, height * 0.0684, 0.0651, 0.0531, 0.1, 0.1, 0.1], //2
  [width * 0.1073, height * 0.1836, 0.1014, 0.1018, 1, 0.1, 0.1], //3 dieser Slot ist derzeit nicht belegt
  [width * 0.1351, height * 0.1816, 0.0657, 0.1021, 1, 0.1, 0.1], //4
  [width * 0.3273, height * 0.5019, 0.0635, 0.1192, 1, 1, 1], //5 ozi Div
  platzHalterKali, //6
  platzHalterKali, //7
  platzHalterKali, //8
  [width * 0.3262, height * 0.5019, 0.3156, 0.1192, 0.24, 111.6, 111.6], //9
  [width * 0.0714, height * 0.0684, 0.0361, 0.0532, 5, 1, 1], //10
  [width * 0.0601, height * 0.0645, 0.0295, 0.0477, 100, 20, 20], //11

  //logarythmische x Kalibrierung
  [
    ursprungXoffsetLOG,
    ursprungYoffsetLOG,
    xDiffDekPerCentLOG,
    yDiffPerCentLOG,
    xDiffWeite,
    5,
    firstDekadeEndeLOG,
  ], //12
  [
    ursprungXoffsetLOG,
    ursprungYoffsetLOG,
    xDiffDekPerCentLOG,
    yDiffPerCentLOG,
    xDiffWeite,
    10,
    firstDekadeEndeLOG,
  ], //13

  [
    ursprungXoffset,
    ursprungYoffset,
    xDiffPerCent,
    yDiffPerCent,
    xDiffWeite,
    yDiffWeiteCH1,
    yDiffWeiteCH2,
  ], //letzte Zeile nicht verwendet
];

var backroundKalibrierung = backroundKalibrierungTab[1];

//_______________________________________________Initialisierung

let container = document.getElementById("container");

var canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;

var stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

var image = new Konva.Image({
  image: canvas,
  x: 0,
  y: 0,
  stroke: "red",
  strokeWidth: strokeWidth,
});

var text = new Konva.Text({
  //debugtext
  x: 10,
  y: 10,
  fontFamily: "Calibri",
  fontSize: 24,
  text: "",
  fill: "black",
});

var circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 1,
  fill: "transparent",
  stroke: "red",
  strokeWidth: 2,
});

var context = canvas.getContext("2d");
context.strokeStyle = "#000000";
context.lineJoin = "round";
context.lineWidth = 1;

//loadImageURL(context, "grid.png"); //lädt das bild in die "Zeichenebene" kann also radiert werden

/*var editpic = document.getElementById('picincanvas'); // lädt bild nach fileeingabe in den kontext
editpic.addEventListener('change', function() {

  if (editpic.files.length == 0) return;
  var readereditpic = new FileReader();
  readereditpic.addEventListener('load', function() {
    loadImageURL(context, readereditpic.result);
  });
  readereditpic.readAsDataURL(editpic.files[0]);
});*/

var isPaint = false;
var lastPointerPosition = { x: 0, y: 0 };
var mode = "brush";
var countGerade = 0;
var countText = 0;
var countImage = 0;

//_______________________________________________ init gridding Kästchen

var shadowOffset = 20;
var tween = null;
var blockSnapSize = 20;

//_______________________________________________layerring

var layer = new Konva.Layer(); //Zeichenlayer
var backlayer = new Konva.Layer(); //Hintergrundbilder
var circlelayer = new Konva.Layer(); //Layer für die zeichenforschau Damit aufsetzen suggerriert wird
var textlayer = new Konva.Layer(); //elementlayer
var gridGroup = new Konva.Group(); //Kästchenmuster

/*var group = new Konva.Group();
textlayer.add(group);

var hammertime = new Hammer(group, {
  domEvents: true
});*/

circlelayer.add(circle);
layer.add(image);
circlelayer.add(text);
backlayer.add(gridGroup);

stage.add(backlayer);
stage.add(circlelayer);
stage.add(layer);
stage.add(textlayer);

//_______________________________________________gridding Kästchen

var padding = blockSnapSize;

if (debugging) {
  console.log("_______________Info Gridding_______________");
  console.log("Breite: " + width);
  console.log("Kästchen: " + padding);
  console.log("Anzahl Kästchen: " + width / padding);
  console.log("_______________Info Kalibrierung_______________");
  console.log(
    "** Klichen Sie den Ursprung und das Offset wird Ihnen Angezeigt **"
  );
  console.log("Breite = " + width);
  console.log("Höhe = " + height);

  stage.on("click", (e) => {
    let Position = stage.getPointerPosition();
    let x = Position.x;
    let y = Position.y;
    console.log("New Click New Offset");
    console.log("x-Offset = " + x / width);
    console.log("y-Offset = " + (height - y) / height);
  });
}

for (var i = 0; i < width / padding; i++) {
  let vertikalLine = new Konva.Line({
    points: [
      Math.round(i * padding) + 0.5,
      0,
      Math.round(i * padding) + 0.5,
      height,
    ],
    stroke: "#ddd",
    strokeWidth: 1,
  });
  gridGroup.add(vertikalLine);
}

for (var j = 0; j < height / padding; j++) {
  let horizontalLine = new Konva.Line({
    points: [0, Math.round(j * padding), width, Math.round(j * padding)],
    stroke: "#ddd",
    strokeWidth: 0.5,
  });
  gridGroup.add(horizontalLine);
}

//_______________________________________________Arrow funktion

var arrowCount = 0;

function newArrow(
  e,
  posArrow = { x: 0, y: 0 },
  arrowPoints = [
    blockSnapSize,
    blockSnapSize,
    blockSnapSize * 5,
    blockSnapSize,
  ],
  posP = {
    x: blockSnapSize * 5,
    y: blockSnapSize,
  },
  posToolTip = {
    x: 170,
    y: 75,
  },
  labelText = `Vektor ${arrowCount}`
) {
  arrowCount++;
  let name = labelText;
  let arrowGroup = new Konva.Group({
    id: name,
    name: "arrow-save",
  });

  var arrow = new Konva.Arrow({
    id: name,
    ...posArrow,
    points: arrowPoints,
    draggable: true,
    fill: "black",
    stroke: "black",
    strokeWidth: 4,
    shadowOffset: {
      x: 1,
      y: 1,
    },
    hitStrokeWidth: 20,
    shadowOpacity: 0.4,
    pointerLength: blockSnapSize,
    pointerWidth: 0.5 * blockSnapSize,
  });

  let Punkt = new Konva.Circle({
    ...posP,
    radius: 13,
    fill: "grey",
    stroke: "black",
    draggable: true,
    opacity: 0.25,
    //strokeWidth: 2,
  });

  var tooltip = new Konva.Label({
    ...posToolTip,
    opacity: 0.75,
    draggable: true,
  });

  tooltip.add(
    new Konva.Tag({
      fill: "black",
      pointerDirection: "down",
      pointerWidth: 10,
      pointerHeight: 10,
      lineJoin: "round",
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.5,
    })
  );

  let label = new Konva.Text({
    text: " ",
    fontFamily: "Calibri",
    fontSize: 18,
    padding: 5,
    fill: "white",
  });

  setVektorName(label, arrow, blockSnapSize);

  tooltip.add(label);

  arrowGroup.add(arrow);
  arrowGroup.add(tooltip);
  arrowGroup.add(Punkt);

  function setArrow(params) {
    let p = arrow.getPoints();
    let posA = arrow.getPosition();
    let posP = Punkt.getPosition();

    p[2] = posP.x - posA.x;
    p[3] = posP.y - posA.y;
    arrow.setPoints(p);
  }

  setArrow();

  Punkt.on("dragmove", (e) => {
    setArrow();

    setVektorName(label, arrow, blockSnapSize);
    //label.text ="name" + betrag;

    stage.batchDraw();
  });

  arrow.on("dragmove", (e) => {
    let p = arrow.getPoints();
    let pos = arrow.getPosition();
    Punkt.position({
      x: p[2] + pos.x,
      y: p[3] + pos.y,
    });
    stage.batchDraw();
  });

  arrow.on("dblclick dbltap", function () {
    let group = this.getParent();
    group.destroy();
    stage.draw();
  });

  tooltip.on("dblclick dbltap", () => {
    // create textarea over canvas with absolute position

    // first we need to find position for textarea
    // how to find it?

    // at first lets find position of text node relative to the stage:
    var textPosition = label.getAbsolutePosition();

    // then lets find position of stage container on the page:
    var stageBox = stage.container().getBoundingClientRect();

    // so position of textarea will be the sum of positions above:
    var areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };

    // create textarea and style it
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);

    textarea.value = arrow.id();
    textarea.style.position = "absolute";
    textarea.style.top = areaPosition.y + "px";
    textarea.style.left = areaPosition.x + "px";
    textarea.style.width = label.width() + "px";

    textarea.focus();

    textarea.addEventListener("keydown", function (e) {
      // hide on enter
      if (e.keyCode === 13) {
        arrow.id(textarea.value);
        setVektorName(label, arrow, blockSnapSize);
        stage.draw();
        document.body.removeChild(textarea);
      }
    });
  });

  textlayer.add(arrowGroup);
  stage.draw();

  showAsGrabbable(arrow);
  showAsGrabbable(label);
  showAsGrabbable(Punkt);
  makeItHover(Punkt, stage);
  makeItHover(arrow, stage);
}

//_______________________________________________ oszi control panel

let osziControls = new Array();

function newPanel(id, headline, layer, isTime, channel, x, y) {
  let einheit = ["s", "1"];
  let values = new Array();
  let valuesS = [
    ["0.01ms", 0.00001],
    ["0.02ms", 0.00002],
    ["0.05ms", 0.00005],
    ["0.1ms", 0.0001],
    ["0.2ms", 0.0002],
    ["0.5ms", 0.0005],
    ["1ms", 0.001],
  ];
  let valuesV = [
    ["0.01V", 0.01],
    ["0.02V", 0.02],
    ["0.05V", 0.05],
    ["0.1V", 0.1],
    ["0.2V", 0.2],
    ["0.5V", 0.5],
    ["1V", 1],
    ["2V", 2],
    ["5V", 5],
  ];

  if (isTime) {
    values = valuesS;
  } else {
    values = valuesV;
  }

  let count = roundDown(values.length / 2);
  if (isTime) {
    backroundKalibrierungTab[5][4] = values[count][1];
  } else {
    backroundKalibrierungTab[5][5] = values[count][1];
  }

  function makeItHighlight(objektReckt, objektArrow) {
    let colorBack = "lightgray";
    let colorFront = "gray";
    let colorBackPast = "gray";
    let colorFrontPast = "white";

    objektReckt.on("mouseover touchstart", function () {
      objektReckt.setAttrs({
        fill: colorBack,
      });
      objektArrow.setAttrs({
        fill: colorFront,
      });
    });

    objektReckt.on("mouseout touchend", function () {
      // set multiple properties at once with setAttrs
      objektReckt.setAttrs({
        fill: colorBackPast,
      });
      objektArrow.setAttrs({
        fill: colorFrontPast,
      });
    });

    objektReckt.on("mousedown", function () {
      objektArrow.setAttrs({
        fill: "red",
      });
    });

    objektReckt.on("mouseup", function () {
      objektArrow.setAttrs({
        fill: colorFrontPast,
      });
    });

    objektArrow.on("mouseover touchstart", function () {
      objektArrow.setAttrs({
        fill: colorFront,
      });

      objektReckt.setAttrs({
        fill: colorBack,
      });
    });

    objektArrow.on("mouseout touchend", function () {
      // set multiple properties at once with setAttrs
      objektArrow.setAttrs({
        fill: colorFrontPast,
      });
      objektReckt.setAttrs({
        fill: colorBackPast,
      });
    });

    objektArrow.on("mousedown", function () {
      objektArrow.setAttrs({
        fill: "red",
      });
    });

    objektArrow.on("mouseup", function () {
      objektArrow.setAttrs({
        fill: colorFrontPast,
      });
    });
  }

  var osziCtrlWidth = 120;
  var osziCtrlHeight = 80;
  var osziCtrlFontSize = 18;

  var setOszi = new Konva.Label({
    id: id + count,
    x: x,
    y: y,
    opacity: 0.75,
    draggable: true,
  });

  setOszi.add(
    new Konva.Rect({
      fill: "lightgray",
      width: osziCtrlWidth,
      height: osziCtrlHeight,
      stroke: "red",
      strokeWidth: 1,
    })
  );

  setOszi.add(
    new Konva.Text({
      width: osziCtrlWidth,
      height: osziCtrlHeight,
      text: headline,
      fontFamily: "Calibri",
      fontSize: 22,
      align: "center",
      fontStyle: "bold",
      padding: 5,
      fill: "black",
    })
  );

  var up = new Konva.Rect({
    id: "up" + id,
    x: 5,
    y: 10 + osziCtrlFontSize,
    width: 20,
    height: 20,
    fill: "gray",
    shadowBlur: 3,
    cornerRadius: 2,
  });

  var down = new Konva.Rect({
    id: "down" + id,
    x: 5,
    y: 35 + osziCtrlFontSize,
    width: 20,
    height: 20,
    fill: "gray",
    shadowBlur: 3,
    cornerRadius: 2,
  });

  var upArrow = new Konva.Text({
    id: "upArrow" + id,
    x: 28,
    y: 10 + osziCtrlFontSize,
    text: "<",
    fontFamily: "Calibri",
    fontSize: 25,
    padding: 2,
    rotation: 90,
    fontStyle: "bold",
    fill: "white",
  });

  var downArrow = new Konva.Text({
    id: "downArrow" + id,
    x: 2,
    y: 73,
    text: "<",
    fontFamily: "Calibri",
    fontSize: 25,
    padding: 2,
    rotation: 270,
    fontStyle: "bold",
    fill: "white",
  });

  var description = new Konva.Text({
    y: 9,
    width: osziCtrlWidth,
    height: osziCtrlHeight,
    text: values[count][0],
    fontFamily: "Calibri",
    fontSize: 20,
    align: "right",
    verticalAlign: "middle",
    fontStyle: "bold",
    padding: 10,
    fill: "black",
  });

  setOszi.add(description);
  setOszi.add(up);
  setOszi.add(upArrow);
  setOszi.add(down);
  setOszi.add(downArrow);

  makeItHighlight(up, upArrow);
  makeItHighlight(down, downArrow);

  up.on("click touchstart", function () {
    if (count < valuesS.length - 1) {
      count++;
    }
    description.text(values[count][0]);
    if (isTime) {
      backroundKalibrierungTab[5][4] = values[count][1];
    } else {
      backroundKalibrierungTab[5][4 + channel] = values[count][1];
    }

    stage.batchDraw();
  });

  upArrow.on("click touchstart", function () {
    if (count < values.length - 1) {
      count++;
    }
    description.text(values[count][0]);
    if (isTime) {
      backroundKalibrierungTab[5][4] = values[count][1];
    } else {
      backroundKalibrierungTab[5][4 + channel] = values[count][1];
    }
    stage.batchDraw();
  });

  down.on("click touchstart", function () {
    if (count > 0) {
      count--;
    }
    description.text(values[count][0]);
    if (isTime) {
      backroundKalibrierungTab[5][4] = values[count][1];
    } else {
      backroundKalibrierungTab[5][4 + channel] = values[count][1];
    }
    stage.batchDraw();
  });
  downArrow.on("click touchstart", function () {
    if (count > 0) {
      count--;
    }
    description.text(values[count][0]);
    if (isTime) {
      backroundKalibrierungTab[5][4] = values[count][1];
    } else {
      backroundKalibrierungTab[5][4 + channel] = values[count][1];
    }
    stage.batchDraw();
  });

  showAsClickable(up);
  showAsClickable(upArrow);
  showAsClickable(down);
  showAsClickable(downArrow);

  textlayer.add(setOszi);
  return setOszi;
}

osziControls.push(
  newPanel("Zeit", "CH1/CH2", textlayer, true, 0, 0.7822 * width, 0.27 * height)
);
osziControls.push(
  newPanel(
    "VoltCH1",
    "CH1",
    textlayer,
    false,
    1,
    0.7282 * width,
    0.704 * height
  )
);
osziControls.push(
  newPanel(
    "VoltCH2",
    "CH2",
    textlayer,
    false,
    2,
    0.7282 * width + 130,
    0.704 * height
  )
);

osziControls.forEach((objekt) => {
  objekt.hide();
  textlayer.draw();
});

//_______________________________________________background Bild

var imageObj = new Image();

imageObj.onload = function () {
  let choosen = document.getElementById("hintergrund").value;

  var background = new Konva.Image({
    draggable: false,
    x: strokeWidth * 0.8,
    y: strokeWidth * 0.8,
    image: imageObj,
    width: width - 2 * strokeWidth * 0.8,
    height: height - 2 * strokeWidth * 0.8,
  });

  // add the shape to the layer
  backlayer.add(background);

  if (choosen == 7) {
    gridGroup.show();
  } else {
    gridGroup.hide();
  }
  stage.draw();
};

imageObj.src = "Data/invisible.svg";
stage.draw(); //Initialisierungs Rendern

function setBackground(id) {
  document.getElementById("hintergrund").selectedIndex = id;
  changeToolBackground();
}

function changeToolBackground() {
  let choosen = document.getElementById("hintergrund").value;
  imageObj.src = sources[choosen];
  backroundKalibrierung = backroundKalibrierungTab[choosen];
  document.getElementById("wertetabellenInfo").innerHTML =
    einheitenInfo[choosen];
  if (debugging) {
    console.log("Background: " + choosen);
  }
  if (choosen == 5) {
    osziControls.forEach((objekt) => {
      objekt.show();
      textlayer.draw();
    });
  } else {
    osziControls.forEach((objekt) => {
      objekt.hide();
      textlayer.draw();
    });
  }
}
//_______________________________________________ Contextevent on Mobile

let timeoutRef;

function handleLongPress(e) {
  console.log("long press");
  console.log(e.target);
  openContextMenue(e);
}

function handleTouchStart(e) {
  if (e.target.parentElement != menuNode) {
    menuNode.style.display = "none";
  }
  timeoutRef = setTimeout(() => {
    handleLongPress(e);
  }, 600);
}

function handleTouchEnd() {
  clearTimeout(timeoutRef);
}

stage.on("touchstart mousedown", handleTouchStart);
stage.on("touchend mouseup", handleTouchEnd);
stage.on("touchmove mousemove", handleTouchEnd);
// setup menu

let currentShape;
var menuNode = document.getElementById("menu");

document.getElementById("pulse-button").addEventListener("click", () => {
  console.log(currentShape);
  currentShape.to({
    scaleX: 2,
    scaleY: 2,
    onFinish: () => {
      currentShape.to({ scaleX: 1, scaleY: 1 });
    },
  });
});

document.getElementById("delete-button").addEventListener("click", () => {
  if (
    currentShape.getParent().getAttr("name") === "line-save" ||
    currentShape.getParent().getAttr("name") === "text-save" ||
    currentShape.getParent().getAttr("name") === "arrow-save"
  ) {
    currentShape.getParent().destroy();
    stage.batchDraw();
    menuNode.style.display = "none";
  }
  if (currentShape.getParent().getParent().getAttr("name") === "arrow-save") {
    currentShape.getParent().getParent().destroy();
    stage.batchDraw();
    menuNode.style.display = "none";
  }
});

menuNode.addEventListener("focusout", () => {
  // hide menu
  menuNode.style.display = "none";
});

function openContextMenue(e) {
  drawing = false;
  //do not show browser context
  e.evt.preventDefault();
  if (
    e.target === textlayer ||
    e.target === layer ||
    e.target === image ||
    e.target === container
  ) {
    // if we are on empty place of the stage we will do nothing
    clearTimeout(timeoutRef);
    return;
  }
  currentShape = e.target;
  // show menu
  menuNode.style.display = "initial";
  const containerRect = stage.container().getBoundingClientRect();
  menuNode.style.top = `${
    containerRect.top + stage.getPointerPosition().y + 4
  }px`;
  menuNode.style.left = `${
    containerRect.left + stage.getPointerPosition().x + 4
  }px`;
}

stage.on("contextmenu", function (e) {
  openContextMenue(e);
});

//_______________________________________________vorschau der pinselgröße

stage.on("mousedown touchstart", function () {
  layer.setZIndex(2);
  circlelayer.setZIndex(1);
  stage.draw();

  isPaint = true;
  lastPointerPosition = stage.getPointerPosition();
  //console.log(lastPointerPosition);
});

stage.on("mouseup touchend", function () {
  layer.setZIndex(1);
  circlelayer.setZIndex(2);
  stage.draw();

  isPaint = false;
});

//_______________________________________________move der zeichengröße und drawing

function writeMessage(message) {
  text.text(message);
}

stage.on("mousemove touchmove", function (e) {
  var circlePos = stage.getPointerPosition();
  var cx = circlePos.x * (1 / scalex);
  var cy = circlePos.y * (1 / scaley);

  circle.x(cx); //zeichenvorschau (kleiner roter kreis)
  circle.y(cy);
  //circle.radius(pencilStrokeWitdth * 0.5);
  stage.batchDraw();
});

stage.on("mouseleave", function (e) {
  isPaint = false;
});

// and core function - drawing
image.on("mousemove touchmove", function (e) {
  //stage damit immer gezeichnet werden kann aber dadurch immer malen bei grabbing

  var touchPos = stage.getPointerPosition();
  //  var tx = touchPos.x - ursprungXoffset;
  //  var ty = Math.abs(touchPos.y - height + ursprungYoffset);
  var tx = touchPos.x;
  var ty = touchPos.y;

  if (debugging) {
    writeMessage("x: " + tx + ", y: " + ty); //info mouspos
  }

  if (!isPaint) {
    return;
  }

  if (mode === "brush") {
    context.globalCompositeOperation = "source-over";
  }
  if (mode === "eraser") {
    context.globalCompositeOperation = "destination-out";
  }

  context.beginPath();

  context.moveTo(
    lastPointerPosition.x * (1 / scalex),
    lastPointerPosition.y * (1 / scaley)
  );

  var pos = stage.getPointerPosition();
  context.lineTo(pos.x * (1 / scalex), pos.y * (1 / scaley));
  context.closePath();
  context.stroke();

  lastPointerPosition = pos;
  layer.batchDraw();
});

// _______________________________________________Toolbar

function updateColor() {
  let picker = document.getElementById("BasicToolColorInput");
  context.strokeStyle = picker.value;
}

/*    var layerring = false;

  document.getElementById('zIndex').addEventListener( //versuche zu Layering vom benutzer eingefügte bilder bearbeiten
    'click',
    function() {

      toggleText('zIndex');
      layerring = !layerring;

      if (layerring) {
        backlayer.moveToBottom();
      } else {
        backlayer.moveToTop();
      }

      stage.draw();
    },
    false
  );*/

//_________________________________________________________________________________images load in background

function preview_image(event) {
  countImage = countImage + 1;

  var myImage = new Image(
    width - 2 * strokeWidth * 0.8,
    height - 2 * strokeWidth * 0.8
  );

  var reader = new FileReader();
  reader.onload = function () {
    myImage.src = reader.result;
  };

  var selectedFile = document.getElementById("file-input-pic").files[0];
  console.log(selectedFile);
  reader.readAsDataURL(event.target.files[0]);

  var bild = new Konva.Image({
    image: myImage,
    draggable: false,
    x: strokeWidth * 0.8,
    y: strokeWidth * 0.8,
  });

  const deleteButton = new Konva.Circle({
    x: 7 + countImage * 20,
    y: 20,
    radius: 10,
    fill: "red",
  });
  textlayer.add(deleteButton);

  const deletezeichen = new Konva.Text({
    text: "x",
    x: 2 + countImage * 20,
    y: 10,
    fontSize: charpix,
  });
  textlayer.add(deletezeichen);

  deleteButton.on("touchstart click", () => {
    deleteButton.destroy();
    deletezeichen.destroy();
    bild.destroy();
    stage.draw();
  });

  deletezeichen.on("touchstart click", () => {
    deleteButton.destroy();
    deletezeichen.destroy();
    bild.destroy();
    stage.draw();
  });

  deleteButton.on("mouseover touchstart", function () {
    Mousemode.classList.remove("pencil");
    Mousemode.classList.remove("eraser");
    Mousemode.classList.remove("grabbable");
    Mousemode.classList.add("pointer");
    this.setAttrs({
      fill: "#AA0000",
    });
    textlayer.draw();

    if (is_touch_device()) {
      //da nach touchstart ist das objekt weg wodurch nich touchend getriggert wird
      this.setAttrs({
        fill: "red",
      });
    }
  });

  deleteButton.on("mouseout", function () {
    if (mode === "brush") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("pencil");
    }
    if (mode === "eraser") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("eraser");
    }
    // set multiple properties at once with setAttrs
    this.setAttrs({
      fill: "red",
    });
    textlayer.draw();
  });

  deletezeichen.on("mouseover touchstart", function () {
    Mousemode.classList.remove("pencil");
    Mousemode.classList.remove("eraser");
    Mousemode.classList.remove("grabbable");
    Mousemode.classList.add("pointer");
    deleteButton.setAttrs({
      fill: "#AA0000",
    });
    textlayer.draw();

    if (is_touch_device()) {
      //da nach touchstart ist das objekt weg wodurch nich touchend getriggert wird
      deleteButton.setAttrs({
        fill: "red",
      });
    }
  });

  deletezeichen.on("mouseout", function () {
    if (mode === "brush") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("pencil");
    }
    if (mode === "eraser") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("eraser");
    }
    // set multiple properties at once with setAttrs
    deleteButton.setAttrs({
      fill: "red",
    });
    textlayer.draw();
  });

  setTimeout(function () {
    //verzögerung des renderns da das bild eine gewisse zeit braucht um zu laden ggf noch automatische berechnug in abhänigkeit der göße des bildes?

    backlayer.add(bild);
    backlayer.batchDraw();
    stage.draw();
  }, 100);

  return;
}

//________________________________________________________________________ textfeld

//var charpix=pixcount;
var charpix = 20;

function createTextfeld(
  e,
  pos,
  rot = 0,
  height = 1,
  width = 1,
  text = "Doppelclick zum Editieren."
) {
  pos =
    typeof pos !== "undefined"
      ? pos
      : {
          x: 50 + countText * 10,
          y: 80 + countText * 10,
        };

  countText += 1;

  var groupText = new Konva.Group({
    name: "text-save",
  });

  var textNode = new Konva.Text({
    text,
    x: pos.x,
    y: pos.y,
    fontSize: charpix,
    draggable: true,
    rotation: rot,
    width: 200,
    scaleX: width,
    scaleY: height,
  });

  var tr = new Konva.Transformer({
    node: textNode,
    enabledAnchors: ["middle-right"],
    // set minimum width of text
    boundBoxFunc: function (oldBox, newBox) {
      newBox.width = Math.max(30, newBox.width);
      return newBox;
    },
  });

  textNode.scaleX(width);
  textNode.scaleY(height);
  tr.scaleX(width);
  tr.scaleY(height);

  tr.on("transform", () => {
    drawing = false;
  });

  textNode.on("transform", function () {
    // reset scale, so only with is changing by transformer
    drawing = false;
    textNode.setAttrs({
      width: textNode.width() * textNode.scaleX(),
    });
  });

  groupText.add(textNode);
  groupText.add(tr);
  textlayer.add(groupText);
  textlayer.draw();
  tr.hide();
  let textAreaTimeoutRef;
  groupText.on("touchstart mousedown", () => {
    tr.show();
    clearTimeout(textAreaTimeoutRef);
    textAreaTimeoutRef = setTimeout(() => {
      tr.hide();
      textlayer.draw();
    }, 3000);
    textlayer.draw();
  });

  //--------------------------Edit textfeld---------------------------------------------------
  //die guten touchevents......

  if (is_touch_device() == true) {
    //console.log("s_touch_devic");

    textNode.on("touchstart", () => {
      textlayer.draw();
      if (doubletap() == true) {
        tr.hide();
        textNode.hide();
        textlayer.draw();

        var textPosition = textNode.absolutePosition();

        var stageBox = stage.container().getBoundingClientRect();

        var areaPosition = {
          x: stageBox.left + textPosition.x,
          y: stageBox.top + textPosition.y,
        };

        // create textarea and style
        var textarea = document.createElement("textarea");
        document.body.appendChild(textarea);

        textarea.value = textNode.text();
        textarea.style.position = "absolute";
        textarea.style.top = areaPosition.y + "px";
        textarea.style.left = areaPosition.x + "px";
        textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
        textarea.style.height =
          textNode.height() - textNode.padding() * 2 + 5 + "px";
        textarea.style.fontSize = textNode.fontSize() + "px";
        textarea.style.border = "none";
        textarea.style.padding = "0px";
        textarea.style.margin = "0px";
        textarea.style.overflow = "hidden";
        textarea.style.background = "none";
        textarea.style.outline = "none";
        textarea.style.resize = "none";
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = "left top";
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();
        rotation = textNode.rotation();
        var transform = "";
        if (rotation) {
          transform += "rotateZ(" + rotation + "deg)";
        }

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
          navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
        if (isFirefox) {
          px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += "translateY(-" + px + "px)";

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = "auto";
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + "px";

        textarea.focus();

        function removeTextarea() {
          textarea.parentNode.removeChild(textarea);
          window.removeEventListener("click", handleOutsideClick);
          textNode.show();
          tr.show();
          tr.forceUpdate();
          textlayer.draw();
        }

        function setTextareaWidth(newWidth) {
          if (!newWidth) {
            // set width placeholder
            newWidth = textNode.placeholder.length * textNode.fontSize();
          }
          //andere Browser andere Probleme
          var isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
          );
          var isFirefox =
            navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
          if (isSafari || isFirefox) {
            newWidth = Math.ceil(newWidth);
          }

          var isEdge =
            document.documentMode || /Edge/.test(navigator.userAgent);
          if (isEdge) {
            newWidth += 1;
          }
          textarea.style.width = newWidth + "px";
        }

        textarea.addEventListener("keydown", function (e) {
          // enter ende der bearbeitung
          // neue zeile shift + enter
          if (e.keyCode === 13 && !e.shiftKey) {
            textNode.text(textarea.value);
            removeTextarea();
            tr.hide();
            textlayer.draw();
          }
          // ESC abbruch
          if (e.keyCode === 27) {
            removeTextarea();
          }
        });

        textarea.addEventListener("keydown", function (e) {
          scale = textNode.getAbsoluteScale().x;
          setTextareaWidth(textNode.width() * scale);
          textarea.style.height = "auto";
          textarea.style.height =
            textarea.scrollHeight + textNode.fontSize() + "px";
        });

        function handleOutsideClick(e) {
          if (e.target !== textarea) {
            textNode.text(textarea.value);
            removeTextarea();
            tr.hide();
            textlayer.draw();
          }

          /*  if (e.target !== textNode) {
                        tr.hide();
                        textlayer.draw();
                      }*/
        }

        setTimeout(() => {
          window.addEventListener("tochstart", handleOutsideClick);
        });
      }
    });
  } else {
    textNode.on("mousedown", () => {
      tr.show();
      textlayer.draw();
    });

    textNode.on("dblclick", () => {
      tr.hide();
      textNode.hide();
      textlayer.draw();

      var textPosition = textNode.absolutePosition();

      var stageBox = stage.container().getBoundingClientRect();

      var areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y,
      };

      // create textarea and style
      var textarea = document.createElement("textarea");
      document.body.appendChild(textarea);

      textarea.value = textNode.text();
      textarea.style.position = "absolute";
      textarea.style.top = areaPosition.y + "px";
      textarea.style.left = areaPosition.x + "px";
      textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
      textarea.style.height =
        textNode.height() - textNode.padding() * 2 + 5 + "px";
      textarea.style.fontSize = textNode.fontSize() + "px";
      textarea.style.border = "none";
      textarea.style.padding = "0px";
      textarea.style.margin = "0px";
      textarea.style.overflow = "hidden";
      textarea.style.background = "none";
      textarea.style.outline = "none";
      textarea.style.resize = "none";
      textarea.style.lineHeight = textNode.lineHeight();
      textarea.style.fontFamily = textNode.fontFamily();
      textarea.style.transformOrigin = "left top";
      textarea.style.textAlign = textNode.align();
      textarea.style.color = textNode.fill();
      rotation = textNode.rotation();
      var transform = "";
      if (rotation) {
        transform += "rotateZ(" + rotation + "deg)";
      }

      var px = 0;
      // also we need to slightly move textarea on firefox
      // because it jumps a bit
      var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      if (isFirefox) {
        px += 2 + Math.round(textNode.fontSize() / 20);
      }
      transform += "translateY(-" + px + "px)";

      textarea.style.transform = transform;

      // reset height
      textarea.style.height = "auto";
      // after browsers resized it we can set actual value
      textarea.style.height = textarea.scrollHeight + 3 + "px";

      textarea.focus();

      function removeTextarea() {
        textarea.parentNode.removeChild(textarea);
        window.removeEventListener("click", handleOutsideClick);
        textNode.show();
        tr.show();
        tr.forceUpdate();
        textlayer.draw();
      }

      function setTextareaWidth(newWidth) {
        if (!newWidth) {
          // set width placeholder
          newWidth = textNode.placeholder.length * textNode.fontSize();
        }
        //andere Browser andere Probleme
        var isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        );
        var isFirefox =
          navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
        if (isSafari || isFirefox) {
          newWidth = Math.ceil(newWidth);
        }

        var isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
        if (isEdge) {
          newWidth += 1;
        }
        textarea.style.width = newWidth + "px";
      }

      textarea.addEventListener("keydown", function (e) {
        // enter ende der bearbeitung
        // neue zeile shift + enter
        if (e.keyCode === 13 && !e.shiftKey) {
          textNode.text(textarea.value);
          removeTextarea();
          tr.hide();
          textlayer.draw();
        }
        // ESC abbruch
        if (e.keyCode === 27) {
          removeTextarea();
        }
      });

      textarea.addEventListener("keydown", function (e) {
        scale = textNode.getAbsoluteScale().x;
        setTextareaWidth(textNode.width() * scale);
        textarea.style.height = "auto";
        textarea.style.height =
          textarea.scrollHeight + textNode.fontSize() + "px";
      });

      function handleOutsideClick(e) {
        if (e.target !== textarea) {
          textNode.text(textarea.value);
          removeTextarea();
          tr.hide();
          textlayer.draw();
        }

        /*  if (e.target !== textNode) {
                    tr.hide();
                    textlayer.draw();
                  }*/
      }

      setTimeout(() => {
        window.addEventListener("click", handleOutsideClick);
      });
    });
  }
  //??????????????????????????????????????????????????????????????????????????????????????????????????hover efects textarea Buttons

  textNode.on("mouseover", function () {
    Mousemode.classList.remove("pencil");
    Mousemode.classList.remove("eraser");
    Mousemode.classList.remove("pointer");
    Mousemode.classList.add("grabbable");
  });

  textNode.on("mouseout", function () {
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

//_________________________________________________________________________________export tool

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
  return;
}

function handleInputKeydown(event) {
  let keyCode = event.which;
  if (keyCode === 13) {
    downloadPic();
  }
  return;
}

function downloadPic() {
  let image = stage.toDataURL().replace("image/png", "image/octet-stream");
  //console.log(image);
  let DataName = document.getElementById("exportInput");
  if (DataName.value == "") {
    downloadURI(image, "ZT.png");
  } else {
    if (DataName.value.search(".png") > -1) {
      downloadURI(image, DataName.value);
    } else {
      downloadURI(image, DataName.value + ".png");
    }
  }
  return;
}

//_________________________________________________________________________________line tool

function readpoints(e, num) {
  let id, idDeleteButton, idShowButton, graphName;
  if (typeof num !== "undefined") {
    id = "dataTable" + num;
    idDeleteButton = "dGraph" + num;
    idShowButton = "showGraph" + num;
    graphName = "graph-name" + num;
  } else {
    id = "dataTable0";
    idDeleteButton = "dGraph0";
    idShowButton = "showGraph0";
    graphName = "graph-name0";
  }
  let choosen = document.getElementById("hintergrund").value;
  let logKOS = false;
  if (choosen == 12 || choosen == 13) {
    logKOS = true;
  }

  let labelText = document.getElementById(graphName);
  let key = 1;

  let color = getRandomColor();
  var label = new Konva.Label({
    x: 75,
    y: 50 + key * 25,
    draggable: true,
  });

  // add a tag to the label
  label.add(
    new Konva.Tag({
      fill: "#bbb",
      stroke: color,
      shadowColor: "black",
      shadowBlur: 3,
      shadowOffset: [10, 10],
      shadowOpacity: 0.7,
      lineJoin: "round",
      pointerDirection: "right",
      pointerWidth: 10,
      pointerHeight: 10,
      cornerRadius: 5,
    })
  );

  // add text to the label
  label.add(
    new Konva.Text({
      text: labelText.value,
      fontSize: 12,
      lineHeight: 1.2,
      padding: 2,
      fill: color,
    })
  );

  showAsGrabbable(label);

  var group = new Konva.Group({});
  textlayer.add(group);
  group.add(label);

  var punkte = get(id);

  // eingebenen Punkte werden auf das bild angepasst
  //var backroundKalibrierung[ursprungXoffset, ursprungYoffset, xDiffPerCent, yDiffPerCent, xDiffWeite, yDiffWeite];
  for (var i = 0; i < punkte.length; i++) {
    if (i % 2 == 1) {
      punkte[i] =
        ((punkte[i] / backroundKalibrierung[5]) *
          (backroundKalibrierung[3] * height) -
          height +
          backroundKalibrierung[1]) *
        -1;
    } else {
      if (logKOS) {
        let eingabe = punkte[i];
        eingabe = eingabe * 1.001; //das ist dirty code, sorry aber funktioniert :/
        let dekade = 0;
        let extraOff = 0;
        while (eingabe > 1) {
          eingabe = eingabe / 10;
          dekade++;
        }
        let k = 0;
        let rest = eingabe * 10 - roundDown(eingabe * 10);

        for (k = 1; k <= eingabe * 10; k++) {
          extraOff = extraOff + lineStepOnLogLine[k - 1];
        }

        let xxOff =
          lineStepOnLogLine[eingabe | 0] * (-(eingabe | 0) * 10 + eingabe * 10);
        punkte[i] =
          dekade * backroundKalibrierung[2] * width +
          extraOff * backroundKalibrierung[2] * width +
          backroundKalibrierung[0] +
          rest * lineStepOnLogLine[k - 1] * backroundKalibrierung[2] * width;

        if (debugging) {
          console.log("Rest: " + rest);
          console.log("K: " + k);
          console.log("lineStepOnLogLine[k-1]: " + lineStepOnLogLine[k - 1]);
          console.log("xxOff: " + -(eingabe | 0) * 10 + eingabe * 10);
          console.log("extraOff: " + extraOff);
          console.log("Ausgabe: " + punkte[i]);
        }
      } else {
        punkte[i] =
          (punkte[i] / backroundKalibrierung[4]) *
            (backroundKalibrierung[2] * width) +
          backroundKalibrierung[0];
      }
    }
  }

  //kann nicgt in erstes array da die werte erst vollstandig gewandelt werden müssen
  for (var k = 0; k < punkte.length; k = k + 2) {
    var point = new Konva.Circle({
      x: punkte[k],
      y: punkte[k + 1],
      radius: 5,
      fill: color,
      stroke: "black",
      strokeWidth: 4,
    });

    var text = new Konva.Text({
      x: punkte[k] + 5,
      y: punkte[k + 1] + 5,
      text: "P" + k / 2,
      fontSize: 20,
      fontFamily: "Calibri",
      fill: color,
    });

    group.add(point);
    group.add(text);
  }

  if (debugging) {
    console.log("_______________Info Gelesene Punkte_______________");
    console.log(punkte);
  }

  var line = new Konva.Line({
    points: punkte,
    tension: 0.5,
    //bezier: true,
    strokeWidth: 3,
    hitStrokeWidth: 20,
    stroke: color,
  });

  group.add(line);

  document.getElementById(idDeleteButton).addEventListener(
    "click",
    function () {
      group.destroy();
      stage.draw();
    },
    false
  );

  document.getElementById(idShowButton).addEventListener(
    "click",
    function () {
      group.destroy();
      stage.draw();
    },
    false
  );

  stage.draw();
}

//_________________________________________________________________________________csv tool
function showcsv(lines, channel) {
  let group = drawGraph(lines, channel);
  console.log('group', group);
  csvGroupCache[channel] = group;

  let eventsToDestroy = new Array();

  let upZeit = stage.findOne("#upZeit");
  let downZeit = stage.findOne("#downZeit");
  let upArrowZeit = stage.findOne("#upArrowZeit");
  let downArrowZeit = stage.findOne("#downArrowZeit");

  if (channel == 1) {
    let upVoltCH1 = stage.findOne("#upVoltCH1");
    let downVoltCH1 = stage.findOne("#downVoltCH1");
    let upArrowVoltCH1 = stage.findOne("#upArrowVoltCH1");
    let downArrowVoltCH1 = stage.findOne("#downArrowVoltCH1");
    //let reloadButtonCH1 = document.getElementById('reloadButtonCH1');
    eventsToDestroy = [
      upZeit,
      downZeit,
      upArrowZeit,
      downArrowZeit,
      upVoltCH1,
      downVoltCH1,
      upArrowVoltCH1,
      downArrowVoltCH1,
    ];
  } else {
    let upVoltCH2 = stage.findOne("#upVoltCH2");
    let downVoltCH2 = stage.findOne("#downVoltCH2");
    let upArrowVoltCH2 = stage.findOne("#upArrowVoltCH2");
    let downArrowVoltCH2 = stage.findOne("#downArrowVoltCH2");
    //let reloadButtonCH2 = document.getElementById('reloadButtonCH2');
    eventsToDestroy = [
      upZeit,
      downZeit,
      upArrowZeit,
      downArrowZeit,
      upVoltCH2,
      downVoltCH2,
      upArrowVoltCH2,
      downArrowVoltCH2,
    ];
  }
  eventsToDestroy.forEach((objekt, i) => {
    //events nochmal überarbeiten sodass ch1 group auf events hört bei zeitumstellung
    objekt.addEventListener(
      "click.event1",
      function () {
        eventsToDestroy.forEach((objekt) => {
          objekt.off("click.event1");
        });
        if (typeof csvGroupCache[1] !== "undefined") {
          csvGroupCache[1].destroy();
          showcsv(osziFlash[1], 1);
        }

        if (typeof csvGroupCache[2] !== "undefined") {
          csvGroupCache[2].destroy();
          showcsv(osziFlash[2], 2);
        }

        stage.draw();
      },
      false
    );
  });
  stage.draw();
}

function drawGraph(lines, channel) {
  channel = typeof channel !== "undefined" ? channel : 1;
  let choosen = document.getElementById("hintergrund").value;
  let qualitat = document.getElementById("quali-" + channel);
  let f = document.getElementById("f");
  let numP = parseFloat(qualitat.value);
  let labelText = "CSVData " + channel;
  lines.shift(); //erste nichtsagende einheitsangabe weg
  let color = "#000000";

  if (typeof csvGroupCache[channel] !== "undefined") {
    csvGroupCache[channel].destroy();
  }

  if (channel == 1) {
    color = "#0000FF";
  } else {
    color = "#00FF00";
  }

  var label = new Konva.Label({
    x: 75,
    y: 200,
    draggable: true,
  });

  // add a tag to the label
  label.add(
    new Konva.Tag({
      fill: "#bbb",
      stroke: color,
      shadowColor: "black",
      shadowBlur: 3,
      shadowOffset: [10, 10],
      shadowOpacity: 0.7,
      lineJoin: "round",
      pointerDirection: "right",
      pointerWidth: 10,
      pointerHeight: 10,
      cornerRadius: 5,
    })
  );

  // add text to the label
  label.add(
    new Konva.Text({
      text: labelText,
      fontSize: 12,
      lineHeight: 1.2,
      padding: 2,
      fill: color,
    })
  );

  label.on("dblclick", function () {
    csvGroupCache[channel].destroy();
  });

  showAsGrabbable(label);

  var group = new Konva.Group({});
  textlayer.add(group);
  group.add(label);

  //console.log(qualitat.value);

  let punkte = new Array();
  for (var i = 0; i < lines.length; i = i + numP) {
    punkte.push(parseFloat(lines[i][0]));
    punkte.push(parseFloat(lines[i][1]));
  }

  //  console.log(punkte);

  // eingebenen Punkte werden auf das bild angepasst
  //var backroundKalibrierung[ursprungXoffset, ursprungYoffset, xDiffPerCent, yDiffPerCent, xDiffWeite, yDiffWeite];
  for (var i = 0; i < punkte.length; i++) {
    if (i % 2 == 1) {
      punkte[i] =
        ((punkte[i] / backroundKalibrierung[4 + channel]) *
          (backroundKalibrierung[3] * height) -
          height +
          backroundKalibrierung[1]) *
        -1;
    } else {
      punkte[i] =
        (punkte[i] / backroundKalibrierung[4]) *
          (backroundKalibrierung[2] * width) +
        backroundKalibrierung[0];
    }
  }

  //kann nicgt in erstes array da die werte erst vollstandig gewandelt werden müssen
  for (var k = 0; k < punkte.length; k = k + 2) {
    var point = new Konva.Circle({
      x: punkte[k],
      y: punkte[k + 1],
      radius: 5,
      fill: color,
      stroke: "black",
      strokeWidth: 4,
    });
    group.add(point);
  }

  var line = new Konva.Line({
    points: punkte,
    tension: 0.5,
    //bezier: true,
    strokeWidth: 3,
    hitStrokeWidth: 20,
    stroke: color,
  });

  group.add(line);

  return group;
}
//_________________________________________________________________________________Gerade tool

function createLine(e, ps1, ps2) {
  ps1 =
    typeof ps1 !== "undefined"
      ? ps1
      : {
          x: stage.width() / 2 + 10 * countGerade,
          y: stage.height() / 2 + 10 * countGerade,
        };

  ps2 =
    typeof ps2 !== "undefined"
      ? ps2
      : {
          x: stage.width() / 2 + 100 + 10 * countGerade,
          y: stage.height() / 2 + 10 * countGerade,
        };

  //??????????????????????????????????????????????????????init
  var groupLine = new Konva.Group({
    name: "line-save",
  });

  countGerade = countGerade + 1;

  var p1 = new Konva.Circle({
    x: ps1.x,
    y: ps1.y,
    radius: 10,
    fill: "grey",
    stroke: "black",
    strokeWidth: 1,
    draggable: true,
  });

  var positionP1 = p1.absolutePosition();

  var p2 = new Konva.Circle({
    x: ps2.x,
    y: ps2.y,
    radius: 10,
    fill: "grey",
    stroke: "black",
    strokeWidth: 1,
    draggable: true,
  });

  var positionP2 = p2.absolutePosition();

  var line = new Konva.Line({
    points: [positionP1.x, positionP1.y, positionP2.x, positionP2.y],
    stroke: getRandomColor(),
    strokeWidth: 3,
    lineCap: "round",
    lineJoin: "round",
    tension: 1,
    draggable: false,
  });

  var tr = new Konva.Transformer({
    // nur um die Buttons anzuheften und dadurch ein Interface zu erstellen
    node: line,
    enabledAnchors: [],
    rotateEnabled: false,
  });

  const deleteButton = new Konva.Circle({
    x: tr.getWidth() - 20,
    y: -20,
    radius: 10,
    fill: "red",
  });
  tr.add(deleteButton);

  const deletezeichen = new Konva.Text({
    text: "x",
    x: tr.getWidth() - 25,
    y: -30,
    fontSize: charpix,
  });
  tr.add(deletezeichen);

  const strokeButtonColor = new Konva.Circle({
    x: tr.getWidth() - 40,
    y: -20,
    radius: 10,
    fillRadialGradientStartPoint: {
      x: 0,
      y: 0,
    },
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: {
      x: 0,
      y: 0,
    },
    fillRadialGradientEndRadius: 8,
    fillRadialGradientColorStops: [0, "red", 0.5, "yellow", 1, "blue"],
  });
  tr.add(strokeButtonColor);

  const editButton = new Konva.Circle({
    x: tr.getWidth() - 0,
    y: -20,
    radius: 10,
    fill: "grey",
  });
  tr.add(editButton);

  groupLine.add(p1, p2, line, tr);
  textlayer.add(groupLine);
  line.moveToBottom();
  textlayer.draw();

  //??????????????????????????????????????????????????????Aktionshandling

  p1.on("dragmove", function () {
    tr.show();
    drawing = false;
    positionP1 = p1.getPosition();

    line.setAttrs({
      points: [positionP1.x, positionP1.y, positionP2.x, positionP2.y],
    });

    deleteButton.x(tr.getWidth() - 20);
    deletezeichen.x(tr.getWidth() - 25);
    editButton.x(tr.getWidth() - 0);
    strokeButtonColor.x(tr.getWidth() - 40);
    textlayer.batchDraw();
  });

  p2.on("dragmove", function () {
    tr.show();
    drawing = false;
    positionP2 = p2.getPosition();

    line.setAttrs({
      points: [positionP1.x, positionP1.y, positionP2.x, positionP2.y],
    });

    deleteButton.x(tr.getWidth() - 20);
    deletezeichen.x(tr.getWidth() - 25);
    editButton.x(tr.getWidth() - 0);
    strokeButtonColor.x(tr.getWidth() - 40);
    textlayer.batchDraw();
  });

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!deletereact

  deleteButton.on("touchstart click", () => {
    tr.destroy();
    line.destroy();
    p1.destroy();
    p2.destroy();
    stage.draw();
  });

  deletezeichen.on("touchstart click", () => {
    tr.destroy();
    line.destroy();
    p1.destroy();
    p2.destroy();
    stage.draw();
  });

  strokeButtonColor.on("click touchstart", () => {
    line.setAttrs({
      stroke: getRandomColor(),
    });
    stage.draw();
  });

  editButton.on("click touchstart", () => {
    tr.hide();
    stage.draw();
  });

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! hover
  p2.on("mouseover", function () {
    Mousemode.classList.remove("pencil");
    Mousemode.classList.remove("eraser");
    Mousemode.classList.remove("pointer");
    Mousemode.classList.add("grabbable");
  });

  p1.on("mouseover", function () {
    Mousemode.classList.remove("pencil");
    Mousemode.classList.remove("eraser");
    Mousemode.classList.remove("pointer");
    Mousemode.classList.add("grabbable");
  });

  p2.on("mouseout", function () {
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

  p1.on("mouseout", function () {
    if (mode === "brush") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("pencil");
    }
    if (mode === "eraser") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("eraser");
    }
  });

  strokeButtonColor.on("mouseover touchstart", function () {
    Mousemode.classList.remove("pencil");
    Mousemode.classList.remove("eraser");
    Mousemode.classList.remove("grabbable");
    Mousemode.classList.add("pointer");

    this.setAttrs({
      fillRadialGradientStartPoint: {
        x: 0,
        y: 0,
      },
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndPoint: {
        x: 0,
        y: 0,
      },
      fillRadialGradientEndRadius: 8,
      fillRadialGradientColorStops: [0, "blue", 0.5, "yellow", 1, "red"],
    });
    textlayer.draw();
  });

  strokeButtonColor.on("mouseout touchend", function () {
    if (mode === "brush") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("pencil");
    }
    if (mode === "eraser") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("eraser");
    }
    // set multiple properties at once with setAttrs
    this.setAttrs({
      fillRadialGradientStartPoint: {
        x: 0,
        y: 0,
      },
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndPoint: {
        x: 0,
        y: 0,
      },
      fillRadialGradientEndRadius: 8,
      fillRadialGradientColorStops: [0, "red", 0.5, "yellow", 1, "blue"],
    });
    textlayer.draw();
  });

  editButton.on("mouseover touchstart", function () {
    Mousemode.classList.remove("pencil");
    Mousemode.classList.remove("eraser");
    Mousemode.classList.remove("grabbable");
    Mousemode.classList.add("pointer");
    this.setAttrs({
      fill: "#CCCCCC",
    });
    textlayer.draw();

    if (is_touch_device()) {
      //da nach touchstart ist das objekt weg wodurch nich touchend getriggert wird
      this.setAttrs({
        fill: "grey",
      });
    }
  });

  editButton.on("mouseout", function () {
    if (mode === "brush") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("pencil");
    }
    if (mode === "eraser") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("eraser");
    }
    // set multiple properties at once with setAttrs
    this.setAttrs({
      fill: "grey",
    });
    textlayer.draw();
  });

  deleteButton.on("mouseover touchstart", function () {
    Mousemode.classList.remove("pencil");
    Mousemode.classList.remove("eraser");
    Mousemode.classList.remove("grabbable");
    Mousemode.classList.add("pointer");
    this.setAttrs({
      fill: "#AA0000",
    });
    textlayer.draw();

    if (is_touch_device()) {
      //da nach touchstart ist das objekt weg wodurch nich touchend getriggert wird
      this.setAttrs({
        fill: "red",
      });
    }
  });

  deleteButton.on("mouseout", function () {
    if (mode === "brush") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("pencil");
    }
    if (mode === "eraser") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("eraser");
    }
    // set multiple properties at once with setAttrs
    this.setAttrs({
      fill: "red",
    });
    textlayer.draw();
  });

  deletezeichen.on("mouseover touchstart", function () {
    Mousemode.classList.remove("pencil");
    Mousemode.classList.remove("eraser");
    Mousemode.classList.remove("grabbable");
    Mousemode.classList.add("pointer");
    deleteButton.setAttrs({
      fill: "#AA0000",
    });
    textlayer.draw();

    if (is_touch_device()) {
      //da nach touchstart ist das objekt weg wodurch nicht touchend getriggert wird
      deleteButton.setAttrs({
        fill: "red",
      });
    }
  });

  deletezeichen.on("mouseout", function () {
    if (mode === "brush") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("pencil");
    }
    if (mode === "eraser") {
      Mousemode.classList.remove("pencil");
      Mousemode.classList.remove("pointer");
      Mousemode.classList.remove("eraser");
      Mousemode.classList.remove("grabbable");
      Mousemode.classList.add("eraser");
    }
    // set multiple properties at once with setAttrs
    deleteButton.setAttrs({
      fill: "red",
    });
    textlayer.draw();
  });
}

function fitStageIntoParentContainer() {
  isPaint = false;
  var container = document.querySelector("#stage-parent");

  // now we need to fit stage into parent
  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;
  // to do this we need to scale the stage
  scalex = containerWidth / width;
  scaley = containerHeight / height;
  stage.width(width * scalex);
  stage.height(height * scaley);
  stage.scale({ x: scalex, y: scaley });
  stage.batchDraw();
}

//fitStageIntoParentContainer();
// adapt the stage on any window resize
window.addEventListener("resize", fitStageIntoParentContainer);

//_______________________________________________Bedienungsanweisung anzeigen lassen

function clearContext() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  stage.draw();
  return;
}
