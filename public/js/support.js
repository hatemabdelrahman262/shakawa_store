const form = document.getElementById("support-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: document.getElementById("email").value,
        question: document.getElementById("question").value
    };
    console.log(document.getElementById("email").value,document.getElementById("question").value)
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