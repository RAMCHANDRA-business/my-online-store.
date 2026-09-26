const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1399,
        image: "images/wireless headphones.png"
    },

    {
        id: 2,
        name: "Gaming Mouse",
        price: 499,
        image: "images/gaming mouse.png"
    },

    {
        id: 3,
        name: "Mechanical Keyboard",
        price: 1099,
        image: "images/mechanical keyboard.png"
    },

    {
        id: 4,
        name: "Smart Watch",
        price: 2099,
        image: "images/smart watch.png"
    },

    {
        id: 5,
        name: "USB-C Cable",
        price: 199,
        image: "images/usb c cable.png"
    },

    {
        id: 6,
        name: "Bluetooth Speaker",
        price: 999,
        image: "images/blutooth speaker.png"
    }
];


let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* =========================
   GET ELEMENTS
========================= */

const productContainer =
    document.getElementById("product-container");

const cartCount =
    document.getElementById("cart-count");

const search =
    document.getElementById("search");

const cartButton =
    document.getElementById("cart-button");

const cartOverlay =
    document.getElementById("cart-overlay");

const closeCart =
    document.getElementById("close-cart");

const cartItems =
    document.getElementById("cart-items");

const cartTotal =
    document.getElementById("cart-total");

const checkoutButton =
    document.getElementById("checkout-button");

const checkoutSection =
    document.getElementById("checkout-section");

const backToCart =
    document.getElementById("back-to-cart");

const checkoutForm =
    document.getElementById("checkout-form");

const checkoutTotal =
    document.getElementById("checkout-total");


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(list) {

    productContainer.innerHTML = "";

    list.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className = "product";


        card.innerHTML =
            '<img src="' +
            product.image +
            '" alt="' +
            product.name +
            '">' +

            '<h3>' +
            product.name +
            '</h3>' +

            '<p>₹' +
            product.price +
            '</p>' +

            '<button class="add-cart" onclick="addToCart(' +
            product.id +
            ')">' +

            'Add to Cart' +

            '</button>';


        productContainer.appendChild(card);
    });
}


/* =========================
   ADD TO CART
========================= */

function addToCart(productId) {

    const product =
        products.find(function(item) {

            return item.id === productId;
        });


    if (!product) {
        return;
    }


    const existing =
        cart.find(function(item) {

            return item.id === productId;
        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });
    }


    updateCart();


    alert(
        product.name +
        " added to cart!"
    );
}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();

    updateCheckoutTotal();
}


/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    let count = 0;


    cart.forEach(function(item) {

        count += item.quantity;
    });


    cartCount.textContent = count;
}


/* =========================
   DISPLAY CART
========================= */

function displayCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<div class="empty-cart">' +
            '🛒' +
            '<br><br>' +
            'Your cart is empty.' +
            '<br><br>' +
            'Add some products!' +
            '</div>';


        cartTotal.textContent = "0";

        return;
    }


    let total = 0;


    cart.forEach(function(item) {

        const itemTotal =
            item.price *
            item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML =

            '<img src="' +
            item.image +
            '" alt="' +
            item.name +
            '">' +

            '<div class="cart-item-info">' +

            '<h3>' +
            item.name +
            '</h3>' +

            '<div class="cart-item-price">' +
            '₹' +
            item.price +
            '</div>' +

            '<div class="quantity-controls">' +

            '<button onclick="decreaseQuantity(' +
            item.id +
            ')">' +
            '−' +
            '</button>' +

            '<span class="quantity">' +
            item.quantity +
            '</span>' +

            '<button onclick="increaseQuantity(' +
            item.id +
            ')">' +
            '+' +
            '</button>' +

            '</div>' +

            '</div>' +

            '<button class="remove-cart-item" ' +
            'onclick="removeFromCart(' +
            item.id +
            ')">' +

            '🗑️' +

            '</button>';


        cartItems.appendChild(cartItem);
    });


    cartTotal.textContent =
        total.toLocaleString("en-IN");
}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(productId) {

    const item =
        cart.find(function(item) {

            return item.id === productId;
        });


    if (item) {

        item.quantity++;

        updateCart();
    }
}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(productId) {

    const item =
        cart.find(function(item) {

            return item.id === productId;
        });


    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity <= 0) {

        cart =
            cart.filter(function(item) {

                return item.id !== productId;
            });
    }


    updateCart();
}


/* =========================
   REMOVE PRODUCT
========================= */

