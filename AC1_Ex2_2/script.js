const origen = document.getElementById("monedaOrigen");
const destino = document.getElementById("monedaDestino");
const cantidad = document.getElementById("cantidad");
const resultado = document.getElementById("resultado");

origen.addEventListener("change", convertir);
destino.addEventListener("change", convertir);
cantidad.addEventListener("input", convertir);

async function convertir() {
  try {
    resultado.textContent = "Consultando cambio...";

    const monedaOrigen = origen.value;
    const monedaDestino = destino.value;
    const valorCantidad = Number(cantidad.value);

    if (valorCantidad < 0) {
      resultado.textContent("No se permiten números negativos");
      return;
    }

    const url = `https://api.exchangerate-api.com/v4/latest/${monedaOrigen}`;

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    const tasa = datos.rates[monedaDestino];

    const conversion = valorCantidad * tasa;

    resultado.textContent = `${valorCantidad} ${monedaOrigen} = ${conversion.toFixed(2)} ${monedaDestino}`;
  } catch (error) {
    resultado.textContent = "Error al consultar la API";
  }
}

convertir();
