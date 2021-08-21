function handleSelectedFiles(e) {
  if (window.FileReader) {
    let id = e.target.id.toString();
    let channel = id[id.length - 1];
    var reader = new FileReader();
    reader.onload = function () {
      var csv = reader.result;
      setContentVisabillity("LoadingAniCH" + channel, true);
      funcInADifferentThread(csv, channel);
    };
    //reader.onload = loadHandler;
    reader.onerror = errorHandler;
    reader.readAsText(this.files[0]);
  } else {
    alert('Laden nicht moeglich. Bitte überdenken Sie die nutzung dieses Browsers');
  }
}

function errorHandler(evt) {
  if (evt.target.error.name == "NotReadableError") {
    alert("Datei kann nicht gelesen werden!");
  }
}

function reloadCSV() {

}

var num_threads = 2;
var MT = new Multithread(num_threads);

if (debugging) {
  console.log("Anzahl Threds: " + num_threads);
}

var funcInADifferentThread = MT.process(
  function (csv, channel) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    while (allTextLines.length) {
      lines.push(allTextLines.shift().split(','));
    }
    //console.log("Spalten: " + lines[0].length);
    if (lines[0].length > 2) {
      alert("Datei kann nicht ausgewertet werden");
      console.error("Datei nicht Auswertbar da zu viele Spalten, (Single Channel erforderlich).");
      return 1;
    }
    //console.log(lines);

    return {
      data: lines,
      channel: channel,
    };
  },
  function (lines) {
    osziFlash[lines.channel] = lines.data;
    showcsv(lines.data, lines.channel);
    setContentVisabillity("LoadingAniCH" + lines.channel, false);
  }
);
