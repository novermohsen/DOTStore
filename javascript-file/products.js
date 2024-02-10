// import previewRender from "./preview";
let barBtn = document.getElementById("bar-btn");
let aSide = document.getElementById("aside-bar");

//show aside container
barBtn.addEventListener("click", () => {
  aSide.classList.toggle("active");
});
// side container
let productSide = document.querySelector(".container-side");
let topBtn = document.getElementById("top-btn");
productSide.onscroll = () => {
  if (productSide.scrollTop >= 2000) {
    topBtn.classList.add("active");
  } else {
    topBtn.classList.remove("active");
  }
};
topBtn.onclick = () => {
  productSide.scrollTop = 0;
  productSide.scrollTop = 0;
};

// -------------------------------------------
// main variables
let productContainer = document.getElementById("products-container");
let inputsCheckBoxs = document.querySelectorAll("#inputs input");
let resultSearch = document.getElementById("search-result");
let searchBtn = document.getElementById("btn-search");
let minInput = document.getElementById("min-price");
let maxInput = document.getElementById("max-price");
let searchInput = document.getElementById("search-input");

// main variables for filtering
let searchValue = "";
let containerData = [];
let minPrice = 0;
let maxPrice = 10000;
let sectionValue = [
  "smartphones",
  "laptops",
  "electronics",
  "men's clothing",
  "women's clothing",
  "jewelery",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
];
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
  if (localStorage.getItem("productId") != null) {
    previewRender(localStorage.getItem("productId"));
    window.localStorage.removeItem("productId");
  }
}
// fetch data start
getData();

// main function of filtering
function filterData(valueSections, minPrice, maxPrice, searchVal = "") {
  if (valueSections.length == 0) {
    inputsCheckBoxs.forEach((e) => {
      e.checked = false;
    });
  } else if (valueSections.length == 10) {
    inputsCheckBoxs.forEach((e) => {
      e.checked = true;
    });
  }
  let productFilter = [];
  if (searchVal == "") {
    containerData.forEach((product) => {
      valueSections.forEach((section) => {
        if (
          product.category == section &&
          product.price >= minPrice &&
          product.price <= maxPrice
        ) {
          productFilter.push(product);
        }
      });
    });
  } else if (searchVal != "") {
    containerData.forEach((product) => {
      valueSections.forEach((section) => {
        if (
          product.category == section &&
          product.price >= minPrice &&
          product.price <= maxPrice &&
          product.title.toLowerCase().includes(searchVal.toLowerCase())
        ) {
          productFilter.push(product);
        }
      });
    });
  }
  rendarElements(productFilter);
}

let smartphones = document.getElementById("smartphones");
let laptops = document.getElementById("laptops");
let others = document.getElementById("others");
let men = document.getElementById("men's clothing");
let women = document.getElementById("women's clothing");
let jewelery = document.getElementById("jewelery");
let fragrances = document.getElementById("fragrances");
let skincare = document.getElementById("skincare");
let groceries = document.getElementById("groceries");
let home = document.getElementById("home-decoration");

