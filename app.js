(() => {
    const app = document.getElementById("app");
    const cartCountE1 = document.getElementById("cart-count");

    let products = [];
    let filteredProducts = [];
    let cart = {};
    let currentPage = "home";
    let currentCategory = "all";

    const categoryMap = {
        "men's clothing": "men's clothing",
        "women's clothing": "women's clothing",
        jewelry: "jewelery",
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
          <img src="./assets/main.png.jpg"
        `
    }
})