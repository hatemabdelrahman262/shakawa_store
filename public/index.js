const form = document.getElementById("support-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };
    console.log(document.getElementById("name").value,document.getElementById("email").value)
    console.log("sending")
    const response = await fetch("/support", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response;

    console.log("results:",result);
});