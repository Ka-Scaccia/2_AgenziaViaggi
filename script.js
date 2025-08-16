// variabili
var form_1 = document.querySelector(".form_1");
var form_2 = document.querySelector(".form_2");
var form_3 = document.querySelector(".form_3");

var form_1_btns = document.querySelector(".form_1_btns");
var form_2_btns = document.querySelector(".form_2_btns");
var form_3_btns = document.querySelector(".form_3_btns");

var form_1_next_btn = document.querySelector(".form_1_btns .btn_next");
var form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
var form_2_next_btn = document.querySelector(".form_2_btns .btn_next");
var form_3_back_btn = document.querySelector(".form_3_btns .btn_back");

var form_2_progressbar = document.querySelector(".form_2_progressbar");
var form_3_progressbar = document.querySelector(".form_3_progressbar");

var btn_done = document.querySelector(".btn_done");
var modal_wrapper = document.querySelector(".modal_wrapper");
var shadow = document.querySelector(".shadow");

const API =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC5dxLJCPw1nLJJH_PqgW2Ei8wY27dgSjM";
let MuseiBoxs = null;
// Funzione per validare un form specifico
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll("input[required]");
  let isValid = true;

  // Itera su tutti gli input 'required' del form corrente
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      isValid = false;
    }
  });
  return isValid;
}

// gestione risposta
async function responseControll() {
  let errorData = {};
  try {
    errorData = await response.json();
  } catch (e) {
    errorData = {
      message:
        response.statusText || "Nessun dettaglio aggiuntivo disponibile.",
    };
  }
  throw new Error(
    `Errore HTTP! Stato: ${response.status}. Dettagli: ${JSON.stringify(
      errorData
    )}`
  );
}

// gestione validazione form
function errore() {
  alert("Completare tutti i campi e/o correttamente!");
}

// generazione musei
async function ottieniMuseiDaGemini(paese, giorni, API_URL) {
  const prompt = `Per un viaggio di ${giorni} giorni nel paese ${paese}, elenca dei musei importanti da visitare
  (la quantità decidila tu in base ai giorni di viaggio).
    Fornisci l'output come un oggetto JSON valido, racchiuso in un blocco di codice markdown JSON.
    Il formato JSON dovrebbe essere il seguente:
    {
        "musei": [
            { "title": "Nome del primo museo", "prezzo": "Prezzo del primo museo (SOLO NUMERO)", "valuta": "valuta paese" },
            { "title": "Nome del secondo museo", "prezzo": "Prezzo del secondo museo (SOLO NUMERO)", "valuta": "valuta paese"},
            { "title": "Nome del terzo museo", "prezzo": "Prezzo del terzo museo (SOLO NUMERO)", "valuta": "valuta paese" },
        ]
    }
    Non includere assolutamente testo aggiuntivo prima o dopo il blocco di codice JSON
    nemmeno testo aggiuntivo tra parentesi e neanche musei chiusi, è una lista di elementi.
    `;

  const conf = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  };

  try {
    const response = await fetch(API_URL, conf);

    if (!response.ok) {
      await responseControll(response);
    }

    const data = await response.json();

    let jsonString =
      data.candidates && data.candidates[0]?.content?.parts[0]?.text;

    if (!jsonString) {
      if (data.candidates && data.candidates[0]?.finishReason === "SAFETY") {
        throw new Error(
          "La risposta di Gemini è stata bloccata per motivi di sicurezza. Prova a riformulare la richiesta o controlla i safety settings."
        );
      }
      throw new Error(
        "La risposta di Gemini è vuota o mal formattata. Controllare la console per i dettagli della risposta API."
      );
    }

    const startIndex = jsonString.indexOf("{");
    const endIndex = jsonString.lastIndexOf("}");

    if (startIndex === -1 || endIndex === -1) {
      throw new Error(
        "La risposta di Gemini non contiene un oggetto JSON valido (manca '{' o '}'). Risposta: " +
          jsonString
      );
    }

    jsonString = jsonString.substring(startIndex, endIndex + 1);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Errore durante il recupero dei musei da Gemini:", error);
    throw error;
  }
}

