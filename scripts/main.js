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

    try {
        const response = await fetch(
            `${serverAddr}/admin/dashboard`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("ERRO DO BACKEND:", data);
            return;
        }

        console.log(data)

        const pending_drivers = document.getElementById("pending-drivers")
        const pending_vehicles = document.getElementById("pending-vehicles")
        const total_rides = document.getElementById("total-rides")
        const active_passes = document.getElementById("active-passes")
        const dashboard_drivers = document.getElementById("dashboard-drivers")

        pending_drivers.textContent = data["drivers pending"]
        pending_vehicles.textContent = data["vehicles pending"]
        total_rides.textContent = data["total rides"]
        active_passes.textContent = data["passes active"]
    }
    catch (error) {
        console.log(error)
    }
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