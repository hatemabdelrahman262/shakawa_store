const form = document.getElementById("support-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datas = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };
    console.log(document.getElementById("name").value,document.getElementById("email").value)
    const response = await fetch("/support", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datas)
    });

    const result = await response;

    console.log("results:",result);
});