function riepilogo(musei) {
  // variabili
  const nome = document.getElementById("nome").value;
  const cognome = document.getElementById("cognome").value;
  const pArrivo = document.getElementById("paese_arrivo").value;
  const pPartenza = document.getElementById("paese_partenza").value;
  const oPartenza = document.getElementById("ora_partenza").value;
  const oRitorno = document.getElementById("ora_ritorno").value;
  const pFuori = document.getElementById("pranzi_fuori").value;
  const cFuori = document.getElementById("cene_fuori").value;
  const giorni = document.getElementById("giorni").value;

  let contenitore = document.getElementsByClassName("form_3")[0];

  // stampo il riepilogo
  contenitore.innerHTML = `<h2>Riepilogo</h2>
    <div class="box">
      <label for="nome">nome</label>
      <input type="text" value="${nome}" readonly disabled />
    </div>
    <div class="box">
      <label for="cognome">cognome</label>
      <input type="text" value="${cognome}" readonly disabled />
    </div>
    <br>
    <div class="box">
      <label for="arrivo a" style="font-style: italic;">arrivo a</label>
      <input type="text" value="${pArrivo}" readonly disabled />
    </div>
    <div class="box">
      <label for="partenza da" style="font-style: italic;">partenza da</label>
      <input type="text" value="${pPartenza}" readonly disabled />
    </div>
    <div class="box">
      <label for="orario partenza">orario partenza</label>
      <input type="text" value="${oPartenza}" readonly disabled />
    </div>
    <div class="box">
      <label for="orario arrivo">orario arrivo</label>
      <input type="text" value="${oRitorno}" readonly disabled />
    </div>
    <div class="box">
      <label for="giorni">giorni di viaggio</label>
      <input type="text" value="${giorni}" readonly disabled />
    </div>
    <br>
    <div class="box">
      <label for="pranzi fuori">pranzi fuori</label>
      <input type="text" value="${pFuori}" readonly disabled />
    </div>
    <div class="box">
      <label for="cene fuori">cene fuori</label>
      <input type="text" value="${cFuori}" readonly disabled />
    </div>
    <br>
    `;

  // finchè la lunghezza dei musei selezionati non viene raggiunta da i
  let i,
    cont = 1;

  for (i = 0; i < musei.length; i++) {
    contenitore.innerHTML += `
      <div class="box">
        <label for="museo">museo n° ${cont}</label>
        <br>
        <textarea readonly disabled>${musei[i]}"</textarea>
      </div>
      `;
    cont++;
  }
}

/* quando si clicca il pulsante next del seguente form
nascondi il seguente form e rendi visibile il form che 
viene dopo e aumenti il progresso della bar */

form_1_next_btn.addEventListener("click", async function () {
  // se il form non è valido....
  if (!validateForm(form_1)) {
    // esco dalla funzione
    errore();
    return;
  }

  // altrimente inserisco dinamicamente la meta scelta nella città di arrivo
  // caricamento...
  let schermo = document.getElementById("schermo");
  const loading = document.getElementById("caricamento");

  // caricamento - INIZIO
  schermo.style.display = "none";
  loading.innerHTML = `<h1 id="loading">Caricamento in corso....</h1>`;

  const meta = document.querySelector(".tipo-selezione-input:checked").value;
  const paese_arrivoInput = document.getElementById("paese_arrivo");

  paese_arrivoInput.value = meta;

  // Genero dinamicamente i musei da vedere con l'AI
  const paese_arrivo = paese_arrivoInput.value;
  const numero_giorni = document.getElementById("giorni")?.value;

  // debbug
  console.log(
    "Tentativo di recupero musei per:",
    paese_arrivo,
    "per",
    numero_giorni,
    "giorni."
  );

  // ottengo i musei da Gemini
  try {
    MuseiBoxs = await ottieniMuseiDaGemini(paese_arrivo, numero_giorni, API);
    loading.innerHTML = "";
    schermo.style.display = "flex";
    // debbug
    console.log("Musei ricevuti da Gemini: ", MuseiBoxs);

    let risultatoContenitore = document.getElementById("risultatoAI");

    // caricamento - FINE
    risultatoContenitore.innerHTML = "";
    let allMuseiHTML = "";

    // verifico formato dati
    if (MuseiBoxs) {
      // debbug
      console.log("Inizio rendering dei musei");

      MuseiBoxs.musei.forEach(function (museo, index) {
        if (museo && museo.title) {
          allMuseiHTML += `
            <label for="museo-${index}" class="tipo-selezione-label">
              ${museo.title} - ${museo.prezzo} ${museo.valuta}
              <input
                type="checkbox"
                class="tipo-selezione-input"
                id="museo-${index}"
                name="musei_selezionati"
                />
            </label>
          `;
        } else {
          console.log("Errore nella rendirizzazione");
        }
      });
      // inserisco tutti i musei
      risultatoContenitore.innerHTML = allMuseiHTML;
      console.log("Renderizzazione completata con successo!");
    } else {
      console.warn("Nessun dato sui musei trovato!");
    }

    // prossimo form
    form_1.style.display = "none";
    form_2.style.display = "block";

    form_1_btns.style.display = "none";
    form_2_btns.style.display = "flex";

    form_2_progressbar.classList.add("active");

    // gestione errori API
  } catch (error) {
    console.log("Errore durante l'ottenimento dei musei!");
    risultatoContenitore.innerHTML =
      "<p>Errore nel caricamento dei musei. Riprova.</p>";
    form_1.style.display = "block";
    form_2.style.display = "none";
    form_1_btns.style.display = "flex";
    form_2_btns.style.display = "none";
    form_2_progressbar.classList.remove("active");
  }
});

