const form = document.getElementById("formularioPresupuesto");
const historialLista = document.getElementById("historial");
const resultadoDiv = document.getElementById("resultadoPresupuesto");
const limpiarBtn = document.getElementById("limpiarHistorial");
const selectMaterial = document.getElementById("material");

let materiales = [];

fetch("../data/materiales.json")
  .then((res) => res.json())
  .then((data) => {
    materiales = data;
    cargarOpcionesMaterial();
  })
  .catch(() => {
    Swal.fire("Error", "No se pudieron cargar los materiales", "error");
  });

function cargarOpcionesMaterial() {
  selectMaterial.innerHTML = '<option value="">Seleccioná un material</option>';
  materiales.forEach((mat) => {
    const option = document.createElement("option");
    option.value = mat.nombre;
    option.textContent = `${mat.nombre} - $${mat.precio} x gr`;
    selectMaterial.appendChild(option);
  });
}

function calcularPresupuesto(nombre, material, peso) {
  const mat = materiales.find((m) => m.nombre === material);
  return mat ? peso * mat.precio : 0;
}

function guardarEnHistorial(item) {
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push(item);
  localStorage.setItem("historial", JSON.stringify(historial));
}

function mostrarHistorial() {
  historialLista.innerHTML = "";
  const historial = JSON.parse(localStorage.getItem("historial")) || [];

  historial.forEach((item, i) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `${item.nombre} (${item.material}) - ${item.peso}gr - $${item.total}`;
    historialLista.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombrePieza").value;
  const material = selectMaterial.value;
  const peso = parseFloat(document.getElementById("peso").value);

  if (!material || isNaN(peso) || peso <= 0) {
    Swal.fire("Error", "Completá todos los campos correctamente", "warning");
    return;
  }

  const total = calcularPresupuesto(nombre, material, peso);
  resultadoDiv.textContent = `El presupuesto para "${nombre}" es $${total}`;

  const item = { nombre, material, peso, total };
  guardarEnHistorial(item);
  mostrarHistorial();
  form.reset();
});

limpiarBtn.addEventListener("click", () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminará el historial guardado.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("historial");
      mostrarHistorial();
      resultadoDiv.textContent = "";
      Swal.fire("Eliminado", "El historial fue eliminado", "success");
    }
  });
});

document.addEventListener("DOMContentLoaded", mostrarHistorial);
