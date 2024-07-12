import express from "express";
const app = express();

app.use(express.json(), express.urlencoded({ extended: true }));

let products = [];

function ascendingSort(products) {
  products.sort((a, b) => a.price - b.price);
}

function descendingSort(products) {
  products.sort((a, b) => b.price - a.price);
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
  return products.filter((product) => product.company === company);
}

function searchProduct(products, id) {
  return products.filter((product) => product.id.includes(id));
}

function addId(products) {
  products.forEach((product, index) => {
    product.id = `${product.name}-${index}`;
  });
}

app.get(
  `/companies/:companyName/categories/:categoryName/products`,
  (req, res) => {
    console.log(req.query);
    console.log(req.params);
    
    res.send("yayaya");
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
