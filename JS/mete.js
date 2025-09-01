window.addEventListener("load", async function () {
  // ottengo il mese attuale
  const oggi = new Date();
  const mese = oggi.getMonth() + 1;

  // contenitore mete
  const contBudapest = this.document.getElementById("contBudapest");
  const contCina = this.document.getElementById("contCina");
  const contNY = this.document.getElementById("contNY");
  const contRoma = this.document.getElementById("contRoma");
  const contTokyo = this.document.getElementById("contTokyo");

  // link pagine
  const paginaAttuale = window.location.href.split("#")[0];
  const pageBerlino = "http://127.0.0.1:5500/mete/berlino.html";
  const pageBudapest = "http://127.0.0.1:5500/mete/budapest.html";
  const pageCina = "http://127.0.0.1:5500/mete/cina.html";
  const pageNewYork = "http://127.0.0.1:5500/mete/newyork.html";
  const pageRoma = "http://127.0.0.1:5500/mete/roma.html";
  const pageTokyo = "http://127.0.0.1:5500/mete/tokyo.html";

  // CASO BERLINO
  if (paginaAttuale === pageBerlino) {
    if (mese >= 5 && mese <= 9) {
      let sconto = document.getElementById("sconto");
      sconto.innerHTML = "Se prenoti oggi risparmi il 50%!";
      console.log("Sconto Berlino applicato");

      // modifico prezzo per 7 e 14 giorni
      let prezzo7 = this.document.getElementById("prezzo7");
      prezzo7.innerHTML = "Costo totale: 212 euro (SCONTO)";

      let prezzo14 = this.document.getElementById("prezzo14");
      prezzo14.innerHTML = "Costo totale: 250 euro (SCONTO)";
    }
  }
  // CASO BUDAPEST
  if (paginaAttuale === pageBudapest) {
    if (mese === 4 || mese === 6 || mese === 9 || mese === 10) {
      let sconto = this.document.getElementById("sconto");
      sconto.innerHTML = "Se prenoti oggi risparmi il 50%!";
      console.log("Sconto Budapest applicato");

      // modifico prezzo per 7 e 14 giorni
      let prezzo7 = this.document.getElementById("prezzo7");
      prezzo7.innerHTML = "Costo totale: 162 euro (SCONTO)";

      let prezzo14 = this.document.getElementById("prezzo14");
      prezzo14.innerHTML = "Costo totale: 200 euro (SCONTO)";
    }
  }

  // CASO CINA, NEW YORK & ROMA (stesso periodo)
  if (mese === 4 || mese === 5 || mese === 9 || mese === 10) {
    if (paginaAttuale === pageCina) {
      let sconto = this.document.getElementById("sconto");
      sconto.innerHTML = "Se prenoti oggi risparmi il 50%!";
      console.log("Sconto Cina applicato");

      // modifico prezzo per 7 e 14 giorni
      let prezzo7 = this.document.getElementById("prezzo7");
      prezzo7.innerHTML = "Costo totale: 162 euro (SCONTO)";

      let prezzo14 = this.document.getElementById("prezzo14");
      prezzo14.innerHTML = "Costo totale: 200 euro (SCONTO)";
    } else if (paginaAttuale === pageNewYork) {
      let sconto = this.document.getElementById("sconto");
      sconto.innerHTML = "Se prenoti oggi risparmi il 50%!";
      console.log("Sconto Cina applicato");

      // modifico prezzo per 7 e 14 giorni
      let prezzo7 = this.document.getElementById("prezzo7");
      prezzo7.innerHTML = "Costo totale: 477 euro (SCONTO)";

      let prezzo14 = this.document.getElementById("prezzo14");
      prezzo14.innerHTML = "Costo totale: 526 euro (SCONTO)";
    } else if (paginaAttuale == pageRoma) {
      let sconto = this.document.getElementById("sconto");
      sconto.innerHTML = "Se prenoti oggi risparmi il 50%!";
      console.log("Sconto Cina applicato");

      // modifico prezzo per 7 e 14 giorni
      let prezzo7 = this.document.getElementById("prezzo7");
      prezzo7.innerHTML = "Costo totale: 135 euro (SCONTO)";

      let prezzo14 = this.document.getElementById("prezzo14");
      prezzo14.innerHTML = "Costo totale: 185 euro (SCONTO)";
    }
  }

  // CASO TOKYO
  if (paginaAttuale == pageTokyo) {
    if (mese === 3 || mese === 5 || mese === 9 || mese === 11) {
      let sconto = this.document.getElementById("sconto");
      sconto.innerHTML = "Se prenoti oggi risparmi il 50%!";
      console.log("Sconto Cina applicato");

      // modifico prezzo per 7 e 14 giorni
      let prezzo7 = this.document.getElementById("prezzo7");
      prezzo7.innerHTML = "Costo totale: 550 euro (SCONTO)";

      let prezzo14 = this.document.getElementById("prezzo14");
      prezzo14.innerHTML = "Costo totale: 700 euro (SCONTO)";
    }
  }
});
