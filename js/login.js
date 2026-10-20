function validarLogin(event, rolEsperado, redirectUrl) {
    event.preventDefault();
    var usuarioInput = document.getElementById("usuario").value;
    var passwordInput = document.getElementById("password").value;
    var errorMsg = document.getElementById("error-msg");

    // Credenciales de acceso predeterminadas para cada rol
    var credenciales = {
        administrador: { user: "admin", pass: "admin123" },
        almacenista: { user: "almacen", pass: "almacen123" },
        cliente: { user: "cliente", pass: "cliente123" }
    };

    if (usuarioInput === credenciales[rolEsperado].user && passwordInput === credenciales[rolEsperado].pass) {
        window.location.href = redirectUrl;
    } else {
        if (errorMsg) {
            errorMsg.innerText = "Usuario o contraseña incorrectos para " + rolEsperado;
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    }
}