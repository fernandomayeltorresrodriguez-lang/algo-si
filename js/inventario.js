var urlAPI = "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://script.google.com/macros/s/AKfycbyK1n1uVWqGHvK6_K4EvuIQAu2_KM-UopT-ayofSgpm92hDT1oS6_RT_gnaRjhmiEYIjA/exec");
var listaProductos = [];

function cargarInventario() {
    fetch(urlAPI)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            listaProductos = data;
            mostrarTodo();
        })
        .catch(function(err) {
            console.error("Error al cargar datos:", err);
            var contenedor = document.getElementById("productos");
            if (contenedor) {
                contenedor.innerHTML = "<p>Error al conectar con Google Sheets.</p>";
            }
        });
}

function mostrarTodo() {
    renderizarProductos(listaProductos);
}

function filtrarStockBajo() {
    var filtrados = listaProductos.filter(function(p) { return Number(p[1]) < 10; });
    renderizarProductos(filtrados);
}

function filtrarStockAlto() {
    var filtrados = listaProductos.filter(function(p) { return Number(p[1]) > 20; });
    renderizarProductos(filtrados);
}

function filtrarPrecioMayor() {
    var filtrados = listaProductos.filter(function(p) { return Number(p[2]) > 1500; });
    renderizarProductos(filtrados);
}

function filtrarPrecioMenor() {
    var filtrados = listaProductos.filter(function(p) { return Number(p[2]) < 1500; });
    renderizarProductos(filtrados);
}

function renderizarProductos(productos) {
    var contenedor = document.getElementById("productos");
    if (!contenedor) return;
    
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos que coincidan con este criterio.</p>";
        return;
    }

    productos.forEach(function(item) {
        var nombre = item[0];
        var stock = item[1];
        var precio = item[2];
        var claseCard = Number(stock) < 10 ? "card alerta-stock" : "card";

        contenedor.innerHTML += `
            <div class="${claseCard}">
                <h3>${nombre}</h3>
                <p><strong>Stock:</strong> ${stock} pzas</p>
                <p><strong>Precio:</strong> $${Number(precio).toLocaleString()}</p>
            </div>
        `;
    });
}