// product data fetching
let productContainer = document.getElementById("product-container");
let searchFild = document.getElementById("search-fild");

let app = fetch("javascript-file/fake-dataBase.json").then((res) => {
  return res.json();
});

let data = app.then((res) => {
  return res;
});
loopData(data);

// main data
let categorysData = [];

async function loopData(array) {
  await app.catch(() => {
    productContainer.innerHTML = `<div class="spam">check your network</div>`;
  });
  productContainer.innerHTML = "";
  // to get the categorys form json file auto
  await array.then((products) => {
    products.forEach((product) => {
      if (categorysData.length == "0") {
        categorysData.push(product.category);
      } else {
        if (!categorysData.includes(product.category)) {
          categorysData.push(product.category);
        }
      }
    });
  });
  categorysData.forEach((category, index) => {
    // to create main div ,it is has container of title and category section
    let containerCategory = document.createElement("div");
    containerCategory.className = "container-category";
    // to create the second div ,it is has the products divs
    let categoryDiv = document.createElement("div");
    categoryDiv.className = "category-content";
    // create the title of section
    let p = document.createElement("p");
    p.className = "category-title";
    p.textContent = `${index + 1}- ${category} :`;
    // append main div to products container
    productContainer.appendChild(containerCategory);
    // to append title to the main div
    containerCategory.appendChild(p);
    // to append second div to main div
    containerCategory.appendChild(categoryDiv);

    array.then((arr) => {
      arr.forEach((product) => {
        if (product.category.toLowerCase() == category.toLowerCase()) {
          categoryDiv.innerHTML += rendarElements(product);
        }
      });
      categoryDiv.style.gridTemplateColumns = `repeat(${categoryDiv.children.length},400px)`;
    });
  });
}

function rendarElements(product) {
  let text = product.description;
  let finalText = "";
  if (text.split(" ").length >= 20) {
    finalText = text.split(" ").slice(0, 20).join(" ");
  } else {
    finalText = product.description;
  }
  return `
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
}
