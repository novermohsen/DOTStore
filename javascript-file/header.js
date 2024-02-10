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
    btnTop.style.right = "10px";
  } else {
    header.classList.remove("active");
    btnTop.style.right = "-100%";
  }
};

lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    overlay.classList.remove("active");
    right.style.right = "-100%";
  });
});

bar.addEventListener("click", () => {
  overlay.classList.add("active");
  right.style.right = "0%";
});

overlay.addEventListener("click", (e) => {
  overlay.classList.remove("active");
  right.style.right = "-100%";
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

let englishPage = {
  dataLang: "english",
  pageTitle: "report & complaint",
  inputFirstName: "first name",
  inputLastName: "last name",
  inputEmail: "your email",
  selectTitleOne: "Rating",
  selectRatingOne: "rate our website",
  selectRatingTwo: "rate our products",
  selectRatingThree: "rate our delivery clients",
  selectFour: "another thing",
  selectTitleTwo: "Report",
  selectReportOne: "report about our website",
  selectReportTwo: "report our products",
  selectReportThree: "report about our delivery clients",
  textArea: "explain your idea (optional)",
  submitBtnText: "send form",
  messageGreeting: "hello",
  messageSubject: "your form for",
  messageRate: "your rate",
  messageEnd: "we will message you on",
  almost: "almost",
  stars: "stars",
};
let arabicPage = {
  dataLang: "arabic",
  pageTitle: "الابلاغ و التقييم",
  inputFirstName: "الاسم الاول",
  inputLastName: "الاسم الاخير",
  inputEmail: "الايميل",
  selectTitleOne: "التقييم",
  selectRatingOne: "قيم موقعنا",
  selectRatingTwo: "قيم منتجاتنا",
  selectRatingThree: "تقييم عملاء التوصيل لدينا",
  selectFour: "شيء آخر",
  selectTitleTwo: "الابلاغ",
  selectReportOne: "الابلاغ عن عطل فى موقعنا",
  selectReportTwo: "الإبلاغ عن منتجاتنا",
  selectReportThree: "الابلاغ عن عملاء التوصيل لدينا",
  textArea: "(اختيارى) اشرح فكرتك بوضوح اكثر ",
  submitBtnText: "ارسال",
  messageGreeting: "مرحبا",
  messageSubject: "الموضوع",
  messageRate: "تقييمك",
  messageEnd: "سوف تتم مراسلتك على",
  almost: "تقريبا",
  stars: "نجوم",
};

let reportDiv = document.getElementById("report-div-content");
let reportBtn = document.getElementById("reoprt-btn");
let reportOverlay = document.getElementById("report-overlay");
let containerLang = document.getElementById("container-lang");
let language = "";

// to show report page
reportBtn.addEventListener("click", () => {
  if (reportDiv.children.length == 0) {
    containerLang.classList.add("active");
  } else if (reportDiv.children.length != 0) {
    let reportSection = document.getElementById("report-section");
    reportSection.classList.add("active");
  }
  reportOverlay.classList.add("active");
  window.addEventListener("scroll", () => {
    window.scroll(0, 0);
  });
});

// to hide report page
reportOverlay.addEventListener("click", closeReportPage);
// to hide report page
document.body.addEventListener("keydown", (e) => {
  if (e.key == "Escape" || e.key == "x") {
    closeReportPage();
  }
});

let buttonsLangauge = document.querySelectorAll("#container-lang button");
buttonsLangauge.forEach((button) => {
  button.addEventListener("click", () => {
    language = button.dataset.lang;
    if (language == "english") {
      reportDiv.innerHTML = dataPage(englishPage);
    } else if (language == "arabic") {
      reportDiv.innerHTML = dataPage(arabicPage);
    }
    containerLang.classList.remove("active");
    let reportSection = document.getElementById("report-section");
    reportSection.classList.add("active");
    renderReportPage();
  });
});

// main function to hide report page
function closeReportPage() {
  if (reportDiv.children.length == 0) {
    containerLang.classList.remove("active");
  } else if (reportDiv.children.length != 0) {
    let reportSection = document.getElementById("report-section");
    reportSection.classList.remove("active");
  }
  containerLang.classList.remove("active");
  reportOverlay.classList.remove("active");
  window.addEventListener("scroll", () => {
    window.scroll();
  });
}
function renderReportPage() {
  let btnDelet = document.getElementById("delet-btn");
  btnDelet.addEventListener("click", closeReportPage);
  let leftBtn = document.getElementById("left-btn");
  leftBtn.addEventListener("click", () => {
    let reportSection = document.getElementById("report-section");
    containerLang.classList.add("active");
    reportSection.classList.remove("active");
  });

  let submitBtn = document.getElementById("submit-btn");
  let starsRate = document.querySelectorAll("#rating-stars li");
  let middleSide = document.getElementById("middle-side");
  let firstNameInput = document.getElementById("first-name");
  let lastNameInput = document.getElementById("last-name");
  let selectElement = document.getElementById("select-section");
  let rangeRating = document.getElementById("rating-rang");
  let email = document.getElementById("email-name");

  submitBtn.onclick = () => {
    if (
      firstNameInput.value != "" &&
      lastNameInput.value != "" &&
      email.value != "" &&
      rangeRating.value != 0
    ) {
      middleSide.innerHTML = messageComponent(
        firstNameInput,
        selectElement,
        rangeRating,
        email
      );
      leftBtn.remove();
    } else {
      if (firstNameInput.value == "") {
        firstNameInput.style.borderBottom = "4px solid red";
      } else {
        firstNameInput.style.borderBottom =
          "4px solid hsla(216, 95%, 45%, 0.8)";
      }
      if (lastNameInput.value == "") {
        lastNameInput.style.borderBottom = "4px solid red";
      } else {
        lastNameInput.style.borderBottom = "4px solid hsla(216, 95%, 45%, 0.8)";
      }
      if (email.value == "") {
        email.style.borderBottom = "4px solid red";
      } else {
        email.style.borderBottom = "4px solid hsla(216, 95%, 45%, 0.8)";
      }
    }
  };
  // starts controlling
  let fullStar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>`;
  let halfStar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M341.5 13.5C337.5 5.2 329.1 0 319.9 0s-17.6 5.2-21.6 13.5L229.7 154.8 76.5 177.5c-9 1.3-16.5 7.6-19.3 16.3s-.5 18.1 5.9 24.5L174.2 328.4 148 483.9c-1.5 9 2.2 18.1 9.7 23.5s17.3 6 25.3 1.7l137-73.2 137 73.2c8.1 4.3 17.9 3.7 25.3-1.7s11.2-14.5 9.7-23.5L465.6 328.4 576.8 218.2c6.5-6.4 8.7-15.9 5.9-24.5s-10.3-14.9-19.3-16.3L410.1 154.8 341.5 13.5zM320 384.7V79.1l52.5 108.1c3.5 7.1 10.2 12.1 18.1 13.3l118.3 17.5L423 303c-5.5 5.5-8.1 13.3-6.8 21l20.2 119.6L331.2 387.5c-3.5-1.9-7.4-2.8-11.2-2.8z"/></svg>`;
  let emptyStar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>`;
  starsRate.forEach((element) => {
    element.addEventListener("click", (e) => {
      let mouseposition = e.offsetX;
      starsRate.forEach((el) => {
        el.innerHTML = emptyStar;
      });
      for (let i = 0; i <= element.dataset.index - 1; i++) {
        starsRate[i].innerHTML = fullStar;
        if (i == element.dataset.index - 1) {
          let position = mouseposition / element.clientWidth;
          if (position <= 0.5) {
            starsRate[i].innerHTML = halfStar;
          } else if (position >= 0.5) {
            starsRate[i].innerHTML = fullStar;
          }
          rangeRating.value = +element.dataset.index - 1 + position;
        }
      }
    });
  });
}

function dataPage(languagePram) {
  const {
    dataLang,
    pageTitle,
    inputFirstName,
    inputLastName,
    inputEmail,
    selectTitleOne,
    selectRatingOne,
    selectRatingTwo,
    selectRatingThree,
    selectFour,
    selectTitleTwo,
    selectReportOne,
    selectReportTwo,
    selectReportThree,
    textArea,
    submitBtnText,
  } = languagePram;
  return `
  <section class="report-section" id="report-section" data-lang="${dataLang}" >
    <div class="top-side">
    <button class="left-btn" id="left-btn"><i class="fa-solid fa-arrow-left"></i></button>
      <h1><span>dot</span>Store</h1>
      <h3>${pageTitle}</h3>
      <button class="delet-btn-report" id="delet-btn">
        <i class="fa-solid fa-x"></i>
      </button>
    </div>
    <div class="middle-side" id="middle-side">
      <div class="inputs-container">
        <div class="first-side">
          <input type="text" placeholder="${inputFirstName}" id="first-name" />
          <input type="text" placeholder="${inputLastName}" id="last-name" />
        </div>
        <div class="second-side">
          <input type="email"  placeholder="${inputEmail}"  id="email-name"required/>
        </div>
        <div class="third-side">
          <select name="ip-select" id="select-section" required>
            <optgroup label="${selectTitleOne}">
              <option name="ip-select" value="${selectRatingOne}">${selectRatingOne}</option>
              <option name="ip-select" value="${selectRatingTwo}">${selectRatingTwo}</option>
              <option name="ip-select" value="${selectRatingThree}">${selectRatingThree}</option>
              <option name="ip-select" value="${selectFour}">${selectFour}</option>
            </optgroup>
            <optgroup label="${selectTitleTwo}">
              <option name="ip-select" value="${selectReportOne}">${selectReportOne}</option>
              <option name="ip-select" value="${selectReportTwo}">${selectReportTwo}</option>
              <option name="ip-select" value="${selectReportThree}">${selectReportThree}</option>
              <option name="ip-select" value="${selectFour}">${selectFour}</option>
            </optgroup>
          </select>
          <div class="rating-side">
            <ul class="rating-stars" id="rating-stars">
              <li data-index="1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                </svg>
              </li>
              <li data-index="2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" >
                  <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                </svg>
              </li>
              <li data-index="3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
               <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                </svg>
              </li>
              <li data-index="4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                </svg>
              </li>
              <li data-index="5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                </svg>
              </li>
            </ul>
            <input type="range" name="rating-number" min="0" step=".1"  max="5" value="0" class="rating-rang" id="rating-rang"/>
          </div>
        </div>
        <div class="text-input">
          <textarea placeholder="${textArea}" name="description"></textarea>
        </div>
        <div class="buttons-side">
          <button id="submit-btn">${submitBtnText}</button>
        </div>
      </div>
    </div>
  </section>`;
}
function messageComponent(firstName, selectElement, rangeRating, email) {
  if (language == "english") {
    var {
      messageGreeting,
      messageSubject,
      messageRate,
      messageEnd,
      almost,
      stars,
    } = englishPage;
  } else if (language == "arabic") {
    var {
      messageGreeting,
      messageSubject,
      messageRate,
      messageEnd,
      almost,
      stars,
    } = arabicPage;
  }
  let source = "";
  if (rangeRating.value <= 2) {
    source = "assets/sad-face.png";
  } else if (rangeRating.value <= 3) {
    source = "assets/bored-face.png";
  } else {
    source = "assets/happy-face.png";
  }
  return ` <div class="detils">
  <div class="cont">
    <img src="${source}" alt="face-image" />
    <div class="text">
      <h1>${messageGreeting} : ${firstName.value}</h1>
      <h2>${messageSubject} : ${selectElement.value}</h2>
      <h2>${messageRate} (${almost}): <span>${Math.round(
    rangeRating.value
  )}</span> ${stars}</h2>
      <h2>${messageEnd} : <span>${email.value}</span></h2>
      <div class="bottom" ><img src="assets/checked.png" alt="true" /></div>
    </div>
  </div>
</div>`;
}
