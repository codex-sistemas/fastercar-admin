const button = document.getElementById("google-login");
const errorElement = document.getElementById("login-error");

button.addEventListener("click", async () => {
    button.disabled = true;

    errorElement.hidden = true;
    errorElement.textContent = "";

    try {
        const { user, token } = await window.FIREBASE.loginGoogle();

        const response = await fetch(
            `${serverAddr}/admin/me`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            errorElement.textContent =
                data.detail || "Esta conta não possui acesso administrativo.";

            errorElement.hidden = false;

            await window.FIREBASE.signOut();

            button.disabled = false;

            return;
        }

        window.location.href = "../";


    } catch (error) {

        console.error(error);

        errorElement.textContent =
            "Não foi possível realizar o login.";

        errorElement.hidden = false;

        button.disabled = false;
        button.textContent = "Entrar com Google";
    }
});