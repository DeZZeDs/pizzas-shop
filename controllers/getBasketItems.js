function getBasketItems() {
    let obj = JSON.parse(localStorage.getItem('basket-items'));
    console.log(obj);
}

getBasketItems();