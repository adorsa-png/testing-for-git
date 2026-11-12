// 1. Product Class
class Product {
    constructor(name,price, stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // Method to reduce stock
    reduceStock(qty) {
        if (qty <= 0) {
            return { succes: false, message: "Quantity must be greater than 0."};
        }
        if (qty > this.stock) {
            return{ success: false, message: `Not enough stock for ${this.name}. 
            Available; ${this.stock},Requested: ${qty}`
            };
        }
        this.stock -= qty;
        return { succes: true, message: `${qty} x ${this.name} 
        stock reduced. Remaining: ${this.stock}`};
    }
}

// 2. ShoppingCart class
class ShoppingCart {
    constructor(customerName) {
        this.customerName = customerName;
        this.items = []; // {praduct, qty}
    }

    addItem(product, qty) {
        // Check the stock first
        const stockCheck = product.reduceStock (qty);

        if (!stockCheck.success) {
            console.log(`FAILED: ${stockCheck.message}`);
            return;
        }

        // Check if the product already in cart
        const existingItem = this.items.find(item => item.product.name === product.name);
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            this.item.push({ product, qty});
        }

        console.log(`ADD: &{qty} x ${product.name} to cart.`);
    }

    calculateTotal() {
        let total = 0;
        for (let item of this.item) {
            total += item.product.price * item.qty;
        }
        return total;
    }

    displayCart() {
        console.log("\n _____SHOPING CART_____");
        console.log(`Customer: ${this.customerName}`);

        if(this.item.length === 0) {
            console.log("Cart is empty.");
        } else {
            for (let item of this.items) {
                const subtotal = item.product.price * item.qty;
                console.log(`${item.product.name}| Quantit: ${item.qty} 
                    | Price: $${item.product.price} | Subtotal: $${subtotal}`);
            }
            console.log(`FINAL TOTAL: $${this.calculateTotal()}`);
        }
        console.log("------------------------------\n");
    }
}

// ---REQOIRED TEST DATA---

// Create at least 3 product
const laptop = new Product("Laptop", 40000, 5);
const keyboard = new Product("Keyboard", 1500, 10);
const mouse = new Product("Mouse", 800, 3);

console.log("Initial Stock:");
console.log(`${laptop.name}: ${laptop.stock}`);
console.log(`${keyboard.name}: ${keyboard.stock}`);
console.log(`${mouse.name}: ${mouse.stock}`);

// My ShoppingCart
const myCart = new ShoppingCart("Crestoper");

// Adding product & quantities
myCart.addItem(laptop, 2);
myCart.addItem(keyboard, 4);
myCart.addItem(mouse, 3);

// Add more than available stock
myCart.addItem(laptop, 4);
myCart.addItem(keyboard, 2);
myCart.addItem(mouse, 2);

// display cart and total
myCart.displayCart();

//Show the available stock after purchase
console.log("Remaining Stock:");
console.log(`$(laptop.name): ${keyboard.stock}`);
console.log(`${keyboard.name}: ${keyboard.stack}`);
console.log(`${mouse.name}: ${mouse.stack}`);