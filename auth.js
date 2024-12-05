const users = JSON.parse(localStorage.getItem("users")) || [];

// Login
document.getElementById("login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
        alert("Inicio de sesión exitoso.");
        localStorage.setItem("loggedIn", JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        document.getElementById("login-error").classList.remove("hidden");
    }
});

// Registro
document.getElementById("register-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("register-success").classList.remove("hidden");
});

// Recuperación
document.getElementById("forgot-password-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("recovery-email").value;

    const user = users.find((u) => u.email === email);
    if (user) {
        alert(`Tu contraseña es: ${user.password}`);
    } else {
        alert("Correo no registrado.");
    }
});
const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_6tnxvj9';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});
