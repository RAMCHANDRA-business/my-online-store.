let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];


const checkoutItems =
    document.getElementById("checkout-items");

const checkoutTotal =
    document.getElementById("checkout-total");

const checkoutForm =
    document.getElementById("checkout-form");


function displayCheckout() {

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML =
            '<div class="empty-order">' +
            'Your cart is empty.' +
            '<br><br>' +
            '<a href="index.html">' +
            'Return to store' +
            '</a>' +
            '</div>';

        checkoutTotal.textContent = "0";

        return;
    }


    let total = 0;


    cart.forEach(function(item) {

        const quantity =
            item.quantity || 1;

        const itemTotal =
            item.price * quantity;

        total += itemTotal;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-item";


        itemElement.innerHTML =
            '<img src="' +
            item.image +
            '" alt="' +
            item.name +
            '">' +

            '<div class="checkout-item-info">' +

            '<h3>' +
            item.name +
            '</h3>' +

            '<p>' +
            '₹' +
            item.price +
            ' × ' +
            quantity +
            '</p>' +

            '</div>' +

            '<strong>₹' +
            itemTotal +
            '</strong>';


        checkoutItems.appendChild(
            itemElement
        );
    });


    checkoutTotal.textContent =
        total.toLocaleString("en-IN");
}


checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;
        }


        const name =
            document.getElementById(
                "name"
            ).value;


        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        if (payment === "online") {

            alert(
                "Online payment will be connected later."
            );

            return;
        }


        alert(
            "Order placed successfully!\n\n" +
            "Thank you, " +
            name +
            "!"
        );


        localStorage.removeItem(
            "cart"
        );


        cart = [];

        checkoutForm.reset();

        displayCheckout();
    }
);


displayCheckout();