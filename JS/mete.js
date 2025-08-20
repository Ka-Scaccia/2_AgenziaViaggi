window.addEventListener("load", function () {
  // ottengo il mese attuale
  const oggi = new Date();
  const mese = oggi.getMonth() + 1;

  // periodo Berlino: maggio-settembre
  // periodo Budapest: aprile-giugno e settembre-ottobre
  // periodo Cina: aprile-maggio e settembre-ottobre
  // periodo New York: aprile-giugno e settembre-ottobre
  // periodo Roma: aprile-maggio e settembre-ottobre
  // periodo Tokyo: marzo-maggio e settembre-novembre

  // Budapest e New York coincidono
  const paginaAttuale = window.location.href;
  const pageBerlino = "http://127.0.0.1:5500/mete/berlino.html";

  // CASO BERLINO
  if (paginaAttuale === pageBerlino) {
    if (mese >= 5 && mese <= 9) {
      let sconto = this.document.getElementById("sconto");
      sconto.innerHTML = "Se prenoti oggi risparmi il 50%!";
    }
  }
});
