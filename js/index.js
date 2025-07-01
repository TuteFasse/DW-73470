// Constantes y variables
const precioPorHora = 500;
const precioPorGramo = {
  PLA: 5,
  PETG: 7,
  ABS: 8,
};

let presupuestos = [];

// Referencias DOM
const form = document.getElementById("presupuestoForm");
const resultadoDiv = document.getElementById("resultado");
const historialDiv = document.getElementById("historial");
const btnVerHistorial = document.getElementById("verHistorial");
const btnLimpiarHistorial = document.getElementById("limpiarHistorial");

// Funciones
function calcularPresupuesto(material, horas, peso, acabado) {
  let costoMaterial = (precioPorGramo[material] || 0) * peso;
  let costoBase = horas * precioPorHora;
  let costoTotal = costoBase + costoMaterial;

  if (acabado) {
    costoTotal *= 1.2;
  }

  return costoTotal;
}

function mostrarResultado(p) {
  resultadoDiv.textContent = `Presupuesto calculado:\n
Material: ${p.material}
Horas: ${p.horas}
Peso: ${p.peso} g
Acabado premium: ${p.acabado ? "Sí" : "No"}
Total: $${p.total.toFixed(2)}`;
}

function guardarPresupuesto(presupuesto) {
  presupuestos.push(presupuesto);
  localStorage.setItem("presupuestos", JSON.stringify(presupuestos));
}

function cargarPresupuestos() {
  const datos = localStorage.getItem("presupuestos");
  if (datos) {
    presupuestos = JSON.parse(datos);
  }
}

function mostrarHistorial() {
  if (presupuestos.length === 0) {
    historialDiv.textContent = "No hay presupuestos guardados.";
    return;
  }
  historialDiv.textContent = "Historial de presupuestos:\n\n";
  presupuestos.forEach((p, i) => {
    historialDiv.textContent += `#${i + 1} - Material: ${p.material}, Horas: ${p.horas}, Peso: ${p.peso}g, Acabado: ${p.acabado ? "Sí" : "No"}, Total: $${p.total.toFixed(2)}\n`;
  });
}

function limpiarHistorial() {
  localStorage.removeItem("presupuestos");
  presupuestos = [];
  historialDiv.textContent = "Historial eliminado.";
}

// Eventos
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const material = form.material.value;
  const horas = parseFloat(form.horas.value);
  const peso = parseFloat(form.peso.value);
  const acabado = form.acabado.checked;

  if (!material || isNaN(horas) || horas <= 0 || isNaN(peso) || peso <= 0) {
    resultadoDiv.textContent = "Por favor ingresa datos válidos.";
    return;
  }

  const total = calcularPresupuesto(material, horas, peso, acabado);

  const nuevoPresupuesto = {
    material,
    horas,
    peso,
    acabado,
    total,
  };

  mostrarResultado(nuevoPresupuesto);
  guardarPresupuesto(nuevoPresupuesto);
});

btnVerHistorial.addEventListener("click", mostrarHistorial);
btnLimpiarHistorial.addEventListener("click", limpiarHistorial);

// Inicialización
cargarPresupuestos();