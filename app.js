(() => {
    const app = document.getElementById("app");
    const cartCountE1 = document.getElementById("cart-count");

    let products = [];
    let filteredProducts = [];
    let cart = {};
    let currentPage = "home";
    let currentCategory = "all";

    const categoryMap = {
        "men's clothing": "mens clothing",
        "women's clothing": "womens clothing",
        jewelery: "jewelery",
        electronics: "electronics",
    };

    async function fetchProducts() {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            products = data;
            filteredProducts = products;
        } catch {
            products = [];
            filteredProducts = [];
        }
    }

    function formatPrice(price) {
        return "$" + price.toFixed(2);
    }

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...."; 
    }

    function renderHome() {
      app.innerHTML = `
        <div class="banner">
          <img src="./assets/main.png.jpg" alt="img1" />
          <div class="banner-text">
            <h2>New Season Arrivals</h2>
            <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
        <h3 class="section-title">Latest Products</h3>
        <hr class="divider" />
        <div class="category-filters" id="category-filters">
          <button class="category-btn active" data-category="all">All</button>
          <button class="category-btn" data-category="mens clothing">Men's Clothing</button>
          <button class="category-btn" data-category="womens clothing">Women's Clothing</button>
          <button class="category-btn" data-category="jewelery">Jewelery</button>
          <button class="category-btn" data-category="electronics">Electronics</button>
        </div>
        <div class="product-grid" id="products-list"></div>
      `;
      renderProductsList(filteredProducts);
      attachCategoryFiltersListeners();
    }

    function renderProductsList(list) {
        const container = document.getElementById("products-list");
        
    }

    async function init() {
        await fetchProducts();
        renderHome();
        
    }

    init();
})();