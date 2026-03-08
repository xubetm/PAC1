const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const movieSelected = document.getElementById("movie");
const currencySelect = document.getElementById("currency");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieOptions = document.querySelectorAll("#movie option");

// Guardem el preu base i la selecció de la película
movieOptions.forEach((option) => {
  option.dataset.basePrice = option.value;
  option.dataset.name = option.text;
  option.text = `${option.dataset.name}: ${option.value} USD`;
});

// API Canvi de moneda
async function cambiarMoneda(base, target) {
  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${base}`,
  );
  const data = await response.json();
  return data.rates[target];
}

// Actualitzar el total
function actualizarTotal() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const numSelected = selectedSeats.length;
  const ticketPrice = +movieSelected.value;

  const totalPrice = numSelected * ticketPrice;

  count.innerText = numSelected;
  total.innerText = `${totalPrice.toFixed(2)} ${currencySelect.value}`;
}

// Desar dades a LocalStorage
function guardarDatos() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  localStorage.setItem("selectedMovie", movieSelected.selectedIndex);
}

function cargarDatos() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMovie = localStorage.getItem("selectedMovie");

  if (selectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  if (selectedMovie !== null) {
    movieSelected.selectedIndex = selectedMovie;
  }
}

// Selecció de seients
seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    seat.classList.toggle("selected");

    actualizarTotal();
    guardarDatos();
  });
});

// Canvi de película
movieSelected.addEventListener("change", () => {
  actualizarTotal();
  guardarDatos();
});

// Canvi de moneda
currencySelect.addEventListener("change", async () => {
  const selectedCurrency = currencySelect.value;

  const rate = await cambiarMoneda("USD", selectedCurrency);

  for (let option of movieOptions) {
    const basePrice = +option.dataset.basePrice;

    const convertedPrice = (basePrice * rate).toFixed(2);

    option.value = convertedPrice;

    option.text = `${option.dataset.name}: ${convertedPrice} ${selectedCurrency}`;
  }

  actualizarTotal();
});

window.addEventListener("load", () => {
  currencySelect.value = "USD";
  cargarDatos();
  actualizarTotal();
});
