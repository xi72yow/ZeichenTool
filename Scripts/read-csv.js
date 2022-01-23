function handleSelectedFiles(e) {
  if (window.FileReader) {
    let id = e.target.id.toString();
    let channel = id[id.length - 1];
    setContentVisabillity("LoadingAniCH" + channel, true);
    let reader = new FileReader();
    reader.onload = function () {
      setContentVisabillity("LoadingAniCH" + channel, true);
    };
    Papa.parse(this.files[0], {
      skipEmptyLines: true,
      worker: true,
      complete: function (results) {
        console.log(results);
        osziFlash[channel] = results.data;
        setTimeout(() => {
          showcsv(osziFlash[parseInt(channel)], parseInt(channel));
          setTimeout(() => {
            stage.draw();
            setContentVisabillity("LoadingAniCH" + channel, false);
          }, 600);
        }, 1500);
      },
    });
    //reader.onload = loadHandler;
    reader.onerror = errorHandler;
  } else {
    alert(
      "Laden nicht moeglich. Bitte überdenken Sie die nutzung dieses Browsers"
    );
  }
}

function errorHandler(evt) {
  console.error(evt.target.error.name);
  if (evt.target.error.name == "NotReadableError") {
    alert("Datei kann nicht gelesen werden!");
  }
}

function reloadCSV() {}

if (debugging) {
  console.log(`Anzahl Threds: ${num_threads}`);
}
