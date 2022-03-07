const categoriesWrapper = document.querySelector('.catalog__section-wrapper');

async function getCategories(sortParams) {
    const responseCat = await fetch('./data/categories.json');
    const categoriesArray = await responseCat.json();
    renderCategories(categoriesArray, sortParams);
}

getCategories();

function renderCategories(array, sortType) {
    //clear old categories
    categoriesWrapper.innerHTML = '';
    let currentCategory = document.querySelector('.catalog__navigation-category-list-item.active');
    let currentCategoryId = currentCategory.getAttribute('data-id-category');
    array.forEach(function(cItem) {
        if (cItem.categoryId === parseInt(currentCategoryId)) {
            const categoryItemHTML = `
            <div class="catalog__section" data-category="${cItem.categoryId}">
              <div class="catalog__section-title">${cItem.categoryName}</div>
              <div class="catalog__section-products">
                <div class="row catalog__section-products-wrapper">
                  <!-- Вывод товаров из json файла -->
                </div>
              </div>
            </div>`;
            categoriesWrapper.insertAdjacentHTML('beforeend', categoryItemHTML);
            renderProducts(cItem.products, cItem.categoryId, sortType);
        }
    });
}

function renderProducts(array, index, sortType) {
    const productsWrapper = document.querySelector(`[data-category='${index}'] .catalog__section-products-wrapper`);
    const TYPE_PRICE = 'price';
    const TYPE_NAME = 'name';
    const TYPE_POPULAR = 'popular';
    if (sortType) {
        switch (sortType) {
            case TYPE_PRICE:
                {
                    array.sort((a, b) => parseInt(a.price) - parseInt(b.price));
                    break;
                }
            case TYPE_NAME:
                {
                    function sortByName(a, b) {
                        if (a.productName > b.productName) return 1;
                        if (a.productName < b.productName) return -1;
                        return 0;

                    }
                    array.sort(sortByName);
                    break;
                }
            case TYPE_POPULAR:
                {

                }
        }
    }
    array.forEach(function(pItem) {
        const productItemHTML = `<div class="col-md-4 col-sm-6">
        <div class="catalog__section-products-item" data-product-id="${pItem.productId}">
          <div class="catalog__section-products-item-image">
            <img src="${pItem.imageSrc}">
          </div>
          <div class="catalog__section-products-item-name">${pItem.productName}</div>
          <div class="catalog__section-products-item-type">
            <div class="catalog__section-products-item-type-dough">
              <div class="catalog__section-products-item-type-dough-item active" onclick="toggleOptionDough(this);">${pItem.dough.small}</div>
              <div class="catalog__section-products-item-type-dough-item" onclick="toggleOptionDough(this);">${pItem.dough.trad}</div>
            </div>
            <div class="catalog__section-products-item-type-size">
              <div class="catalog__section-products-item-type-size-item active" onclick="toggleOptionSize(this);">${pItem.size.sm}</div>
              <div class="catalog__section-products-item-type-size-item" onclick="toggleOptionSize(this);">${pItem.size.md}</div>
              <div class="catalog__section-products-item-type-size-item" onclick="toggleOptionSize(this);">${pItem.size.xs}</div>
            </div>
          </div>
          <div class="catalog__section-products-item-footer">
            <div class="catalog__section-products-item-footer-price">от ${pItem.price}</div>
            <button class="catalog__section-products-item-footer-add-basket" onclick="addProduct(this);">Добавить</button>
          </div>
        </div>
      </div>`;
        productsWrapper.insertAdjacentHTML("beforeend", productItemHTML);
    });

}