// to add check box on the (sectionValue)
inputsCheckBoxs.forEach((input) => {
  input.addEventListener("click", () => {
    if (input.checked) {
      ["groceries", "home-decoration"];
      if (input.dataset.filter == "all") {
        sectionValue = [
          "smartphones",
          "laptops",
          "electronics",
          "men's clothing",
          "women's clothing",
          "jewelery",
          "fragrances",
          "skincare",
          "groceries",
          "home-decoration",
        ];
        inputsCheckBoxs.forEach((e) => {
          e.checked = true;
        });
      } else if (input.dataset.filter == "elec") {
        smartphones.checked = true;
        laptops.checked = true;
        others.checked = true;
        sectionValue.push(...["smartphones", "laptops", "electronics"]);
      } else if (input.dataset.filter == "life-style") {
        men.checked = true;
        women.checked = true;
        jewelery.checked = true;
        fragrances.checked = true;
        skincare.checked = true;
        sectionValue.push(
          ...[
            "men's clothing",
            "women's clothing",
            "jewelery",
            "fragrances",
            "skincare",
          ]
        );
      } else if (input.dataset.filter == "home") {
        groceries.checked = true;
        home.checked = true;
        sectionValue.push(...["groceries", "home-decoration"]);
      }
    } else if (!input.checked) {
      if (input.dataset.filter == "all") {
        sectionValue = [];
        inputsCheckBoxs.forEach((e) => {
          e.checked = false;
        });
      } else if (input.dataset.filter == "elec") {
        smartphones.checked = false;
        laptops.checked = false;
        others.checked = false;
        sectionValue = sectionValue.filter((e) => {
          return e != "smartphones" && e != "laptops" && e != "electronics";
        });
      } else if (input.dataset.filter == "life-style") {
        men.checked = false;
        women.checked = false;
        jewelery.checked = false;
        fragrances.checked = false;
        skincare.checked = false;
        sectionValue = sectionValue.filter((e) => {
          return (
            e != "men's clothing" &&
            e != "women's clothing" &&
            e != "jewelery" &&
            e != "fragrances" &&
            e != "skincare"
          );
        });
      } else if (input.dataset.filter == "home") {
        groceries.checked = false;
        home.checked = false;
        sectionValue = sectionValue.filter((e) => {
          return e != "groceries" && e != "home-decoration";
        });
      }
      sectionValue = sectionValue.filter((section) => {
        return section != input.dataset.filter;
      });
    }
    filterData(sectionValue, minPrice, maxPrice, searchValue);
  });
});

filterData(sectionValue, minPrice, maxPrice, searchValue);

// to show (search-values)
searchInput.addEventListener("focus", () => {
  document.querySelector(".search-values").classList.add("active");
});
// // to hide (search-values)
searchInput.addEventListener("blur", () => {
  setTimeout(() => {
    document.querySelector(".search-values").classList.remove("active");
  }, 200);
});

// to use search input in filtering
searchInput.addEventListener("input", (e) => {
  resultSearch.innerHTML = "";
  searchValue = e.target.value;
  let letters = searchValue.toLowerCase().trim().split("").sort().join("");
  if (letters.length >= 2) {
    containerData.forEach((product, index) => {
      let source = product.thumbnail || product.image;
      let text = containerData[index].title;
      if (product.title.toLowerCase().includes(searchValue.toLowerCase())) {
        resultSearch.innerHTML += `<li class="data-search" data-text="${text}">${text} <img src="${source}" alt="image"/></li>`;
      } else {
        let title = product.title.toLowerCase().split(" ");
        title = title
          .map((el) => {
            el = el.split("").sort().join("");
            return el;
          })
          .join("");
        if (title.includes(letters)) {
          resultSearch.innerHTML += `<li class="data-search" data-text="${text}">${text} <img src="${source}" alt="image"/></li>`;
        }
      }
    });
  }
  if (resultSearch.children.length != 0) {
    lisClick();
  }
});

function lisClick() {
  let lis = document.querySelectorAll("#search-result .data-search");
  lis.forEach((li) => {
    li.addEventListener("click", () => {
      searchInput.value = li.dataset.text;
      searchValue = li.dataset.text;
      filterData(sectionValue, minPrice, maxPrice, searchValue);
    });
  });
}

// search btn
searchBtn.addEventListener("click", () => {
  filterData(sectionValue, minPrice, maxPrice, searchValue);
});
document.body.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    filterData(sectionValue, minPrice, maxPrice, searchValue);
  }
});
// max value input
maxInput.addEventListener("input", (e) => {
  if (e.target.value != "") {
    maxPrice = +e.target.value;
    filterData(sectionValue, minPrice, maxPrice, searchValue);
  } else if (e.target.value == "") {
    maxPrice = 10000;
    filterData(sectionValue, minPrice, maxPrice, searchValue);
  }
});

// min value input
minInput.addEventListener("input", (e) => {
  minPrice = +e.target.value;
  filterData(sectionValue, minPrice, maxPrice, searchValue);
});

