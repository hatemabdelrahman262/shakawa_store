const order_button = document.getElementById("order")
const email = document.getElementById("email")
const password = document.getElementById("password")
const popup =document.querySelector(".popup")
const popup_submit =document.querySelector(".popup_submit")
const x_button=document.querySelector("#popup_close")
window.addEventListener("DOMContentLoaded",()=>{ console.log("DOM loaded");popup.style.display = "none";})


order_button.addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector(".popup").style.display = "flex";
});
x_button.addEventListener("click", (e) => {
    document.querySelector(".popup").style.display = "none";
});
popup_submit.addEventListener("click",async (e)=>{
    e.preventDefault()
    let email2 = email.value;
    let password2 = password.value;
    console.log(email2,password2)
    const sign = await fetch("/shakawa/sign_in",{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: email2,
        password: password2
    })
})
    popup.style.display = "none";
    const data = await sign.json()
    console.log(data)
    if(data.success == true){
        window.location.href="./order.html"
    }
})