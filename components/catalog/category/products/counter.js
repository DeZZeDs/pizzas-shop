function handlerCounter(event) {
    const COUNTER_BUTTON_PLUS = 'plus';
    const COUNTER_BUTTON_MINUS = 'minus';
    let productItem = event.closest('.header__mini-cart-middle-products-item');
    let productItemID = productItem.getAttribute('data-product-id');
    let productQuantity = parseInt(productItem.querySelector('.header__mini-cart-middle-products-item-counter-input').textContent);
    let counterButton = event.getAttribute('data-counter');
    let basketItems = JSON.parse(localStorage.getItem('basket-items')) || [];
    let keysOfProducts = [];
    basketItems.forEach((pItem) => { keysOfProducts.push(pItem.productID); });
    if (counterButton === COUNTER_BUTTON_PLUS) {
        if (keysOfProducts.includes(productItemID)) {
            updateProduct(basketItems, productItemID, 'add');
        }
    }
    if (counterButton === COUNTER_BUTTON_MINUS && productQuantity > 1) {
        if (keysOfProducts.includes(productItemID)) {
            updateProduct(basketItems, productItemID, 'remove');
        }
    }
}