// to render elements in #products-container
function rendarElements(products) {
  productContainer.innerHTML = "";
  if (products.length == 0) {
    productContainer.innerHTML = "<h2 class='spam'>no products exist</h2>";
  }
  // to solve text description over flow
  products.forEach((product) => {
    let source = product.thumbnail || product.image;
    let title = product.title;
    let brandName = product.brand || "Unknown";
    let rateing = product.rating.rate || product.rating;
    let price = product.price;
    let text = product.description;
    let finalText = "";
    let orderNumber = Math.floor(Math.random() * (products.length - 1));
    // to check length of description
    if (text.split(" ").length >= 20) {
      finalText = text.split(" ").slice(0, 20).join(" ");
    } else {
      finalText = product.description;
    }
    // product schema
    productContainer.innerHTML += `
    <div class="product-box" style="order:${orderNumber};" onclick=previewRender(${product.id}) title="click to show more data">
        <div class="image"><img src="${source}" alt="product-image" loading="lazy" /></div>
            <div class="content">
                 <div class="text">
                   <h4 class="product-title">${title}</h4>
                     <p class="description" title="${product.description}">${finalText}</p>
                </div>
               <div class="data">
                 <span class="category">brand : ${brandName}</span>
                <span class="rating">rating : ${rateing}</span>
                  <p class="price">price is : ${price}$</p>
              </div>
         </div>
      </div>`;
  });
}

function previewRender(index) {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  let containerDiv = document.getElementById("preview");
  containerDiv.innerHTML = "";
  let product = containerData[index - 1];
  let title = product.title;
  let description = product.description;
  let brandName = product.brand || "Unknown";
  let price = product.price;
  let source = product.thumbnail || product.image;
  let rateing = product.rating.rate || product.rating;
  let category = product.category;
  let images = product.images || null;
  let stars = "";
  rateing = Math.round(rateing);
  for (let i = 0; i < rateing; i++) {
    stars += "⭐";
  }
  var li = "no images preview";
  if (images != null) {
    li = "";
    images.forEach((img) => {
      li += `<img src="${img}" alt="image" loading="lazy"/>`;
    });
  }
  var miniProduct = "";
  let i = 0;
  containerData.forEach((productEle) => {
    if (
      category == productEle.category &&
      title != productEle.title &&
      productEle.price <= price + 0.5 * price
    ) {
      i++;
      if (i <= 4) {
        miniProduct += `
        <div class="mini-product" onclick=previewRender(${productEle.id}) >
         <div class="image" ><img src="${
           productEle.thumbnail || productEle.image
         }" loading="lazy" alt="image" /></div>
          <h4>${productEle.title}</4>
        </div>`;
      }
    }
  });
  let container = `<div class="preview-container">
      <div class="preview-content">
        <button class="delet-btn" id="delet-btn">
          <i class="fa-solid fa-x"></i>
        </button>
        <div class="preview-left-side">
          <div class="text">
            <div class="first-text">
              <h3>${title}</h3>
              <p>${description}</p>
            </div>
            <div class="text-second">
              <p class="brand">brand: ${brandName}</p>
              <p class="category">category: ${category}</p>
              <p class="rating">rating:${stars}</p>
            </div>
            <div class="text-threed">
              <p class="price">price is: ${price}$</p>
              <button class="pay-btn" id="pay-btn">
                pay now
              </button>
            </div>
          </div>
        </div>
        <div class="preview-right-side">
          <div class="image">
            <img src="${source}" alt="image" loading="lazy" />
          </div>
          <div class="contaoner-images" id="contaoner-images">
            <div class="images" id="images-container">
              ${li}
            </div>
          </div>
        </div>
      </div>
      <div class="related">
        <h2>related with :</h2>
        <div class="mini-products">${miniProduct}</div>
      </div>
    </div>`;

  containerDiv.innerHTML += container;
  let btnDelet = document.getElementById("delet-btn");
  btnDelet.onclick = () => {
    btnDelet.parentElement.parentElement.remove();
  };
  document.body.addEventListener("keydown", (e) => {
    if (e.key == "Escape" || e.key == "x") {
      btnDelet.parentElement.parentElement.remove();
    }
  });
  let imagesDiv = document.querySelectorAll("#contaoner-images img");
  imagesDiv.forEach((img) => {
    img.addEventListener("click", () => {
      imagesDiv.forEach((e) => {
        e.classList.remove("active");
      });
      document.querySelector(".preview-right-side .image img").src = img.src;
      img.classList.add("active");
    });
  });
}