function removeFromCart(productId) {

    cart =
        cart.filter(function(item) {

            return item.id !== productId;
        });


    updateCart();
}


/* =========================
   CALCULATE TOTAL
========================= */

function getCartTotal() {

    let total = 0;


    cart.forEach(function(item) {

        total +=
            item.price *
            item.quantity;
    });


    return total;
}


/* =========================
   CHECKOUT TOTAL
========================= */

function updateCheckoutTotal() {

    checkoutTotal.textContent =
        getCartTotal()
            .toLocaleString("en-IN");
}


/* =========================
   OPEN CART
========================= */

cartButton.addEventListener(
    "click",
    function() {

        checkoutSection.classList.remove(
            "active"
        );

        cartItems.style.display =
            "block";

        document.querySelector(
            ".cart-footer"
        ).style.display =
            "block";


        displayCart();


        cartOverlay.classList.add(
            "active"
        );
    }
);


/* =========================
   CLOSE CART
========================= */

closeCart.addEventListener(
    "click",
    function() {

        cartOverlay.classList.remove(
            "active"
        );
    }
);


/* =========================
   CLOSE OUTSIDE
========================= */

cartOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target === cartOverlay
        ) {

            cartOverlay.classList.remove(
                "active"
            );
        }
    }
);


/* =========================
   OPEN CHECKOUT
========================= */

checkoutButton.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;
        }


        cartItems.style.display =
            "none";


        document.querySelector(
            ".cart-footer"
        ).style.display =
            "none";


        checkoutSection.classList.add(
            "active"
        );


        updateCheckoutTotal();
    }
);


/* =========================
   BACK TO CART
========================= */

backToCart.addEventListener(
    "click",
    function() {

        checkoutSection.classList.remove(
            "active"
        );


        cartItems.style.display =
            "block";


        document.querySelector(
            ".cart-footer"
        ).style.display =
            "block";


        displayCart();
    }
);


/* =========================
   SEARCH
========================= */

search.addEventListener(
    "input",
    function() {

        const text =
            search.value
                .toLowerCase()
                .trim();


        const filteredProducts =
            products.filter(
                function(product) {

                    return product.name
                        .toLowerCase()
                        .includes(text);
                }
            );


        displayProducts(
            filteredProducts
        );
    }
);


/* =========================
   PLACE ORDER
========================= */

checkoutForm.addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const address = document.getElementById("customer-address").value.trim();
        const city = document.getElementById("customer-city").value.trim();
        const pin = document.getElementById("customer-pin").value.trim();
        const payment = document.querySelector('input[name="payment"]:checked').value;

        if (!name || !phone || !address || !city || !pin) {
            alert("Please fill in all details.");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        if (!/^[0-9]{6}$/.test(pin)) {
            alert("Please enter a valid 6-digit PIN code.");
            return;
        }

        if (payment === "online") {
            alert("Online payment is not connected in this demo version.");
            return;
        }

        const orderTotal = getCartTotal();
        let orderId;
        do {
            orderId = "RDS-" + Math.floor(100000 + Math.random() * 900000);
        } while (getOrders().some(function(item) { return item.id === orderId; }));

        const orders = JSON.parse(localStorage.getItem("demoOrders")) || [];

        const order = {
            id: orderId,
            name: name,
            phone: phone,
            address: address,
            city: city,
            pin: pin,
            payment: "Cash on Delivery",
            items: cart.map(function(item) {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                };
            }),
            total: orderTotal,
            status: "Order Placed",
            createdAt: new Date().toLocaleString("en-IN")
        };

        orders.push(order);
        localStorage.setItem("demoOrders", JSON.stringify(orders));
        localStorage.setItem("lastOrderId", orderId);

        alert(
            "Order placed successfully! 🎉\n\n" +
            "Order ID: " + orderId + "\n" +
            "Total: ₹" + orderTotal.toLocaleString("en-IN") + "\n" +
            "Payment: Cash on Delivery\n\n" +
            "Save your Order ID to track the order."
        );

        cart = [];
        checkoutForm.reset();

        checkoutSection.classList.remove("active");
        cartItems.style.display = "block";
        document.querySelector(".cart-footer").style.display = "block";

        updateCart();
        cartOverlay.classList.remove("active");

        openTracking(orderId);
    }
);

/* =========================
   DEMO ORDER TRACKING
========================= */

const statusList = [
    "Order Placed",
    "Order Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered"
];

