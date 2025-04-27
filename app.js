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
        return "$ " + price.toFixed(2);
    }

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "..."; 
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
      attachCategoryFilterListeners();
    }

    function renderProductsList(list) {
        const container = document.getElementById("products-list");
        if (!container) return;
        if (list.length == 0) {
            container.innerHTML = `<p style="text-align:center; color:rgb(106, 118, 130);">No products found.</p>`;
            return;
        }
        container.innerHTML = list.map(p => `
            <div class="product-card">
              <img src="${p.image}" alt="${p.title}" class="product-img" />
              <h6 class="product-title" title="${p.title}">${truncateText(p.title, 12)}</h6>
              <p class="product-desc" title="${p.description}">${truncateText(p.description, 90)}</p>
              <hr class="dividers" />
              <div class="product-price">${formatPrice(p.price)}</div>
              <hr class="dividers" />
              <div class="product-actions">
                <button class="btn-details" data-id="${p.id}">Details</button>
                <button class="btn-add-cart" data-id="${p.id}">Add to Cart</button>
              </div>
            </div>
        `).join("");
        attachProductButtonsListeners();
    }

    function attachCategoryFilterListeners(){
        const buttons = document.querySelectorAll(".category-btn");
        buttons.forEach(btn => {
            btn.onclick = () => {
                buttons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentCategory = btn.dataset.category;
                filterProductsByCategory(currentCategory);
            };
        });
    }

    function filterProductsByCategory(category) {
        if (category === "all") {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter(p => {
                const cat = categoryMap[p.category] || p.category;
                return cat.toLowerCase() === category.toLowerCase();
            });
        }
        renderProductsList(filteredProducts);
    }

    function attachProductButtonsListeners() {
        const addCartBtns = document.querySelectorAll(".btn-add-cart");
        addCartBtns.forEach(btn => {
            btn.onclick = () => {
                const id = btn.dataset.id;
                addToCart(id);
            };
        });
    }

    function renderProducts() {
        app.innerHTML = `
          <h3 class="section-title">Latest Products</h3>
          <hr class="divider" />
          <div class="category-filters" id="category-filters">
            <button class="category-btn active" data-category="all">All</button>
            <button class="category-btn" data-category="mens clothing">Men's Clothing</button>
            <button class="category-btn" data-category="womens clothing">Women's Clothing</button>
            <button class="category-btn" data-category="jewelery">Jewelery</button>
            <button class="category-btn" data-category="electronics">Electronics</button>
          </div>
          <div class="products-grid" id="products-list"></div>
        `;
        renderProductsList(filteredProducts);
        attachCategoryFilterListeners();
    }
    
    function renderAbout() {
        app.innerHTML = `
          <div>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum facere doloremque veritatis odit similique sequi. Odit amet fuga nam quam quasi facilis sed doloremque saepe sint perspiciatis explicabo totam vero quas provident ipsam, veritatis nostrum velit quos recusandae est mollitia esse fugit dolore laudantium. Ex vel explicabo earum unde eligendi autem praesentium, doloremque distinctio nesciunt porro tempore quis eaque labore voluptatibus ea necessitatibus exercitationem tempora molestias. Ad consequuntur veniam sequi ullam tempore vel tenetur soluta dolore sunt maxime aliquam corporis est, quo saepe dolorem optio minus sint nemo totam dolorum! Reprehenderit delectus expedita a alias nam recusandae illo debitis repellat libero, quasi explicabo molestiae saepe, dolorem tempore itaque eveniet quam dignissimos blanditiis excepturi harum numquam vel nihil? Ipsum</p>
            <h3>Our Products</h3>
            <div style="display:grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap:1rem; margin-top:1rem;">
              <div style="border:1px solid #dee2e6; border-radius:4px; padding:16px; text-align:center;">
                <img src="./assets/pexels-photo-298863.jpeg" alt="img2">
                <h5>Men's Clothing</h5>
              </div>
              <div style="border:1px solid #dee2e6; border-radius:4px; padding:16px; text-align:center;">
                <img src="./assets/pexels-photo-298863.jpeg" alt="img"3>
                <h5>Women's Clothing</h5>
              </div>
              <div style="border:1px solid #dee2e6; border-radius:4px; padding:16px; text-align:center;">
                <img src="./assets/pexels-photo-298863.jpeg" alt="img4">
                <h5>Jewelery</h5>            
              </div>
              <div style="border:1px solid #dee2e6; border-radius:4px; padding:16px; text-align:center;">
                <img src="./assets/pexels-photo-298863.jpeg" alt="img5">
                <h5>Electronics</h5>
              </div>
            </div>
          </div>
        `;
    }

    function renderContact() {

    }

    async function init() {
        await fetchProducts();
        renderHome();
        
    }

    init();
})();