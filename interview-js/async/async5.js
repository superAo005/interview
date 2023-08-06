let content = document.createElement("h1");
content.innerHTML = "test";
let app = document.getElementById("app");
app.appendChild(content);
console.log(1);
Promise.resolve().then(() => {
  console.log("2--promise");
  alert("2promise");
});
setTimeout(() => {
  console.log("4--setTimeout");
  alert("setTimeout");
}, 0);
console.log(4);
