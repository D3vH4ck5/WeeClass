const menu = document.querySelector(".menu span");
const subBar = document.querySelector(".menu>.sub");

let subToggle = true,
  i = 0;

function slide_menu() {
  if (subToggle) {
    subBar.style.display = "block";
    subBar.classList.remove("up");
    subBar.classList.add("down");
    subToggle = !subToggle;
  } else {
    subBar.classList.remove("down");
    subBar.classList.add("up");
    subToggle = !subToggle;
  }
  console.log(subBar.classList);
}
menu.addEventListener("click", slide_menu);