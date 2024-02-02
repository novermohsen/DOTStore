let bar = document.getElementById("bar");
let overlay = document.getElementById("overlay");
let right = document.getElementById("right-side");
let toggleBtn = document.getElementById("toggle-btn");
let header = document.querySelector("header");
let lis = document.querySelectorAll("header .right-side ul li a");

// create scroll to top button
let btnTop = document.createElement("button");
btnTop.className = "srollToTop-btn";
btnTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(btnTop);
btnTop.onclick = () => {
  document.body.scrollTop = "0";
  document.documentElement.scrollTop = "0";
};

window.onscroll = (e) => {
  if (scrollY > 300) {
    header.classList.add("active");
    btnTop.classList.add("active");
  } else {
    header.classList.remove("active");
    btnTop.classList.remove("active");
  }
};

lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    overlay.classList.remove("active");
    right.classList.remove("active");
    li.classList.add("active");
  });
});

bar.addEventListener("click", () => {
  right.classList.add("active");
  overlay.classList.add("active");
});

overlay.addEventListener("click", (e) => {
  overlay.classList.remove("active");
  right.classList.remove("active");
});

let dataTheme = document.documentElement;
let colorStorge = localStorage.getItem("theme");
let colorTheme;
if (colorStorge != null) {
  dataTheme.setAttribute("data-theme", colorStorge);
  dataTheme.dataset.theme == "dark"
    ? toggleBtn.classList.add("active")
    : toggleBtn.classList.remove("active");
}

toggleBtn.addEventListener("click", () => {
  dataTheme.dataset.theme === "light"
    ? (colorTheme = "dark")
    : (colorTheme = "light");
  localStorage.setItem("theme", colorTheme);
  dataTheme.setAttribute("data-theme", colorTheme);
  dataTheme.dataset.theme == "dark"
    ? toggleBtn.classList.add("active")
    : toggleBtn.classList.remove("active");
});
