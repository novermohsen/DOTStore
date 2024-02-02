let barBtn = document.getElementById("bar-btn");
let aSide = document.getElementById("aside-bar");
//show aside container
barBtn.addEventListener("click", () => {
  aSide.classList.toggle("active");
});
// -------------------------------------------
// main variables
let productContainer = document.getElementById("products-container");
let minInput = document.getElementById("min-price");
let maxInput = document.getElementById("max-price");
let btns = document.querySelectorAll("#btns-side ul li");
let searchInput = document.getElementById("search-input");
let searchValue = "";
let containerData = [];
let minPrice = 0;
let maxPrice = 10000;
let sectionValue = "all";

// to fetch data from json file
async function getData() {
  await fetch("javascript-file/fake-dataBase.json")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      containerData = res;
    });
  rendarElements(containerData);
}
// fetch data start
getData();

// main function of filtering
function filterData(value, minPrice, maxPrice, searchVal = "") {
  let productsFilterd = [];
  // if user not use search field
  if (searchVal == "") {
    // if user not use buttons list
    if (value == "all") {
      containerData.forEach((product) => {
        if (minPrice < product.price && product.price < maxPrice) {
          productsFilterd.push(product);
        }
      });
      rendarElements(productsFilterd);
      // if user use buttons list
    } else if (value !== "all") {
      containerData.forEach((product) => {
        if (
          value == product.category &&
          minPrice < product.price &&
          product.price < maxPrice
        ) {
          productsFilterd.push(product);
        }
        rendarElements(productsFilterd);
      });
    }
    // if user use search field
  } else if (searchVal != "") {
    // if user not use buttons list
    if (value == "all") {
      containerData.forEach((product) => {
        if (
          minPrice < product.price &&
          product.price < maxPrice &&
          product.title.toLowerCase().includes(searchVal.toLowerCase())
        ) {
          productsFilterd.push(product);
        }
      });
      rendarElements(productsFilterd);
    } else {
      containerData.forEach((product) => {
        if (
          value == product.category &&
          minPrice < product.price &&
          product.price < maxPrice &&
          product.title.toLowerCase().includes(searchVal.toLowerCase())
        ) {
          productsFilterd.push(product);
        }
        rendarElements(productsFilterd);
      });
    }
  }
}
// to buttons list input in filtering
btns.forEach((btn) => {
  // to remove active class from all btns
  btn.addEventListener("click", () => {
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
    // to add active on the selected button
    btn.classList.add("active");
    // to
    sectionValue = btn.dataset.filter;
    filterData(sectionValue, minPrice, maxPrice, searchValue);
  });
});

// to use search input in filtering
searchInput.addEventListener("input", (e) => {
  searchValue = e.target.value;
  filterData(sectionValue, minPrice, maxPrice, searchValue);
});
maxInput.addEventListener("input", (e) => {
  if (e.target.value != "") {
    maxPrice = +e.target.value;
    filterData(sectionValue, minPrice, maxPrice, searchValue);
  } else if (e.target.value == "") {
    maxPrice = 10000;
    filterData(sectionValue, minPrice, maxPrice, searchValue);
  }
});
minInput.addEventListener("input", (e) => {
  minPrice = +e.target.value;
  filterData(sectionValue, minPrice, maxPrice, searchValue);
});

// to render elements in #products-container
function rendarElements(products) {
  productContainer.innerHTML = "";
  // to solve text description over flow
  products.forEach((product) => {
    let text = product.description;
    let finalText = "";
    if (text.split(" ").length >= 20) {
      finalText = text.split(" ").slice(0, 20).join(" ");
    } else {
      finalText = product.description;
    }
    // product schema
    productContainer.innerHTML += `
      <div class="product-box">
          <div class="image"><img src="${
            product.thumbnail || product.image
          }" alt="product-image" loading="lazy" /></div>
              <div class="content">
                  <div class="text">
                    <h4 class="product-title">${
                      product.title || product.name
                    }</h4>
                     <p class="description" title="${
                       product.description
                     }">${finalText}</p>
                  </div>
                <div class="data">
                  <span class="category">brand : ${
                    product.brand || "Unknown"
                  }</span>
                  <span class="rating">rating : ${
                    product.rating.rate || product.rating
                  }</span>
                  <p class="price">price is : ${product.price}$</p>
                </div>
          </div>
       </div>`;
  });
}