form_2_back_btn.addEventListener("click", function () {
  form_1.style.display = "block";
  form_2.style.display = "none";

  form_1_btns.style.display = "flex";
  form_2_btns.style.display = "none";

  form_2_progressbar.classList.remove("active");
});

form_2_next_btn.addEventListener("click", async function () {
  // se il secondo form è valido..
  if (validateForm(form_2)) {
    // controllo se l'utente ha messo due città uguali
    let citta_arrivo = document.getElementById("paese_arrivo").value;
    let citta_partenza = document.getElementById("paese_partenza").value;

    if (citta_arrivo === citta_partenza) {
      errore();
      return;
    }

    // Converto i valori degli input a numeri interi (base 10) per i confronti numerici
    const pranzi_fuori = parseInt(
      document.getElementById("pranzi_fuori").value,
      10
    );
    const cene_fuori = parseInt(
      document.getElementById("cene_fuori").value,
      10
    );
    const giorni_viaggio = parseInt(
      document.getElementById("giorni").value,
      10
    );

    // Controllo che i pasti fuori non superino i giorni di viaggio
    if (pranzi_fuori > giorni_viaggio || cene_fuori > giorni_viaggio) {
      errore();
      return;
    }

    // salvo i musei con check
    let checkedMusei = [];
    let i = 0;
    const checkboxes = document.querySelectorAll(
      ".tipo-selezione-input:checked"
    );

    checkboxes.forEach(function (checkbox) {
      const label = checkbox.closest("label");
      if (label) {
        checkedMusei.push(label.textContent.trim());
      }
      if (checkedMusei[i] === citta_arrivo) {
        checkedMusei.pop(label.textContent.trim());
      }
      i++;
    });

    // stampo il riepilogo del viaggio
    riepilogo(checkedMusei);

    // Se tutte le validazioni passano, avanza al form 3
    form_2.style.display = "none";
    form_3.style.display = "flex";

    form_2_btns.style.display = "none";
    form_3_btns.style.display = "flex";

    form_3_progressbar.classList.add("active");
  } else {
    errore();
  }
});

form_3_back_btn.addEventListener("click", function () {
  form_2.style.display = "block";
  form_3.style.display = "none";

  form_2_btns.style.display = "flex";
  form_3_btns.style.display = "none";

  form_3_progressbar.classList.remove("active");
});

btn_done.addEventListener("click", function async() {
  if (validateForm(form_3)) {
    modal_wrapper.classList.add("active");
  } else {
    errore();
  }
});

shadow.addEventListener("click", function () {
  modal_wrapper.classList.remove("active");

  // ricarica pagina
  window.location.reload();
});
