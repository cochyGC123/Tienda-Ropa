emailjs.init("6daZczDhjNwjKi99-"); // Reemplaza con tu Public Key de Email.js

document.getElementById("forgot-password-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const userEmail = emailInput.value;

    // Simular contraseña recuperada
    const fakePassword = "123456"; // Este valor puede ser dinámico según tu implementación.

    // Parámetros para el correo
    const emailParams = {
        user_email: userEmail,
        user_password: fakePassword, // Envía la contraseña o instrucciones de recuperación.
    };

    // Enviar el correo
    emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", emailParams)
        .then(() => {
            alert("Correo enviado. Revisa tu bandeja de entrada.");
            emailInput.value = ""; // Limpiar el campo de correo
        })
        .catch((error) => {
            console.error("Error al enviar el correo:", error);
            alert("Ocurrió un error al enviar el correo. Intenta nuevamente.");
        });
});
