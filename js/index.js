// Declaración de variables y constantes
const materiales = ["PLA", "PETG", "ABS"];
const precioPorHora = 500; // precio base por hora
const precioMaterial = {
    PLA: 200,
    PETG: 300,
    ABS: 350
};

// Función para solicitar datos al usuario
function solicitarDatos() {
    let nombre = prompt("Bienvenido al simulador de presupuesto. ¿Cuál es tu nombre?");
    let material = prompt("¿Qué material deseas usar? (PLA, PETG, ABS)").toUpperCase();
    let horas = parseFloat(prompt("¿Cuántas horas de impresión estimás?"));
    let acabado = confirm("¿Deseas acabado premium? (Aceptar = Sí / Cancelar = No)");

    return {
        nombre,
        material,
        horas,
        acabado
    };
}

// Función para calcular el presupuesto
function calcularPresupuesto(material, horas, acabado) {
    let costoMaterial = precioMaterial[material] || 0;
    let costoBase = horas * precioPorHora;
    let costoTotal = costoBase + costoMaterial;

    if (acabado) {
        costoTotal *= 1.2; // 20% extra por acabado premium
    }

    return costoTotal;
}

// Función para mostrar el resultado
function mostrarResultado(usuario, total) {
    console.clear();
    console.log("=== Presupuesto generado ===");
    console.log("Cliente:", usuario.nombre);
    console.log("Material elegido:", usuario.material);
    console.log("Horas de impresión:", usuario.horas);
    console.log("Acabado premium:", usuario.acabado ? "Sí" : "No");
    console.log("Total estimado: $" + total.toFixed(2));

    alert(
        `¡Gracias, ${usuario.nombre}!\n\n` +
        `Tu presupuesto estimado es: $${total.toFixed(2)}\n` +
        `Material: ${usuario.material}\n` +
        `Horas: ${usuario.horas}\n` +
        `Acabado premium: ${usuario.acabado ? "Sí" : "No"}`
    );
}

// Ciclo principal
function iniciarSimulador() {
    let continuar = true;

    while (continuar) {
        let datos = solicitarDatos();

        // Validación básica
        if (!materiales.includes(datos.material)) {
            alert("Material no válido. Intenta nuevamente.");
            continue;
        }

        let total = calcularPresupuesto(datos.material, datos.horas, datos.acabado);
        mostrarResultado(datos, total);

        continuar = confirm("¿Deseas realizar otro presupuesto?");
    }

    alert("¡Gracias por usar el simulador!");
}

// Llamada inicial al simulador
iniciarSimulador();