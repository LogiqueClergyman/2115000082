import express from "express";
const app = express();

app.use(express.json(), express.urlencoded({ extended: true }));

const api = "http://20.244.56.144/test";
//useless withour the Bearer token

let products = [];
let ascendingSortedProducts = [];
let descendingSortedProducts = [];
let filteredProducts = products;
let lastUpdated = 0;

function ascendingSort(products) {
  products.sort((a, b) => a.price - b.price);
  ascendingSortedProducts = products;
}

function descendingSort(products) {
  products.sort((a, b) => b.price - a.price);
  descendingSortedProducts = products;
}

function filterByCategory(products, category) {
  return products.filter((product) => product.category === category);
}

function filterByPrice(products, minPrice, maxPrice) {
  return products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
}

function filterByCompany(products, company) {
  return products.filter((product) => product.company == company);
}

function searchProduct(products, id) {
  return products.filter((product) => product.id === id);
}

function addId(products) {
  products.forEach((product, index) => {
    product.id = `${product.name}-${index}`;
  });
}

function getData(company, category, top, minPrice, maxPrice) {
  fetch(
    `${api}/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      addId(products);
      ascendingSortedProducts = [];
      descendingSortedProducts = [];
      lastUpdated = Date.now();
      console.log(products);
    });
}

let lastRequestedCompany = "";
let lastRequestedCategory = "";
app.get(
  `/companies/:companyName/categories/:categoryName/products`,
  (req, res) => {
    console.log(req.query);
    console.log(req.params);
    // if (products.length === 0 || Date.now() - lastUpdated > 100000) {
    //   getData(req.params.companyName, req.params.categoryName);
    // }
    if (
      products.length === 0 ||
      lastRequestedCompany !== req.params.companyName ||
      lastRequestedCategory !== req.params.categoryName
    ) {
      getData(
        req.params.companyName,
        req.params.categoryName,
        1000,
        0,
        1000000
      );
      lastRequestedCompany = req.params.companyName;
      lastRequestedCategory = req.params.categoryName;
    }
    if (req.query.sort && req.query.sort === "asc") {
      if (ascendingSortedProducts.length === 0) ascendingSort(products);
      filteredProducts = ascendingSortedProducts;
    } else if (req.query.sort && req.query.sort === "desc") {
      if (descendingSortedProducts.length === 0) descendingSort(products);
      filteredProducts = descendingSortedProducts;
    } else {
      filteredProducts = products;
    }
    // if (req.query.category) {
    //   filteredProducts = filterByCategory(products, req.query.category);
    // }
    // if (req.query.company) {
    //   filteredProducts = filterByCompany(filteredProducts, req.query.company);
    // }
    if (req.query.minPrice || req.query.maxPrice) {
      let min = req.query.minPrice ? req.query.minPrice : 0;
      let max = req.query.maxPrice ? req.query.maxPrice : 1000000;
      filteredProducts = filterByPrice(filteredProducts, min, max);
    }
    if (!req.query.top) {
      req.query.top = 10;
    }
    if (req.query.top && req.query.top > 10) {
      let pageSize = 10;
      if (!req.query.page) {
        req.query.page = 1;
      }
      let start = (req.query.page - 1) * pageSize;
      let end = start + pageSize;
      if (end > filteredProducts.length) end = filteredProducts.length;
      filteredProducts = filteredProducts.slice(start, end);
    }
    res.send(filteredProducts);
  }
);

app.get(
  `/companies/:companyName/categories/:categoryName/products/:productName`,
  (req, res) => {
    console.log(req.query);
    console.log(req.params);
    res.send("yayaya");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
