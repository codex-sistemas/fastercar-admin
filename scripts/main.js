let init = async () => {
    const user = window.FIREBASE.user;
    const token = await user.getIdToken();

    const response = await fetch(
        `${serverAddr}/admin/me`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();
    let admin_name = document.getElementById("admin-name")
    admin_name.textContent = "Adminstrador: " + data["admin"]["name"]

    dashboard_init()
}

let dashboard_init = async () => {
    const user = window.FIREBASE.user;
    const token = await user.getIdToken();

    const response = await fetch(
        `${serverAddr}/admin/`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
}


const menuItems = document.querySelectorAll(".menu-item");
const screens = document.querySelectorAll(".screen");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        const screenName = item.dataset.screen;

        // Remove active dos menus
        menuItems.forEach(menu => {
            menu.classList.remove("active");
        });

        // Remove active das telas
        screens.forEach(screen => {
            screen.classList.remove("active");
        });

        // Ativa o menu clicado
        item.classList.add("active");

        // Ativa a tela correspondente
        const screen = document.getElementById(
            `screen-${screenName}`
        );

        if (screen) {
            screen.classList.add("active");
        }

    });

});