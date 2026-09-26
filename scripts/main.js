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

let dashboard_init = () => {

}