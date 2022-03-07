const productsWrapper = document.querySelector('.header__mini-cart-middle-products');

function isBasketStatus() {
    let basketItems = JSON.parse(localStorage.getItem('basket-items')) || [];
    const miniCartWrapper = document.querySelector('.header__mini-cart');
    if (basketItems.length === 0) {
        miniCartWrapper.classList.add('empty');
    } else {
        miniCartWrapper.classList.remove('empty');
    }
    updateCartInfo();
}

function isBasketProduct() {
    setTimeout(() => {
        let basketItems = JSON.parse(localStorage.getItem('basket-items'));
        let productItems = document.querySelectorAll('.catalog__section-products-item');
        if (basketItems) {
            basketItems.forEach(function(pItem) {
                for (let productItem of productItems) {
                    let productID = productItem.getAttribute('data-product-id');
                    if (productID === pItem.productID) {
                        productItem.classList.add('active');
                    }
                }
            });
            if (basketItems.length === 0) {
                for (let productItem of productItems) {
                    productItem.classList.remove('active');
                }
            }
        } else {
            for (let productItem of productItems) {
                productItem.classList.remove('active');
            }
        }
    }, 500);
}

function renderMiniBakset() {
    let basketItems = JSON.parse(localStorage.getItem('basket-items'));
    productsWrapper.innerHTML = '';
    if (basketItems) {
        basketItems.forEach(function(pItem) {
            let priceModifed = pItem.price.split(' ')[1];
            const productItemHTML = `<div class="header__mini-cart-middle-products-item" data-product-id="${pItem.productID}">
          <div class="header__mini-cart-middle-products-item-img">
            <img src="${pItem.imageSrc}" alt="product" title="product">
          </div>
          <div class="header__mini-cart-middle-products-item-info">
            <div class="header__mini-cart-middle-products-item-info-name">${pItem.productName}</div>
            <div class="header__mini-cart-middle-products-item-info-size">${pItem.dough} тесто, ${pItem.size}</div>
          </div>
          <div class="header__mini-cart-middle-products-item-counter">
            <button class="header__mini-cart-middle-products-item-counter-minus" data-counter="minus" onclick="handlerCounter(this);">-</button>
            <div class="header__mini-cart-middle-products-item-counter-input">${pItem.quantity}</div>
            <button class="header__mini-cart-middle-products-item-counter-plus" data-counter="plus" onclick="handlerCounter(this);">+</button>
          </div>
          <div class="header__mini-cart-middle-products-item-price">${parseInt(priceModifed)} ₽</div>
          <div class="header__mini-cart-middle-products-item-delete" onclick="deleteProduct(this)"></div>
        </div>`;
            productsWrapper.insertAdjacentHTML('beforeend', productItemHTML);

        });
    }
    isBasketStatus();
    isBasketProduct();
}

renderMiniBakset();

function updateCartInfo() {
    let oldItems = JSON.parse(localStorage.getItem('basket-items'));
    let quantityOfProducts = document.querySelector('.header__cart-quantitys-items');
    let quantitysOfCart = document.querySelector('.header__mini-cart-footer-left-side-amount-items .color-orange');
    let priceOfProducts = document.querySelector('.header__cart-total-price');
    let priceOfCart = document.querySelector('.header__mini-cart-footer-right-side-amount-sum .color-orange');
    let quantitysItem = 0,
        priceItem = 0,
        sumOfItemsPrice = 0;
    if (oldItems) {
        oldItems.forEach(function(pItem) {
            quantitysItem += pItem.quantity;
            let priceModifed = pItem.price.split(' ')[1];
            priceItem = pItem.quantity * parseInt(priceModifed);
            sumOfItemsPrice += priceItem;
            let currentQuantityOfProduct = document.querySelector(`[data-product-id="${pItem.productID}"] .header__mini-cart-middle-products-item-counter-input`);
            if (currentQuantityOfProduct) {
                currentQuantityOfProduct.textContent = pItem.quantity;
            }
        });
    }
    quantityOfProducts.textContent = quantitysItem;
    quantitysOfCart.textContent = `${quantitysItem} шт.`;
    priceOfProducts.textContent = `${sumOfItemsPrice} ₽`;
    priceOfCart.textContent = `${sumOfItemsPrice} ₽`;
}