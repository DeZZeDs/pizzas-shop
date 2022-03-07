function toggleOptionDough(e) {
    // Dough option
    const doughItems = document.querySelectorAll('.catalog__section-products-item-type-dough-item');
    let parentBlockItem = e.closest('.catalog__section-products-item-type-dough');
    let currentItem = parentBlockItem.querySelector('.catalog__section-products-item-type-dough-item.active');
    currentItem.classList.remove('active');
    e.classList.add('active');
}
function toggleOptionSize(e) {
    const sizeItems = document.querySelectorAll('.catalog__section-products-item-type-size-item');
    let parentBlockItem = e.closest('.catalog__section-products-item-type-size');
    let currentItem = parentBlockItem.querySelector('.catalog__section-products-item-type-size-item.active');
    currentItem.classList.remove('active');
    e.classList.add('active');
}


