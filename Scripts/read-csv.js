//                <table id="csvRoot" class="table table-hover"></table>

class TableCsv {
  /**
   * @param {HTMLTableElement} root The table element which will display the CSV data.
   */
  constructor(root) {
    this.root = root;
  }

  /**
   * Clears existing data in the table and replaces it with new data.
   *
   * @param {string[][]} data A 2D array of data to be used as the table body
   * @param {string[]} headerColumns List of headings to be used
   */
  update(data, headerColumns = []) {
    this.clear();
    this.setHeader(headerColumns);
    this.setBody(data);
  }

  /**
   * Clears all contents of the table (incl. the header).
   */
  clear() {
    this.root.innerHTML = "";
  }

  /**
   * Sets the table header.
   *
   * @param {string[]} headerColumns List of headings to be used
   */
  setHeader(headerColumns) {
    this.root.insertAdjacentHTML(
      "afterbegin",
      `
            <thead>
                <tr>
                    ${headerColumns.map((text) => `<th>${text}</th>`).join("")}
                </tr>
            </thead>
        `
    );
  }

  /**
   * Sets the table body.
   *
   * @param {string[][]} data A 2D array of data to be used as the table body
   */
  setBody(data) {
    const rowsHtml = data.map((row) => {
      return `
                <tr>
                    ${row.map((text) => `<td>${text}</td>`).join("")}
                </tr>
            `;
    });

    this.root.insertAdjacentHTML(
      "beforeend",
      `
            <tbody>
                ${rowsHtml.join("")}
            </tbody>
        `
    );
  }
}

const tableRoot = document.querySelector("#csvRoot");
const tableCsv = new TableCsv(tableRoot);

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
          /*           tableCsv.update(results.data.slice(1), results.data[0]);
           */ setTimeout(() => {
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
