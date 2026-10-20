// Reemplaza esta URL con tu enlace de Google Apps Script (Web App /exec)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyK1n1uVWqGHvK6_K4EvuIQAu2_KM-UopT-ayofSgpm92hDT1oS6_RT_gnaRjhmiEYIjA/exec";

function agregarProductoAdmin(event) {
    event.preventDefault();

    var nombre = document.getElementById("nuevoNombre").value;
    var stock = document.getElementById("nuevoStock").value;
    var precio = document.getElementById("nuevoPrecio").value;

    if (!nombre || stock === "" || precio === "") {
        alert("Por favor completa todos los campos.");
        return;
    }

    // 1. Preparamos los datos para Google Sheets
    var datosNuevoProducto = {
        accion: "agregar", // O según como lo tengas configurado en tu App Script
        producto: nombre,
        stock: Number(stock),
        precio: Number(precio)
    };

    // 2. Enviamos los datos a Google Sheets usando fetch
    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Requerido para peticiones simples desde GitHub Pages/Web a Apps Script
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosNuevoProducto)
    })
    .then(function() {
        // Guardado local en memoria
        if (typeof listaProductos !== 'undefined') {
            listaProductos.push([nombre, Number(stock), Number(precio)]);
        }

        alert("¡Producto '" + nombre + "' enviado exitosamente a Google Sheets!");
        document.getElementById("formAgregar").reset();

        // Actualiza la vista en pantalla
        if (typeof mostrarTodo === 'function') {
            mostrarTodo();
        }
    })
    .catch(function(error) {
        console.error("Error al guardar:", error);
        alert("Hubo un error al intentar guardar en Google Sheets.");
    });
}