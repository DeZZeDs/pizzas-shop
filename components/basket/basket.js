const basketBtn = document.querySelector('.header__cart');
const miniBasketBlock = document.querySelector('.header__mini-cart');
basketBtn.addEventListener('click', () => miniBasketBlock.classList.toggle('hidden'));


function addProduct(e) {
    let product = e.closest('.catalog__section-products-item');
    let imageSrc = product.querySelector('.catalog__section-products-item-image img').getAttribute('src');
    let doughSelected = product.querySelector('.catalog__section-products-item-type-dough-item.active').textContent;
    let productName = product.querySelector('.catalog__section-products-item-name').textContent;
    let sizeSelected = product.querySelector('.catalog__section-products-item-type-size-item.active').textContent;
    let price = product.querySelector('.catalog__section-products-item-footer-price').textContent;
    e.classList.add('active');
    productInfo = {
        "productID": product.getAttribute('data-product-id'),
        "imageSrc": imageSrc,
        "productName": productName,
        "dough": doughSelected,
        "size": sizeSelected,
        "price": price,
        "quantity": 1
    }
    createProduct(productInfo);
}

function deleteProduct(e) {
    // Обновляем на фронте
    let currentProduct = e.closest('[data-product-id]');
    let currentProductID = currentProduct.getAttribute('data-product-id');
    currentProduct.remove();
    // Обновляем на бэке
    let oldItems = JSON.parse(localStorage.getItem('basket-items'));
    oldItems.forEach(function(pItem) {
        if (currentProductID === pItem.productID) {
            let keysOfProducts = [];
            oldItems.forEach((pItem) => { keysOfProducts.push(pItem.productID); });
            let index = keysOfProducts.indexOf(currentProductID);
            oldItems.splice(index, 1);
            localStorage.setItem('basket-items', JSON.stringify(oldItems));
            updateCartInfo();
            isBasketStatus();
            isBasketProduct();
        }
    });
}

function createProduct(object) {
    // Если товар с таким ID уже есть в корзине, обновляем его
    let oldItems = JSON.parse(localStorage.getItem('basket-items')) || [];
    let keysOfProducts = [];
    oldItems.forEach((pItem) => { keysOfProducts.push(pItem.productID); });
    if (keysOfProducts.includes(object.productID)) {
        updateProduct(oldItems, object.productID, 'add');
    }
    // Если такого товара нет, добавляем в корзину
    else {
        oldItems.push(object);
        localStorage.setItem('basket-items', JSON.stringify(oldItems));
        renderMiniBakset();
    }
    isBasketStatus();

}

function updateProduct(array, id, action) {
    array.forEach(function(pItem) {
        if (pItem.productID === id) {
            if (action === 'add') {
                pItem.quantity++;
                localStorage.setItem('basket-items', JSON.stringify(array));
                updateCartInfo();
            }
            if (action === 'remove') {
                pItem.quantity--;
                localStorage.setItem('basket-items', JSON.stringify(array));
                updateCartInfo();
            }
        }
    });
}

function DeleteAllBaksetItems() {
    productsWrapper.innerHTML = '';
    localStorage.removeItem('basket-items');
    isBasketStatus();
    isBasketProduct();
}