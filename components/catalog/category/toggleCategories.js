document.addEventListener('DOMContentLoaded', () => {
    let navCategoriesTitleMobile = document.querySelector('.catalog__navigation-category-select-title');
    const sortList = document.querySelector('.catalog__navigation-sort-list');
    navCategoriesTitleMobile.addEventListener('click', function(e) {
        this.nextElementSibling.classList.toggle('show');
        sortList.classList.add('hidden');
    });
    const navCategoriesItems = document.querySelectorAll('[data-id-category]');
    for (const navCategoriesItem of navCategoriesItems) {
        navCategoriesItem.addEventListener('click', function(e) {
            let currentActiveItems = document.querySelectorAll('[data-id-category].active');
            for (const item of currentActiveItems) {
                item.classList.remove('active');
            }
            if (navCategoriesTitleMobile) {
                navCategoriesTitleMobile.textContent = e.target.textContent;
                let listNav = e.target.closest('.catalog__navigation-category-select-list');
                if (listNav) {
                    listNav.classList.remove('show');
                }
            }
            e.target.classList.add('active');
            let currentActiveItem = document.querySelector('[data-id-category].active');
            let currentID = currentActiveItem.getAttribute('data-id-category');
            getSimiliarCategories(currentID);
        });
    }

    function getSimiliarCategories(categoryID) {
        let similiarCategories = document.querySelectorAll(`[data-id-category='${categoryID}']`);
        for (let similiarCategory of similiarCategories) {
            similiarCategory.classList.add('active');
            getCategories();
        }
    }

});