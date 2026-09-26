const button = document.getElementById("google-login");
const errorElement = document.getElementById("login-error");

button.addEventListener("click", async () => {

    button.disabled = true;
    button.textContent = "Entrando...";

    errorElement.hidden = true;
    errorElement.textContent = "";

    try {
        await window.FIREBASE.loginGoogle();

    } catch (error) {

        console.error(error);

        errorElement.textContent =
            "Não foi possível realizar o login.";

        errorElement.hidden = false;

        button.disabled = false;
        button.textContent = "Entrar com Google";
    }
});