const trackingOverlay = document.getElementById("tracking-overlay");
const adminOverlay = document.getElementById("admin-overlay");
const trackingIdInput = document.getElementById("tracking-id");
const trackingResult = document.getElementById("tracking-result");

function getOrders() {
    return JSON.parse(localStorage.getItem("demoOrders")) || [];
}

function saveOrders(orders) {
    localStorage.setItem("demoOrders", JSON.stringify(orders));
}

function openTracking(orderId) {
    trackingOverlay.classList.add("active");
    trackingIdInput.value = orderId || localStorage.getItem("lastOrderId") || "";
    showOrderStatus();
}

function showOrderStatus() {
    const id = trackingIdInput.value.trim().toUpperCase();
    const orders = getOrders();
    const order = orders.find(function(item) {
        return item.id.toUpperCase() === id;
    });

    if (!order) {
        trackingResult.innerHTML =
            '<div class="tracking-card">No demo order found. Please check the Order ID.</div>';
        return;
    }

    const currentIndex = statusList.indexOf(order.status);

    let steps = "";
    statusList.forEach(function(status, index) {
        let className = "status-step";
        if (index < currentIndex) className += " done";
        if (index === currentIndex) className += " current";

        steps += '<div class="' + className + '">' +
            (index < currentIndex ? "✓ " : index === currentIndex ? "● " : "○ ") +
            status + "</div>";
    });

    trackingResult.innerHTML =
        '<div class="tracking-card">' +
        '<h3>Order ' + order.id + '</h3>' +
        '<div class="status-badge">Current Status: ' + order.status + '</div>' +
        '<p><strong>Customer:</strong> ' + escapeHtml(order.name) + '</p>' +
        '<p><strong>Total:</strong> ₹' + order.total.toLocaleString("en-IN") + '</p>' +
        '<p><strong>Placed:</strong> ' + order.createdAt + '</p>' +
        '<br><div class="status-steps">' + steps + '</div>' +
        '</div>';
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function(char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char];
    });
}

document.getElementById("track-order-button").addEventListener("click", function() {
    openTracking();
});

document.getElementById("close-tracking").addEventListener("click", function() {
    trackingOverlay.classList.remove("active");
});

document.getElementById("track-button").addEventListener("click", showOrderStatus);

trackingIdInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        showOrderStatus();
    }
});

/* =========================
   DEMO ADMIN PANEL
========================= */

function displayAdminOrders() {
    const container = document.getElementById("admin-orders");
    const orders = getOrders();

    if (orders.length === 0) {
        container.innerHTML = '<div class="tracking-card">No demo orders yet.</div>';
        return;
    }

    container.innerHTML = "";

    orders.slice().reverse().forEach(function(order) {
        const box = document.createElement("div");
        box.className = "admin-order";

        box.innerHTML =
            '<h3>' + order.id + '</h3>' +
            '<p><strong>Customer:</strong> ' + escapeHtml(order.name) + '</p>' +
            '<p><strong>Total:</strong> ₹' + order.total.toLocaleString("en-IN") + '</p>' +
            '<p><strong>Placed:</strong> ' + order.createdAt + '</p>' +
            '<label>Status:</label>' +
            '<select data-order-id="' + order.id + '">' +
            statusList.map(function(status) {
                return '<option value="' + status + '"' +
                    (status === order.status ? " selected" : "") +
                    '>' + status + '</option>';
            }).join("") +
            '</select>';

        container.appendChild(box);
    });

    container.querySelectorAll("select").forEach(function(select) {
        select.addEventListener("change", function() {
            const orders = getOrders();
            const order = orders.find(function(item) {
                return item.id === select.dataset.orderId;
            });

            if (order) {
                order.status = select.value;
                saveOrders(orders);
                alert("Status updated to: " + order.status);
                showOrderStatus();
            }
        });
    });
}

document.getElementById("admin-button").addEventListener("click", function() {
    adminOverlay.classList.add("active");
    displayAdminOrders();
});

document.getElementById("close-admin").addEventListener("click", function() {
    adminOverlay.classList.remove("active");
});

trackingOverlay.addEventListener("click", function(event) {
    if (event.target === trackingOverlay) {
        trackingOverlay.classList.remove("active");
    }
});

adminOverlay.addEventListener("click", function(event) {
    if (event.target === adminOverlay) {
        adminOverlay.classList.remove("active");
    }
});



/* =========================
   START WEBSITE
========================= */

displayProducts(products);

updateCart();